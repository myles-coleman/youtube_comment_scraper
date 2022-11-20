const apiKey = 'AIzaSyA7QQAO1InkKyB35IJ-XAKLoBMesPMdXwQ';

//maybe eventually implement next page function
let pageToken = '';

let comments = {
    fetchComments: function (videoId, commentId) {
        fetch(
            'https://youtube.googleapis.com/youtube/v3/comments?part=snippet&textFormat=plainText&parentId='+ 
            commentId + '&maxResults=100&pageToken=' + 
            pageToken + '&key='+ 
            apiKey + '&url=https://www.youtube.com/watch?v='+ 
            videoId
        )
        .then((response) => {
            if (!response.ok) {
                alert("Invalid Link.");
                throw Error("Invalid Link.");
            }
            return response.json();
        })
        .then((data) =>  {
            if (data.items.length === 0) {
                alert("Invalid Link.");
                throw Error("Invalid Link.");
            } 
            this.displayComments(data);            
        })
    },
    displayComments: function (data) {

        //gives token for next page
        const { nextPageToken } = data;
        //gives array of comments
        const { items } = data
        //grabs info from comments 
        for (let i = 0; i < items.length; i++) {
            let { snippet } = items[i];
            let { authorDisplayName } = snippet;
            let { likeCount} = snippet;
            let { textOriginal } = snippet;
            console.log(authorDisplayName, textOriginal, likeCount);
        };
    },
    search: function () {
        return document.querySelector(".search-bar").value;
    }
}

const getvideoId = (videoLink) => {
    let videoId = '';
    let videoIdCounter = 0;
    const videoIdLength = 11;
    for (let i = 0; i < videoLink.length; i++) {
        if (i === 32) {// 32 is the position where the videoId starts
            while (videoIdCounter < videoIdLength) {
                videoId += videoLink[i + videoIdCounter];
                videoIdCounter++;
            }
        }
    }
    return videoId;
}

const getCommentId = (videoLink) => {
    let commentId = '';
    let commentIdCounter = 0;
    const commentIdLength = 26;
    for (let i = 0; i < videoLink.length; i++) {
        if ( i === 47)  {// 47 is the position where the commentId starts
            while (commentIdCounter < commentIdLength) {
                commentId += videoLink[i + commentIdCounter];
                commentIdCounter++;
            }
        }
    }
    return commentId;
}

document.querySelector(".search button").addEventListener("click", () => {
    console.log()
    comments.fetchComments(getvideoId(comments.search()), getCommentId(comments.search()));
});

document.querySelector(".search-bar").addEventListener("keyup", (event) => {
    if (event.key === 'Enter') {
        comments.fetchComments(getvideoId(comments.search()), getCommentId(comments.search()));
    }
});

//link format
//https://www.youtube.com/watch?v=lpzVc7s-_e8&lc=Ugwvi1Qq6Xq_4GfU-W54AaABAg
//https://www.youtube.com/watch?v=WZNG8UomjSI&lc=UgxAd-Gkmcjg6wU6xQ54AaABAg