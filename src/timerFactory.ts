'use strict';

import { WorkTimer } from './workTimer';
import { Timer } from './timer';
import { Webview } from "./webview";

export class TimerFactory {

    private static instance: Timer;

    public static getInstance(webview: Webview): Timer {
        
        if (!TimerFactory.instance) {

            TimerFactory.instance = new WorkTimer(webview);

        }

        return TimerFactory.instance;

    }

    public static setInstance(timer: Timer): void {

        TimerFactory.instance = timer;

        Webview.mediatorTimer.notify('setInstance');

    }


}