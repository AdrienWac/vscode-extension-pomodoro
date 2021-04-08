// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { worker } from 'node:cluster';
import * as vscode from 'vscode';
import * as path from 'path';
import { Webview } from './webview';



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let panel: vscode.WebviewPanel | undefined = undefined;

	let webview: Webview | undefined = undefined;

	vscode.window.registerWebviewPanelSerializer(
		'vscode-extension-pomodoro',
		new PomodoroSerializer()
	);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let commandOpen = vscode.commands.registerCommand('vscode-extension-pomodoro.open', () => {
		
		webview = new Webview(context);

	});


	let commandStart = vscode.commands.registerCommand('vscode-extension-pomodoro.start', () => {

		if(webview) {
			webview.startTimer();
		}

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


class PomodoroSerializer implements vscode.WebviewPanelSerializer
{
	async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
		
		console.log(`Got state: ${state}`);


	}

}

