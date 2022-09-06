const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController')
const ROLES_LIST = require('../../configs/roles_list'); 
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(verifyRoles(ROLES_LIST.User),usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.User),usersController.deleteUser)

router.route('/:username')
    .get(verifyRoles(ROLES_LIST.User),usersController.getUser)

module.exports = router;