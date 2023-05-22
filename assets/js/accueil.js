/**
 *  JS pour la visionneuse des vidéo sur la page d'accueil
 * @author Kate Undercoffler
 * @reviewer Philippe Gourdeau <2266603@csfoy.ca>
 * @version 1.5
*/

/* --- ESLINT --- */
"use strict";

// Code de https://stackoverflow.com/questions/5235145/changing-source-on-html5-video-tag


const objVisionneuse = {

    // Choisir un numéro au hasard entre 1-3
    intVideoHasard: Math.floor(Math.random() * 3 + 1),

    //Chercher l'ID de la video et créer le balisage source
    refVideo: document.querySelector('#video'),
    refSource: document.createElement('source'),

    // Variable qui contiene le lien des videos
    strUrlVideo: null,

    //Méthode :
    /**
     * Choisir au hasard une vidéo quand la page initialise
    */
    jouerVideo: function () {

        this.strUrlVideo = "./assets/videos/video_" + this.intVideoHasard + ".mp4";

        //Dans le balisage source, set l'attribute du lien de la video et le type
        this.refSource.setAttribute('src', this.strUrlVideo);
        this.refSource.setAttribute('type', 'video/mp4');

        this.refVideo.appendChild(this.refSource);
        this.refVideo.play();
    },
    /**
     * Quand la video termine, chargement de la video suivante
     */
    videoSuivante: function () {
        // this. ne fonctionne pas car fonction appelé par evenement.
        objVisionneuse.intVideoHasard = (++objVisionneuse.intVideoHasard % 3) + 1;
        objVisionneuse.refVideo.firstElementChild.src = "./assets/videos/video_" + objVisionneuse.intVideoHasard + ".mp4";
        objVisionneuse.refVideo.load();
        objVisionneuse.refVideo.play();
    }

};

objVisionneuse.jouerVideo();

// Assignation des écouteurs d'événements :
document.getElementById('video').addEventListener('load', objVisionneuse.jouerVideo);
document.getElementById("video").addEventListener("ended", objVisionneuse.videoSuivante);