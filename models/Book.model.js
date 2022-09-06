const mongoose = require('mongoose')

let bookSchema =mongoose.Schema({
    name:String,
    image:String,
    description:String,
    price:Number,
    discount:Number,
    owner:String,
    date:Date,
    visible:Boolean,
    quantity: Number,
    userId: String,
    ratingScore: Number,
    ratingCount: Number,
    rating: Number 

})



let Book = mongoose.model("Books",bookSchema)


module.exports = Book
