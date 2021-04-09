import { Timer } from './timer';
import { LongBreakTimer } from "./longBreakTimer";
import { ShortBreakTimer } from "./shortBreakTimer";

export class PomodoroTimer extends Timer {


    constructor() {
        super();
        this.value = 5;
        this.minute = 25;
        this.type = 'pomodoro';
        this.color = 'red';
        this.valueToDisplay = '25:00';
        
    }

    public end(): void {
        console.log('end Pmodoro');
    }

    public getNextTimer(laps: number): any {
        console.log('this laps : ', laps);
        
        if (laps == 0) {
            return new LongBreakTimer();
        }

        if (laps > 0) {
            return new ShortBreakTimer();
        }

    }

}