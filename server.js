const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const db = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    //do something
    try {
        res.send('it is working!')
    }
    catch(err) {
        console.log(err)
    }
})

app.post(
    '/signin', 
    signIn.handleSignIn(db, bcrypt)
);

app.post(
    '/register',
    register.handleRegister(db, bcrypt)
);

app.get(
    '/profile/:id',
    profile.handleProfileGet(db)
);

app.put(
    '/image',
    image.handleImage(db)
);

app.post(
    '/imageUrl',
    image.handleApiCall
);

app.listen(process.env.PORT || 3001, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})