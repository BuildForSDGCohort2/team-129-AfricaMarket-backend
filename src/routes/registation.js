const express = require('express');
const router = express();
const registationController = require("../controllers/registation-controller");


router.get("/", registationController.test);
router.post("/me", registationController.user);
router.post("/create", registationController.createUser);
router.post("/auth", registationController.auth);

module.exports = router;