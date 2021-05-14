'use strict';

import * as vscode from 'vscode';
import * as path from 'path';

export interface Itimer {

    start(): void;

    stop(): void;

}