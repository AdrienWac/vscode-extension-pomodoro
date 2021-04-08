(function () {

    const vscode = acquireVsCodeApi();

    // Récupération de l'état enregistré
    const previousState = vscode.getState();
    
    var counter = document.getElementById('counter');

    var interval = undefined;

    var btnCommandElements = document.getElementsByClassName('btn-command');

    for (let btnCommand of btnCommandElements) {
        
        btnCommand.addEventListener('click', () => {

            vscode.postMessage({
                command: btnCommand.dataset.command,
                text: 'Command launch ' + btnCommand.dataset.command
            })

        });

    }

    // Récupération des messages de l'extension
    window.addEventListener('message', event => {

        let message = event.data;

        counter.textContent = message.timer;

    });

}());