const express = require('express');
const mysql = require('mysql2');
const dotenvs = require('dotenv');
const path = require('path');
const hbs = require('hbs');


dotenvs.config({path: './.env'})
const app = express();


// parse url-encoded bodies (as sent by html forms)
app.use(express.urlencoded({extended:true}))

// parse json bodies (as sent by API clients)
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: 8889
})

db.connect((err)=>{
    if (err){
       console.log(err);
    }
    else{
        console.log("Mysql connected");
    }
    })


    app.use('/auth',require('./routes/auth.js'))

const publicDirectory = path.join(__dirname,'public')
app.use(express.static(publicDirectory));




// Set Handlebars as the templating engine
// app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
// Setup the path for views
const viewsDirectory = path.join(__dirname, 'views');
app.set('views', viewsDirectory);



app.use('/',require('./routes/pages.js'))

app.use('/uploads',express.static('uploads'))






app.listen(3000,()=>{
    console.log("App is running.");
})

// http://localhost:8888/phpMyAdmin5/