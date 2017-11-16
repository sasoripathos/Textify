if (typeof POC === "undefined") {
    POC = {};
}

//initialize jquery to use POC.$ so that we know what version of jquery we are running
var j = jQuery.noConflict();
var value = "";
console.log("HACKATHON - running poc, modify dom from here")

let dom;


var r = setInterval(function(){
    j.each(j('.webchat-conversation-footer'), function( index, value ) {
    // console.log("HACKATHON - FOUND CONVERSATION");

    dom = j(this);
    if (j(this).find('#Recode').length < 1){
        j(this).append('<button style="background-color:#2B8CBE; color:black;" id="Recode" class="btn btn-primary"> Record </button>');
    }
    // if (j(this).find('#Send').length < 1) {
    //     j(this).append('<button id="Send", disabled = "true"> Send </button>');
    // }
    var reco = j(this).find('#Recode')[0];
    // console.log(but);
    //window.thebutton = but;
    //clearInterval(r);
    //var snd = j(this).find('#Send')[0];
    reco.addEventListener('click',function(){
        reco.disabled = true;
        window.parent.postMessage({ startRecording: true}, '*');
    });
    // snd.addEventListener('click',function(){
    //     var textArea = document.getElementsByTagName('textarea')[0];
    //     //var textArea = document.querySelector("textarea");
    //     var ev=document.createEvent('Event');
    //     //ev.initEvent('keydown', true,true,window,false,false,false,false,13,0);
    //     ev.initEvent('keypress');
    //     ev.which = ev.keyCode = 13;
    //     console.log(ev);
    //     textArea.dispatchEvent(ev);
    //     //snd.dispatchEvent(ev);
    //     reco.disabled = false;
    //     snd.disabled = true;
    //     window.parent.postMessage({ startRecording: false, sendFinish: true}, '*');
    // });
    clearInterval(r);       
});
}, 1000);



     window.addEventListener("message",function(event){
        if (event.data.phrase) {
            console.log('got message from parent frame', arguments);
            const textArea = document.getElementsByTagName('textarea')[0];
            textArea.value = event.data.phrase;
            //var reco = j(this).find('#Recode')[0];
            //var snd = j(this).find('#Send')[0];
            var reco = document.getElementById('Recode');
            // var snd = document.getElementById('Send');
            // console.log(reco);
            // console.log(snd);
            reco.disabled = false;
            //snd.disabled = false;
            //j(textArea).trigger('keydown')
        }

    });


