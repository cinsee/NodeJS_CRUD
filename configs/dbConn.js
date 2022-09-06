const mongoose = require('mongoose')
const dbUrl = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    } catch (err) {
        console.error(err)
    }
}

module.exports = connectDB
