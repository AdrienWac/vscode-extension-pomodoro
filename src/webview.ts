'use strict';

import * as vscode from 'vscode';
import { View } from './view';
import { StatusBar } from './statusBar';
import { TimerFactory } from './timerFactory';
import { Timer } from './timer';

export class Webview {

    private view: View;

    public timer: Timer;

    public context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {

        this.context = context;
        
        this.timer = TimerFactory.getInstance(context);

        this.view = new View(this);
        
    }

    open(): void {

        this.view.displayPanel();
        
    }
  

}