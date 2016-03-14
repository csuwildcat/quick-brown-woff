
function loadFonts(type, fonts){
  var index = 0;
  var length = fonts.length;
  var start = new Date().getTime();
  var load = function(name){
    var tag = document.createElement('style');
        tag.type = 'text/css';
        tag.innerHTML = '[fonts~="' + name + '"] .' + name + ':before { font-family: "' + name + '"; content: "' + name + '"; }' +
                        '@font-face {' +
                          'font-family: "' + name + '";' +
                          'src: url("fonts/' + name + '.' + type + '") format("' + type + '");' +
                          'unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;' +
                        '}';
    document.head.appendChild(tag);
    new FontFaceObserver(name).check().then(function(){
      document.body.setAttribute('fonts', (document.body.getAttribute('fonts') || '') + ' ' + name);
      var nextIndex = ++index;
      var next = fonts[nextIndex];
      if (nextIndex <= length) document.body.setAttribute('jump', nextIndex);
      if (next) load(next);
      else console.log((new Date().getTime() - start) / 1000);
    });
  }
  load(fonts[0]);
}
