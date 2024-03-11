const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");
const routes = require("./routes");
app.use("/api", routes);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log("Server running on port " + (process.env.PORT || 3001) + ".");
  });
});
