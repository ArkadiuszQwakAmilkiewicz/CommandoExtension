console.log("background runs")

//CREATEMODE 0 gives '-' 1 gives '+' 2 gives '*'
var defCreationMode = 0;
//COMMANDMODE 0 gives commando 1 gives '@' 2 gives '#'
//not implemented
var defCommandMode = 0;

function Commando(cmd, description, startFill, endFill, isURL) {

    this.cmd = cmd;
    this.description = description;
    this.startFill = startFill;
    this.endFill = endFill;
    this.isURL = isURL;
    // def
    this.Run = function({message = "", creationMode = defCreationMode, pin = false})
    {   
        if(isURL){
            messege = encodeURIComponent(message);
        }
        switch(creationMode)
        {
            case 0: // '-'
                chrome.tabs.update({ url: startFill + message + endFill, active: true, pinned : pin});
                break;
            case 1: // '+'
                chrome.tabs.create({url: startFill + message + endFill, active: true, pinned : pin});
                break;
            case 2: // '*'
                chrome.tabs.create({url: startFill + message + endFill, active: false, pinned : pin});
                break;
        }
    }
};
//NEEDS TO BE WRITTEN! 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//"just write" COMMUNICATION WITHOUT OMNIBOX
//TALKING WITH OTHER SCRIPTS
//CREATING COMMANDOS FROM SETTINGS PAGE
//STORING COMMANDOS localy
//READING COMMANDOS WHEN background starts
//READING COMMANDOS
//NEW PROFILES COMMANDOS '%' has to be fully added everywhere
//PRE SYSTEM COMMANDS '#'
//PRE BROWSER COMMANDS '@'


//#region USELESS IN THE FUTURE
var cmdmando = new Commando("go", "Google","https://www.google.com/search?source=hp&q=", "", true);
var cmdmando1 = new Commando("wiki", "Wikipedia","https://en.wikipedia.org/wiki/Special:Search?search=", "&go=Go&ns0=1", true);
var cmdmando2 = new Commando("yt", "YouTube","https://www.youtube.com/results?search_query=", "", true);
var ListOfCommandos = [];
ListOfCommandos.push(cmdmando);
ListOfCommandos.push(cmdmando1);
ListOfCommandos.push(cmdmando2);
//#endregion
//#region  Defining modifires and list of modifires
var CreateModifireNew = '+';
var CreateModifireNewInactive = '*';
var CreateModifireUpdate = '-';
var PinModifire = '!';
var URLmodifire = '@';
var FILEmodifire = '#';

var ListOfModifires = [];
ListOfModifires.push(CreateModifireNew);
ListOfModifires.push(CreateModifireNewInactive);
ListOfModifires.push(CreateModifireUpdate);
ListOfModifires.push(PinModifire);
ListOfModifires.push(URLmodifire);
ListOfModifires.push(FILEmodifire);
//#endregion



//#region Adding Listeners
//CLICK on extension listener
chrome.browserAction.onClicked.addListener(function(tab){
    chrome.tabs.create({url: '/SettingsPage/Settings.html'})
})
//Message from omnibox listener
chrome.omnibox.onInputEntered.addListener(function(text){
    

    var com = text.split(" ", 1);
    //FULL CMD later PURE CMD(without modifires)
    var command = com[0];
    //empty string of MODIFIRES later PURE string of MODIFIRES
    var modifires = "";
    //MESSAGE TO CMD
    var message = text.substring(command.length);

    //#region Building modifires string
    var found = 0;
    //FIRST modifire search
    for(a=0; a < ListOfModifires.length; a++){
        //!!!! (&& found < 1) is being used because the damn console throws the error when using (break;)
        if(command[0] == ListOfModifires[a] && found < 1){
            found++;
            modifires = modifires + ListOfModifires[a];
            command = command.substring(1);
            //SECOND modifire search
            for(b=0; b < ListOfModifires.length; b++){
                if(command[0] == ListOfModifires[b] && found < 2){
                    found++;
                    modifires = modifires + ListOfModifires[b];
                    command = command.substring(1);
                    //THIRD modifire search
                    for(c=0; c < ListOfModifires.length; c++){
                        if(command[0] == ListOfModifires[c] && found < 3){
                            found++;
                            modifires = modifires + ListOfModifires[c];
                            command = command.substring(1);
                        }
                    }
                }
            }
        }
    }
    //#endregion Building modifires string
    //#region ReadingModifires string
    var CrMode = defCreationMode;
    var CmdMode = 0;
    var PinMode = false; 
    for(d=0; d<modifires.length; d++){
        switch(modifires[d])
        {
            case('!'):
                PinMode = true;
                break;
            case('@'):
                CmdMode = 1;
                break;
            case('#'):
                CmdMode = 2;
                break;
            case('-'):
                CrMode = 0;
                break;
            case('+'):
                CrMode = 1;
                break;
            case('*'):
                CrMode = 2;
                break;
        }
    }
    //#endregion ReadingModifires string
    var called = false;
    // calling command
    ListOfCommandos.forEach(function (item) {
        
        if(CmdMode == 0){
            if(command == item.cmd){
                item.Run({message: message, creationMode: CrMode, pin: PinMode});
                called = true;
            }
        }
    })
    if(!called)
    {
        console.log("User sends: " + text);
        console.log("Unvalid command");
        console.log("Modifires: " + modifires);
        console.log("Mesage: "  + message);
        console.log("CreationMode: " + CrMode + " PinMode: " + PinMode + " CmdMode: " + CmdMode);
        chrome.tabs.create({url: '/SettingsPage/Settings.html'})
    }
})
//#endregion


