/**
 *  JS pour la visionneuse des vidéo sur la page d'accueil
 * @author Kate Undercoffler
 * @reviewer Philippe Gourdeau <2266603@csfoy.ca>
 * @version 1.1
*/

/* --- ESLINT --- */
"use strict";

// Code de https://stackoverflow.com/questions/5235145/changing-source-on-html5-video-tag


const objVisionneuse = {

    //Méthode :
    /**
     * Choisir au hasard une vidéo quand la page initialise
     */
    jouerVideo: function () {
        console.log("hello");

        // Choisir un numéro au hasard entre 1-3
        let intVideoHasard = Math.floor(Math.random() * 3 + 1);

        // Variable qui contiene le lien des videos
        let strUrlVideo = "./assets/videos/video_" + intVideoHasard + ".mp4";

        //Chercher l'ID de la video et créer le balisage source
        let refVideo = document.querySelector('#video');
        let refSource = document.createElement('source');

        //Dans le balisage source, set l'attribute du lien de la video et le type
        refSource.setAttribute('src', strUrlVideo);
        refSource.setAttribute('type', 'video/mp4');

        refVideo.appendChild(refSource);

        refVideo.play();
    }

};

objVisionneuse.jouerVideo();

// Assignation des écouteurs d'événements :
document.getElementById('video').addEventListener('load', objVisionneuse.jouerVideo);