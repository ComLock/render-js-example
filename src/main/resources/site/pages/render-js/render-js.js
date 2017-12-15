var R = require('/lib/render-js/index.js');
var P = require('/lib/xp/portal');


exports.get = function(request) {
  var content = P.getContent();
  var pageHtml = R.render([
    R.doctype(),
    R.html([
      R.head(R.title('Page Title')),
      R.body([
        R.main(
          {dataPortalRegion: 'main'},
          content.page.regions.main.components && content.page.regions.main.components.map(function(component) {
            return '<!--# COMPONENT ' + component.path + ' -->';
          }) || '' // components map
        ) // main
      ]) // body
    ]) // html
  ]);
  //log.info('pageHtml: ' + JSON.stringify(pageHtml, null, 4));
  return {
    body: pageHtml,
    contentType: 'text/html; charset=utf-8'
  }; // return
} // exports.get
