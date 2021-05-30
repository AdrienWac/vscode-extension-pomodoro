import { Webview } from "./webview";
import { Itimer } from "./itimer";
import { StatusBarTimer } from "./statusBarTimer";
import * as vscode from 'vscode';

export abstract class Timer implements Itimer {

    // public context: vscode.ExtensionContext;

    public webview: Webview;
    
    protected type: string = 'WorkTimer';

    protected state: string = 'stop';

    protected duration: number|undefined;

    protected color: string = '#fff';

    constructor(webview: Webview) {

        this.webview = webview;
        
    }

    /**
     * Retourne le type du compteur courant
     * @returns 
     */
    public getType(): string {
        return this.type;
    }

    /**
     * Retourne la couleur du timer
     * @returns 
     */
    public getColor(): string {
        
        return this.color;

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
        
        this.webview.mediatorTimer.notify('state');
        
    }

    /**
     * Retourne l'état du timer courant
     * @returns 
     */
    public getState(): string {
        return this.state;
    }


    /**
     * Activation du compteur
     */
    public run(): void {
        vscode.window.showInformationMessage('Run timer');
        this.setState('run');
    }
    
    /**
     * Désactivation du compteur
     */
    public stop(): void {
        vscode.window.showInformationMessage('Stop');
        this.setState('stop');
    }


    
}