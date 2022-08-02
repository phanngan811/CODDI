// Set up tools/environments
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))


// Routes
app.use('/api', require('./routes/authRoutes'))                     // Authentication Router

app.get('/', (req, res) => {
    res.json({msg: "Hello from server!"})
})

// Set up database link
// Connect to MongoDB
const mongoose = require('mongoose');
//the user name and key will be hidden on the development branch
const mongoDB = process.env.DB_ROOT
mongoose.connect(mongoDB); // No more deprecation warning options from version 6.2.8. More Info: https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
let db = mongoose.connection;
db.on('error', console.error.bind(console,'MongoDB connection error:'));
db.once("open", function(){
    console.log("we are in MongoDB");
});

mongoose.Promise = global.Promise;

// Set up port
const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is running on port', port)
})
