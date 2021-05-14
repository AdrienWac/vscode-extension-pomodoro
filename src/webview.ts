'use strict';

import * as vscode from 'vscode';
import { View } from './view';
import { StatusBar } from './statusBar';
import { Timer } from './timer';
import { WorkTimer } from './workTimer';

export class Webview {

    private view: View;

    private statusBar: StatusBar;

    // private timer: Timer;

    private context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {

        this.context = context;
        // this.timer = Timer.getInstance();

        this.view = new View(context);
        this.statusBar = new StatusBar(context);

    }

    openTimer(): void {

        this.view.displayPanel();
        
        this.statusBar.createTimer();

    }
  

}