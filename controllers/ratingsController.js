const Rating = require("../models/Rating.model")
const Book = require("../models/Book.model")
const User = require("../models/User.model")

const getRating = async (req,res)=>{
    if (!req.body.id) return res.status(400).json({ "message": 'BookID required' })
    const rating = await Book.findOne({ _id : req.body.id }).exec()
    if (!rating) {
        return res.status(204).json({ 'message': `Book Id ${req.body.id} not found` })
    }
    res.json(rating)
}

const updateRating = async (req,res)=>{
    if (!req.body.id || !req.body.rating) return res.status(400).json({ "message": 'BookID and Rating are required' })
    const book = await Book.findOne({_id : req.body.id})
    if(!book) return res.sendStatus(403)
    const cookies = req.cookies
    const refreshToken = cookies.jwt
    const userFound = await User.findOne({ refreshToken }).exec()
    const userId = userFound.username
    if (book.userId === userId ) return res.status(403).json({"message":"You can not rate it"})
    const rating = await Rating.findOne({ bookId : req.body.id, userId:userId }).exec()
    if (rating) return res.status(403).json({"message":"You have been already rated it"})
    const ratingResult = await Rating.create({
        bookId:req.body.id,
        bookName:book.name,
        userId:userId,
        rating:req.body.rating
    })
    book.ratingScore = book.ratingScore + req.body.rating
    book.ratingCount = book.ratingCount + 1
    book.rating = book.ratingScore/book.ratingCount
    const result = book.save()
    console.log("Rating Update completed!!")
    res.json(ratingResult)
    
    
}

module.exports = { getRating, updateRating }