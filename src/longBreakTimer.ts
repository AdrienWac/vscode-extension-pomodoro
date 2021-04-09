import { Timer } from './timer';
import { PomodoroTimer } from "./pomodoroTimer";

export class LongBreakTimer extends Timer {

    constructor() {
        super();
        this.value = 6;
        this.minute = 15;
        this.type = 'long break';
        this.color = 'grey';
        this.valueToDisplay = '15:00';
    }

    public end(): void {
        console.log('end long break');
    }

    public getNextTimer(laps: number): any {

        return new PomodoroTimer();

    }

}