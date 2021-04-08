'use strict';

import * as vscode from 'vscode';
import * as path from 'path';

export class Webview {

    context: vscode.ExtensionContext
    panel: vscode.WebviewPanel | undefined = undefined;

    constructor(context: vscode.ExtensionContext) {

        this.context = context;

        // Si webView déjà existante, on l'affiche à l'utilisateur
        if (this.panel) {
            this.panel.reveal();
        } else {
            // Sinon création de la webView
            this.panel = vscode.window.createWebviewPanel(
                'pomodoroTimer',
                'Pomodoro Timer',
                vscode.ViewColumn.One,
                {
                    enableScripts: true,
                    localResourceRoots: [
                        vscode.Uri.file(
                            path.join(context.extensionPath, 'assets')
                        )
                    ],
                    // Maintien le contenu lorsque la webview n'est plus au premier plan
                    retainContextWhenHidden: true
                }
            );
            console.log(this.panel);
            
        }

        // Génération de l'uri pour le style css
        const pathToCssFile = vscode.Uri.file(
            path.join(context.extensionPath, 'assets', 'css', 'main.css')
        );
        const cssFileUri = this.panel.webview.asWebviewUri(pathToCssFile);

        // Génération de l'uri pour le script js
        const pathToJsFile = vscode.Uri.file(
            path.join(context.extensionPath, 'assets', 'script', 'main.js')
        );
        const jsFileUri = this.panel.webview.asWebviewUri(pathToJsFile);

        // Affichage du contenu de la webView
        this.panel.webview.html = this.getHtmlContent(cssFileUri, jsFileUri, this.panel.webview);

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
            context.subscriptions
        )

        // Fermeture de la webView
        this.panel.onDidDispose(() => {
            this.panel = undefined;
        }, null, context.subscriptions);

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

                <h1>Pomodoro Timer</h1>

                <p id="counter">0</p>

                <button class="btn-command" data-command="start">Start</button>
                <button class="btn-command" data-command="stop">Stop</button>


                <script src="${jsFileUri}"></script>

            </body>

        </html>`;
    }



}