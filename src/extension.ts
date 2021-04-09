// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { worker } from 'node:cluster';
import * as vscode from 'vscode';
import * as path from 'path';
import { Webview } from './webview';



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let webview: Webview | undefined = undefined;

	let commandOpen = vscode.commands.registerCommand('vscode-extension-pomodoro.open', () => {
		
		webview = new Webview(context);

	});

	let commandStart = vscode.commands.registerCommand('vscode-extension-pomodoro.start', () => {

		if(webview) {
			webview.startTimer();
		}

	});

	let commandStop = vscode.commands.registerCommand('vscode-extension-pomodoro.stop', () => {

		if (webview) {
			webview.stopTimer();
		}

	});

	context.subscriptions.push(commandOpen);
	context.subscriptions.push(commandStart);
	context.subscriptions.push(commandStop);

}

// this method is called when your extension is deactivated
export function deactivate() {}


