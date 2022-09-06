const express = require('express');
const router = express.Router();
const booksController = require('../../controllers/booksController');
const ROLES_LIST = require('../../configs/roles_list'); 
const verifyRoles = require('../../middleware/verifyRoles')
const multer = require("multer")

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public/img/books")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + ".jpg")
    }
})

const upload = multer({
    storage:storage,
})

router.route('/')
    .get(verifyRoles(ROLES_LIST.User),booksController.getAllBooks)
    .post(verifyRoles(ROLES_LIST.User),upload.single("createBook"),booksController.createNewBook)
    .put(verifyRoles(ROLES_LIST.User),upload.single("updateBook"),booksController.updateBook)
    .delete(verifyRoles(ROLES_LIST.User),booksController.deleteBook);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.User),booksController.getBook);

module.exports = router;