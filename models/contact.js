//through this file we are defining schema
//since mongoose is required to define schema
const mongoose=require('mongoose');

//creating schema (we can refer mongoose documentation)
const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contact:{
        type:String, //because for different country codes we can add +91 in starting and similarly others
        required:true
    }     
 })

 //here we are defining that what will be the collection name of our contactlist in the database
 const Contact=mongoose.model('Contact',contactSchema); //so 'Contact' will be the schema define in the database, we are making the first char of the schema capital as it is a convention to write first word capital
 
 //finally we are exports the schema
 module.exports = Contact;