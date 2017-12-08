var R = require('/lib/render-js/index.js');


exports.get = function(request) {
  return {
    body: R.render([
      R.doctype(),
      R.html([
        R.head(R.title('Page Title')),
        R.body([
          R.main([
            R.h1('Hello World!')
          ]) // main
        ]) // body
      ]) // html
    ]) // render
  }; // return
} // exports.get
