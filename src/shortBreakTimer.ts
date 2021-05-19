'use strict';

import * as vscode from 'vscode';
import { Timer } from './timer';

export class ShortBreakTimer extends Timer {


    constructor(context: vscode.ExtensionContext) {

        super(context);

        this.type = 'shortBreak';

        this.getConfiguration('pomodoroTimer');

    }

}