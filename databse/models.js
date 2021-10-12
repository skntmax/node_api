require('dotenv').config()
const router = require('express').Router();
const mongoose = require('mongoose');
const dbName=process.env.DB_NAME ; 
mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    } , 
    email: {
        type: String,
        required: true
    }, 
    subject: {
        type: String,
        required: true
    } , 
    message: {
        type: String,
        required: true
    }
})

const supportModel = new mongoose.model("support", schema);

const contactUs = new mongoose.model("contact", {
   name: {
        type: String,
        required: true
    } , 
    email: {
        type: String,
        required: true
    }, 
    message: {
        type: String,
        required: true
    }
});

const user = new mongoose.model("user", {
    fullname: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    }, 
    phone: {
         type: Number,
         required: true
     }, 
     password: {
         type: String,
         required: true
     }
 });

if (supportModel && user && contactUs) {
    console.log("model created");
} else
    console.log("There is something error  "); 


module.exports = {supportModel , user ,contactUs};




