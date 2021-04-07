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
	let disposable = vscode.commands.registerCommand('vscode-extension-pomodoro.open', () => {
		
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

		// Fermeture de la webView
		panel.onDidDispose(closeWebView, null, context.subscriptions);

	});

	context.subscriptions.push(disposable);
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

			const counter = document.getElementById('counter');
			let count = 0;

			const interval = setInterval(() => {
				counter.textContent = count++;
				if (count > 10) {
					clearInterval(interval);
				}
			}, 100);

			console.log(count);
			

			

		</script>

	</body>
	</html>`;
}

