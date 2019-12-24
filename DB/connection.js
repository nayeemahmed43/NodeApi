const mongoose = require("mongoose");

const URI = "mongodb+srv://useradmin:dbadpassword@cluster0-l6rwf.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async() =>{
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
        });
        
    console.log("DB connected...")
}

module.exports = connectDB;