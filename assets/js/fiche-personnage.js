/**
 * JS pour la page de personnage
 * @author Philippe Gourdeau <2266603@csfoy.ca>
 * @version 1.2
*/

/* --- ESLINT --- */
"use strict";
/*global objJSONepigraphes*/

// Déclaration de l'objet
const objFichePersonnage = {
    "id": null,
    "objSelection": null,

    envoiChoix: function (e) {
        // Empeche l'envoi pour ne pas avoir le querry dans l'URL
        e.preventDefault();
        console.log("click");
        localStorage.setItem("dernierChoix", JSON.stringify({ "ID": objFichePersonnage.id, "TYPE": document.querySelector('input[name="formChasse"]:checked').value }));
        window.location.replace("../chasse/index.html");
    },
    /**
     * Modification des éléments dynamique selon la query de L'URL
     */
    initialiser: function () {
        // Assignation variables
        this.id = new URLSearchParams(window.location.search).get("id");

        // Redirection à la galerie si la page est visité sans querry dans l'URL
        (this.id == null) ? window.location.assign("../../galerie/galerie.html") : this.objSelection = objJSONepigraphes[this.id];

        // Assignation de la visite pour la carte
        if (!localStorage.objVisite) {
            localStorage.objVisite = JSON.stringify(new Object);
        }

        // Ajout de l'ID dans le tableau `visite` du localStorage
        let objVisite = JSON.parse(localStorage.objVisite);
        objVisite[this.id] = true;
        localStorage.objVisite = JSON.stringify(objVisite);

        // Ajout du bon icone de domaine
        console.log(this.objSelection.DOMAINE);
        let intTypeDomaine = 0; // Défaut sur science lettre et art
        switch (this.objSelection.DOMAINE) {
            case "Arts visuels":
                intTypeDomaine = 1;
                break;
            case "Sports et spectacles":
                intTypeDomaine = 2;
                break;
            case "Économie et politique":
                intTypeDomaine = 3;
                break;
            default:
                break;
            // faire les différents cas
        }
        document.getElementById('icone_secteur').firstElementChild.src = `../assets/images/_autres/icone_secteur${intTypeDomaine}.png`;

        // Titre
        document.getElementsByTagName("title")[0].innerText =
            this.objSelection.PRENOM + " " +
            this.objSelection.NOM +
            " - Chasse aux épigraphes";

        // Prénom et nom
        document.getElementById("prenom").innerText = this.objSelection.PRENOM;
        document.getElementById("nom").innerText = this.objSelection.NOM;

        // Domaine
        document.getElementById("domaine").innerText = this.objSelection.DOMAINE;

        // Image du peronnage                       ../assets/images/Personnages/405x538_ficheTableX1/e0001_chasse_405.jpg
        document.getElementById("url_image").src = `../assets/images/Personnages/405x538_ficheTableX1/${this.id}_chasse_405.jpg`;
        document.getElementById("titre_image").innerText = this.objSelection.IMAGE.TITRE;
        document.getElementById("credit_image").innerText = this.objSelection.IMAGE.CREDIT;

        // Notes biographiques
        document.getElementById("notes_biographiques").firstElementChild.innerHTML = `${this.objSelection.BIOGRAPHIE}`;

        // Image de Google Maps
        document.getElementById("carteZoom").src = `../assets/images/googleMaps/${this.id}-zoom-google-maps.png`;

        // Adresse civique
        document.getElementById("arrondissement").innerText = this.objSelection.ARRONDISSEMENT;
        document.getElementById("quartier").innerText = this.objSelection.QUARTIER;
        document.getElementById("adresse").innerText = this.objSelection.ADRESSE;

        // Épigraphe
        document.getElementById("url_plaque").src = `../assets/images/Epigraphes/epigraphe_${this.id}.svg`;
        document.getElementById("url_plaque").alt = `Épigraphe de ${this.objSelection.PRENOM} ${this.objSelection.NOM}`;
        document.getElementById("transcript").innerText = this.objSelection.PLAQUE_TRANSCRIPTION;

        // Audio
        // document.getElementById("audio_desc").innerText = this.objSelection.AUDIO.DESCRIPTION;
        document.getElementById("audio_url").firstElementChild.src = this.objSelection.AUDIO.URL;
        document.getElementById("audio_url").load();
        document.getElementById("audio_preambule").innerText = this.objSelection.AUDIO.DESCRIPTION;
        document.getElementById("audio_transcription").innerText = this.objSelection.AUDIO.TRANSCRIPTION;
        document.getElementById("audio_credit").innerText = this.objSelection.AUDIO.CREDIT;

        // Écouteurs d'événements
        document.querySelector("#zoneChasseEnCours>form").addEventListener("submit", this.envoiChoix, false);

        // Affichage du formulaire de chasse si une chasse est en cours
        if (localStorage.id_personnage != null) {
            document.getElementById("statusChasse").setAttribute("hidden", "hidden");
            document.getElementById("zoneChasseEnCours").removeAttribute("hidden");
            document.getElementById("zoneAuncunechasseEnCours").setAttribute("hidden", "hidden");

            document.getElementById("progressionEnquete").innerText =
                Number(localStorage.personnage_est_trouve) +
                Number(localStorage.objet_est_trouve) +
                Number(localStorage.lieu_est_trouve);

            if (localStorage.personnage_est_trouve == "1") {
                document.getElementById("personnage").disabled = "disabled";
            }
            if (localStorage.objet_est_trouve == "1") {
                document.getElementById("objet").disabled = "disabled";
            }
            if (localStorage.lieu_est_trouve == "1") {
                document.getElementById("lieu").disabled = "disabled";
            }

        }

    }
};

objFichePersonnage.initialiser();

