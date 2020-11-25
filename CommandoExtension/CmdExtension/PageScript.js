console.log("PageScript runs");
//Adding listener
document.addEventListener('keydown', keyPressed);
const searchOverlayWindow = document.createElement("iframe");
searchOverlayWindow.style =    
            `
            all: initial !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: 1000000 !important;
            `;

searchOverlayWindow.src = browser.extension.getURL("box.html");
searchOverlayWindow.onload = Show;

//key Press handler in Content
function keyPressed(e){
    
    //CHECKS if it's a letter and if the target isn't of type input like searchBoxes
    if(e.keyCode > 64 && e.keyCode  < 91 && e.target.nodeName != "INPUT" && e.target.nodeName !="SELECT" && e.target.nodeName != "TEXTAREA"){
        console.log(e.key);
        //CODE
        document.body.appendChild(searchOverlayWindow);
    }
}

function Show(){
    const window = searchOverlayWindow.contentWindow;
    const doc = searchOverlayWindow.contentDocument;
    const searchBox = doc.getElementById("commandoBox");
    //adding listener for pressed keys
    window.document.addEventListener('keydown', keysIFrame)
    //focusing on input box
    window.focus();
    searchBox.focus();

}
//key Press handler in  IFrame
function keysIFrame(e){
    //WHEN ENTER PRESSED PROCESSMESSAGE
    if(e.keyCode === 13){
        const doc = searchOverlayWindow.contentDocument;
        const searchBox = doc.getElementById("commandoBox");

       ProcessMessage(searchBox.value);
    }
    //WHEN ESCAPE PRESSED EXIT
    if(e.keyCode === 27){
        closeBox();
    }
}
function ProcessMessage(msg){
    console.log("message: " + msg);
    //PROCESSING
    //CODE
    //TALKING WITH BACKGROUND SCRIPT WHICH HANDLES THE MESSAGE
    closeBox();
}
function closeBox(){
    searchOverlayWindow.remove();
}