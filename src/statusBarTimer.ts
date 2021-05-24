import * as vscode from 'vscode';
import { Timer } from "./Timer";
import * as path from 'path';
import { IStatusBar } from './iStatusBar';

export class StatusBarTimer implements IStatusBar{

    private timer: Timer;

    constructor(timer: Timer) {

        this.timer = timer;
        
    }

    public display(): void {

        this.displayDuration();
        
        this.displayCommandButton();

    }

    private displayDuration() {

        let item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);

        item.text = String(this.timer.getDuration());

        // this.timer.context.subscriptions.push(item);
        
        item.show();

    }
    
    /**
     * Création du bouton de commande du timer dans la status bar
     */
    private displayCommandButton() {

        let item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 200);

        item.text = this.timer.getState() === 'run' ? '$(run)' : '$(debug-stop)';
        
        item.command = this.timer.getState();

        item.color = this.timer.getColor();

        // this.timer.context.subscriptions.push(item);

        item.show();

    }

}