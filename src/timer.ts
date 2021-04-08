export class Timer {

    private static instance: Timer;
    
    private value: number = 25;
    private repetition: number = 0;

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

    public setRepetition(_repetition: number): void {
        this.repetition = _repetition;
    }

    public getRepetition(): number {
        return this.repetition;
    }

    public decrement(): void {
        this.value--;
    }

}