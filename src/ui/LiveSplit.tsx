import * as React from "react";
import Sidebar from "react-sidebar";
import DragUpload from "./DragUpload";
import AutoRefreshLayout from "../layout/AutoRefreshLayout";
import {
    HotkeySystem, Layout, LayoutEditor, Run, RunEditor,
    Segment, SharedTimer, Timer, TimerPhase, TimingMethod,
    TimeSpan, TimerRef, TimerRefMut, HotkeyConfig,
} from "../livesplit-core";
import FileUtil from "../util/FileUtil";
import { Option, assertNull, expect, maybeDisposeAndThen, panic } from "../util/OptionUtil";
import * as SplitsIO from "../util/SplitsIO";
import { LayoutEditor as LayoutEditorComponent } from "./LayoutEditor";
import { RunEditor as RunEditorComponent } from "./RunEditor";
import { SettingsEditor as SettingsEditorComponent } from "./SettingsEditor";
import { SideBarContent } from "./SideBarContent";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "../css/LiveSplit.scss";

export enum MenuKind {
    Timer,
    Splits,
    RunEditor,
    Layout,
    LayoutEditor,
    SettingsEditor,
}

type Menu =
    { kind: MenuKind.Timer } |
    { kind: MenuKind.Splits } |
    { kind: MenuKind.RunEditor, editor: RunEditor } |
    { kind: MenuKind.Layout } |
    { kind: MenuKind.LayoutEditor, editor: LayoutEditor } |
    { kind: MenuKind.SettingsEditor, config: HotkeyConfig };

export interface State {
    hotkeySystem: HotkeySystem,
    isBrowserSource: boolean,
    isDesktop: boolean,
    timer: SharedTimer,
    layout: Layout,
    layoutWidth: number,
    sidebarOpen: boolean,
    sidebarTransitionsEnabled: boolean,
    menu: Menu,
}

const DEFAULT_LAYOUT_WIDTH = 300;

export class LiveSplit extends React.Component<{}, State> {
    private isDesktopQuery = window.matchMedia("(min-width: 600px)");
    private containerRef: React.RefObject<HTMLDivElement>;
    private scrollEvent: Option<EventListenerObject>;
    private rightClickEvent: Option<EventListenerObject>;
    private resizeEvent: Option<EventListenerObject>;
    private connection: Option<WebSocket>;
    private fileInputElement: React.RefObject<HTMLInputElement>;
    private fileOutputElement: React.RefObject<HTMLAnchorElement>;

    constructor(props: {}) {
        super(props);

        const run = this.getDefaultRun();
        const timer = expect(
            Timer.new(run),
            "The Default Run should be a valid Run",
        ).intoShared();

        let hotkeySystem = null;
        const settings = localStorage.getItem("settings");
        try {
            if (settings) {
                const config = HotkeyConfig.parseJson(JSON.parse(settings).hotkeys);
                if (config !== null) {
                    hotkeySystem = HotkeySystem.withConfig(timer.share(), config);
                }
            }
        } catch (_) { /* Looks like local storage has no valid data */ }
        if (hotkeySystem === null) {
            hotkeySystem = expect(
                HotkeySystem.new(timer.share()),
                "Couldn't initialize the hotkeys",
            );
        }

        if (window.location.hash.indexOf("#/splits-io/") === 0) {
            const loadingRun = Run.new();
            loadingRun.setGameName("Loading...");
            loadingRun.setCategoryName("Loading...");
            loadingRun.pushSegment(Segment.new("Time"));
            assertNull(
                timer.writeWith((t) => t.setRun(loadingRun)),
                "The Default Loading Run should be a valid Run",
            );
            this.loadFromSplitsIO(window.location.hash.substr("#/splits-io/".length));
        } else {
            const lss = localStorage.getItem("splits");
            if (lss !== null) {
                const result = Run.parseString(lss, "", false);
                if (result.parsedSuccessfully()) {
                    result.unwrap().with((r) => timer.writeWith((t) => t.setRun(r)))?.dispose();
                }
            }
        }

        let layout: Option<Layout> = null;
        try {
            const data = localStorage.getItem("layout");
            if (data) {
                layout = Layout.parseJson(JSON.parse(data));
            }
        } catch (_) { /* Looks like local storage has no valid data */ }
        if (layout === null) {
            layout = Layout.defaultLayout();
        }

        const layoutWidth = +(localStorage.getItem("layoutWidth") || DEFAULT_LAYOUT_WIDTH);
        const isDesktop = this.isDesktopQuery.matches;
        const isBrowserSource = !!(window as any).obsstudio;

        this.state = {
            isDesktop: isDesktop && !isBrowserSource,
            isBrowserSource,
            layout,
            layoutWidth,
            menu: { kind: MenuKind.Timer },
            sidebarOpen: false,
            sidebarTransitionsEnabled: false,
            timer,
            hotkeySystem,
        };

        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);

