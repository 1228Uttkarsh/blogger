require('dotenv').config();

const express = require('express');//in order to create an express application
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');//It help us to grab the cookies, save cookies..It will store all the sessions, so we cannot login every time
const session = require('express-session');
const MongoStore = require('connect-mongo');//

const connectDB = require('./server/config/db');
const { isActiveRoute } = require('./server/helpers/routeHelpers');



const app = express();//This creates an express application.
const PORT = 5000 || process.env.PORT;//to publish this project online to a server you might have to use their default 
//port number and we use || process.env.PORT

//connect to DB
connectDB();

//Middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    }),
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
  }));

app.use(express.static('public'));

//Templeting ENgine 
// We are doing parallel current template in engine, it is a middleware.

app.use(expressLayout);// to use the express layout
app.set('layout', './layout/main');//to set a default layout
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

app.locals.isActiveRoute = isActiveRoute; 



app.use('/', require('./server/routes/main')); // to use the main.js file things
app.use('/', require('./server/routes/admin'));


app.listen(PORT, ()=>{//to listen on this port number 
    console.log(`App listening on port ${PORT}`);
});