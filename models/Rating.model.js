const mongoose = require('mongoose')

let ratingSchema = mongoose.Schema({
    bookId:String,
    bookName:String,
    userId:String,
    rating:Number
    // editable: Boolean
})



let Rating = mongoose.model("Ratings",ratingSchema)

module.exports = Rating
