# Argument => numéro de version + message de tag
versionNumber=$1
messageTag=$2

echo "Package your extension - $versionNumber - $messageTag"

# [OK] Stash des modifications présentes dans la répertoire de travail git
# env -i git stash push -m "Stash before package version $versionNumber"

# [OK] Modification de la key "version" du package.json
# echo  "`jq --arg versionExtension $versionNumber '.version = $ARGS.named.versionExtension' pomodorotimer/package.json`" > pomodorotimer/package.json

# Création du package
# Installation de vsce depuis
  # Si l'image n'existe pas on la build
  if [[ "$(docker image inspect vscode-extension-pomodoro-timer:build --format="image is present")" != "image is present" ]]; then
    docker build -t vscode-extension-pomodoro-timer:build --target build .
  fi
  # un conteneur docker temporaire qui utilise l'image vscode-extension-pomodoro-timer:build
  # docker run --rm --name vscode-extension-pomodoro-timer-pacakge \
  #   -w /home/node/app \
  #   -v ./:/home/node/app/ \
  #   vscode-extension-pomodoro-timer:dev \
  #   sh -c "cd pomodorotimer && vsce package"


  # ou le conteneur du service vscode-extension
  # Installation vsce - npm i -g @vscode/vsce
  # cd pomodorotimer && vsce package

# Commit avec la nouvelle version du package

# Création d'un nouveau tag git

# Remise en place des modifs stagées dans le répertoire de travail git
# env -i git stash pop 0