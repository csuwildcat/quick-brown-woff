
function loadFonts(type, fonts){
  var index = 0;
  var start = new Date().getTime();
  var load = function(name){
    var tag = document.createElement('style');
        tag.type = 'text/css';
        tag.innerHTML = '[fonts~="' + name + '"] .' + name + ':before { font-family: "' + name + '"; content: "' + name + '"; }' +
                        '@font-face { font-family: "' + name + '"; src: url("fonts/' + name + '.' + type + '") format("' + type + '"); }';
    document.head.appendChild(tag);
    new FontFaceObserver(name).check().then(function(){
      document.body.setAttribute('fonts', (document.body.getAttribute('fonts') || '') + ' ' + name);
      var next = fonts[++index];
      if (next) load(next);
      else console.log((new Date().getTime() - start) / 1000);
    });
  }
  load(fonts[0]);
}
