//Moduels
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const CampGround = require('./models/campground');

//Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log('Mongo Database Connected');
    })
    .catch(err => {
        console.log('Connection Error!!!');
        console.log(err);
    })

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/',(req,res) => {
    res.render('home')
})

app.get('/makecampground', async (req,res) => {
    const camp = new CampGround({title: 'My Backyard', description: 'cheap camping!'});
    await camp.save();
    res.send(camp)
})

app.listen(3000, () => {
    console.log('Serving on port 3000');
})