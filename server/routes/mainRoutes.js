const express = require("express");
const { countryTotal, country, main } = require("../controller/countries");
const router = express.Router();

router.route("/countryTotal").post(countryTotal);
router.route("/country").post(country);
router.route("/").get(main);

module.exports = router;
