var C = require('/lib/render-js/class.js');
var P = require('/lib/xp/portal');

// HTML element functions
var div = C.div;
var style = C.style;

// DOM functions
var addStyle = C.addStyle;
var build = C.build;
var clone = C.clone;
var setAttribute = C.setAttribute;
var setContent = C.setContent;
var setStyle = C.setStyle;
var render = C.render;


// Static semantics
var VIEW = div();

// Static styling
setStyle(VIEW, {
  display: 'grid'
});

// Generate static CSS
build(VIEW);


exports.get = function(request) {
  var layoutComponent = P.getComponent();

  // Make sure we don't mess with the static object
  var dom = clone(VIEW);

  // Dynamic styling
  addStyle(dom, {
    alignContent: layoutComponent.config.alignContent,
    alignItems: layoutComponent.config.alignItems,
    gridColumnGap: layoutComponent.config.gridColumnGap,
    gridRowGap: layoutComponent.config.gridRowGap,
    gridTemplateColumns: layoutComponent.config.gridTemplateColumns,
    gridTemplateRows: layoutComponent.config.gridTemplateRows,
    justifyContent: layoutComponent.config.justifyContent,
    justifyItems: layoutComponent.config.justifyItems
  });

  // Content
  var arr = Object.keys(layoutComponent.regions).map(function(regionKey) {
    var region = layoutComponent.regions[regionKey];

    // Skip empty regions, except in edit mode.
    if(!region.components.length && request.mode !== 'edit') {return;}

    var element = div();
    setAttribute(element, 'dataPortalRegion', region.name);
    setContent(
      element,
      region.components && region.components.map(function(component) {
        return '<!--# COMPONENT ' + component.path + ' -->';
      }) || ''
    );
    return element;
  }) // regions map
    .filter(function(n){return n != undefined}) // Remove empty regions

  setContent(dom, arr);

  // Generate html, css and more...
  var result = render(dom);

  return {
    body: result.html,
    contentType: 'text/html; charset=utf-8',
    pageContributions: {
      headEnd: [
        render(
          style(
            { type:'text/css'}, // Attributes
            result.css.join('\n') // Content
          )
        ).html
      ]
    } // pageContributions
  }; // return
}; // exports.get
