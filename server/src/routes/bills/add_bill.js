const express = require("express")
const router = express.Router();
const addBills = require('../../controllers/bill/add_bill')
const bill_app = require('../../controllers/bill/bill_approval')
const no_bill = require('../../controllers/bill/no_bill')

router.post('/add-bill', addBills.insert_bill)
router.post('/bills',addBills.get_bills)

router.get('/bill-approvals', bill_app.get_approved)
router.get('/bill-reject',bill_app.get_rejected)

router.put('/approve-up',bill_app.update_approve)
router.put('/reject-up',bill_app.update_reject)

router.get('/no-bill', no_bill.get_no_bill)
router.put('/up-no-bill', no_bill.up_no_bill)

module.exports = router