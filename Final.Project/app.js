const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.static(path.resolve(__dirname)));

app.post('/api/posts', (req, res) => {

    let resData = JSON.parse(fs.readFileSync('posts.json'));
    resData = JSON.stringify(resData.concat(req.body));

    fs.writeFile('posts.json', resData, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

app.get('/api/posts', (req, res) => {
    fs.readFile('posts.json', 'utf8', (err, data) => {
        if (err) {
            res.sendStatus(404);
        } else {
            res.status(200).json(data);
        }
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(3000, () => console.log('Server has been started on port 3000...'));