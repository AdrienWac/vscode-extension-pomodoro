import * as vscode from 'vscode';
import { Timer } from "./Timer";
import * as path from 'path';
import { StatusBar } from './statusBar';
import { Webview } from './webview';

export class StatusBarTimer extends StatusBar{

    private itemCommand: vscode.StatusBarItem;

    private itemDuration: vscode.StatusBarItem;
    
    constructor(webview: Webview) {

        super(webview);

        this.itemCommand = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 200);

        this.itemDuration = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);

        Webview.mediatorTimer.addEvent('state', () => {
            this.itemStack.push(this.createCommandItem());
            this.display();
        });

        Webview.mediatorTimer.addEvent('setDuration', () => {
            this.itemStack.push(this.createDurationItem());
            this.display();
        });

        Webview.mediatorTimer.addEvent('setInstance', () => {
            this.create();
            this.display();
        });

    }

    /**
     * Création de l'ensemble des items qui constituent la status bar du timer
     */
    public create(): void {

        this.itemStack.push(this.createDurationItem(), this.createCommandItem());

    }

    /**
     * Création de l'item qui affiche le compteur
     * @returns 
     */
    private createDurationItem(): vscode.StatusBarItem {

        this.itemDuration.text = String(this.webview.timer.getDuration());

        return this.itemDuration;

    }
    
    /**
     * Création du bouton de commande du timer dans la status bar
     */
    private createCommandItem(): vscode.StatusBarItem {

        this.itemCommand.text = this.webview.timer.getState() === 'run' ? '$(debug-stop)' : '$(run)' ;
        
        this.itemCommand.command = this.webview.timer.getState() === 'run' ? 'vsvscode-extension-pomodoro.stop' : 'vscode-extension-pomodoro.run';

        this.itemCommand.color = this.webview.timer.getColor();

        return this.itemCommand;

    }

}