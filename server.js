require('dotenv').config()
const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors")
const corsOptions = require("./configs/corsOptions")
const verifyJWT = require("./middleware/verifyJWT")
const cookieParser = require("cookie-parser")
const credentials = require("./middleware/credentials")
const mongoose = require("mongoose")
const connectDB = require("./configs/dbConn")
const PORT = process.env.PORT || 3000
connectDB()

app.use(credentials)
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended:false}))
app.use(express.json())
app.use(cookieParser())
// app.use(storage())

app.set("views",path.join(__dirname,"views"))
app.set("views engine","ejs")
app.use(express.static(path.join(__dirname,"public")))

app.use("/",require("./routes/root"))
app.use("/login",require("./routes/login"))
app.use("/register",require("./routes/register"))
app.use("/auth",require("./routes/auth"))
app.use("/refresh",require("./routes/refresh"))
app.use("/logout",require("./routes/logout"))


app.use(verifyJWT)
app.use('/books',require("./routes/api/books"))
app.use('/users', require('./routes/api/users'))
app.use('/ratings',require('./routes/api/ratings'))

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
