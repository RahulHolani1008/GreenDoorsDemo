const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const compression = require('compression');
const helmet = require('helmet');
const app = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());

const calculationRoutes = require("./src/routes/calculationRoutes.js");
const routes = require("./src/routes/routes.js");

app.use('/calculations', calculationRoutes);
// Always leave this route at the very end
app.use('*', routes);

app.listen(3000);