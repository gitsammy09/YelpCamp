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
            const camp = new CampGround({
                location: `${cities[random1000].city}, ${cities[random1000].state}`,
                title: `${sample(descriptors)} ${sample(places)}`
            })
            await camp.save();
        }    
    }

seedDB().then(() => {
    mongoose.connection.close();
});