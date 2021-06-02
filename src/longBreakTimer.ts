'use strict';

import { Webview } from "./webview";
import { Timer } from './timer';
import { WorkTimer } from "./workTimer";

export class LongBreakTimer extends Timer {

    public informationMessage: { [key: string]: string; } = {
        'run': '💤 Take the time! Make a nap! 💤',
        'stop': '👀 Are you sleepwalking ? 👀',
        'end': '⏰ Wake up Rondoudou! ⏰'
    };

    constructor(webview: Webview) {

        super(webview);

        this.type = 'longBreak';

        this.setAttributesFromConfiguration(this.type);

    }

    /**
     * @returns Instance du Timer suivant un long break timer
     */
    private nextTimerInstance(): Timer {

        return new WorkTimer(this.webview);

    }

}