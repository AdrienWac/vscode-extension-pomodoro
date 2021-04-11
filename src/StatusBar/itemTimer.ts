'use strict';

import * as vscode from 'vscode';

export class ItemTimer {

    private context: vscode.ExtensionContext
    private statusBarActionTimer: vscode.StatusBarItem;
    private command: string = 'vscode-extension-pomodoro.start';
    private content: string = `$(debug-start)`;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this.statusBarActionTimer = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 200);
        this.statusBarActionTimer.text = this.content;
        this.statusBarActionTimer.command = this.command;
        this.context.subscriptions.push(this.statusBarActionTimer);
    }

    setContent(value: string) {
        this.content = value;
    }

    display() {
        this.statusBarActionTimer.show();
    }

    setCommand(commandId: string) {
        this.command = commandId;
    }

}