import * as vscode from 'vscode';
import { Timer } from "./timer";
import { Webview } from './webview';

export class WorkTimer implements Timer {

    duration: number;

    color: string;

    type: string = 'work';

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

    public getColor(): string {
        return this.color;
    }

    public getType(): string {
        return this.type;
    }

    public getHtmlContent(): string {

        return `<div id="timer">

            <div class="progress-bar"></div>

            <div class="container">
            
                <div id="container-button-type-timer">

                    <button type="button" class="btn-type-timer"> Work </button>
                    <button type="button" class="btn-type-timer"> Short Break </button>
                    <button type="button" class="btn-type-timer"> Long Break </button>

                </div>

                <div class="value">${this.getValueToDisplay()}</div>

                <div id="container-button-action">

                    <button type="button" class="btn-action"> Start </button>

                </div>
            
            </div>

        </div>`;
    }

}