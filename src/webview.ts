'use strict';

import * as vscode from 'vscode';
import * as path from 'path';
import { Timer } from './timer';
import { PomodoroTimer } from './pomodoroTimer';
import { ShortBreakTimer } from './shortBreakTimer';
import { LongBreakTimer } from './longBreakTimer';

export class Webview {

    private context: vscode.ExtensionContext
    private panel: vscode.WebviewPanel | undefined = undefined;
    private interval: NodeJS.Timeout | undefined = undefined;
    private timer;
    private laps: number = 2;

    constructor(context: vscode.ExtensionContext) {

        this.context = context;

        this.timer = new  PomodoroTimer();

        if (!this.panel) {
            this.panel = this.createPanel();
        } 

        this.panel.reveal();

        // Fermeture de la webView
        this.panel.onDidDispose(() => {
            this.panel = undefined;
        }, null, context.subscriptions);

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

    displayPanel(): void {

        if(!this.panel) {
            return;
        }

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

    getHtmlContent(cssFileUri: vscode.Uri | undefined, jsFileUri: vscode.Uri | undefined, webview: vscode.Webview | undefined): string {
        
        let cspSource = webview == undefined ? '' : webview.cspSource;

        return `<!DOCTYPE html>

        <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${cspSource} https:; style-src ${cspSource}; script-src ${cspSource};">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" type="text/css" href="${cssFileUri}">
                <title>Cat Coding</title>
            </head>

            <body>

                <h1>Pomodoro ouioui</h1>

                <p id="counter">${this.timer.getValue()}</p>

                <button class="btn-command" data-command="start">Start</button>
                <button class="btn-command" data-command="stop">Stop</button>


                <script src="${jsFileUri}"></script>

            </body>

        </html>`;
    }

    attachWebViewMessage(): void {

        if(!this.panel) {
            return;
        }

        // Récupération des messages de la webView
        this.panel.webview.onDidReceiveMessage(
            message => {

                switch (message.command) {
                    case 'alert':
                        vscode.window.showInformationMessage(message.text);
                        break;

                    case 'start':
                        vscode.window.showInformationMessage(message.text);
                        break;

                    case 'stop':
                        vscode.window.showInformationMessage(message.text);
                        break;
                }

            },
            undefined,
            this.context.subscriptions
        )

    }

    startTimer(): void {

        this.interval = setInterval(() => {

            this.timer.decrement();

            if (this.panel) {
                this.panel.webview.postMessage({ timer: this.timer.getValue() });
            }

            if(this.timer.getValue() == 0) {

                if(this.interval) {

                    clearInterval(this.interval);

                    if (this.timer.getType() == 'pomodoro') {
                        this.laps--;
                    }

                    if (this.timer.getType() == 'long break') {
                        this.laps = 2;
                    }

                    this.timer = this.timer.getNextTimer(this.laps);

                    console.log('End timer nouveau type : ', this.timer.getType());

                    this.displayPanel();
                    
                }

            }

        }, 1000);

    }

}