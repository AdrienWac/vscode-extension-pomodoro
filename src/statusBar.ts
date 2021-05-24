'use strict';

import * as vscode from 'vscode';
import * as path from 'path';
import { Webview } from './webview';

export abstract class StatusBar {

    protected itemStack: Array<vscode.StatusBarItem> =  [];

    protected webview: Webview;

    public abstract create(webView: Webview): void;

    constructor(webview: Webview) {

        this.webview = webview;

    }

    /**
     * Affiche l'ensemble des items qui constitue la statusBar
     * @param itemStack 
     */
    public display(): void {

        this.itemStack.forEach(item => {

            this.webview.context.subscriptions.push(item);
            
            item.show();

        });

    }

}