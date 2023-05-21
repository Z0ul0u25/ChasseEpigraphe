/**
 * @file JS - Chasse aux épigraphe
 * @description Fonctions nécessaire pour démarrer et participer à une chasse
 * @author Philippe Gourdeau <2266603@csfoy.ca>
 * @version 1.1
*/

/* --- ESLINT --- */
"use strict";
/*global objJSONepigraphes */

/* --- Constantes --- */

const refBtnNouvelleChasse = document.getElementById("btnNouvelleChasse");
const refSectionIndices = document.getElementById("indices");
const refRetroaction = document.getElementById("retroaction");

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
    // Rafraichissement de l'indice
    document.getElementById("indice-personnage").innerHTML = objJSONepigraphes[localStorage.idPersonnage].CHASSE[(localStorage.personnageEstTrouve == 1) ? `REPONSE` : `INDICE`];
    document.getElementById("indice-objet").innerHTML = objJSONepigraphes[localStorage.idObjet].CHASSE[(localStorage.objetEstTrouve == 1) ? `REPONSE` : `INDICE`];
    document.getElementById("indice-leu").innerHTML = objJSONepigraphes[localStorage.idLieu].CHASSE[(localStorage.lieuEstTrouve == 1) ? `REPONSE` : `INDICE`];
    // Rafraichissement de la rétroaction
    document.getElementById("retroaction-personnage").innerHTML = (localStorage.personnageEstTrouve == 1) ? "Trouvé!" : "???";
    document.getElementById("retroaction-objet").innerHTML = (localStorage.objetEstTrouve == 1) ? "Trouvé!" : "???";
    document.getElementById("retroaction-lieu").innerHTML = (localStorage.lieuEstTrouve == 1) ? "Trouvé!" : "???";
    // Rafraichissement de la photo
    if (localStorage.personnageEstTrouve == 1) {
        document.querySelector("#photo-personnage source").srcset = `/assets/images/Personnages/405x280_chasseTableX1/${localStorage.idPersonnage}_chasse_405.jpg`;
        document.querySelector("#photo-personnage img").src = `/assets/images/Personnages/235x165_chasseTabletteMobileX1/${localStorage.idPersonnage}_chasse_235.jpg`;
    }
    if (localStorage.objetEstTrouve == 1) {
        document.querySelector("#photo-objet source").srcset = `/assets/images/Objets/405/${localStorage.idObjet}_chasse_w405.jpg`;
        document.querySelector("#photo-objet img").src = `/assets/images/Objets/235/${localStorage.idObjet}_chasse_w235.jpg`;
    }
    if (localStorage.lieuEstTrouve == 1) {
        document.querySelector("#photo-lieu source").srcset = `/assets/images/Lieux/405x280/${localStorage.idLieu}_lieu_405.jpg`;
        document.querySelector("#photo-lieu img").src = `/assets/images/Lieux/235x165/${localStorage.idLieu}_lieu_235.jpg`;
    }

    const refNbIndice = document.getElementById("nbIndiceTrouve");
    // Raffraichissement du nombre d'indice trouvé
    refNbIndice.innerText =
        Number(localStorage.personnageEstTrouve) +
        Number(localStorage.objetEstTrouve) +
        Number(localStorage.lieuEstTrouve);

    if (refNbIndice.innerText == "3") {
        const btnCarte = document.getElementById("boutons").lastElementChild.firstElementChild;
        btnCarte.href = "../concours/index.html";
        btnCarte.innerText = "Participer au concours!";
        refRetroaction.removeAttribute("hidden");
        refRetroaction.innerHTML = 'Bravo! Vous avez trouvé tous les indices et complété la chasse! Vous pouvez désormais <a href="../concours/index.html">participer au concours.</a>';
    }
}
/**
 * Affichage dépendant de si la chasse est en cours ou non.
 */
function afficherChasse() {
    document.getElementById("aucuneChasse").setAttribute("hidden", "hidden");
    document.getElementById("chasseEnCours").removeAttribute("hidden");
    refSectionIndices.removeAttribute("hidden");
    rafraichirIndice();
}

/**
 * Démarre une nouvelle chasse avec des valeurs aléatoires
 */
function demarrerChasse() {
    // if (localStorage.idPersonnage == undefined) {
    localStorage.dernierChoix = null;
    localStorage.idPersonnage = arrIds[0][obtenirNombreEntierAleatoire(0, arrIds[0].length - 1)];
    localStorage.idObjet = arrIds[1][obtenirNombreEntierAleatoire(0, arrIds[1].length - 1)];
    localStorage.idLieu = arrIds[2][obtenirNombreEntierAleatoire(0, arrIds[2].length - 1)];
    localStorage.personnageEstTrouve = 0;
    localStorage.objetEstTrouve = 0;
    localStorage.lieuEstTrouve = 0;
    localStorage.objVisite = JSON.stringify(new Object);
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
        location.reload();
    }
}


/**
 * Validation du dernier choix effectué provenant d'une fiche personnage
 */
function vefifierDernierChoix() {
    const dernierChoix = JSON.parse(localStorage.dernierChoix);
    refRetroaction.removeAttribute("hidden");
    if (dernierChoix != null && localStorage[`id${dernierChoix.TYPE[0].toUpperCase() + dernierChoix.TYPE.substring(1)}`] == dernierChoix.ID) {
        localStorage[`${dernierChoix.TYPE}EstTrouve`] = 1;
        refRetroaction.innerHTML = `Bravo! Vous avez trouvé ${(dernierChoix.TYPE == 'objet')? 'l\'':'le '}${dernierChoix.TYPE}« ${objJSONepigraphes[dernierChoix.ID].CHASSE.REPONSE} »`;

        rafraichirIndice();
    }else {
        refRetroaction.innerHTML = `Désolé, ${objJSONepigraphes[dernierChoix.ID].PRENOM} ${objJSONepigraphes[dernierChoix.ID].NOM} n'est pas ${(dernierChoix.TYPE == 'objet')? 'l\'':'le '}${dernierChoix.TYPE} recherché.`;
    }

    localStorage.dernierChoix = null;
}


/**
 * Initialisation des composantes de la page
 */
function initialisation() {
    refBtnNouvelleChasse.addEventListener("click", confirmationNouvelleChasse, false);

    if (localStorage.dernierChoix != undefined) {
        (localStorage.dernierChoix != "null") ? vefifierDernierChoix() : refRetroaction.setAttribute("hidden", "hidden");
        afficherChasse();
    }
}

window.addEventListener("load", initialisation, false);