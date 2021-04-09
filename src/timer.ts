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

    static getInstance() {
        
        return new PomodoroTimer();

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

}