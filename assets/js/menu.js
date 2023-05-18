/** 
 * @author Kate Undercoffler
*/


function afficherMenu() {
    console.log("beep boop");

    let x = document.getElementById("navigation-mobile_liens");
    console.log(x);
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
};
