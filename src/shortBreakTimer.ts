'use strict';

import { Webview } from "./webview";
import { Timer } from './timer';

export class ShortBreakTimer extends Timer {


    constructor(webview: Webview) {

        super(webview);

        this.type = 'shortBreak';

        this.getConfiguration('pomodoroTimer');

    }

}