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

        document.body.removeChild(document.querySelector(".card"));

        let svg = document.querySelector(".svg")
        svg.style.display = 'inline-block';
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        let icon = document.createElement("div");
        icon.setAttribute("class", "icon");
        let username = document.createElement("h2");
        username.setAttribute("class", "username");
        let text = document.createElement("h4");
        text.setAttribute("class", "text");
        let likes = document.createElement("div");
        likes.setAttribute("class", "likes");
        likes.appendChild(svg);

        let likeNum = document.createElement("h6");

        //grabs info from comments 
        for (let i = items.length; i > 0; i--) {
            let { snippet } = items[i-1];
            let { authorDisplayName } = snippet;
            let { likeCount} = snippet;
            let { textOriginal } = snippet;
            console.log(authorDisplayName, textOriginal, likeCount);

            username.innerHTML = authorDisplayName;
            text.innerHTML = textOriginal;
            likeNum.innerHTML = likeCount;    

            let likeNumClone = likeNum.cloneNode(true);
            likes.appendChild(likeNumClone);
            let iconClone = icon.cloneNode(true);
            card.appendChild(iconClone);
            let usernameClone = username.cloneNode(true);
            card.appendChild(usernameClone);
            let textClone = text.cloneNode(true);
            card.appendChild(textClone);
            let likesClone = likes.cloneNode(true);
            card.appendChild(likesClone);
            let cardClone = card.cloneNode(true);
            document.body.appendChild(cardClone);

            likes.removeChild(likeNumClone);
            card.removeChild(likesClone);
            card.removeChild(textClone);
            card.removeChild(usernameClone);
            card.removeChild(iconClone);
        };
    },
    search: function () {
        return document.querySelector(".search-bar").value;
    }
}

//need to put both text and likes in their own div

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