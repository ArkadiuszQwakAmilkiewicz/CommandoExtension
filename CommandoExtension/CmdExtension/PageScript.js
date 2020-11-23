console.log("PageScript runs");
//Adding listener
document.addEventListener('keydown', keyPressed);
const searchOverlayWindow = document.createElement("box");
searchOverlayWindow.src = browser.extension.getURL("box.html");

function keyPressed(e){
    
    //CHECKS if it's a letter and if the target isn't of type input like searchBoxes
    if(e.keyCode > 64 && e.keyCode  < 91 && e.target.nodeName != "INPUT" && e.target.nodeName !="SELECT" && e.target.nodeName != "TEXTAREA"){
        console.log(e.key);
        //CODE
        searchOverlayWindow.focus();
    }
}