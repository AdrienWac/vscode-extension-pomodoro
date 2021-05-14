import { Webview } from "./webview";

export interface Timer {

    duration: number;

    color: string;

    start(webview: Webview): void;

    stop(): void;

    getValueToDisplay(): string;

    getHtmlContent(): string;

    getHexColorCode(): string;

    getType(): string;

}