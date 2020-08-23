const express = require('express');
const router = express();
const registationController = require("../controllers/registation-controller");


router.get("/", registationController.user);
//router.post("/create", registationController.createOrders);

module.exports = router;