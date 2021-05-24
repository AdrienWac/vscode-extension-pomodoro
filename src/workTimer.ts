'use strict';

import { Webview } from "./webview";
import { Timer } from './timer';

export class WorkTimer extends Timer {

    constructor(webview: Webview) {
        
        super(webview);

        this.type = 'work';

        this.getConfiguration('pomodoroTimer');
        
    }


}