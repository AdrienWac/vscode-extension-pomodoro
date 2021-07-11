(function () {

    const vscode = acquireVsCodeApi();

    let timer = null;

    var buttonStart = new buttonComand('run', vscode);
    var buttonStop = new buttonComand('stop', vscode);

    /**
     * Réception des messages envoyé depuis l'extension
     */
    window.addEventListener('message', event => {

        const message = event.data; // The JSON data our extension sent

        switch (message.command) {

            // Modification de l'état du compteur
            case 'state':
                // console.log('ici');
                console.log(message);
                timer = new Timer(message.timerObjectToSend);
                timer.run();
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

class Timer {

    constructor(timerExtensionObject) {

        const TIME_START_IN_SECONDS = timerExtensionObject.duration;
        const BASE_TIMER_TOTAL_PATH_LENGTH = document.getElementById('base-timer-path-remaining').getTotalLength();

        this.timerExtensionObject = timerExtensionObject;
        this.timerInterval = null;
        this.timerValue = TIME_START_IN_SECONDS;
        this.strokeValue = 0;

    }

    /**
    * Mise à jour de la valeur html du conteneur du timer
    */
    setTimerHtmlContent() {
        // document.getElementById('base-timer-label').innerHTML = `${timerExtensionObject.timeToDisplay}`;
        document.getElementById('base-timer-label').innerHTML = `${this.convertTimeToDisplayValue()}`;
    }

    /**
     * Déclenchement du timer
     */
    run() {

        this.timerInterval = setInterval(() => {

            this.timerValue = this.timerValue - 1;

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

            if (this.timerValue === 0) {
                clearInterval(this.timerInterval);
            }

        }, 1000);

    }

    /**
     * Formate le temps en seconde pour l'affichage
     * @returns Temps au format MM:SS
     */
    convertTimeToDisplayValue() {

        let minutes = Math.floor(this.timerValue / 60);
        let result = '';

        if (minutes < 10) {
            result = `0${minutes}:`;
        }

        let seconds = this.timerValue % 60;

        if (seconds < 10) {
            result += `0${seconds}`;
        }

        return result;

    }

} 
