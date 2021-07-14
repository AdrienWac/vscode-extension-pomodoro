import { Webview } from "./webview";
import { Itimer } from "./itimer";
import * as vscode from 'vscode';
import { WorkTimer } from "./workTimer";
import { TimerFactory } from './timerFactory';
import { Helper } from "./helper";

export abstract class Timer implements Itimer {

    public webview: Webview;
    
    protected type: string = 'WorkTimer';

    protected configuration: vscode.WorkspaceConfiguration;

    protected state: string = 'stop';

    protected duration: number = 5;

    protected color: string = '#fff';
    
    private interval: NodeJS.Timeout | undefined = undefined;

    protected informationMessage: { [key: string]: string; } = {  };


    constructor(webview: Webview) {

        this.configuration = vscode.workspace.getConfiguration('pomodoroTimer');

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
    public getConfiguration(pathToConfiguration: string): any {

        if (pathToConfiguration !== undefined) {

            return Helper.extract(this.configuration, pathToConfiguration);

        }

        return this.configuration;

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
     * - Mise à jour de l'état du timerl
     */
    public run(): void {

        vscode.window.showInformationMessage(this.informationMessage['run']);

        this.setState('run');

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
     * - Fin de l'interval
     * - Envoi du message d'information
     * - Création d'une nouvelle instance
     * - Notification du changement d'état
     * - Mise à jour du nombre de tour => pour timer longBreak
     */
    protected end(): void {

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

    public generateHtml(): string {

        return `<div id="timer" class="timer-container">

			<ul class="list-timer-button">
				<li class="${this.type === 'work' ? 'active' : ''} list-timer-button__item--active list-timer-button__item">Work</li>
				<li class="${this.type === 'shortBreak' ? 'active' : ''} list-timer-button__item">Short break</li>
				<li class="${this.type === 'longBreak' ? 'active' : ''} list-timer-button__item">Long break</li>
			</ul>

			<div class="base-timer">

				<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">

					<g class="base-timer__circle">

						<circle class="base-timer__path-elapsed" cx="50" cy="50" r="30" />

						<path id="base-timer-path-remaining"
							class="base-timer__path-remaining"
							d="
							M20 50
							A 5 5 0 0 1 80 50
							A 5 5 0 0 1 20 50
							"
							stroke-width="3"
							stroke= "#d35d6e"
							stroke-dasharray="0 188"
						/>

					</g>

				</svg>

				<span id="base-timer-label" class="base-timer__value">${this.convertTimeToDisplayValue(this.duration)}</span>

				<span class="base-timer__value">

					<svg class="base-number__svg" width="90" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">

						<g stroke-dasharray="1000" stroke-dashoffset="1000" fill="none" stroke="#ffffffb3" class="base-timer__group">

							<path class="demo__num-path-5" d="M28,66 a18,15 0 1,0 2,-19 L30,47 30,20 58,20" />
							<path class="demo__num-join-5-4" d="M55,20 55,47" />
							<path class="demo__num-path-4" d="M55,47 30,47 55,20 55,75" />
							<path class="demo__num-join-3-4" d="M30,47 C10,47 10,20 30,20" />
							<path class="demo__num-path-3" d="M30,20 60,20 40,50 a18,15 0 1,1 -12,19" />
							<path class="demo__num-join-2-3" d="M28,69 Q25,44 35,25.5" />
							<path class="demo__num-path-2" d="M34.4 26.4 41.4,19.4 a16,16 0 0,1 22.6,22.6 l-30,30 35,0" />
							<path class="demo__num-join-1-2" d="M69,72 a20,10 0 0,1 20,11 a17,7 0 0,1 -34,0 l0,-5" />
							<path class="demo__num-path-1" d="M55,78 55,22 40,28" />

						</g>

					</svg>

				</span>

			</div>

			<button class="timer-container__button" data-command="${this.state === 'run' ? 'stop' : 'run'}">
				${this.state === 'run' ? 'Stop' : 'Start'}
			</button>

		</div>`;
    }

    /**
     * Formate le timer pour la webview
     * @returns 
     */
    public createWebviewObject(): Object{
        
        return {
            type: this.type,
            state: this.state,
            color: this.color,
            initializationTime: this.getConfiguration(`${this.getType()}.duration`),
            duration: this.duration,
            timeToDisplay: this.convertTimeToDisplayValue(this.duration),
        };

    }

    /**
     * Formate le temps en seconde pour l'affichage
     * @param {number} timeInSeconds
     * @returns Temps au format MM:SS
     */
    public convertTimeToDisplayValue(timeInSeconds: number): string{

        let minutes = Math.floor(timeInSeconds / 60);
        let result = '';

        if (minutes < 10) {
            result = `0${minutes}:`;
        }

        let seconds = timeInSeconds % 60;

        if (seconds < 10) {
            result += `0${seconds}`;
        }

        return result;

    }


    
}