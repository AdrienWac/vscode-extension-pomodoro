export class Timer {

    private static instance: Timer;
    
    private value: number = 0;

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

}