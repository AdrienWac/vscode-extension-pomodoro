'use strict';

import { Webview } from "./webview";
import { Timer } from './timer';

export class LongBreakTimer extends Timer {

    constructor(webview: Webview) {

        super(webview);

        this.type = 'longBreak';

        this.getConfiguration('pomodoroTimer');

    }

}