import express from "express";
import path from "path";
import open from "open";

import webpack from "webpack";
import config from "../webpack.config.dev.js";
import middleware from "webpack-dev-middleware";
const compiler = webpack(config);

const port = 3000;
const app = express();

app.use(middleware(compiler,  {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../src/index.html"))
);
app.get('/users', function(req, res){
  res.json([
    {"id":1, "firstName":"Bob", "lastName": "Smith", "email":"bob@gmail.com"},
    {"id":2, "firstName":"Tammy", "lastName": "Norton", "email":"tnorton@gmail.com"},
    {"id":3, "firstName":"Tina", "lastName": "Lee", "email":"lee.tina@gmail.com"},
  ]);
});
app.listen(port, function(err) {
  if (err) {
    console.log(err); //eslint-disable-line no-console
    return;
  }
  open("http://localhost:" + port);
});
