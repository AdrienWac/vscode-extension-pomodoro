import { Itimer } from "./itimer";
import * as vscode from 'vscode';

export abstract class Timer implements Itimer {

    private context: vscode.ExtensionContext;

    protected type: string = 'WorkTimer';

    protected state: string = 'stop';

    protected duration: number|undefined;

    protected color: string|undefined;

    constructor(context: vscode.ExtensionContext) {

        this.context = context;
        
    }

    /**
     * Retourne le type du compteur courant
     * @returns 
     */
    public getType(): string {
        return this.type;
    }

    /**
     * Mise à jour des configurations via le fichier de config
     * @param nameConfiguration 
     */
    protected getConfiguration(nameConfiguration: string): void
    {

        const config = vscode.workspace.getConfiguration(nameConfiguration);

        this.duration = config[this.type].duration;

        this.color = config[this.type].color;

    }

    /**
     * Retourne la durée du timer courant
     * @returns 
     */
    public getDuration(): any {
        return this.duration;
    }

    /**
     * Mise à jour de l'état du timer courant
     * @param state 
     */
    public setState(state: string): void {
        this.state = state;
    }

    /**
     * Activation du compteur
     */
    public start(): void {
        vscode.window.showInformationMessage('Start');
        this.setState('start');
    }
    
    /**
     * Désactivation du compteur
     */
    public stop(): void {
        vscode.window.showInformationMessage('Stop');
        this.setState('stop');
    }


    
}