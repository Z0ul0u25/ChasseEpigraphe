/**
 * @file JS - menu
 * @description JS utilisé dans toutes les pages pour le menu
 * @author Kate Undercoffler
 * @reviewer Philippe Gourdeau <2266603@csfoy.ca>
 * @version 1.2
*/

/* --- ESLINT --- */
"use strict";

/**
 * Function pour ouvrir et fermer le menu sur mobile
 */
function afficherMenu() {
    let refMobileLiens = document.getElementById("navigation-mobile_liens"); // chercher liens pour la navigation principale en mobile

    let refIconeMenu = document.getElementById('icone-menu');
    console.log(refMobileLiens);//Chercher l'icône du menu

    if (refMobileLiens.style.display === "block") {
        refIconeMenu.classList.add("fa-bars");
        refIconeMenu.classList.remove("fa-window-close");
        refMobileLiens.style.display = "none";
    } else {
        refMobileLiens.style.display = "block";
        refIconeMenu.classList.remove("fa-bars");
        refIconeMenu.classList.add("fa-window-close");
    }
}

document.querySelector(".navigation-mobile button").addEventListener("click", afficherMenu, false);

//window.addEventListener('load', affichermenu)
//html >> soit afficher par default
