const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60e161cdca50033d6ce78ac5',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur debitis, nam minima dicta inventore cupiditate et accusamus error molestias. Id ex rem sapiente quaerat, ducimus dolores porro dolorum quam veritatis.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [{
                url: 'https://res.cloudinary.com/dinrvezyp/image/upload/v1625751737/YelpCamp/ai8ekigy8ia5vb1lm7wc.jpg',
                filename: 'YelpCamp/ai8ekigy8ia5vb1lm7wc'
            },
            {
                url: 'https://res.cloudinary.com/dinrvezyp/image/upload/v1625751736/YelpCamp/wonzunxf4mdi8zzxgklj.jpg',
                filename: 'YelpCamp/wonzunxf4mdi8zzxgklj'
            }
            ]

        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})