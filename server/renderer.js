const { renderToString } = require("react-dom/server");
const React = require("react");
const { StaticRouter } = require("react-router-dom");
const { Helmet } = require("react-helmet");
const { Provider } = require("react-redux");

const createStore = require("../common/createStore");

const Routes = require("../common/routes");
{/* <meta name="viewport" content="width=device-width, initial-scale=1.0"> */ }

const Renderer = (req, res) => {
  const store = createStore({});
  const state = store.getState();

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} query={req.query}>
        <Routes />
      </StaticRouter>
    </Provider>
  );

  const dom = `
  <!DOCTYPE html>
    <html>
    <head>
      ${Helmet.title ? Helmet.title.toString() : ""}
      ${Helmet.meta ? Helmet.meta.toString() : ""}
      <link href="/main.css" rel="stylesheet" />
      <script id="stripe-js" src="https://js.stripe.com/v3/" async></script>
    </head>
    
    <body>
        <div id="root">${content}</div>
        <script>
            window.STORE_DATA = ${JSON.stringify(state).replace("<script>", "")}
        </script>
        <script src="/client_bundle.js"></script>
    </body>
    </html>
  `;

  res.send(dom);
};

module.exports = Renderer;
