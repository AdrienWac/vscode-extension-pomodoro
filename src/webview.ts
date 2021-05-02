'use strict';

import * as vscode from 'vscode';
import * as path from 'path';
import { View } from './view';
export class Webview {

    private context: vscode.ExtensionContext
    // private panel: vscode.WebviewPanel | undefined = undefined;
    private panel: View;


    constructor(context: vscode.ExtensionContext) {

        this.context = context;
        
        this.panel = new View(context);

        this.timer = new PomodoroTimerFabric();

        this.panel.displayPanel();

        // // Fermeture de la webView
        // this.panel.onDidDispose(() => {
        //     this.panel = undefined;
        // }, null, context.subscriptions);

    }

    public startTimer(): void {
        
    }

    

}