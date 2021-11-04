const chalk = require("chalk");
const debug = require("debug")("pets:server");
const express = require("express");
const morgan = require("morgan");
const { notFoundErrorHandler, generalErrorHandler } = require("./error");
const petsRoutes = require("./routes/petsRoutes");
const ownersRoutes = require("./routes/ownersRoutes");

const app = express();

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.yellow(`Escuchando en el puerto ${port}`));
  });

  server.on("error", (error) => {
    debug(chalk.red("Ha habido un error al iniciar el servidor."));
    if (error.code === "EADDRINUSE") {
      debug(chalk.red(`El puerto ${port} está en uso.`));
    }
  });
};

app.use(morgan("dev"));
app.use((req, res, next) => {
  debug("Soy el segundo middleware");
  next();
});
app.use("/pets", petsRoutes);
app.use("/owners", ownersRoutes);

app.use((req, res, next) => {
  debug("He llegado hasta aquí");
  next();
});
app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

module.exports = initializeServer;