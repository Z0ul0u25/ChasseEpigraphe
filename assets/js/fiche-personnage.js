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
        this.objSelection = objJSONepigraphes[this.id];

        // Assignation de la visite
        if (!localStorage.visite){
            localStorage.visite = JSON.stringify(new Object);
        }

        let visite = JSON.parse(localStorage.visite);
        visite[this.id] = true;
        localStorage.visite = JSON.stringify(visite);

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
        document.getElementById("notes_biographiques").innerHTML = `<p>${this.objSelection.BIOGRAPHIE}`;
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

        //Écouteurs d'événements
        document.querySelector("#zoneChasseEnCours>form").addEventListener("submit", this.envoiChoix, false);

        if (localStorage.id_personnage != null) {
            document.getElementById("statusChasse").setAttribute("hidden", "hidden");
            document.getElementById("zoneChasseEnCours").removeAttribute("hidden");

        }

    }
};

objFichePersonnage.initialiser();