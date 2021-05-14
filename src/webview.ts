'use strict';

import * as vscode from 'vscode';
import { View } from './view';
import { StatusBar } from './statusBar';
import { TimerFactory } from './timerFactory';
import { WorkTimer } from './workTimer';
import { Timer } from './timer';

export class Webview {

    private view: View;

    private statusBar: StatusBar;

    private timer: Timer;

    private context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {

        this.context = context;
        this.timer = TimerFactory.getInstance(context);

        this.view = new View(context);
        this.statusBar = new StatusBar(context);

    }

    openTimer(): void {

        this.view.displayPanel();
        
        this.statusBar.createTimer();

    }
  

}