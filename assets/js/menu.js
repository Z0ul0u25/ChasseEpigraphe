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

    // Le check avec `== ""` arrive quand la page est charger que que le JS est activé.
    if (refMobileLiens.style.display === "block" || refMobileLiens.style.display == "") {
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

// Menu afficher par défaut si jamais le JS est désactivé.
window.addEventListener('DOMContentLoaded', afficherMenu);
