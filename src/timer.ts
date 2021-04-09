import { LongBreakTimer } from "./longBreakTimer";
import { PomodoroTimer } from "./pomodoroTimer";
import { ShortBreakTimer } from "./shortBreakTimer";

export class Timer {

    private static instance: Timer;
    
    protected value: number = 25;
    
    private seconds: number = 0;
    protected minute: number = 25;

    protected type: string = 'pomodoro';
    protected color: string = 'red';

    protected valueToDisplay: string = '25:00';

    static getInstance(): Timer {
        
        if (!this.instance) {
            this.instance = new this();
        }

        return this.instance;

    }

    public setValue(_value: number): void {
        this.value = _value;
    }

    public getValue(): number {
        return this.value;
    }

    public getDisplayValue(): string {
        return '25:00';
    }


    public decrement(): void {
        this.value--;
    }

    private convertSecondToDisplayValue(): string {
        return '00:00';
    }

    public getType(): string {
        return this.type;
    }

    // public getNewTimer(): any {

    //     if (this.type == 'pomodoro' && this.laps == 0) {
    //         return new LongBreakTimer();
    //     }

    //     if (this.type == 'pomodoro' && this.laps > 0) {
    //         return new ShortBreakTimer();
    //     }

    //     if (['short break', 'long break'].includes(this.type)) {
    //         return new PomodoroTimer();
    //     }

    // }

}