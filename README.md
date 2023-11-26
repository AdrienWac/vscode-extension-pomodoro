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
``` bash
./package.sh
```