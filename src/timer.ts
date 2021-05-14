'use strict';

import { Itimer } from './itimer';

export abstract class Timer implements Itimer {

    start(): void {
        throw new Error('Method not implemented.');
    }

    stop(): void {
        throw new Error('Method not implemented.');
    }



}