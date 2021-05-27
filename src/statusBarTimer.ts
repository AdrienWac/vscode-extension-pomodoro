import * as vscode from 'vscode';
import { Timer } from "./Timer";
import * as path from 'path';
import { StatusBar } from './statusBar';
import { Webview } from './webview';

export class StatusBarTimer extends StatusBar{

    
    constructor(webview: Webview) {

        super(webview);

    }

    /**
     * Création de l'ensemble des items qui constituent la status bar du timer
     */
    public create(): void {

        this.itemStack.push(this.createDurationItem());

        this.itemStack.push(this.createCommandItem());

    }

    /**
     * Création de l'item qui affiche le compteur
     * @returns 
     */
    private createDurationItem(): vscode.StatusBarItem {

        let item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);

        item.text = String(this.webview.timer.getDuration());

        return item;

    }
    
    /**
     * Création du bouton de commande du timer dans la status bar
     */
    private createCommandItem(): vscode.StatusBarItem {

        let item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 200);

        item.text = this.webview.timer.getState() === 'run' ? '$(debug-stop)' : '$(run)' ;
        
        item.command = this.webview.timer.getState();

        item.color = this.webview.timer.getColor();

        return item;


    }

}