        this.containerRef = React.createRef();
        this.fileInputElement = React.createRef();
        this.fileOutputElement = React.createRef();
    }

    public componentDidMount() {
        this.scrollEvent = { handleEvent: (e: MouseWheelEvent) => this.onScroll(e) };
        window.addEventListener("wheel", this.scrollEvent);
        this.rightClickEvent = { handleEvent: (e: any) => this.onRightClick(e) };
        window.addEventListener("contextmenu", this.rightClickEvent, false);
        this.resizeEvent = { handleEvent: () => this.handleAutomaticResize() };
        window.addEventListener("resize", this.resizeEvent, false);

        window.onbeforeunload = (e: BeforeUnloadEvent) => {
            const hasBeenModified = this.readWith((t) => t.getRun().hasBeenModified());
            if (hasBeenModified) {
                e.returnValue = "There are unsaved changes. Do you really want to close LiveSplit One?";
                return e.returnValue;
            }
            return null;
        };

        this.isDesktopQuery.addListener(this.mediaQueryChanged);

        if (this.state.isBrowserSource) {
            document.body.className = "browser-source";
        }

        this.handleAutomaticResize();

        FileUtil.setFileInputElement(this.fileInputElement.current);
        FileUtil.setFileOutputElement(this.fileOutputElement.current);
    }

    public componentWillUnmount() {
        window.removeEventListener(
            "wheel",
            expect(this.scrollEvent, "A Scroll Event should exist"),
        );
        window.removeEventListener(
            "contextmenu",
            expect(this.rightClickEvent, "A Right Click Event should exist"),
        );
        window.removeEventListener(
            "resize",
            expect(this.resizeEvent, "A Resize Event should exist"),
        );
        this.state.timer.dispose();
        this.state.layout.dispose();
        this.state.hotkeySystem?.dispose();
        this.isDesktopQuery.removeListener(this.mediaQueryChanged);
    }

    public render() {
        const content = ((): JSX.Element => {
            if (this.state.menu.kind === MenuKind.RunEditor) {
                return <RunEditorComponent editor={this.state.menu.editor} />;
            } else if (this.state.menu.kind === MenuKind.LayoutEditor) {
                return <LayoutEditorComponent
                    editor={this.state.menu.editor}
                    layoutWidth={this.state.layoutWidth}
                    timer={this.state.timer}
                />;
            } else if (this.state.menu.kind === MenuKind.SettingsEditor) {
                return <SettingsEditorComponent hotkeyConfig={this.state.menu.config} />;
            } else {
                return <DragUpload
                    importLayout={this.importLayoutFromFile.bind(this)}
                    importSplits={this.importSplitsFromFile.bind(this)}
                >
                    <div>
                        <div
                            onClick={(_) => this.splitOrStart()}
                            style={{
                                display: "inline-block",
                                cursor: "pointer",
                            }}
                        >
                            <AutoRefreshLayout
                                getState={() => this.readWith(
                                    (t) => this.state.layout.stateAsJson(t),
                                )}
                                allowResize={this.state.isDesktop}
                                width={this.state.layoutWidth}
                                onResize={(width) => this.onResize(width)}
                            />
                        </div>
                        <div className="buttons" style={{ width: this.state.layoutWidth }}>
                            <div className="small">
                                <button onClick={(_) => this.undoSplit()}>
                                    <i className="fa fa-arrow-up" aria-hidden="true" /></button>
                                <button onClick={(_) => this.togglePauseOrStart()}>
                                    <i className="fa fa-pause" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="small">
                                <button onClick={(_) => this.skipSplit()}>
                                    <i className="fa fa-arrow-down" aria-hidden="true" />
                                </button>
                                <button onClick={(_) => this.reset()}>
                                    <i className="fa fa-times" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>
                </DragUpload>;
            }
        })();

        const sidebarContent = (
            <SideBarContent
                menu={this.state.menu.kind}
                callbacks={this}
                timer={this.state.timer}
                sidebarOpen={this.state.sidebarOpen || this.state.isDesktop}
                connectionState={this.connection?.readyState ?? WebSocket.CLOSED}
            />
        );

        const routeClassMap = {
            [MenuKind.Timer]: "menu-timer",
            [MenuKind.Splits]: "menu-splits",
            [MenuKind.RunEditor]: "menu-run-editor",
            [MenuKind.Layout]: "menu-layout",
            [MenuKind.LayoutEditor]: "menu-layout-editor",
            [MenuKind.SettingsEditor]: "menu-settings-editor",
            [MenuKind.Splits]: "menu-splits",
        };

        const contentClassName = `livesplit-container ${this.state.isDesktop ? "" : "is-mobile"}`;
        const viewContainerClassName = `view-container ${routeClassMap[this.state.menu.kind]}`;

        return (
            <>
                <input id="file-input" type="file" ref={this.fileInputElement} />
                <a id="file-output" ref={this.fileOutputElement} />
                <Sidebar
                    sidebar={sidebarContent}
                    docked={this.state.isDesktop}
                    open={this.state.sidebarOpen}
                    transitions={this.state.sidebarTransitionsEnabled}
                    onSetOpen={((e: boolean) => this.onSetSidebarOpen(e)) as any}
                    sidebarClassName="sidebar"
                    contentClassName={contentClassName}
                    overlayClassName="sidebar-overlay"
                >
                    {
                        !this.state.isDesktop &&
                        !this.state.sidebarOpen &&
                        <button
                            className="sidebar-button fa fa-bars"
                            onClick={((e: boolean) => this.onSetSidebarOpen(e)) as any}
                        />
                    }
                    <div
                        className={viewContainerClassName}
                        ref={this.containerRef}
                    >
                        {content}
                    </div>
                </Sidebar>
            </>
        );
    }

    public openTimerView() {
        this.setState({
            menu: { kind: MenuKind.Timer },
        });
    }

    public openSplitsView() {
        this.setState({
            menu: { kind: MenuKind.Splits },
        });
    }

    public openLayoutView() {
        this.setState({
            menu: { kind: MenuKind.Layout },
        });
    }

    public async importSplits() {
        const splits = await FileUtil.openFileAsArrayBuffer();
        try {
            this.importSplitsFromArrayBuffer(splits);
        } catch (err) {
            toast.error(err.message);
        }
    }

    public async importSplitsFromFile(file: File) {
        const splits = await FileUtil.convertFileToArrayBuffer(file);
        this.importSplitsFromArrayBuffer(splits);
    }

    public setCurrentTimingMethod(timingMethod: TimingMethod) {
        this.writeWith((t) => t.setCurrentTimingMethod(timingMethod));
    }

    public switchToPreviousComparison() {
        this.writeWith((t) => t.switchToPreviousComparison());
    }

    public switchToNextComparison() {
        this.writeWith((t) => t.switchToNextComparison());
    }

    public openFromSplitsIO() {
        let id = prompt("Specify the splits i/o URL or ID:");
        if (!id) {
            return;
        }
        if (id.indexOf("https://splits.io/") === 0) {
            id = id.substr("https://splits.io/".length);
        }
        this.loadFromSplitsIO(id);
    }

    public async uploadToSplitsIO(): Promise<Option<Window>> {
        const lss = this.readWith((t) => t.saveAsLss());

        try {
            const claimUri = await SplitsIO.uploadLss(lss);
            return window.open(claimUri);
        } catch (_) {
            toast.error("Failed to upload the splits.");
            return null;
        }
    }

    public exportSplits() {
        const [lss, name] = this.writeWith((t) => {
            const lss = t.saveAsLss();
            const name = t.getRun().extendedFileName(true);
            t.markAsUnmodified();
            return [lss, name];
        });
        try {
            FileUtil.exportFile(name + ".lss", lss);
        } catch (_) {
            toast.error("Failed to export the splits.");
        }
    }

    public saveSplits() {
        const lss = this.writeWith((t) => {
            const lss = t.saveAsLss();
            t.markAsUnmodified();
            return lss;
        });
        try {
            localStorage.setItem("splits", lss);
        } catch (_) {
            toast.error("Failed to save the splits.");
        }
    }

    public saveLayout() {
        try {
            const layout = this.state.layout.settingsAsJson();
            localStorage.setItem("layout", JSON.stringify(layout));
        } catch (_) {
            toast.error("Failed to save the layout.");
        }
    }

    public async importLayout() {
        const [file] = await FileUtil.openFileAsString();
        try {
            this.importLayoutFromString(file);
        } catch (err) {
            toast.error(err.message);
        }
    }

    public async importLayoutFromFile(file: File) {
        const [fileString] = await FileUtil.convertFileToString(file);
        this.importLayoutFromString(fileString);
    }

    public exportLayout() {
        const layout = this.state.layout.settingsAsJson();
        FileUtil.exportFile("layout.ls1l", JSON.stringify(layout, null, 4));
    }

    public loadDefaultSplits() {
        const run = this.getDefaultRun();
        this.setRun(run, () => { throw Error("Could not set default run."); });
    }

    public loadDefaultLayout() {
        const layout = Layout.defaultLayout();
        this.setLayout(layout);
    }

    public openRunEditor() {
        const run = this.readWith((t) => {
            if (t.currentPhase() === TimerPhase.NotRunning) {
                return t.getRun().clone();
            } else {
                return null;
            }
        });

        if (run !== null) {
            this.state.hotkeySystem.deactivate();
            const editor = expect(
                RunEditor.new(run),
                "The Run Editor should always be able to be opened.",
            );
            this.setState({
                menu: { kind: MenuKind.RunEditor, editor },
                sidebarOpen: false,
            });
        } else {
            toast.error("You can't edit your run while the timer is running.");
        }
    }

    public closeRunEditor(save: boolean) {
        if (this.state.menu.kind !== MenuKind.RunEditor) {
            panic("No Run Editor to close");
            return;
        }
        const runEditor = this.state.menu.editor;
        const run = runEditor.close();
        if (save) {
            assertNull(
                this.writeWith((t) => t.setRun(run)),
                "The Run Editor should always return a valid Run.",
            );
            this.setState({
                menu: { kind: MenuKind.Timer },
                sidebarOpen: false,
            });
        } else {
            run.dispose();
            this.setState({
                menu: { kind: MenuKind.Timer },
                sidebarOpen: false,
            });
        }
        this.state.layout.remount();
        this.state.hotkeySystem.activate();
    }

    public openLayoutEditor() {
        this.state.hotkeySystem.deactivate();

        const layout = this.state.layout.clone();
        const editor = expect(
            LayoutEditor.new(layout),
            "The Layout Editor should always be able to be opened.",
        );
        this.setState({
            menu: { kind: MenuKind.LayoutEditor, editor },
            sidebarOpen: false,
        });
    }

    public closeLayoutEditor(save: boolean) {
        if (this.state.menu.kind !== MenuKind.LayoutEditor) {
            panic("No Layout Editor to close.");
            return;
        }
        const layoutEditor = this.state.menu.editor;
        const layout = layoutEditor.close();
        if (save) {
            this.state.layout.dispose();
            this.setState({
                layout,
                menu: { kind: MenuKind.Timer },
                sidebarOpen: false,
            });
            layout.remount();
        } else {
            layout.dispose();
            this.setState({
                menu: { kind: MenuKind.Timer },
                sidebarOpen: false,
            });
            this.state.layout.remount();
        }
        this.state.hotkeySystem.activate();
    }

    public openSettingsEditor() {
        this.state.hotkeySystem.deactivate();
        this.setState({
            menu: {
                kind: MenuKind.SettingsEditor,
                config: this.state.hotkeySystem.config(),
            },
            sidebarOpen: false,
        });
    }

    public closeSettingsEditor(save: boolean) {
        const menu = this.state.menu;

        if (menu.kind !== MenuKind.SettingsEditor) {
            panic("No Settings Editor to close.");
            return;
        }

        if (save) {
            try {
                const hotkeys = menu.config.asJson();
                const settings = { hotkeys };
                localStorage.setItem("settings", JSON.stringify(settings));
            } catch (_) {
                toast.error("Failed to save the settings.");
            }
            this.state.hotkeySystem.setConfig(menu.config);
        } else {
            menu.config.dispose();
        }

        this.setState({
            menu: { kind: MenuKind.Timer },
            sidebarOpen: false,
        });

        this.state.layout.remount();
        this.state.hotkeySystem.activate();
    }

    public connectToServerOrDisconnect() {
        if (this.connection) {
            if (this.connection.readyState === WebSocket.OPEN) {
                this.connection.close();
                this.forceUpdate();
            }
            return;
        }
        const url = prompt("Specify the WebSocket URL:");
        if (!url) {
            return;
        }
        try {
            this.connection = new WebSocket(url);
        } catch (e) {
            toast.error(`Failed to connect: ${e}`);
            throw e;
        }
        this.forceUpdate();
        let wasConnected = false;
        this.connection.onopen = (_) => {
            wasConnected = true;
            toast.info("Connected to server");
            this.forceUpdate();
        };
        this.connection.onerror = (e) => {
            toast.error(e);
        };
        this.connection.onmessage = (e) => {
            // TODO Clone the Shared Timer. This assumes that `this` is always
            // mounted.
            if (typeof e.data === "string") {
                const [command, ...args] = e.data.split(" ");
                switch (command) {
                    case "start": this.start(); break;
                    case "split": this.split(); break;
                    case "splitorstart": this.splitOrStart(); break;
                    case "reset": this.reset(); break;
                    case "togglepause": this.togglePauseOrStart(); break;
                    case "undo": this.undoSplit(); break;
                    case "skip": this.skipSplit(); break;
                    case "initgametime": this.initializeGameTime(); break;
                    case "setgametime": this.setGameTime(args[0]); break;
                    case "setloadingtimes": this.setLoadingTimes(args[0]); break;
                    case "pausegametime": this.pauseGameTime(); break;
                    case "resumegametime": this.resumeGameTime(); break;
                }
            }
        };
        this.connection.onclose = (_) => {
            if (wasConnected) {
                toast.info("Closed connection to server");
            }
            this.connection = null;
            this.forceUpdate();
        };
    }

    private getDefaultRun() {
        const run = Run.new();
        run.setGameName("Game");
        run.setCategoryName("Category");
        run.pushSegment(Segment.new("Time"));
        return run;
    }

    private handleAutomaticResize() {
        if (!this.state.isDesktop) {
            const fullWidth = this.containerRef.current?.clientWidth;
            if (fullWidth) {
                this.setState({
                    layoutWidth: fullWidth,
                });
            }
        }
    }

    private onResize(width: number) {
        localStorage.setItem("layoutWidth", `${width}`);
        this.setState({
            layoutWidth: width,
        });
    }

    private mediaQueryChanged() {
        const isDesktop = this.isDesktopQuery.matches && !this.state.isBrowserSource;
        if (isDesktop) {
            const layoutWidth = +(localStorage.getItem("layoutWidth") || DEFAULT_LAYOUT_WIDTH);
            this.setState({
                isDesktop,
                layoutWidth,
                sidebarTransitionsEnabled: false,
            });
        } else {
            this.setState({
                isDesktop,
                sidebarTransitionsEnabled: false,
            });
        }
    }

    private importLayoutFromString(file: string) {
        let layout = null;
        try {
            layout = Layout.parseJson(JSON.parse(file));
        } catch (_) { /* Failed to load the layout */ }
        if (layout === null) {
            layout = Layout.parseOriginalLivesplitString(file);
        }
        if (layout !== null) {
            this.setLayout(layout);
            return;
        }
        throw Error("The layout could not be loaded. This may not be a valid LiveSplit or LiveSplit One Layout.");
    }

    private setLayout(layout: Layout) {
        this.state.layout.dispose();
        this.setState({
            layout,
        });
        layout.remount();
    }

    private setRun(run: Run, callback: () => void) {
        maybeDisposeAndThen(
            this.writeWith((t) => t.setRun(run)),
            callback,
        );
    }

    private importSplitsFromArrayBuffer(buffer: [ArrayBuffer, File]) {
        const [file] = buffer;
        const result = Run.parseArray(new Int8Array(file), "", false);
        if (result.parsedSuccessfully()) {
            const run = result.unwrap();
            this.setRun(run, () => { throw Error("Empty Splits are not supported."); });
        } else {
            throw Error("Couldn't parse the splits.");
        }
    }

    private async loadFromSplitsIO(id: string) {
        try {
            const run = await SplitsIO.downloadById(id);
            this.setRun(run, () => toast.error("The downloaded splits are not valid."));
        } catch (_) {
            toast.error("Failed to download the splits.");
        }
    }

    private onScroll(e: WheelEvent) {
        const delta = Math.sign(-e.deltaY);
        if (delta === 1) {
            this.state.layout.scrollUp();
        } else if (delta === -1) {
            this.state.layout.scrollDown();
        }
    }

    private onSetSidebarOpen(open: boolean) {
        if (!this.state.isDesktop) {
            this.setState({
                sidebarOpen: open,
                sidebarTransitionsEnabled: true,
            });
        }
    }

    private onRightClick(e: any) {
        this.onSetSidebarOpen(true);
        e.preventDefault();
    }

    private writeWith<T>(action: (timer: TimerRefMut) => T): T {
        return this.state.timer.writeWith(action);
    }

    private readWith<T>(action: (timer: TimerRef) => T): T {
        return this.state.timer.readWith(action);
    }

    private start() {
        this.writeWith((t) => t.start());
    }

    private split() {
        this.writeWith((t) => t.split());
    }

    private splitOrStart() {
        this.writeWith((t) => t.splitOrStart());
    }

    private reset() {
        this.writeWith((t) => t.reset(true));
    }

    private togglePauseOrStart() {
        this.writeWith((t) => t.togglePauseOrStart());
    }

    private undoSplit() {
        this.writeWith((t) => t.undoSplit());
    }

    private skipSplit() {
        this.writeWith((t) => t.skipSplit());
    }

    private initializeGameTime() {
        this.writeWith((t) => t.initializeGameTime());
    }

    private setGameTime(gameTime: string) {
        const time = TimeSpan.parse(gameTime);
        if (time !== null) {
            time.with((time) => {
                this.writeWith((t) => t.setGameTime(time));
            });
        }
    }

    private setLoadingTimes(loadingTimes: string) {
        const time = TimeSpan.parse(loadingTimes);
        if (time !== null) {
            time.with((time) => {
                this.writeWith((t) => t.setLoadingTimes(time));
            });
        }
    }

    private pauseGameTime() {
        this.writeWith((t) => t.pauseGameTime());
    }

    private resumeGameTime() {
        this.writeWith((t) => t.resumeGameTime());
    }
}
