const express = require('express');

const app = express();

// Middleware
app.use(express.json());

/*Register routes*/

//Helmet routes
const helmetRoutes = require("./routes/helmetRoutes");
app.use("/api/helmet", helmetRoutes);

module.exports = app;
