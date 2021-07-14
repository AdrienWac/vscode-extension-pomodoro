const NAME_RUN_COMMAND = 'run';
const NAME_STOP_COMMAND = 'stop';

class Timer {


    constructor(timerDomElement) {

        this.timerDomElement = timerDomElement;
        this.timerExtensionObject = null;

        const BASE_TIMER_TOTAL_PATH_LENGTH = document.getElementById('base-timer-path-remaining').getTotalLength();

        this.strokeValue = 0;

    }

    /**
     * Mise à jour de l'objet timer provenant de l'extension
     * @param {*} timerExtensionObject Objet timer provenant de l'extension
     */
    setTimerExtensionObject(timerExtensionObject) {
        this.timerExtensionObject = timerExtensionObject;
    }

    /**
    * Mise à jour de la valeur html du conteneur du timer
    */
    setTimerHtmlContent() {
        document.getElementById('base-timer-label').innerHTML = `${this.timerExtensionObject.timeToDisplay}`;
    }

    /**
     * Mise à jour de la couleur de fond du timer
     */
    setBackground() {
        console.log(this.timerExtensionObject);
        this.timerDomElement.style.backgroundColor = this.timerExtensionObject.color;
    }

    /**
     * Mise à jour du bouton de commande du timer
     */
    setCommandBtn() {

        let domElement = document.querySelector('.timer-container__button');
        domElement.innerHTML = this.timerExtensionObject.state === 'run' ? 'STOP' : 'START';
        domElement.dataset.command = this.timerExtensionObject.state === 'run' ? NAME_STOP_COMMAND : NAME_RUN_COMMAND;

    }

    /**
     * Déclenchement du timer
     */
    run() {

        // if (timerValue <= 5 && timerValue > 0) {
        //     document.getElementById('base-timer-label').innerHTML = '';
        //     launchAnimation();
        // } else {
        //     setTimerHtmlContent(timerValue);
        // }

        this.setTimerHtmlContent();

        // strokeValue = calculateStepStrokeDashArray(strokeValue);

        // setCircleStrokeDashArray(
        //     document.getElementById('base-timer-path-remaining'),
        //     `${strokeValue} ${BASE_TIMER_TOTAL_PATH_LENGTH}`
        // );

    }

}


(function () {

    const vscode = acquireVsCodeApi();

    let timer = new Timer(document.getElementById('timer'));

    var buttonStart = new buttonComand('run', vscode);
    var buttonStop = new buttonComand('stop', vscode);

    /**
     * Réception des messages envoyé depuis l'extension
     */
    window.addEventListener('message', event => {

        const message = event.data; // The JSON data our extension sent

        timer.setTimerExtensionObject(message.timer);
        console.log(message.timer.type);

        switch (message.command) {

            // Modification de l'état du compteur
            case 'state':
                timer.setCommandBtn();
                break;

            // Mise à jour du temps
            case 'setDuration':
                timer.run();
                break;

            // Nouvelle instance de timer
            case 'setInstance':
                console.log('setInstance');
                timer.setBackground();
                timer.setTimerHtmlContent();
                break;

        }

    });



}());

/**
 * Constructeur d'un bouton de commande
 * @param {STRING} commandName Nom de la commande  
 * @param {*} vscode API Vscode
 */
function buttonComand(commandName, vscode) {

    var domElement = document.querySelector('[data-command="'+ commandName +'"]');

    domElement
        .addEventListener('click', () => {
            this.postMessage(commandName, null);
        });
    
    /**
     * Envoie d'un message à l'extension
     * @param {string} command
     * @param {string} value
     */
    this.postMessage = function (command, value) {

        vscode.postMessage({
            command: command,
            value: value
        });

    };

};

