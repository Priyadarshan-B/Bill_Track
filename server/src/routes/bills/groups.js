const express = require("express")
const router = express.Router();

const Group = require('../../controllers/groups/team')

router.get('/team',Group.get_team)

module.exports = router