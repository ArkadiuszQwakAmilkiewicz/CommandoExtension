const commandoBox = document.getElementById('commandoBox');
const debug = document.getElementById('debug');


document.addEventListener('keydown', keyPressed);


function keyPressed(e){
    
    //enter pressed (confirm message)
    if(e.keyCode === 13){
        alert('works' + ' ' + commandoBox.value + 'cos' + ' id: ');
        closeBox();
        self.remov
        
    }
    //escape pressed (exit)
}

function closeBox()
{
    var someIframe = window.parent.document.getElementsByTagName('iframe');
    someIframe.parentNode.removeChild(window.parent.document.getElementsByTagName('iframe'));
}