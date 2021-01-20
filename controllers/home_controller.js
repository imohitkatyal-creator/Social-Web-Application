module.exports.home=function(req,res){
    // console.log(req.cookies);   ***testing cookie***
    // res.cookie('mohit','hi');   ***changing cookie value***
    return res.render('home',{
        title:'Home',
        // layout:'layout2.ejs' // for selecting between multiple layouts
    });
}
//for creating controller module just do
//module.exports.actionName=fuction(){}