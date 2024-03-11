const express = require("express");
const router = express.Router();
const userRoute = require("./user_route");

router.use("/User", userRoute);

module.exports = router;
