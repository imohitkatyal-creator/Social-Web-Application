//importing model for fetching user data
const User=require('../models/user');



module.exports.profile=function(req,res){
    return res.render('profile',{
       title: 'Profile'
    });
}
module.exports.posts=function(req,res){
    res.end('<h1>Users post</h1>');
}
//render the signup page
module.exports.signup=function(req,res){
    return res.render('user_signup',{
        title:'User SignUp'     
    });
}

//render the signin page
module.exports.signin=function(req,res){
    return res.render('user_signin',{
        title:'User SignIn'     
    });
}

//get the sign-up data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){ console.log(err,"Error in signing up the user");return}
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log(err,"Error in creating the user");return}
                
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }

    });
}

//sign-in and create session for a user
module.exports.createSession=function(req,res){

}