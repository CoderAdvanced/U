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

function openBackup(){
    var encoded_url = window.location.origin;
    var w = open('about:blank', '_blank') || alert("It seems like you are blocking pop-ups. Please try again once you have allowed pop-ups.")
      w.document.write(`<iframe style="height: 100%; width: 100%; border: none;" src="${encoded_url}" allowfullscreen></iframe>`)
      w.document.body.style.margin = '0'
  
  window.location.replace(redirectSite);
}

if( window.location.pathname == "/"){
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  if(params.url){
    var frameUrl = params.url;
  } else {
    var frameUrl = "/main.html";
  }
  document.querySelector(".frame").src = window.location.origin + frameUrl;

  if(inFrame() != true && usingFirefox() != true && localStorage.getItem("auto_cloak") == "true"){
    var openBlank = confirm("Would you like to hide this from your history? (To disable this popup, turn off 'Automatic Hidden Mode' in Settings)");
    
    if(openBlank == true) {
      document.querySelector(".warning").style.display = "flex";
      document.onmousedown = () => {openBackup()};
      document.onkeydown = () => {openBackup()};
      /*document.onclick = () => {openBackup()};*/
    }
  }
}


