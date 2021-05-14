import * as vscode from 'vscode';
import * as path from 'path';

export class StatusBar {

    private context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {

        this.context = context;

    }

    createTimer() {

        let item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        // item.text = String(this.timer.getValue());
        item.text = '00:00';
        this.context.subscriptions.push(item);
        item.show();

    }    

}