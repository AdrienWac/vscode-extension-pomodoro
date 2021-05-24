// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Webview } from './webview';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let webview: Webview;

	let commandOpen = vscode.commands.registerCommand('vscode-extension-pomodoro.open', () => {

		webview = new Webview(context);
		webview.open();

	});

	context.subscriptions.push(commandOpen);
	
}

// this method is called when your extension is deactivated
export function deactivate() {}
