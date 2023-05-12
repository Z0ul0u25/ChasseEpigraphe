"use strict";
/*global objJSONepigraphes */
/**
 * JS pour la page de chasse
 * @author Philippe Gourdeau <2266603@csfoy.ca>
 * @version 0.1
 */

/* --- Constantes --- */

const refBtnNouvelleChasse = document.getElementById("btnNouvelleChasse");
const refSectionIndices = document.getElementById("indices");

/* --- Variables --- */
let arrIds = [
    ['e0001', 'e0008', 'e0015', 'e0019'], // Personnage à piger
    ['e0002', 'e0004', 'e0007', 'e0021'], // Objets à piger
    ['e0005', 'e0012', 'e0016', 'e0022']];// Lieux à piger



/**
 * Génère un nombre aléatoire entre intMin et intMax inclusivement
 * @param {Number} intMin nombre minimum
 * @param {Number} intMax nombre maximum
 * @returns nombre aléatoire entre intMin et intMax inclusivement
*/
function obtenirNombreEntierAleatoire(intMin, intMax) {
    return Math.floor(Math.random() * (intMax - intMin + 1) + intMin);
}

/**
 * Ràfraichit la phrase de l'énoncé de l'incide selon les valeurs trouvées
 */
function rafraichirIndice() {
    document.getElementById("indice-personnage").innerHTML = objJSONepigraphes[localStorage.id_personnage].CHASSE[(localStorage.personnage_est_trouve == 1) ? `REPONSE` : `INDICE`];
    document.getElementById("indice-objet").innerHTML = objJSONepigraphes[localStorage.id_objet].CHASSE[(localStorage.objet_est_trouve == 1) ? `REPONSE` : `INDICE`];
    document.getElementById("indice-leu").innerHTML = objJSONepigraphes[localStorage.id_lieu].CHASSE[(localStorage.lieu_est_trouve == 1) ? `REPONSE` : `INDICE`];

    document.getElementById("nbIndiceTrouve").innerText =
        Number(localStorage.personnage_est_trouve) +
        Number(localStorage.objet_est_trouve) +
        Number(localStorage.lieu_est_trouve);
}
/**
 * Affichage dépendant de si la chasse est en cours ou non.
 */
function afficherChasse() {
    document.getElementById("aucuneChasse").setAttribute("hidden","hidden");
    document.getElementById("chasseEnCours").removeAttribute("hidden");
    refSectionIndices.removeAttribute("hidden");
    rafraichirIndice();
}

/**
 * Démarre une nouvelle chasse avec des valeurs aléatoires
 */
function demarrerChasse () {
    // if (localStorage.id_personnage == undefined) {
    localStorage.dernierChoix = null;
    localStorage.id_personnage = arrIds[0][obtenirNombreEntierAleatoire(0, arrIds[0].length - 1)];
    localStorage.id_objet = arrIds[1][obtenirNombreEntierAleatoire(0, arrIds[1].length - 1)];
    localStorage.id_lieu = arrIds[2][obtenirNombreEntierAleatoire(0, arrIds[2].length - 1)];
    localStorage.personnage_est_trouve = 0;
    localStorage.objet_est_trouve = 0;
    localStorage.lieu_est_trouve = 0;
    localStorage.visite = JSON.stringify({});
    afficherChasse();
    // }
}

/**
 * Validation de l'utilisateur pour piger une nouvelle chasse.
 * @param {Event} e Évenement déclancheur
 */
function confirmationNouvelleChasse() {
    // e.preventDefault();
    if (refSectionIndices.getAttribute("hidden") == "hidden" || confirm("Voulez vous vraiment piger une nouvelle chasse?\nToute la progression sera perdu")) {
        demarrerChasse();
    }
}


/**
 * Validation du dernier choix effectué provenant d'une fiche personnage
 */
function vefifierDernierChoix() {
    const dernierChoix = JSON.parse(localStorage.dernierChoix);
    // const refRetroaction = document.getElementById("retroaction");
    console.log(dernierChoix);
    if (dernierChoix != null && localStorage[`id_${dernierChoix.TYPE}`] == dernierChoix.ID) {
        localStorage[`${dernierChoix.TYPE}_est_trouve`] = 1;
        // refRetroaction.innerHTML = `Bravo! Vous avez trouvé « ${objJSONepigraphes[dernierChoix.ID].CHASSE.REPONSE} »`;

        rafraichirIndice();
    } /*else {
        refRetroaction.innerHTML = "Désolé. Ce n’est pas le bon élément.";
    }*/
    localStorage.dernierChoix = null;
}


/**
 * Initialisation des composantes de la page
 */
function initialisation() {
    refBtnNouvelleChasse.addEventListener("click", confirmationNouvelleChasse, false);
    if (localStorage.dernierChoix != undefined) {
        (localStorage.dernierChoix != "null")?vefifierDernierChoix():null;
        afficherChasse();
    }
}

window.addEventListener("load", initialisation, false);