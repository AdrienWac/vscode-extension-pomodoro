import { Itimer } from "./itimer";
import * as vscode from 'vscode';

export abstract class Timer implements Itimer {

    private context: vscode.ExtensionContext;

    protected type: string = 'WorkTimer';

    protected duration: number|undefined;

    protected color: string|undefined;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }

    public getType(): string {
        return this.type;
    }

    protected getConfiguration(nameConfiguration: string): void
    {

        const config = vscode.workspace.getConfiguration('pomodoroTimer');

        this.duration = config[this.type].duration;

        this.color = config[this.type].color;

    }

    public start(): void {
        throw new Error("Method not implemented.");
    }
    
    public stop(): void {
        throw new Error("Method not implemented.");
    }
    
}