var R = require('/lib/render-js/html.js');
var P = require('/lib/xp/portal');


exports.get = function(request) {
  var layoutComponent = P.getComponent();
  // log.info('layoutComponent: ' + JSON.stringify(layoutComponent, null, 4));
  var layoutHtml = R.div(
    {
      dataPortalComponentType: 'layout',
      style: {
        alignContent: layoutComponent.config.alignContent,
        alignItems: layoutComponent.config.alignItems,
        display: 'grid',
        gridColumnGap: layoutComponent.config.gridColumnGap,
        gridRowGap: layoutComponent.config.gridRowGap,
        gridTemplateColumns: layoutComponent.config.gridTemplateColumns,
        gridTemplateRows: layoutComponent.config.gridTemplateRows,
        justifyContent: layoutComponent.config.justifyContent,
        justifyItems: layoutComponent.config.justifyItems
      }
    },
    Object.keys(layoutComponent.regions).map(function(regionKey) {
      // log.info('regionKey: ' + JSON.stringify(regionKey, null, 4));
      var region = layoutComponent.regions[regionKey];
      // log.info('region: ' + JSON.stringify(region, null, 4));
      return R.div(
        {
          dataPortalRegion: region.name,
        },
        region.components && region.components.map(function(component) {
          return '<!--# COMPONENT ' + component.path + ' -->';
        }) || '' // components map
      ) // div
    }) // regions map
  ); // render
  // log.info('layoutHtml: ' + JSON.stringify(layoutHtml, null, 4));
  return {
    body: layoutHtml,
    contentType: 'text/html; charset=utf-8'
  };
};
