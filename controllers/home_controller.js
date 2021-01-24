const Post=require('../models/post');
const User=require('../models/user');
module.exports.home=async function(req,res){
    // console.log(req.cookies);   ***testing cookie***
    // res.cookie('mohit','hi');   ***changing cookie value***
    try{
  let posts=await  Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });
    let users=  await User.find({});

            return res.render('home',{
                title:'Home',
                posts:posts,
                all_users:users
                 // layout:'layout2.ejs' // for selecting between multiple layouts
            });
        }catch(err){console.log("Error",err);return;}
}
//for creating controller module just do
//module.exports.actionName=fuction(){}