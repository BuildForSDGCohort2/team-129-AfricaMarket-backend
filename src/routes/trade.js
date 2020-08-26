const express = require('express');
const router = express();
const registationController = require("../controllers/trade-controller");
 /* VerifyToken, */
 
 const VerifyToken = require("../auth/VerifyToken");

router.get("/",registationController.test);
router.post("/buy", VerifyToken, registationController.buy);
router.post("/sell", registationController.sell);
router.post("/cancel", registationController.cancel);



module.exports = router;