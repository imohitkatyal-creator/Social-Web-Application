//to fire the server we need to install express npm install express
const express=require('express');
//npm install cookie-parser
const cookieParser=require('cookie-parser');

const app=express();
const port=8000;

//require database and for setting up mongo  npm install mongoose
const db=require('./config/mongoose');

//for cookie session npm install express-session
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');


//use ejs-layouts by installing npm install express-ejs-layouts
const expressLayouts=require('express-ejs-layouts');

//The express.urlencoded() function is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded());
app.use(cookieParser());

//use static files
app.use(express.static('./assets'));
app.use(expressLayouts);

//extract style and scripts from subpages to the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//set up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'Codieal',
    //Todo change at the time of deployement
    secret:'blah',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*100
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server:${err}`);
    }
    console.log(`Server is running on port:${port}`);
})