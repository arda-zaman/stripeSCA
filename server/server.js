require("babel-polyfill");
const Express = require("express");
const bodyParser = require("body-parser");
const https = require('https')

const keys = require("../common/config");
const API = require("./api/index");
const Renderer = require("./renderer");
const Middlewares = require('./middlewares');

const app = Express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(Express.static("build/public"));

Middlewares(app);
app.use('/api', API);
app.get("*", (req, res) => {
  Renderer(req, res);
});

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});
