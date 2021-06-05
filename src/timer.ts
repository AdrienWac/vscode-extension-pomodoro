import { Webview } from "./webview";
import { Itimer } from "./itimer";
import * as vscode from 'vscode';
import { WorkTimer } from "./workTimer";
import { TimerFactory } from './timerFactory';


export abstract class Timer implements Itimer {

    public webview: Webview;
    
    protected type: string = 'WorkTimer';

    protected configuration: vscode.WorkspaceConfiguration;

    protected state: string = 'stop';

    protected duration: number = 5;

    protected color: string = '#fff';
    
    protected laps: number = 4;

    private interval: NodeJS.Timeout | undefined = undefined;

    protected informationMessage: { [key: string]: string; } = {  };


    constructor(webview: Webview) {

        this.configuration = vscode.workspace.getConfiguration('pomodoroTimer');

        this.laps = this.configuration.repeat;

        this.webview = webview;
        
    }

    abstract nextTimerInstance(): Timer;

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
     * Retourne l'état du timer courant
     * @returns 
     */
    public getState(): string {
        return this.state;
    }

    /**
     * Mise à jour des configurations via le fichier de config
     * @param nameConfiguration 
     */
    protected getConfiguration(nameConfiguration: string): vscode.WorkspaceConfiguration {

        if (nameConfiguration !== undefined) {

            // return this.con

        }

        return this.configuration;

    }


    public extract(datas: any, path: string): any {
        
        if (path.indexOf('{') === -1) {
            
            for (let item of path.split('.')) {
                
                datas = datas[item];

            }

            return datas;

        }






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
        
        Webview.mediatorTimer.notify('state');
        
    }

    public setDuration(duration: number): void {

        this.duration = duration;

        Webview.mediatorTimer.notify('setDuration');

    }

    /**
     * Mise à jour des attibuts via les valeurs de configuration
     * @param timerType Type de timer
     */
    protected setAttributesFromConfiguration(timerType: string): void
    {
        this.duration = this.configuration[timerType].duration;

        this.color = this.configuration[timerType].color;

    } 


    /**
     * Activation du compteur
     * - Message d'information
     * - Mise à jour de l'état du timer
     * - Décrémentation du laps => pour timer work
     * - Lancement de l'interval
     */
    public run(): void {

        vscode.window.showInformationMessage(this.informationMessage['run']);

        this.setState('run');

        this.laps--;

        this.interval = setInterval(() => {

            this.duration = this.duration - 1;
            this.setDuration(this.duration);

            if (this.duration === 0) {

                this.end();

            }

        }, 1000);

    }

    /**
     * Fin du timer
     */
    private end(): void {

        if (this.interval) {
            clearInterval(this.interval);
        }

        vscode.window.showInformationMessage(this.informationMessage['end']);

        TimerFactory.setInstance(this.nextTimerInstance());

        this.setState('stop');

    }


    /**
     * Désactivation du compteur
     */
    public stop(): void {
        vscode.window.showInformationMessage('Stop');
        this.setState('stop');
    }

    /**
     * Générère le contenu html du timer
     * @returns 
     */
    public generateHtml(): string {
        
        return `<div class="timer-container">

            <ul class="timer-type">
                <li class="${this.type === 'work' ? 'active' : ''} button">Work</li>
                <li class="${this.type === 'shortBreak' ? 'active' : ''} button" >Short break</li>
                <li class="${this.type === 'longBreak' ? 'active' : ''} button">Long break</li>
            </ul>

            <div class="duration text-center">${this.duration}</div>

            <div class="timer-command">

                <button class="button btn-command" data-command="${this.state === 'run' ? 'stop' : 'run'}"> 
                    ${this.state === 'run' ? 'Stop' : 'Start'} 
                </button>

            </div>

            <hr>

            <div class="float-right timer-lap-time-end">

                <span>Heure de fin : 12h23</span>

            </div>

            <div class="float-left timer-lap-count">

                <span> ${this.laps} </span> sur <span> 5 </span>
                
            </div>

            <div class="clear"></div>

        </div>`;

    }


    
}