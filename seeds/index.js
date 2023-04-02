//Moduels
const mongoose = require('mongoose');
const CampGround = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

//Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log('Mongo Database Connected');
    })
    .catch(err => {
        console.log('Connection Error!!!');
        console.log(err);
    })

const sample = array => array[Math.floor(Math.random() * array.length)];

    const seedDB = async () => {
        await CampGround.deleteMany({});
        for(let i = 0; i < 50; i++){
            const random1000 = Math.floor(Math.random() * 1000);
            const price = Math.floor(Math.random() * 30) + 10
            const camp = new CampGround({
                author: '6428f843f023bcb55f2406e3',
                location: `${cities[random1000].city}, ${cities[random1000].state}`,
                title: `${sample(descriptors)} ${sample(places)}`,
                image: 'https://source.unsplash.com/collection/483251',
                description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia quos perspiciatis est repellendus, et facilis tenetur dolorem quaerat unde nostrum, facere assumenda eligendi. Nihil in, voluptate excepturi adipisci sit voluptatibus!',
                price
            })
            await camp.save();
        }    
    }

seedDB().then(() => {
    mongoose.connection.close();
});