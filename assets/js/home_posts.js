{
    let createPost=function(){
        let newPostForm=$('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(), //store data in form of json keyword:value
                success:function(data){
                    let newPost=newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                    console.log(data.data.post.user.name);
                },error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create post in DOM
    let newPostDom=function(post){
        return $(`<li id="post-${ post._id}">
        <p>
        <small><a class="delete-post-button" href="/posts/destroy/${post._id}">X</a></small>
       ${post.content} <br>${post.user.name}</p>
    <div id="post-comments">
        <form action="/comments/create" id="new-comment-form" method="POST">
        <textarea name="content" id="textarea-css" cols="30" rows="1" placeholder="Comment Here....." required></textarea>
        <input type="hidden" name="post" value="${ post._id}">
        <input type="submit" value="Comment">
        </form>
        <div id="post-comments-list">
                <ul id="post-comments-${ post._id}">
                      
                        
                </ul>
        </div>
    </div>
    </li>`)
    }
    //method to delete post from DOM
    let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    createPost();
}