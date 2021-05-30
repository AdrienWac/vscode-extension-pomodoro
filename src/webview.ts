'use strict';

import * as vscode from 'vscode';
import { View } from './view';
import { TimerFactory } from './timerFactory';
import { Timer } from './timer';
import { StatusBarTimer } from './statusBarTimer';
import { MediatorTimer } from './mediatorTimer';

export class Webview {

    public view: View;

    public timer: Timer;

    public statusBarTimer: StatusBarTimer;

    public context: vscode.ExtensionContext;

    public mediatorTimer: MediatorTimer;

    constructor(context: vscode.ExtensionContext) {

        this.context = context;
        
        this.mediatorTimer = new MediatorTimer(this);
        
        this.timer = TimerFactory.getInstance(this);

        this.statusBarTimer = new StatusBarTimer(this);

        this.view = new View(this);

        
    }

    open(): void {

        this.view.displayPanel();

        this.statusBarTimer.create();

        this.statusBarTimer.display();
        
    }

    run(): void {

        this.timer.run();

    }
  

}