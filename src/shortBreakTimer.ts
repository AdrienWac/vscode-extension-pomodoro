import { Timer } from './timer';
import { PomodoroTimer } from "./pomodoroTimer";

export class ShortBreakTimer extends Timer {

    constructor() {
        super();
        this.value = 4;
        this.minute = 5;
        this.type = 'short break';
        this.color = 'blue';
        this.valueToDisplay = '05:00';
    }

    public end(): void {
        console.log('end short break');
    }

    public getNextTimer(laps: number): any {

        return new PomodoroTimer();

    }

}