// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { worker } from 'node:cluster';
import * as vscode from 'vscode';
import * as path from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let panel: vscode.WebviewPanel | undefined = undefined;

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-extension-pomodoro" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let commandOpen = vscode.commands.registerCommand('vscode-extension-pomodoro.open', () => {
		
		// Si webView déjà existante, on l'affiche à l'utilisateur
		if (panel) {
			panel.reveal();
		} else {
			// Sinon création de la webView
			panel = createWebView();
		}

		// Génération de l'uri pour le style css
		const pathToCssFile = vscode.Uri.file(
			path.join(context.extensionPath, 'assets', 'css','main.css')
		);
		const cssFileUri = panel.webview.asWebviewUri(pathToCssFile);

		// Affichage du contenu de la webView
		panel.webview.html = getHtmlContent(cssFileUri);

		// Récupération des messages de la webView
		panel.webview.onDidReceiveMessage(
			message => {

				switch (message.command) {
					case 'alert':
						vscode.window.showInformationMessage(message.text);
						break;
				}

			},
			undefined,
			context.subscriptions
		)

		// Fermeture de la webView
		panel.onDidDispose(closeWebView, null, context.subscriptions);

	});


	let commandStart = vscode.commands.registerCommand('vscode-extension-pomodoro.start', () => {

		if(!panel) {
			return;
		}

		// Envoi d'un message à la webView
		panel.webview.postMessage({ command: 'start' });

	});

	let commandStop = vscode.commands.registerCommand('vscode-extension-pomodoro.stop', () => {

		if (!panel) {
			return;
		}

		// Envoi d'un message à la webView
		panel.webview.postMessage({ command: 'stop' });

	});

	context.subscriptions.push(commandOpen);
	context.subscriptions.push(commandStart);
	context.subscriptions.push(commandStop);

}

// this method is called when your extension is deactivated
export function deactivate() {}

/**
 * Création d'une web view
 * @returns 
 */
function createWebView(): vscode.WebviewPanel
{
	
	return vscode.window.createWebviewPanel(
		'pomodoroTimer',
		'Pomodoro Timer',
		vscode.ViewColumn.One,
		{
			enableScripts: true
		}
	);

}

function closeWebView(): void
{
	console.log('close web view');
	
}

function getHtmlContent(cssFileUri: vscode.Uri): string
{
	return `<!DOCTYPE html>

	<html lang="en">

		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<link rel="stylesheet" type="text/css" href="${cssFileUri}">
			<title>Cat Coding</title>
		</head>

		<body>

			<h1>Pomodoro Timer</h1>

			<p id="counter">0</p>

			<script>
				
				(function () {

					const vscode = acquireVsCodeApi();

					var counter = document.getElementById('counter');
					var count = 0;
					var interval = undefined;


					// Récupération des messages de l'extension
					window.addEventListener('message', event => {

						let message = event.data;

						switch (message.command) {

							case 'start':

								interval = setInterval(() => {

									counter.textContent = count++;
									if (count%10 === 0) {
										console.log(vscode);
										vscode.postMessage({
											command: 'alert',
											text: 'Dont forget to stop the counter. His current value is ' + count
										})

									}

								}, 100);

								break;

							case 'stop':

								if (interval) {
									clearInterval(interval);
								}

								break;

						}

					});

				}())
				

			</script>

		</body>

	</html>`;
}

