export interface IMediator {

    /**
     * Ajout d'une fonction associée à un évenement dans la stack
     * @param libelleEvent Nom de l'évenement
     * @param callback Function associé à l'évenement
     */
    addEvent(libelleEvent: string, callback: (...a: any[]) => void): void;

    /**
     * Retrait d'un évenement et de ses fonctions associés de la stack
     * @param libelleEvent Nom de l'évenement à retirer
     */
    removeEvent(libelleEvent: string): void;

    /**
     * Parcourt et lancement des fonctions associés à un évenement
     * @param libelleEvent Nom de l'évenement
     */
    notify(libelleEvent: string): void;

}