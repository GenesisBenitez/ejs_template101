const hostName = "127.0.0.1";
const port = 3000;

const express = require('express');
const app = express();

const es6render = require('express-es6-template-engine');
const db = require('./db');
app.engine('html', es6render);
app.set('views', 'templates');
app.set('view engine', 'html');

app.get('/', (req,res) => {
    res.render('home');
});

app.get('/friends/:handle', (req,res) => {
    const {handle} = req.params;
    const friend = db.find(f => f.handle === handle);

    if(friend){
        res.render('friend', { 
            locals: {
            friend
            }
        });
    }else{
        res.status(404)
        .send(`no friend with handle ${handle}`)
    }
});

    app.get('/friends', (req,res) => {
        res.render('friend-list', { 
            locals: {
            friends: db,
            path: req.path
            }
        });

});
app.listen(port, hostName, () => {
    console.log('server started!');
});