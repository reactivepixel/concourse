var themeN = document.getElementById('theme').innerHTML;

var themeChanger = function(theme){
  var body = document.getElementsByTagName('body')[0];
  body.className = theme;
};
themeChanger(themeN);
