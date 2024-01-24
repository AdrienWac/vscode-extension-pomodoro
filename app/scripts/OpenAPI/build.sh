###############################################################################
print_help() {
cat <<EOF

OpenAPI Build script 

Usage

  [-h] [-o] [-g] [-f] [-t]
  -h, afficher l'aide d'usage
  -o, chemin de stockage des fichiers produits
  -g, generateur OpenAPI utilisé
  -f, chemin vers le fichier de spécification
  -t, active l'utlisation des templates custom
EOF
}
###############################################################################
base_path=/home/adrien/Projets/vscode-extension-pomodoro/app
build_comand='docker run --rm --user $(id -u):$(id -g) -v "/home/adrien/Projets/vscode-extension-pomodoro/app:/local" openapitools/openapi-generator-cli generate'
generator=''

add_output_path() {
    build_comand+=" -o /local/$1"
}

add_generator() {
    generator=$1
    build_comand+=" -g $generator"
}

add_spec_file() {
    build_comand+=" -i /local/$1"
}

add_config_file() {
    build_comand+=" -c /local/$1"
}

add_template() {
    # Test if folder exist
    if [ -d $base_path/common/OpenAPI/$generator ]; then
        build_comand+=" -t /local/common/OpenAPI/$generator/templates"
    fi
}

###############################################################################
while getopts "o:g:f:c:ht" opt; do
    case $opt in
        o)  add_output_path $OPTARG
            ;;
        g)  add_generator $OPTARG
            ;;
        f)  add_spec_file $OPTARG
            ;;
        c)  add_config_file $OPTARG
            ;;
        t)  add_template
            ;;
        h)  
            print_help
            exit 0
            ;;
    esac
done

###############################################################################

echo $build_comand
eval " $build_comand"

###############################################################################
# Build source with OpenAPI generator. Use Docker image.
# docker run --rm --user $(id -u):$(id -g) -v $(pwd):/local openapitools/openapi-generator-cli generate \
#     -i $spec_file \
#     -g $generator \
#     -o $path_output \
#     -c /local/config.json
###############################################################################