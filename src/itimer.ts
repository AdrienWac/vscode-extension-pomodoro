'use strict';

import * as vscode from 'vscode';
import * as path from 'path';
import {Timer} from './timer';

export interface Itimer {

    run(): void;

    stop(): void;

    nextTimerInstance(): Timer;

}