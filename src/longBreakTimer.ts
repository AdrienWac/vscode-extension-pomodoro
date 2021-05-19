'use strict';

import * as vscode from 'vscode';
import { Timer } from './timer';

export class LongBreakTimer extends Timer {

    constructor(context: vscode.ExtensionContext) {

        super(context);

        this.type = 'longBreak';

    }


}