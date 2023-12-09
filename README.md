# Sommaire
[Build des image](#build-des-images)</br>
&nbsp;[Client VueJs](#client-vuejs)</br>
&nbsp;&nbsp;[Target DEV](#target-dev)</br>
&nbsp;[Extension VSCODE](#extension-vscode)</br>
&nbsp;&nbsp;[Target DEV](#target-dev-1)</br>
&nbsp;&nbsp;[Target BUILD](#target-build)</br>
[Package de l'extension VSCODE](#package-de-lextension-vscode)</br>
&nbsp;[Documentation packaging d'une extension VSCODE](#documentation-pour-le-packaging-dextension)</br>
&nbsp;[Script de packaging](#script-de-packaging)</br>
[Client](#client)</br>
&nbsp;[Afficher dans un navigateur](#afficher-dans-un-navigateur)</br>


# Build des images 

## Client VueJs
### Target DEV
[TODO] Trouver de centralisé les déclarations pour Traeffik qui sont propre à mon env local.
``` bash
docker-compose -f client/docker-compose.dev.yml build
docker-compose -f client/docker-compose.dev.yml up
```

## Extension VSCODE
### Target dev
L'image de dev contient les sources de l'application. Les packages utiles pour le developpement et l'initialisation de l'extension 
y sont installés globalement.
``` bash 
docker build -t vscode-extension-pomodoro-timer:dev --target dev .
``` 

### Target build
L'image build contient les sources de l'application (développé en typescript). Et les lib utiles au packaging de l'application. 
``` bash
docker build -t vscode-extension-pomodoro-timer:build --target build .
```

## Package de l'extension VSCODE
### Documentation pour le packaging d'extension
https://code.visualstudio.com/api/working-with-extensions/publishing-extension#vsce

### Script de packaging
``` bash
./package.sh
```

## Client
Actuellement utilisation du framework VueJS. 
Essayer de faire une archi hexagonale pour ne pas être couplé au framework.

### Afficher dans un navigateur
Se rendre sur <a href="localhost::3600">localhost::3600</a>