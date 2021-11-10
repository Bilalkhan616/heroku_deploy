// back-end connection

import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3005;

let users = [];

app.use(express.json())
app.use(cors());

app.use((req, res, next) => {
    console.log('a request came', req.body)
    next();
})

app.get('/', (req, res) => {
    res.send("Welcome to the server back end")
})

//will send all user data

app.get('/users', (req, res) => {
    res.send(users)
})

//will get a specific user data

app.get('/users/:id', (req, res) => {
    if (users[req.params.id]) {
        res.send(users[req.params.id])
    }
    else {
        res.send('user not found');
        console.log(users);
    }
})

//will post user data to the empty array

app.post('/user', (req, res) => {
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

//will edit user data from the previously stored data

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

//will delete user data from the given id

app.post('/user/delete', (req, res) => {
    users.map((item, index) => {
        if (item.email == req.body.email) users.splice(index, 1);
    })

    console.log(users);
    res.send(users);

})

app.post('/user/update', (req, res) => {
    users.map((item, index) => {
        if (item.email == req.body.email) {
            users.splice(index, 1, req.body.updateUserObj);
        }
    });

    console.log(users);
    res.send(users);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
