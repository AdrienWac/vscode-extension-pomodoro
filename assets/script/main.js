(function () {

    const vscode = acquireVsCodeApi();

    // Récupération de l'état enregistré
    const previousState = vscode.getState();

    // Si état enregistré, on init avec valeur sinon 0
    var count =  previousState ? previousState.count : 0;
    
    var counter = document.getElementById('counter');
    counter.textContent = count;

    var interval = undefined;


    // Récupération des messages de l'extension
    window.addEventListener('message', event => {

        let message = event.data;

        switch (message.command) {

            case 'start':

                interval = setInterval(() => {

                    counter.textContent = count++;

                    // Enregistrement de la valeur
                    vscode.setState({count});
   
                    if (count % 10 === 0) {
                        
                        vscode.postMessage({
                            command: 'alert',
                            text: 'Dont forget to stop the counter. His current value is ' + count
                        })

                    }

                }, 100);

                break;

            case 'stop':

                if (interval) {
                    clearInterval(interval);
                }

                break;

        }

    });

}());