const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'             //refering schema name
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }]
},{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);  // here 'Post' is the name of newly created schema having postSchema configuration stored in const Post. 

module.exports=Post;