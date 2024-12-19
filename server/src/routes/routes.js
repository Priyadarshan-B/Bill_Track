const express = require("express");
const resourcesRouter = require("./resourceRoutes/resource");
const authRouter = require("./auth/authRoute");
const bills = require('./bills/add_bill')
const groups = require('./bills/groups')

const router = express.Router();

// Use both routers
router.use("/api", resourcesRouter);
router.use("/api/auth", authRouter);
router.use('/api', bills)
router.use('/api', groups)

module.exports = router;
