import { Option } from "./OptionUtil";

export default class FileUtil {
    public static setFileInputElement(element: HTMLInputElement | null) {
        this.fileInputElement = element;
    }

    public static setFileOutputElement(element: HTMLAnchorElement | null) {
        this.fileOutputElement = element;
    }

    public static async convertFileToArrayBuffer(file: File): Promise<[ArrayBuffer, File]> {
        return new Promise((resolve: (_: [ArrayBuffer, File]) => void) => {
            const reader = new FileReader();
            reader.onload = () => {
                const contents = reader.result as Option<ArrayBuffer>;
                if (contents != null) {
                    resolve([contents, file]);
                }
            };
            reader.readAsArrayBuffer(file);
        });
    }

    public static async openFileAsArrayBuffer(): Promise<[ArrayBuffer, File]> {
        const file = await this.openFile();
        return this.convertFileToArrayBuffer(file);
    }

    public static async convertFileToString(file: File): Promise<[string, File]> {
        return new Promise((resolve: (_: [string, File]) => void) => {
            const reader = new FileReader();
            reader.onload = () => {
                const contents = reader.result as Option<string>;
                if (contents != null) {
                    resolve([contents, file]);
                }
            };
            reader.readAsText(file);
        });
    }

    public static async openFileAsString(): Promise<[string, File]> {
        const file = await this.openFile();
        return this.convertFileToString(file);
    }

    public static exportFile(filename: string, data: any) {
        if (!this.fileOutputElement) {
            throw Error("File input element cannot be null!");
        }

        const url = URL.createObjectURL(new Blob([data], { type: "application/octet-stream" }));
        try {
            this.fileOutputElement.setAttribute("href", url);
            this.fileOutputElement.setAttribute("download", filename);

            this.fileOutputElement.style.display = "none";
            this.fileOutputElement.click();
        } finally {
            URL.revokeObjectURL(url);
        }
    }

    private static fileInputElement: HTMLInputElement | null = null;
    private static fileOutputElement: HTMLAnchorElement | null = null;

    private static openFile(): Promise<File> {
        return new Promise((resolve, reject) => {
            if (!this.fileInputElement) {
                throw Error("File input element cannot be null!");
            }

            this.fileInputElement.setAttribute("type", "file");
            this.fileInputElement.onchange = () => {
                if (!this.fileInputElement) {
                    throw Error("File input element cannot be null!");
                }

                const file: Option<File> = this.fileInputElement.files?.[0];
                this.fileInputElement.onchange = null;
                if (file === undefined) {
                    reject();
                    return;
                }
                resolve(file);
            };
            this.fileInputElement.click();
        });
    }
}
