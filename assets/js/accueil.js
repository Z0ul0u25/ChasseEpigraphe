/** 
 * @author Kate Undercoffler
*/


function myFunction() {
    var x = document.getElementById("navigation-mobile_liens");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
};