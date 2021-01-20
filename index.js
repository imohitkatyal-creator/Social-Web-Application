//to fire the server we need to install express npm install express
const express=require('express');
//npm install cookie-parser
const cookieParser=require('cookie-parser');

const app=express();
const port=8000;

//require database and for setting up mongo  npm install mongoose
const db=require('./config/mongoose');

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

//use express router
app.use('/',require('./routes'));

//set up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server:${err}`);
    }
    console.log(`Server is running on port:${port}`);
})