/** 
 * @author Kate Undercoffler
*/

/**
 * Function pour ouvrir et fermer le menu sur mobile
 */
function afficherMenu() {
    console.log("beep boop");

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
};
