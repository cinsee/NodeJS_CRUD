const mongoose = require('mongoose')
const dbUrl = 'mongodb://localhost:27017/bsDB'

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