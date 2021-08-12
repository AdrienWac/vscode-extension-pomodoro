import * as vscode from 'vscode';
import { Webview } from './webview';
import { IMediator } from './iMediator';

export class MediatorTimer implements IMediator {

    private eventsStack: { [key: string]: Array<Function>; } = {};

    constructor() {}

    public addEvent(libelleEvent: string, callback: Function, options: {[key: string]: any}): void {

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

    // private handlePriority()

    /**
     * Getter de la stack d'event
     * @returns eventStack du MediatorTimer
     */
    public getEventStack(): { [key: string]: Array<Function>; } {
        return this.eventsStack;
    }

}