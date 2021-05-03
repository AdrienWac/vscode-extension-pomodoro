export interface Timer {

    duration: number;

    color: string;

    start(): void;

    stop(): void;

    getValueToDisplay(): string;

    getHtmlContent(): string;

    getHexColorCode(): string;

    getType(): string;

}