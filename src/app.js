//app.js
const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");
const compression = require('compression');
const helmet = require('helmet');

const calculationRoutes = require("./routes/calculationRoutes.js");
const routes = require("./routes/routes.js");

app.use(morgan("combined"));
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());

app.use('/calculations', calculationRoutes);
// Always leave this route at the very end
app.use('*', routes);

module.exports = app;