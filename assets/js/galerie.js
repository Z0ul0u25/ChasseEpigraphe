/**
 * @author Lorie-Anne Côté
*/

/* Variables globales */
const refFiches = document.querySelectorAll('.personnages');
const arrBtnType = document.querySelectorAll('.filtre_type'); 
const arrBtnSecteur = document.querySelectorAll('.filtre_secteur');
const refBtnReset = document.getElementById('reset');

/* Écouteurs d'événement */
arrBtnType.forEach(function (btnType) {
    btnType.addEventListener('click', filtrer);
});

arrBtnSecteur.forEach(function (btnType) {
    btnType.addEventListener('click', filtrer);
});

refBtnReset.addEventListener('click', resetFiltres);

/* Fonctions */

/**
 * Filtre les personnages selons leur critères (type d'indice et secteur d'activité)
 */
function filtrer() {

    let strFiltreType = this.dataset.type;
    //console.log("Filtre par type d'indice " + strFiltreType);

    let strFiltreSecteur = this.dataset.secteur;
    //console.log("Filtre par secteur d'activité " + strFiltreSecteur);

    refFiches.forEach(function (fiche) {
        fiche.classList.add('selection');
        console.log(fiche.dataset.type);
        if (fiche.dataset.type == strFiltreType) {
            fiche.classList.remove('selection');
        }
        if (fiche.dataset.secteur == strFiltreSecteur) {
            fiche.classList.remove('selection');
        }
    });

}

/**
 * 
 */
function resetFiltres() {

    refFiches.forEach(function (fiche) {
        fiche.classList.remove('selection');
    });

}