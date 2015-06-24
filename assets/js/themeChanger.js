//ajax call to pass user theme information to body class
$.ajax({
  method: 'get',
  url: '/getUser',
  success: function(data){
    var themeName = data.theme;
    var themeChanger = function(theme){
      var body = document.getElementsByTagName('body')[0];
      body.className = theme;
    };
    themeChanger(themeName);
  }
});
