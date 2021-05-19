import * as vscode from 'vscode';
import * as path from 'path';
import { Webview } from './webview';

export class StatusBar {

    private webview: Webview;

    constructor(webview: Webview) {

        this.webview = webview;

    }

    createTimer() {

        let item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);

        item.text = String(this.webview.timer.getDuration());

        this.webview.context.subscriptions.push(item);
        
        item.show();

    }    

}