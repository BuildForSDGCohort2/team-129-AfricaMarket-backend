const express = require('express');
const router = express();
const transactionController = require("../controllers/transaction-controller");
 /* VerifyToken, */
 
 const VerifyToken = require("../auth/VerifyToken");

router.get("/",transactionController.test);
router.post("/deposit/:id", VerifyToken, transactionController.deposit);
router.post("/withdraw/:id", transactionController.withdraw);
router.get("/transactions/:id", transactionController.transactions);



module.exports = router;