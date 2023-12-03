// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from "path";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let panel: vscode.WebviewPanel;

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "pomodorotimer" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('pomodorotimer.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from PomodoroTimer!');
	});

  let openWebview = vscode.commands.registerCommand('pomodorotimer.open', () => {
    if (panel) {
			panel.reveal();
		} else {
			panel = createWebView();
		}
    
  
    if (panel) {

      const dependencyNameList: string[] = [
          "index.css",
          "index.js"
      ];

      const dependencyList: vscode.Uri[] = dependencyNameList.map((item) =>
        panel.webview.asWebviewUri(
            vscode.Uri.file(
                path.join(context.extensionPath, "vue-dist", "assets", item)
            )
        )
      );
    
      panel.webview.html = getHtmlContent(dependencyList);

      panel.onDidDispose(
        () => {
          console.log('Panel closed. Webview is destroyed.');
          
        },
        null,
        context.subscriptions
      );
    }
  });

	context.subscriptions.push(disposable);
  context.subscriptions.push(openWebview);
}

/**
 * Création d'une web view
 * @returns 
 */
function createWebView(): vscode.WebviewPanel
{
	
	return vscode.window.createWebviewPanel(
		'pomodoroTimer',
		'Pomodoro Timer',
		vscode.ViewColumn.One,
		{
			enableScripts: true
		}
	);

}

function getHtmlContent(dependencyList: vscode.Uri[]): string
{
	return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vite + Vue</title>
      <script>
          const vscode = acquireVsCodeApi();
      </script>
      <script type="module" crossorigin src="${dependencyList[1]}"></script>
      <link rel="stylesheet" crossorigin href="${dependencyList[0]}">
    </head>
    <body>
      <div id="app"></div>
    </body>
  </html>`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
