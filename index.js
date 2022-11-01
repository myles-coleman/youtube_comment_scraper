const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;
const apiKey = 'AIzaSyA7QQAO1InkKyB35IJ-XAKLoBMesPMdXwQ';

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Youtube Scraper API.')
});

//GET Comment Threads
app.get('/videos/:videoId', async (req, res) => {
    const { videoId } = req.params;
    const baseUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=replies&textFormat=plainText&maxResults=100&order=relevance&videoId=${videoId}&key=${apiKey}`;

    try {
        const response = await request(`${baseUrl}&url=https://www.youtube.com/watch?v=${videoId}`);
        res.json(JSON.parse(response));

    } catch (error) {
        res.json(error);
    }
})

//GET Comment Replies
app.get('/videos/:videoId/comments', async (req, res) => {
    const { videoId } = req.params;
    const comment  = "UgwvHwmg3QjMR_xlt3x4AaABAg"; // this should be changed depending on the comment i want to look in to
    const baseUrl = `https://youtube.googleapis.com/youtube/v3/comments?part=snippet&textFormat=plainText&parentId=${comment}&maxResults=100&key=${apiKey}`;

    try {
        const response = await request(`${baseUrl}&url=https://www.youtube.com/watch?v=${videoId}`);
        res.json(JSON.parse(response));

    } catch (error) {
        res.json(error);
    }
})

app.listen(PORT, () => {console.log(`Server is up and running at http://localhost:${PORT}`)});