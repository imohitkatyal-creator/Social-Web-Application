//importing model for fetching user data
const User=require('../models/user');
const passport=require('passport');


module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){

        return res.render('profile',{
            title: 'Profile',
            profile_user:user
         });
    })
}
module.exports.update=function(req,res){
    if(req.user.id==req.params.id){
    User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
        return res.redirect('back');
    })
}else{
    return res.status(401).send("Unauthorised");
}
}
module.exports.posts=function(req,res){
    res.end('<h1>Users post</h1>');
}
//render the signup page
module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }else{
    return res.render('user_signup',{
        title:'User SignUp'     
    });
    }
}

//render the signin page
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }else{
        return res.render('user_signin',{
            title:'User SignIn'     
        });
    }
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
 return res.redirect('/');
}
module.exports.destroySession=function(req,res){
    req.logout();
    return res.redirect('/');
}