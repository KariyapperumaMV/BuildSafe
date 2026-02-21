const express = require('express');

//for registering
const helmetRoutes = require("./routes/helmetRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json());


/*Register routes*/

//Helmet routes
app.use("/api/helmet", helmetRoutes);

//Admin-user routes
app.use("/api/users", userRoutes);

module.exports = app;
