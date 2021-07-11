import * as vscode from 'vscode';
import * as path from 'path';
import { Webview } from './webview';
import { Timer } from './timer';

export class View {

    public panel: vscode.WebviewPanel;

    public webview: Webview;

    constructor(webview: Webview) {

        this.webview = webview;

        this.panel = this.createPanel();

        this.handleMessageFromWebview();

        Webview.mediatorTimer.addEvent('state', () => {
            this.displayPanel();
        });

        Webview.mediatorTimer.addEvent('setDuration', () => {
            this.displayPanel();
        });

        Webview.mediatorTimer.addEvent('setInstance', () => {
            this.displayPanel();
        });

    }

    public createPanel(): vscode.WebviewPanel {

        return vscode.window.createWebviewPanel(
            'pomodoroTimer',
            'Pomodoro Timer',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.file(
                        path.join(this.webview.context.extensionPath, 'assets')
                    )
                ],
                // Maintien le contenu lorsque la webview n'est plus au premier plan
                retainContextWhenHidden: true
            }
        );

    }

    public displayPanel(): void {

        // Génération de l'uri pour le style css
        const pathToCssFile = vscode.Uri.file(
            path.join(this.webview.context.extensionPath, 'assets', 'style.css')
        );
        const cssFileUri = this.panel.webview.asWebviewUri(pathToCssFile);

        // Génération de l'uri pour le script js
        const pathToJsFile = vscode.Uri.file(
            path.join(this.webview.context.extensionPath, 'assets', 'main.js'),
        );
        const jsFileUri = this.panel.webview.asWebviewUri(pathToJsFile);

        // Affichage du contenu de la webView
        this.panel.webview.html = this.getHtmlContent(cssFileUri, jsFileUri, this.webview.timer);

        this.panel.reveal();

    }

    private getHtmlContent(cssFileUri: vscode.Uri | undefined, jsFileUri: vscode.Uri | undefined, timer: Timer): string {
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

                ${timer.generateHtml()}

                <p id="counter">${timer.getDuration()}</p>

                <button class="btn-command" data-command="run">Start</button>
                <button class="btn-command" data-command="stop">Stop</button>


                <script src="${jsFileUri}"></script>

            </body>

        </html>`;
    }

    public handleMessageFromWebview(): void {

        // Récupération des messages de la webView
        this.panel.webview.onDidReceiveMessage(
            
            message => {

                switch (message.command) {
                    
                    case 'run':
                        this.webview.timer.run();
                        break;

                    case 'stop':
                        this.webview.timer.stop();
                        break;

                }

            },
            undefined,
            this.webview.context.subscriptions
        );
    }

}