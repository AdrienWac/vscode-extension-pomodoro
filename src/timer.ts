'use strict';

import { Itimer } from './itimer';
import { LongBreakTimer } from './longBreakTimer';
import { ShortBreakTimer } from './shortBreakTimer';
import { WorkTimer } from './workTimer';

export abstract class Timer implements Itimer {

    private static instance: Timer;

    private static type: string = 'WorkTimer';

    public static getInstance(): Timer {
        
        if (!Timer.instance) {

            // En fonction du type on construit un timer
            switch (Timer.getType()) {

                case 'WorkTimer':
                    Timer.instance = new WorkTimer();
                    break;

                case 'ShortBreakTimer':
                    Timer.instance = new ShortBreakTimer();
                    break;
                
                case 'LongBreakTimer': 
                    Timer.instance = new LongBreakTimer();
                    break;
            
                default:
                    break;

            }
            
        }

        return Timer.instance;

    }

    public static getType(): string {
        return this.type;
    }

    start(): void {
        throw new Error('Method not implemented.');
    }

    stop(): void {
        throw new Error('Method not implemented.');
    }



}