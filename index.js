const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;
const apiKey = 'AIzaSyA7QQAO1InkKyB35IJ-XAKLoBMesPMdXwQ';

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Youtube Scraper API.')
});

//GET Comment Thread Details
app.get('/videos/:videoId', async (req, res) => {
    const { videoId } = req.params;
    const baseUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=replies&textFormat=plainText&order=relevance&videoId=${videoId}&key=${apiKey}`;

    try {
        const response = await request(`${baseUrl}&url=https://www.youtube.com/watch?v=${videoId}`);
        res.json(response);
        console.log(response);

    } catch (error) {
        res.json(error);
    }
})

app.listen(PORT, () => {console.log(`Server up and running at http://localhost:${PORT}`)});