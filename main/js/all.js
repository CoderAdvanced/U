function inFrame () {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

function usingFirefox(){
  return navigator.userAgent.indexOf("Firefox") != -1;
}

var redirectSite = "https://www.google.com";

if(inFrame() != true && usingFirefox() != true && localStorage.getItem("auto_cloak") == "true" && window.location.pathname != "/") {
  var tab = open('about:blank', '_blank')
  // Popup blocked
  if(!tab || tab.closed || typeof tab.closed=='undefined'){
    console.log("Popup blocked");
    window.top.location.replace(window.location.origin + '?url=' + window.location.pathname); //changeSrc handles the rest
  } else { // Finish tab b‍y‍p‍a‍s‍s
    var encoded_url = window.location.origin;
    tab.document.write(`<iframe style="height: 100%; width: 100%; border: none;" src="${encoded_url}" allowfullscreen></iframe>`)
    tab.document.body.style.margin = '0'
    window.location.replace(redirectSite);
  }
}

if(localStorage.getItem("anti_close") == "true"){
  if(inFrame() != false){
    window.top.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      e.returnValue = 'Are you sure you want to leave?';
    });
  } else {
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      e.returnValue = 'Are you sure you want to leave?';
    });
  }
}

var originalTitle = parent.document.title;

document.addEventListener('visibilitychange', function (event) {
  if (parent.document.hidden) {
    if(localStorage.getItem("tabCloakTitle")){
      parent.document.title = localStorage.getItem("tabCloakTitle");
    }
    
    if(localStorage.getItem("tabCloakIcon")){
      this.icon = parent.document.querySelector("link[rel~='icon']");
      if (!this.icon) {
        this.icon = parent.document.createElement("link");
        this.icon.rel = "icon";
        parent.document.getElementsByTagName("head")[0].appendChild(this.icon);
      }
      this.icon.href = localStorage.getItem("tabCloakIcon");
    }
  } else {
    parent.document.title = originalTitle;
    parent.document.querySelector("link[rel~='icon']").href = window.location.origin + "/favicon.ico";
  }

});
