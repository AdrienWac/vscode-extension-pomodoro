#!/bin/bash

# Usage info
# package.sh --dryrun -v v1.0.1 "YOUR_VERSIONING_MESSAGE" => dry run version
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


set_version_in_package_json()
{
  echo "Set version in package.json $1"
  echo  "`jq --arg versionExtension $1 '.version = $ARGS.named.versionExtension' pomodorotimer/package.json`" > pomodorotimer/package.json
}

echo "Package your extension - $version - $message"
if [ "$dryrun" = true ]
then
  echo "Dry run is ON"
else
  echo "Dry run is OFF"
fi

# [OK] Stash des modifications présentes dans la répertoire de travail git
env -i git stash push -m "Stash before package version $version"

# [OK] Si dry-run stocke le numéro de version courant pour le remettre en place à la fin du script
if [ "$dryrun" = true ]
then
  old_version=$( jq -r .version  pomodorotimer/package.json)
  echo "Old version is $old_version"
fi

# [OK] Modification de la key "version" du package.json
set_version_in_package_json $version

# Création du package
  # [OK] Si l'image n'existe pas on la build
  if [[ "$(docker image inspect vscode-extension-pomodoro-timer:build --format="image is present")" != "image is present" ]]; then
    docker build -t vscode-extension-pomodoro-timer:build --target build .
  fi
  # [OK] un conteneur docker temporaire qui utilise l'image vscode-extension-pomodoro-timer:build
  docker run --rm --name vscode-extension-pomodoro-timer-pacakge \
    -w /home/node/app \
    -v $(pwd)/pomodorotimer/:/home/node/app/ \
    vscode-extension-pomodoro-timer:build \
    sh -c "vsce package"

# Si dry-run => Ajout du package dans l'index de staging, commit, création du tag, envoi du tag vers le repo distant
if [ "$dryrun" = false ]
then
  echo "Commit nouvelle version"
  env -i git tag -a $version -m "New version $version"
  env -i git push origin $version
fi

# Si dry-run remise en place de la version sauvegardée dans le package.json
if [ "$dryrun" = true ]
then
  set_version_in_package_json $old_version
fi

# Remise en place des modifs stagées dans le répertoire de travail git
env -i git stash pop 0