import * as vscode from 'vscode';
import { Timer } from "./timer";
import { Webview } from './webview';

export class WorkTimer implements Timer {

    duration: number;

    color: string;

    constructor() {

        const config = vscode.workspace.getConfiguration('pomodoroTimer');

        this.duration = config.work.duration;
        
        this.color = config.work.color;

    }

    private convertDurationIntoDisplayedValue(): string {
        return this.duration + ':' + '00';
    }

    public start(): void {
        throw new Error("Method not implemented.");
    }

    public stop(): void {
        throw new Error("Method not implemented.");
    }

    public getValueToDisplay(): string {
        return this.convertDurationIntoDisplayedValue();
    }

}