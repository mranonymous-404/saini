
const express = require("express"); 
const path = require("path");
const app = express();
// getting-started.js
var mongoose = require('mongoose');
const bodyparser = require("body-parser");
// const { ok } = require("assert");
mongoose.connect('mongodb://localhost/ContactForm', {useNewUrlParser: true});
port = 5500;


//Using Flash session
var ContactSchema = new mongoose.Schema({
    name: String,
    phone: Number,  
    email: String,
    Company_name: String,
    desc: String,
  });

var Contact = mongoose.model('Contact', ContactSchema);

app.use('/static',express.static('static'));
app.use(express.urlencoded());
//set the template engine as pug
app.set('view engine','pug');

// set the view directory
app.set('views',path.join(__dirname,'views'));

//our pug index endpoint    
app.get("/",(req,res)=>{
    res.status(200).render('home.pug');
});
app.get("/Contact_Us",(req,res)=>{
    res.status(200).render('contact.pug');
});
app.post("/Contact_Us",(req,res)=>{
    var Myform = new Contact(req.body);   
    Myform.save().then(()=>{
        res.end();
    }).catch(()=>{
        res.status(400).send("Unable to save the message , Please Try after some time")
    });
    res.status(200).render('contact.pug',{ messageq: true});            
});
app.get("/about",(req,res)=>{
    res.status(200).render('about.pug');
});
app.get("/Our_Services",(req,res)=>{
    res.status(200).render('service.pug');
});
app.get("/service-area",(req,res)=>{
    res.status(200).render('service-area.pug');
});

app.listen(port,()=>{
    console.log(`Website is started on port ${port}`);
});
