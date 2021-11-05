import express from "express";
const app = express();
const port = process.env.PORT || 3000;

let users = [];

app.use(express.json())

app.use((req, res, next) => {
    console.log('a request came', req.body)
    next();
})

app.get('/users', (req, res) => {
    res.send(users)
})

app.get('/users/:id', (req, res) => {
    if (users[req.params.id]) {
        res.send(users[req.params.id])
    }
    else {
        res.send('user not found');
    }
})

app.post('/users', (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400).send('Invalid data')
    }
    else {
        users.push({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        res.send('users created');
    }
})

app.put('/users/:id', (req, res) => {
    if (users[req.params.id]) {
        if (req.body.name) {
            users[req.params.id].name = req.body.name;
        }
        else if (req.body.email) {
            users[req.params.id].email = req.body.email;
        }
        else if (req.body.address) {
            users[req.params.id].password = req.body.password;
        }
        res.send(users[req.params.id])
    }
    else {
        res.send('user not found');
    }
})

app.delete('/users/:id', (req, res) => {
    if (users[req.params.id]) {

        users[req.params.id] = {};
        res.send("users deleted");
    }
    else {
        res.send('user not found');
    }
})

app.get('/', (req, res) => {
    res.send('Welcome to the world of Node.JS');
})

// app.get('/profile', (req, res) => {
//     res.send('This is my profile');
// })


// app.get('/about', (req, res) => {
//     res.send('This is my about me');
// })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})