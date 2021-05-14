'use strict';

import * as vscode from 'vscode';
import { WorkTimer } from './workTimer';
import { Timer } from './timer';

export class TimerFactory {

    private static instance: Timer;

    public static getInstance(context: vscode.ExtensionContext): Timer {
        
        if (!TimerFactory.instance) {

            TimerFactory.instance = new WorkTimer(context);
            
        }

        return TimerFactory.instance;

    }

    public static setInstance(timer: Timer): void {

        TimerFactory.instance = timer;

    }


}