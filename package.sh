#!/bin/bash

# Usage info
# package.sh -dryrun -v v1.0.1 "YOUR_VERSIONING_MESSAGE" => dry run version
# package.sh -v v1.0.1 "YOUR_VERSIONING_MESSAGE"

# Options
# Standalone :
# dryrun => [Optionnal] If present the package is create with number version but don't create commit and don't set version in package.json.
# With arguments :
# -v VERISON_VALUE => Number of version. Use for git tag et package versioning. If not dry run, apply in package.json
# -m VERSIONING_MESSAGE_VALUE => Message use for git tag & git commit commands.

# Handle options
dryrun=false
version=
message=
while :; do
  case $1 in
    -dr|--dryrun)
      dryrun=true
      ;;
    -v|--version)
      version=$2
      shift
      ;;
    -m|--message)
      message=$2
      shift
      ;;
    *)
      break
  esac

  shift # Décale la liste des arguments vers la gauche. monscript.sh arg1 arg2 arg3 => monscript.sh arg2 arg3 ($1 devient arg2)
done
# versionNumber=$1
# messageTag=$2

echo "Package your extension - $version - $message"
if [ "$dryrun" = true ]
then
  echo "Dry run is ON"
else
  echo "Dry run is OFF"
fi
# [OK] Stash des modifications présentes dans la répertoire de travail git
# env -i git stash push -m "Stash before package version $versionNumber"

# Si dry-run stocke le numéro de version courant pour le remettre en place à la fin du script
# [OK] Modification de la key "version" du package.json
# echo  "`jq --arg versionExtension $versionNumber '.version = $ARGS.named.versionExtension' pomodorotimer/package.json`" > pomodorotimer/package.json

# Création du package
# Installation de vsce depuis
  # [OK] Si l'image n'existe pas on la build
  # if [[ "$(docker image inspect vscode-extension-pomodoro-timer:build --format="image is present")" != "image is present" ]]; then
  #   docker build -t vscode-extension-pomodoro-timer:build --target build .
  # fi
  # [OK] un conteneur docker temporaire qui utilise l'image vscode-extension-pomodoro-timer:build
  # docker run --rm --name vscode-extension-pomodoro-timer-pacakge \
  #   -w /home/node/app \
  #   -v $(pwd)/pomodorotimer/:/home/node/app/ \
  #   vscode-extension-pomodoro-timer:build \
  #   sh -c "vsce package"

# Si dry-run = false
# Commit avec la nouvelle version du package
# git commit
# Si dry-run = false
# Création d'un nouveau tag git


# Si dry-run remise en place de la version sauvegardée dans le package.json

# Remise en place des modifs stagées dans le répertoire de travail git
# env -i git stash pop 0