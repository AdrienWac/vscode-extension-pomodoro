(function () {

    const vscode = acquireVsCodeApi();

    var counter = document.getElementById('counter');
    var count = 0;
    var interval = undefined;


    // Récupération des messages de l'extension
    window.addEventListener('message', event => {

        let message = event.data;

        switch (message.command) {

            case 'start':

                interval = setInterval(() => {

                    counter.textContent = count++;
                    if (count % 10 === 0) {
                        console.log(vscode);
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