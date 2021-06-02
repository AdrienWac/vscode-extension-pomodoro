'use strict';

import { Webview } from "./webview";
import { Timer } from './timer';
import { WorkTimer } from "./workTimer";

export class ShortBreakTimer extends Timer {

    public informationMessage: { [key: string]: string; } = {
        'run': '☕ Coffee or toilet? Make a choice 🚽',
        'stop': '👀 You\'re trying to extend your break ?! Smart guy 👀',
        'end': '☕ So was it coffee or toilet ? Or coffee in the toilet ?! ☕'
    };

    constructor(webview: Webview) {

        super(webview);

        this.type = 'shortBreak';
        
        this.setAttributesFromConfiguration(this.type);

    }

    /**
     * @returns Instance du Timer suivant un short break timer
     */
    private nextTimerInstance(): Timer {

        return new WorkTimer(this.webview);

    }

}