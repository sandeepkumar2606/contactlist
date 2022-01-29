const express = require('express');
const res = require('express/lib/response');
const { rmSync } = require('fs');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');//include the config file where we connect the database in mongoose.js

//we can start using the created schema by requireing that
const Contact = require('./models/contact'); //now new entries will be populated using this Contact

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assests'));

var contactlists = [
    
    //we have commented the part after made the database because otherwise these contacts are always visible when we start our server

    // {
    //     name: 'Sandeep Kumar',
    //     contact: '1326645789'
    // },
    // {
    //     name: 'Kumud Nikhil',
    //     contact: '4541217874'
    // },
    // {
    //     name: 'kuldeep kumar',
    //     contact: '3242234443'
    // }
]


app.get('/', function (req, res) {

    //syntax for fetching all the contacts from database({} represents all the contacts)
    Contact.find({}, function (err, contactsfromdatabase) {
        if (err) {
            console.log('error in fetching contacts form database');
            return;
        }

        //render syntax is same as we render before made our database then also we are rendering this way only
        return res.render('home', {
            title: "Contacts List!",
            contact_list: contactsfromdatabase  //bas yaha ab all the contacts fetch from database bhejenge home.ejs file ko
        });

    });




    // this is the syntax before using database to render the contacts to the browser 

    /*
        return res.render('home',{
            title:"Contacts List!",
            contact_list:contactlists
        });
    
    */


    // res.send('<h1> Cool, it is running , or it is?</h1>');


});




app.post('/create-contact', function (req, res) {
    //from this create function the contact that we have created using form is not visible because it is stored in the database so we have to iterate over the contact in the database to be visible over the main page
    Contact.create({

        name: req.body.name,
        contact: req.body.contact

    }, function (err, newContact) {
        if (err) {
            console.log('Error in creating a contact!');
            return;
        }

        console.log('********', newContact);

        res.redirect('back');
    });

    //this is the part before database means we are not using database

    // contactlists.push(
    //     {
    //         name:req.body.name,
    //         contact:req.body.contact
    //     }
    // )

    // return res.redirect('/');

    //or

    //now when we made a database then we don't need to push in the contactlist
    /*
    contactlists.push(req.body);

    return res.redirect('back');
    */
});

app.get('/profile', function (req, res) {
    res.send('<h1> Hii it is cool</h1>');
})

//this is for deleting the contact before when we are not using the database
/*
app.get('/delete-contact', function (req, res) {
    //get query from the requested url using query param
    let phone = req.query.contact;
    let firstname = req.query.name;

    let contactindex = contactlists.findIndex(contac => (contac.contact == phone) && (contac.name == firstname));

    if (contactindex != -1) {
        contactlists.splice(contactindex, 1);
    }

    return res.redirect('back');
});
*/

//deleting contact after when we are using the database so we delete by using id
app.get('/delete-contact', function (req, res) {
    //get query from the requested url using query param and we get id from it
    let id = req.query.id;

    Contact.findByIdAndDelete(id,function(err)
    {
        if(err)
        {
            console('error in deleting the contact');
            return;
        }

        return res.redirect('back');

    })

});



app.listen(port, function (err) {
    if (err) {
        console.log('Error in running the server', err);
        return;
    }

    console.log('Yup! My Express Server is running on Port: ', port);
})