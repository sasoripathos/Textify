var s = document.createElement('script');

var html = "<textarea type=\"textarea\" id=\"phraseDivAgent\" style=\"display: none;\"> </textarea>";
html += "<button type=\"button\" id=\"RecordAgent\" hidden=\"true\">Record</button>"

var d = document.createElement("input");
d.id = "RecordAgent";
d.style.cssText = "display:none;"
document.body.appendChild(d);

var dd = document.createElement("textarea");
dd.id = "phraseDivAgent";
dd.style.cssText = "display:none;"
document.body.appendChild(dd);


s.src = chrome.extension.getURL('inject.js');

(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
};


var s2 = document.createElement('script');
s2.src = chrome.extension.getURL('speech.browser.sdk.js');
(document.head||document.documentElement).appendChild(s2);
s2.onload = function() {
    s2.parentNode.removeChild(s2);
};



//initialize jquery to use POC.$ so that we know what version of jquery we are running
var j = jQuery.noConflict();
var value = "";
console.log("HACKATHON: Agent side")


// let dom;
// $('.chat-textarea .ember-view')
// .parent().parent().parent().append('<button/>')

var id = 0;
var r = setInterval(function(){
    j.each(j('.chat-textarea .ember-view'), function( index, value ) {
        console.log("HACKATHON - FOUND CONVERSATION");

        var a = j(this)
         console.log(a.attr('class'));
        
        if (a.hasClass('giphy-picker'))
        {
           // id = a.id;     
           a.parent().parent().parent().append('<button  id="agenttest"> Test </button>')

           console.log(a.parent().parent().parent().find('#agenttest'));
            var but = a.parent().parent().parent().find('#agenttest')[0]
            console.log(but);
            window.thebutton = but;
            //clearInterval(r);

            but.addEventListener('click',function(){
                window.parent.postMessage({ startRecordingAgent: true }, '*');
            });

           clearInterval(r);       
        }

    });
}, 10000);



	 // window.addEventListener("message",function(event){
	 // 	if (event.data.phrase) {
  //       	console.log('got message from parent frame', arguments);
  //       	const textArea = document.getElementsByTagName('textarea')[0];
  //       	textArea.value = event.data.phrase;
  //       	//j(textArea).trigger('keydown')
  //       }

  //   });


