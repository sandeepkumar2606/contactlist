//require the library
const mongoose=require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/contact_list_db');


//acquire the connection(to check if it is successfully connects or not)
const db=mongoose.connection;

//if error
db.on('error',console.error.bind(console,'error connection to db'));


//if up and running then print the message
db.once('open',function()
{
    console.log('Successfully connected to database');
});