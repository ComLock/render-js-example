var R = require('/lib/render-js/index.js');
var P = require('/lib/xp/portal');


exports.get = function(request) {
  var content = P.getContent();
  return {
    body: R.render([
      R.doctype(),
      R.html([
        R.head(R.title('Page Title')),
        R.body([
          R.main(
            {dataPortalRegion: 'main'},
            content.page.regions.main.components.map(function(c) {
              '<!--# COMPONENT ' + c.path + ' -->'
            }) // map
          ) // main
        ]) // body
      ]) // html
    ]) // render
  }; // return
} // exports.get
