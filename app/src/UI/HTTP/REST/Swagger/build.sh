# Build source with OpenAPI generator. Use Docker image.
docker run --rm --user $(id -u):$(id -g) -v "/home/adrien/Projets/vscode-extension-pomodoro/app/src/UI/HTTP/REST/Swagger:/local" openapitools/openapi-generator-cli generate \
    -i /local/spec.yaml \
    -g php-symfony \
    -o /local/out/php-symfony

# chown -R adrien:adrien /home/adrien/Projets/vscode-extension-pomodoro/app/src/UI/HTTP/REST/Swagger/out