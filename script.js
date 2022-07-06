var posts = [];

$(document).ready(function () {
    //firebase


    GetPosts().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var post = doc.data();
            post.id = doc.id;
            posts.push(post);
            var postIndex = posts.length - 1;
            SetupPost(post, false, postIndex);
        });
    });
    //add page
    includeHTML();
});

function SetupPost(post, prepend, postIndex) {
    // check to see if post has a link preview
    var content = post.content.trim();
    content = " " + content;
    var urls = content.match(/\b(http|https)?(:\/\/)?(\S*)\.(\w{2,4})(.*)/g);
    console.log(urls);
    if (urls) {
        //convert string separated by commas into an array
        urls = urls.join(' ').split(' ');

        for (var i = 0; i < urls.length; i++) {
            var originalUrl = urls[i];
            urls[i] = urls[i].replace("http://", "");
            urls[i] = urls[i].replace("https://", "");
            urls[i] = urls[i].replace("www.", "");

            urls[i] = "http://www." + urls[i];

            //replace text with a link
            content = content.replace(" " + originalUrl, "<a target='_blank' href='" + urls[i] + "'>" + urls[i] + "</a>");
            
        }
        console.log(content);
        var lastUrl = urls[urls.length];
        $.ajax({
            url: "/get-link-preview.php", type: "POST", data: { "lastUrl": lastUrl }, success: function (result) {
                post.preview = result;
                addPostToHtml(post, prepend, postIndex, content);
        } });
    } else {
        addPostToHtml(post, prepend, postIndex, content);
    }
}

function addPostToHtml(post, prepend, postIndex, content) {
    var user = GetUser();
    var likeButtonText = "like";
    for (let i = 0; i < post.likes.length; i++) {
        if (user && post.likes[i] == user.email) {
            likeButtonText = "Unlike";
            break;
        }
    }

    var previewHtml = "";
    if (post.preview) {
        // covert string back to object
        var preview = JSON.parse(post.preview);
        //Embedding a video
        if (preview.embedCode) {
            preview.embedCode = preview.embedCode.replace("<iframe", "<iframe style='width: 100%'");
            previewHtml += preview.embedCode; 
        }
        // Displaying a link preview
        else {
            previewHtml +=
                '<a class="link-preview-anchor" href="' + preview.url + '">'
                    + '<div class="link-preview-container">'
                        + '<img class="link-preview-image" src="' + preview.url + preview.image + '">'
                        + '<div class="link-preview-text-container">'
                        + '<p class="link-preview-title">' + preview.title + '</p>'
                        + '<p class="link-preview-description">' + preview.description + '</p>'
                        + '</div>'
                    + '</div>'
                + '</a>';
        }
    }

    var postHtml =
        '<div class="post-container">'
        + '<p class="post-name">' + post.displayName + '</p>'
        + '<p class="post-content">' + content + '</p>'
        + previewHtml
        + '<p id="like-amt-text-'+postIndex+'" class="like-amt-text">' + GetLikeAmtText(postIndex) + '</p>'
        + '<div class="post-buttons-container">'
        + '<button id="like-post-' + postIndex + '" onclick="LikePost(' + postIndex + ')" class="post-footer-button">' + likeButtonText + '</button>'
        + '<button class="post-footer-button">Comment</button>'
        + '<button class="post-footer-button">Share</button>'
        + '</div>'
        + '<div class="post-create-comment-container">'
        + '<input type="text" id="post-create-comment-'+postIndex+'" class="new-comment-input" placeholder="Write a comment" name="" id="post-new-comment">'
        + '<button class="post-send" onclick="AddCommentToPost(' + postIndex + ')">'
        + '<div class="svg-wrapper-1">'
        + '<div class="svg-wrapper">'
        + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">'
        + '<path fill="none" d="M0 0h24v24H0z"></path>'
        + '<path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"> </path>'
        + '</svg>'
        + '</div>'
        + '</div>'
        + '<span>Send</span>'
        + '</button>'
        + '</div>'
        + '<div id="post-comments-container-' + postIndex + '" class="post-comments-container">'
        + '</div >'
        + '</div>';

    if (prepend == true) {
        $("#posts-container").prepend(postHtml);
    } else {
        $("#posts-container").append(postHtml);
    }

    SetComments(postIndex, 2);
}

function SetComments(postIndex, limit) {
    var counter = 0;
    var post = posts[postIndex];
    $("#post-comments-container-" + postIndex).empty();
    var commentHtml = "";
    for (var i = post.comments.length - 1; i >= 0; i--) { 
        if (limit != null && counter >= limit) {
            break;
        }
        counter += 1;
        commentHtml += CreateCommentHtml(post.comments[i]);
    }

    var commentsExpandText = "";
    var NewLimit = "";
    if (limit == null) {
        commentsExpandText = "Show less";
        NewLimit = "2";

    } else {
        commentsExpandText = "Show more";
        NewLimit = null;
    }

    if (counter < post.comments.length|| limit == null) {
        commentHtml += "<button class='comments-expand-button' onClick='SetComments(" + postIndex + ", " + NewLimit + ")'>" + commentsExpandText + "</button>";
    }

    $("#post-comments-container-"+ postIndex).append(commentHtml);
}

function GetLikeAmtText(postIndex) {
    var post = posts[postIndex];
    var likeAmtText = "";
    if (post.likes) {
        if (post.likes.length == 1) {
            likeAmtText = "1 person has liked this post.";
        } else if (post.likes.length > 1) {
            likeAmtText = post.likes.length + " people have liked this post.";
        }
    }
    return likeAmtText;
}

function CreateCommentHtml(comment) {
    var commentHtml = 
        '<div class="post-comment-container">'
        +'<p class="post-comment-name" > '+comment.name+'</p>'
        +'<p class="post-comment-content">'+comment.content+'</p>'
    +'</div >' ;
    return commentHtml;
}

function LikePost(postIndex) {
    var post = posts[postIndex];
    var likedPost = true;
    var user = GetUser();
    // check to see if user already liked this post
    for (let i = 0; i < post.likes.length; i++) {
        if (user && post.likes[i] == user.email) {
            post.likes.splice(i, 1);
            likedPost = false;
            break;
        }
    }
    if (likedPost == true) {
        post.likes.push(user.email);
        $("#like-post-" + postIndex).text("Unlike");
    } else {
        $("#like-post-" + postIndex).text("Like");
    }

    $("#like-amt-text-" + postIndex).text(GetLikeAmtText(postIndex));
    UpdatePost(post);
}

function AddCommentToPost(postIndex) {
    var post = posts[postIndex];
    var user = GetUser();
    var comment = {
        name: user.displayName,
        content: $("#post-create-comment-" + postIndex).val()
    };
    $("#post-create-comment-" + postIndex).val("");
    
    post.comments.push(comment);
    UpdatePost(post);
    SetComments(postIndex, 2);
}

function CreatePost() {
    var post = {
        displayName: "",
        content: $("#new-post-content").val(),
        likes: [],
        comments: []
    };
    AddPostToDB(post);
    $("#new-post-content").val(" ");
    posts.push(post);
    var postIndex = posts.length - 1;
    SetupPost(post, true, postIndex);
}

// simple text editor
//var txt = document.getElementById("txt");
/*function DisplayName() {
    txt.innerHTML = document.getElementById("name").value;
}*/
////////////////////////////////
//get code from another page
function includeHTML() {
    $("div[data-include]").each(function () {
        $(this).load($(this).data("include"));
    })
}
////////////////////////////////