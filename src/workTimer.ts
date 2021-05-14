'use strict';

import * as vscode from 'vscode';
import { Timer } from './timer';

export class WorkTimer extends Timer {

    constructor(context: vscode.ExtensionContext) {
        super(context);
        this.type = 'WorkTimer';
    }


}