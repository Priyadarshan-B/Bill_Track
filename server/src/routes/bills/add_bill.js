const express = require("express")
const router = express.Router();
const addBills = require('../../controllers/bill/add_bill')

router.post('/add-bill', addBills.insert_bill)
router.post('/bills',addBills.get_bills)

module.exports = router