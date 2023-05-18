/**
 * @author Lorie-Anne Côté
*/

/* Variables globales */

const refPersonnages = document.querySelectorAll('.personnages');
const arrTypeIndice = document.querySelectorAll('indice');

/* Écouteurs d'événement */
arrTypeIndice.forEach(function (inputFiltre) {
    inputFiltre.addEventListener('click', filtrer);
});

/* Fonctions */
function filtrer() {
    let filtre = this.dataset.critere;
    console.log(filtre);
    console.log("ça passe??");
    refPersonnages.forEach(function (personnage) {

        personnage.classList.remove('selection');
        
        console.log(personnage.dataset.critere);

        if (personnage.dataset.critere == filtre) {
            personnage.classList.add('selection');
        }
    });
}

console.log("AAAAAAAH")