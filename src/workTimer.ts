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

    public start(webview: Webview): void {
        throw new Error("Method not implemented.");

        let panel = webview.getPanel();

        this.interval = setInterval(() => {

            this.decrement();

            panel.webview.postMessage({ timer: this.convertDurationIntoDisplayedValue() });

            if(this.duration == 0) {

                if(this.interval) {

                    clearInterval(this.interval);

                    if (this.timer.getType() == 'pomodoro') {
                        this.laps--;
                    }

                    if (this.timer.getType() == 'long break') {
                        this.laps = 2;
                    }

                    this.timer = this.timer.getNextTimer(this.laps);

                    this.displayPanel();

                }

            }


            
        }, 1000);

    }

    private end(): void {
        // Clear interval
        // Décrémente le nombre de tours
        // Instancie le timer suivant
    }

    public stop(): void {
        throw new Error("Method not implemented.");
    }

    public decrement(): void {
        this.duration--;
    }

    public getValueToDisplay(): string {
        return this.convertDurationIntoDisplayedValue();
    }

    public getColor(): string {
        return this.color;
    }

    public getHexColorCode(): string {
        return '#' + this.color;
    }

    public getType(): string {
        return this.type;
    }

    public getHtmlContent(): string {

        return `<div id="timer">

            <div class="progress-bar"></div>

            <div class="container">
            
                <div id="container-button-type-timer">

                    <button type="button" class="btn-type-timer ${this.type === 'work' ? 'active' : null}"> Work </button>
                    <button type="button" class="btn-type-timer ${this.type === 'shortBreak' ? 'active' : null}"> Short Break </button>
                    <button type="button" class="btn-type-timer ${this.type === 'longBreak' ? 'active' : null}"> Long Break </button>

                </div>

                <div class="value">${this.getValueToDisplay()}</div>

                <div id="container-button-action">

                    <button type="button" class="btn-action"> Start </button>

                </div>
            
            </div>

        </div>`;

    }

};