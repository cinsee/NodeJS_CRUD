const Book = require("../models/Book.model")
const User = require("../models/User.model")
const Rating = require("../models/Rating.model")
const fs = require('fs')
const fsPromises = require('fs').promises

const getAllBooks = async (req,res)=>{
    const books = await Book.find({visible:true})
    if(!books) return res.status(204).json({'message':'No Products found'})
    res.json(books)
}


const createNewBook = async (req,res)=>{

    if(!req?.body?.name || !req?.body?.price || !req?.body?.quantity){
        return res.status(400).json({'message':'Please fill the blank'})
    }
    try{
        const cookies = req.cookies;
        const refreshToken = cookies.jwt;
        const userFound = await User.findOne({ refreshToken }).exec();
        const userId = userFound.username
        const result = await Book.create({
            name:req.body.name,
            image:req.file.filename,
            description:req.body.description,
            price:req.body.price,
            discount:req.body.discount,
            owner:req.body.owner,
            date: Date(),
            visible: req.body.visible,
            quantity: req.body.quantity,
            userId: userId,
            ratingScore: 0,
            ratingCount: 0,
            rating: 0
        })
        // const rating = await Rating.create({
        //     bookId:result._id,
        //     bookName:result.name,
        //     userId: userId,
        //     rating: 0,
        //     editable:true
        // })
        res.status(201).json(result)
    }catch(err){
        console.error(err)
    }
}

const updateBook = async(req,res)=>{
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'Book ID required.' })
    }

    const book = await Book.findOne({ _id: req.body.id }).exec()
    if (!book) {
        return res.status(204).json({ "message": `No Book matches ID ${req.body.id}.` })
    }
    const cookies = req.cookies
    const refreshToken = cookies.jwt
    const userFound = await User.findOne({ refreshToken }).exec();
    const userId = userFound.username
    if (book.userId !== userId) return res.status(403).json({"message": `You are not the owner of ${book.name}.`})
    try{
 
        if (req.body?.name) book.name = req.body.name
        if (req.file?.filename) book.image = req.file.filename
        if (req.body?.description) book.lastname = req.body.lastname
        if (req.body?.price) book.price = req.body.price
        if (req.body?.discount) book.discount = req.body.discount
        if (req.body?.owner) book.owner = req.body.owner
        if (req.body?.visible) book.visible = req.body.visible
        if (req.body?.quantity) book.quantity = req.body.quantity
        const result = await book.save();
        console.log("Book Update completed!!")
        res.json(result);
    }catch(err){
        console.error(err)

    }
   
}

const deleteBook = async(req,res)=>{
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Book ID required.' })

    const book = await Book.findOne({ _id: req.body.id }).exec()
    if (!book) {
        return res.status(204).json({ "message": `No Book matches ID ${req.body.id}.` })
    }
    const cookies = req.cookies
    const refreshToken = cookies.jwt
    const userFound = await User.findOne({ refreshToken }).exec()
    const userId = userFound.username
    if (book.userId !== userId) return res.status(403).json({"message": `You can not delete this book.`})
    const rating = await Rating.findOne({bookId:req.body.id}).exec()
    const result = await Book.deleteOne() //{ _id: req.body.id }
    const ratingDelete = await Rating.deleteOne(); //{ _id: req.body.id }
    
    console.log("The Book has been deleted!!")
    res.json(result)
}

const getBook = async(req,res)=>{
    if (!req?.params?.id) return res.status(400).json({ "message": 'Bookid required' })
    const book = await Book.findOne({ _id : req.params.id }).exec()
    if (!book) {
        return res.status(204).json({ 'message': `Book ${req.params.id} not found` })
    }
    // console.log(user)
    res.json(book)
}

module.exports = {getAllBooks,createNewBook,updateBook,deleteBook,getBook}