import * as vscode from 'vscode';
import { Webview } from './webview';
import { IMediator } from './iMediator';

export class MediatorTimer implements IMediator {

    private eventsStack: { [key: string]: Array<Function>; } = {};

    private webview: Webview;

    constructor(webview: Webview) {
        this.webview = webview;
        
    }

    public addEvent(libelleEvent: string, callback: Function): void {

        if (!this.eventsStack.hasOwnProperty(libelleEvent)) {

            this.eventsStack[libelleEvent] = [];

        }

        this.eventsStack[libelleEvent].push(callback);
    }

    public removeEvent(libelleEvent: string): void {

    }

    public notify(libelleEvent: string): void {

        for (let index = 0; index < this.eventsStack[libelleEvent].length; index++) {
            const callback = this.eventsStack[libelleEvent][index];
            callback();
        }

    }

}