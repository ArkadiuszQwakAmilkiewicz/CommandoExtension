const commandoBox = document.getElementById('commandoBox');
const debug = document.getElementById('debug');


document.addEventListener('keydown', keyPressed);


function keyPressed(e){
    
    //ENTERING input kills the iFrame (escape still needs to be implemented)
    //enter pressed (confirm message)
    if(e.keyCode === 13){
        alert('works' + ' ' + commandoBox.value + 'cos' + ' id: ');
    }
    //escape pressed (exit)
}

function closeBox(){
    //document.getElementById("message").value = "CLOSE";
}