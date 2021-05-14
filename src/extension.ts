// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import { Webview } from './webview';
import { WorkTimer } from './workTimer';
import { Timer } from './timer';



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let webview: Webview;

	let timer: Timer;

	let commandOpen = vscode.commands.registerCommand('vscode-extension-pomodoro.open', () => {
		
		timer = new WorkTimer();

		webview = new Webview(context, timer);

		webview.displayPanel();
		

	});

	let commandStart = vscode.commands.registerCommand('vscode-extension-pomodoro.start', () => {

		timer.start(webview);
		// if(webview) {
		// 	webview.startTimer();
		// }

	});

	let commandStop = vscode.commands.registerCommand('vscode-extension-pomodoro.stop', () => {

		// if (webview) {
		// 	webview.stopTimer();
		// }

	});

	context.subscriptions.push(commandOpen);
	context.subscriptions.push(commandStart);
	context.subscriptions.push(commandStop);

}

// this method is called when your extension is deactivated
export function deactivate() {}


