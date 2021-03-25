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
//mongo store for storing session cookies
const MongoStore=require('connect-mongo')(session);

//for scss npm install node-sass-middleware
const sassMiddleware=require('node-sass-middleware');

//for flash msges npm install connect-flash
const flash=require('connect-flash');
// ..middleware for flash
const customMware=require('./config/middleware');

//use ejs-layouts by installing npm install express-ejs-layouts
const expressLayouts=require('express-ejs-layouts');

//for converting scss file to css
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))

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
    },
    store: new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },function(err){
        console.log(err||'connect-mongodb setup ok');
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
//use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server:${err}`);
    }
    console.log(`Server is running on port:${port}`);
})