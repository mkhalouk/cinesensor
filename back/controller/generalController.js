async function getRoutes(req, res, app) {
  let routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Routes registered directly on the app
      const methods = Object.keys(middleware.route.methods).join(', ').toUpperCase();
      routes.push(`${methods}: ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      // Routes added as router middleware
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          const methods = Object.keys(handler.route.methods).join(', ').toUpperCase();
          // Remove the regular expression notation
          let path = middleware.regexp.source.replace("^\\/", "").replace("(?=\\/|$)", "").replace("\\/?", "/");
          // Remove trailing slash if it exists
          if (path.endsWith("/")) path = path.slice(0, -1);
          const fullPath = path + handler.route.path;
          routes.push(`${methods}: ${fullPath}`);
        }
      });
    }
  });

  res.send(
    'Hello! This is the backend.' +
    '<br />Here\'s the list of the available routes :<br /> - ' +
    routes.join('<br /> - ')
  );
}

module.exports = {
  getRoutes
};
