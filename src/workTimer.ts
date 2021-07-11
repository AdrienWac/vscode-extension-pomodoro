'use strict';

import { Webview } from "./webview";
import { Timer } from './timer';
import { ShortBreakTimer } from "./shortBreakTimer";
import { LongBreakTimer } from "./longBreakTimer";
import { parentPort } from "node:worker_threads";

export class WorkTimer extends Timer {

    public informationMessage: { [key: string]: string; } = {
        'run': '🔥 Work hard! Now! 🔥',
        'stop': '🤨 What are you doing ?! This is not the time to take a break 🖕',
        'end': '👏 Well done! Your work time is over. 👏'
    };

    constructor(webview: Webview) {
        
        super(webview);

        this.type = 'work';

        this.setAttributesFromConfiguration(this.type);

        super.informationMessage = this.informationMessage;

    }

    /**
     * @returns Instance du Timer suivant un work timer
     */
    public nextTimerInstance(): Timer {

        if (this.webview.loopTimer === 0) {
            return new LongBreakTimer(this.webview);
        }

        return new ShortBreakTimer(this.webview);

    }

    public run(): void {

        super.run();

        this.webview.loopTimer = this.webview.loopTimer - 1;
        
    }

}