import * as React from "react";
import { LayoutStateJson } from "../livesplit-core";
import AutoRefresh from "../util/AutoRefresh";
import Layout from "./Layout";

export interface Props {
    getState: () => LayoutStateJson,
    allowResize: boolean,
    width: number,
    onResize(width: number): void,
}

export interface State {
    layoutState: LayoutStateJson,
}

export default class AutoRefreshLayout extends React.Component<Props, State> {
    private refreshes: number;

    constructor(props: Props) {
        super(props);

        this.refreshes = 0;
        this.state = {
            layoutState: this.props.getState(),
        };
    }

    public refreshLayout() {
        this.setState({
            layoutState: this.props.getState(),
        });
    }

    public render() {
        if (this.refreshes <= 0) {
            window.performance.mark('LayoutStart');
            this.refreshes = 50;
        }
        return (
            <AutoRefresh update={() => this.refreshLayout()} >
                <Layout
                    state={this.state.layoutState}
                    allowResize={this.props.allowResize}
                    width={this.props.width}
                    onResize={this.props.onResize}
                />
            </AutoRefresh>
        );
    }

    public componentDidUpdate() {
        this.refreshes -= 1;
        if (this.refreshes > 0) {
            this.refreshLayout();
        } else {
            window.performance.mark('LayoutEnd');
            window.performance.measure('Layout', 'LayoutStart', 'LayoutEnd');
            console.log(performance.getEntriesByType("measure")[0].duration);
            performance.clearMarks();
            performance.clearMeasures();
        }
    }
}
