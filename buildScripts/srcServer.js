import express from "express";
import path from "path";
import open from "open";
import webpack from "webpack";
import config from "../webpack.config.dev.js";
import middleware from "webpack-dev-middleware";
import compression from "compression";
import chalk from 'chalk';

const isProd = (process.argv[2] || '').includes('--prod');
const port = 3000;
const app = express();
const folder = !isProd ? "src" : "dist";
if (!isProd) {
  const compiler = webpack(config);
  app.use(
    middleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    })
  );
  console.log(chalk.green('run server in dev mode')); //eslint-disable-line no-console
} else {
  app.use(compression());
  app.use(express.static(folder));
  console.log(chalk.green('run server in prod mode')); //eslint-disable-line no-console
}
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, `../${folder}/index.html`))
);
if (!isProd) {
  app.get("/users", function (req, res) {
    res.json([
      { id: 1, firstName: "Bob", lastName: "Smith", email: "bob@gmail.com" },
      {
        id: 2,
        firstName: "Tammy",
        lastName: "Norton",
        email: "tnorton@gmail.com"
      },
      { id: 3, firstName: "Tina", lastName: "Lee", email: "lee.tina@gmail.com" }
    ]);
  });
}
app.listen(port, function (err) {
  if (err) {
    console.log(err); //eslint-disable-line no-console
    return;
  }
  open("http://localhost:" + port);
});
