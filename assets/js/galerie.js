/**
 * @author Lorie-Anne Côté
*/

/* Variables globales */
const fiches = document.querySelectorAll('.personnages');
const arrBtnType = document.querySelectorAll('.filtre_type'); 
const arrBtnSecteur = document.querySelectorAll('.filtre_secteur'); 

/* Écouteurs d'événement */
arrBtnType.forEach(function (btnType) {
    btnType.addEventListener('click', filtrer);
});

arrBtnSecteur.forEach(function (btnType) {
    btnType.addEventListener('click', filtrer);
});

/* Fonctions */
function filtrer() {


    let strFiltreType = this.dataset.type;
    //console.log("Filtre par type d'indice " + strFiltreType);

    let strFiltreSecteur = this.dataset.secteur;
    //console.log("Filtre par secteur d'activité " + strFiltreSecteur);

    fiches.forEach(function (fiche) {
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
