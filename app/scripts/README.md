Dossier avec des scripts utiles pour l'application.

# openapi/build.sh
Script de génération des clients/serveurs OpenAPI pour l'application
## Utilisation
Exemple des tâches à réaliser pour générer le serveur php-symfony.
Création du fichier de spécification dans app/common/OpenAPI/spec.yaml
``` yaml
openapi: 3.0.3
info:
  title: API REST Todo - OpenAPI 3.0
  ...
```
Création d'un fichier de configuration app/common/OpenAPI/php-symfony/config.json. Par exemple pour le php-symfony, définition du namespace.
``` json
{
    "invokerPackage": "App\\UI\\HTTP\\REST"
}
```
Jouer la commande suivante
``` bash
./build.sh -o src/UI/HTTP/REST/OpenApi -f common/OpenAPI/spec.yaml -g php-symfony -c common/OpenAPI/php-symfony/config.json
```