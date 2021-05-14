import { Itimer } from "./itimer";
import * as vscode from 'vscode';

export abstract class Timer implements Itimer {

    private context: vscode.ExtensionContext;

    protected type: string = 'WorkTimer';

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }

    public getType(): string {
        return this.type;
    }

    start(): void {
        throw new Error("Method not implemented.");
    }
    
    stop(): void {
        throw new Error("Method not implemented.");
    }
    
}