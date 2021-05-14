'use strict';

import * as vscode from 'vscode';
import * as path from 'path';
import { Timer } from './timer';

export class Webview {

    private context: vscode.ExtensionContext
    private panel: vscode.WebviewPanel;
    private timer: Timer;
    // private statusBarTimer: vscode.StatusBarItem;

    constructor(context: vscode.ExtensionContext, timer: Timer) {

        this.context = context;
        this.timer = timer;
        this.panel = this.createPanel();

        // if (!this.panel) {
        //     this.panel = this.createPanel();
        // }

        // this.attachWebViewMessage();
        // this.displayPanel();
        // this.panel.reveal();

        // this.statusBarTimer = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        // this.displaySatusBar();
        // this.context.subscriptions.push(this.statusBarTimer);
        // this.statusBarTimer.show();

        // this.statusBarActionTimer = new ItemTimer(this.context);
        // this.statusBarActionTimer.display();

        // // Fermeture de la webView
        // this.panel.onDidDispose(() => {
        //     this.panel = undefined;
        // }, null, context.subscriptions);

    }

    createPanel(): vscode.WebviewPanel {
        
        return vscode.window.createWebviewPanel(
            'pomodoroTimer',
            'Pomodoro Timer',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.file(
                        path.join(this.context.extensionPath, 'assets')
                    )
                ],
                // Maintien le contenu lorsque la webview n'est plus au premier plan
                retainContextWhenHidden: true
            }
        );

    }

    // displaySatusBar(): void
    // {
    //     this.statusBarTimer.text = String(this.timer.getValue());
    // }

    displayPanel(): void {

        // Génération de l'uri pour le style css
        const pathToCssFile = vscode.Uri.file(
            path.join(this.context.extensionPath, 'assets', 'css', 'main.css')
        );
        const cssFileUri = this.panel.webview.asWebviewUri(pathToCssFile);

        // Génération de l'uri pour le script js
        const pathToJsFile = vscode.Uri.file(
            path.join(this.context.extensionPath, 'assets', 'script', 'main.js')
        );
        const jsFileUri = this.panel.webview.asWebviewUri(pathToJsFile);

        // Affichage du contenu de la webView
        this.panel.webview.html = this.getHtmlContent(cssFileUri, jsFileUri, this.panel.webview);

    }

    getPanel(): vscode.WebviewPanel {
        return this.panel;
    }

    getHtmlContent(cssFileUri: vscode.Uri | undefined, jsFileUri: vscode.Uri | undefined, webview: vscode.Webview | undefined): string {
        
        let cspSource = webview == undefined ? '' : webview.cspSource;

        return `<!DOCTYPE html>

        <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" type="text/css" href="${cssFileUri}">
                <title>Cat Coding</title>
            </head>

            <body style="background-color: ${this.timer.getHexColorCode()}">

                <h1>Pomodoro ouioui</h1>

                ${this.timer.getHtmlContent()}

                <script src="${jsFileUri}"></script>

            </body>

        </html>`;
    }

    // attachWebViewMessage(): void {

    //     if(!this.panel) {
    //         return;
    //     }

    //     // Récupération des messages de la webView
    //     this.panel.webview.onDidReceiveMessage(
    //         message => {

    //             switch (message.command) {
    //                 case 'alert':
    //                     vscode.window.showInformationMessage(message.text);
    //                     break;

    //                 case 'start':
    //                     vscode.window.showInformationMessage(message.text);
    //                     this.startTimer();
    //                     break;

    //                 case 'stop':
    //                     vscode.window.showInformationMessage(message.text);
    //                     this.stopTimer();
    //                     break;
    //             }

    //         },
    //         undefined,
    //         this.context.subscriptions
    //     )

    // }

    // startTimer(): void {

    //     this.interval = setInterval(() => {

    //         this.timer.decrement();

    //         if (this.panel) {
    //             this.panel.webview.postMessage({ timer: this.timer.getValue() });
    //         }

    //         if(this.timer.getValue() == 0) {

    //             if(this.interval) {

    //                 clearInterval(this.interval);

    //                 if (this.timer.getType() == 'pomodoro') {
    //                     this.laps--;
    //                 }

    //                 if (this.timer.getType() == 'long break') {
    //                     this.laps = 2;
    //                 }

    //                 this.timer = this.timer.getNextTimer(this.laps);

    //                 this.displayPanel();

    //             }

    //         }

    //         this.displaySatusBar();

    //     }, 1000);

    // }

    // stopTimer(): void {

    //     if(!this.interval) {
    //         return;
    //     }

    //     clearInterval(this.interval);

    // }

}