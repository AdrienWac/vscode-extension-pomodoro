'use strict';

import * as vscode from 'vscode';
import * as path from 'path';

export class View {

    private context: vscode.ExtensionContext;

    public panel: vscode.WebviewPanel;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this.panel = this.createPanel();
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
        this.panel.webview.html = this.getHtmlContent(cssFileUri, jsFileUri);

    }


    getHtmlContent(cssFileUri: vscode.Uri | undefined, jsFileUri: vscode.Uri | undefined): string
    {
        return `<!DOCTYPE html>

        <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${this.panel.webview.cspSource} https:; style-src ${this.panel.webview.cspSource}; script-src ${this.panel.webview.cspSource};">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" type="text/css" href="${cssFileUri}">
                <title>Cat Coding</title>
            </head>

            <body>

                <h1>Pomodoro ouioui</h1>

                <p id="counter">00:00</p>

                <button class="btn-command" data-command="start">Start</button>
                <button class="btn-command" data-command="stop">Stop</button>


                <script src="${jsFileUri}"></script>

            </body>

        </html>`;
    }


}