const express = require("express")
const router = express.Router()
const ratingsController = require('../../controllers/ratingsController')
const ROLES_LIST = require('../../configs/roles_list'); 
const verifyRoles = require('../../middleware/verifyRoles')

router.route("/")
    .get(verifyRoles(ROLES_LIST.User),ratingsController.getRating)
    .put(verifyRoles(ROLES_LIST.User),ratingsController.updateRating)

module.exports = router