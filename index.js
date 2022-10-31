const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = 'f118fa4301643891f12b54c71f60bbf4';
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Youtube Scraper API.')
});

//GET Product Details
app.get('/videos/:videoId', async (req, res) => {
    const { videoId } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.youtube.com/watch?v=${videoId}`);
        res.json(response);
    } catch (error) {
        res.json(error);
    }
})


app.listen(PORT, () => {console.log(`Server running on http://localhost:${PORT}`)});