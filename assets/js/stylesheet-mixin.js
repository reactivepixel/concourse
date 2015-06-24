var Stylesheet = {
  loadStylesheet: function(url){
    var head = document.getElementsByTagName('head')[0];
    var link = document.getElementsByTagName('link');

    link.setAttribute('rel','stylesheet');
    link.setAttribute('href','url');
    link.setAttribute('type','text/css');
  }
};
