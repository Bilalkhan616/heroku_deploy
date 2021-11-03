import express from "express";
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the world of Node.JS');
})

app.get('/profile', (req, res) => {
    res.send('This is my profile');
})


app.get('/about', (req, res) => {
    res.send('This is my about me');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})