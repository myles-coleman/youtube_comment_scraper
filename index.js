const apiKey = 'AIzaSyA7QQAO1InkKyB35IJ-XAKLoBMesPMdXwQ';
//maybe eventually implement next page function
//i can implement it as a "next page" button at the top of the page (or as a nav header)
// that is grayed out unless there are more than 100 objects in the items[]
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

        let itemIdArr = [];
        let counter = 0;

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
        let content = document.createElement("div");
        content.setAttribute("class", "content");
        let likeNum = document.createElement("h6");

        
        

        //grabs info from comments 
        for (let i = items.length - 1; i >= 0; i--) {
            let { snippet } = items[i];
            let { id } = items[i]; 
            let itemId = getItemId(id);
            let { authorDisplayName } = snippet;
            let { likeCount} = snippet;
            let { textOriginal } = snippet;

            icon.style.backgroundColor = assignColor();
            
            itemIdArr[counter] = assignColor();
            console.log(itemIdArr[counter]);
            //only use colors of a certain color opacity
            //maybe learn map and map a random color to each unique id, and if an id is already in the map, then use the same color

            username.innerHTML = authorDisplayName;
            text.innerHTML = textOriginal;
            likeNum.innerHTML = likeCount;    

            let iconClone = icon.cloneNode(true);
            card.appendChild(iconClone);
            let usernameClone = username.cloneNode(true);
            card.appendChild(usernameClone);
            let likeNumClone = likeNum.cloneNode(true);
            likes.appendChild(likeNumClone);
            let textClone = text.cloneNode(true);        
            content.appendChild(textClone);
            let likesClone = likes.cloneNode(true);
            content.appendChild(likesClone)
            let contentClone = content.cloneNode(true);
            card.appendChild(contentClone);
            let cardClone = card.cloneNode(true);
            document.body.appendChild(cardClone);

            likes.removeChild(likeNumClone);
            content.removeChild(textClone);
            content.removeChild(likesClone);
            card.removeChild(contentClone);
            card.removeChild(usernameClone);
            card.removeChild(iconClone);

            counter++;
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

const getItemId = (id) => {
    let itemId = '';
    let itemIdCounter = 0;
    const itemIdLength = 22;
    for (let i = 0; i < id.length; i++) {
        if ( i === 27)  {// 27 is the position where the itemId starts
            while (itemIdCounter < itemIdLength) {
                itemId += id[i + itemIdCounter];
                itemIdCounter++;
            }
        }
    }
    return itemId;
}

const assignColor = () => {
    const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
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