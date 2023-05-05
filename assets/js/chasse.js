/**
 * JS pour la page de chasse
 * @author Philippe Gourdeau <2266603@csfoy.ca>
 * @version 0.1
 */
"use strict";
let strNomObjChasse = "_chasse";
let objChasse;

/**
 * Création de la chasse
 */
function nouvelleChasse() {
    objChasse = {
        "temporaire": "temporaire"
    };
    console.log(objChasse);
}

/**
 * Validation de l'utilisateur pour piger une nouvelle chasse.
 * @param {Event} e Évenement déclancheur
 */
function confirmationNouvelleChasse() {
    // e.preventDefault();
    if (confirm("Voulez vous vraiment piger une nouvelle chasse?\nToute la progression sera perdu")) {
        localStorage.removeItem(strNomObjChasse);
        nouvelleChasse();
    }
}



/**
 * Initialisation des composantes de la page
 */
function initialisation() {
    console.log("-- init --");
    document.getElementById("boutons").children[1].addEventListener("click", confirmationNouvelleChasse, false);
    if (localStorage.getItem(strNomObjChasse) == null) {
        nouvelleChasse();
    } else {
        objChasse = localStorage.getItem(strNomObjChasse);
    }
    console.log("-- complete --");
}

window.addEventListener("DOMContentLoaded", initialisation, false);