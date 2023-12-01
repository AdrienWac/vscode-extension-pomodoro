# Build des images docker

## Target dev
L'image de dev contient les sources de l'application. Les packages utiles pour le developpement et l'initialisation de l'extension 
y sont installés globalement.
``` bash 
docker build -t vscode-extension-pomodoro-timer:dev --target dev .
``` 

## Target build
L'image build contient les sources de l'application (développé en typescript). Et les lib utiles au packaging de l'application. 
``` bash
docker build -t vscode-extension-pomodoro-timer:build --target build .
```

## Package de l'extension
### Documentation pour le packaging d'extension
https://code.visualstudio.com/api/working-with-extensions/publishing-extension#vsce

### Script de packaging
**En mode normal**
Lance le conteneur de build, créé un package. Créé un nouveau tag et push le tag sur le repo distant.
``` bash
./package.sh --version 1.0.1 --message "New minor version 1.0.1" 
```
**En mode dry-run**
Lance le conteneur de build puis créé le package de l'extension. La partie tag n'est pas joué.
``` bash
./package.sh --dryrun --version 1.0.1 --message "New minor version 1.0.1" 
```

## Debug l'extension
### Compiler l'extension
Dans le conteneur de dev
``` bash
docker-compose -f docker-compose.dev.yml up --remove-orphans
docker-compose -f docker-compose.dev.yml exec vscode-extension exec /bin/bash
```
Se rendre dans le dossier pomodorotimer
``` bash
cd pomodorotimer
``` 
**Compilation unique**
``` bash
npm run compile 
```
**Watching**
``` bash
npm run watch
```
Ouvrir le fichier pomodorotimer/src/extension.ts et appuyer sur F5. 
Une nouvelle fenêtre de VSCode en mode debug va s'ouvrir.
### Jouer une commande de l'extension
Ctrl+Shift+p => taper le nom de la commande spécifier dans le package.json