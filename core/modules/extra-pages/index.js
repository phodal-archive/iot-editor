var path = require('path');

var init = function (runtime) {
  if (runtime) {
    // setup routes
    runtime.once(runtime.events.INIT_ROUTES, function () {
      runtime.routes.push({
        route: 'test1',
        text: 'Test 1',
        navbar: true,
        handler: path.join(__dirname, '/dist/components/page1')
      });
    });
  }
};

module.exports = init;
