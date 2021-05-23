(function () {

    const vscode = acquireVsCodeApi();

    var buttonStart = new buttonComand('run', vscode);
    var buttonStop = new buttonComand('stop', vscode);

    /**
     * Réception des messages envoyé depuis l'extension
     */
    window.addEventListener('message', event => {

        const message = event.data; // The JSON data our extension sent

        switch (message.command) {

            case 'start':
                break;

            case 'stop':
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




