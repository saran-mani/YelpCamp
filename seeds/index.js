const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "656427650061c3801175aefc",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia blanditiis, odit excepturi vero iste repellendus corporis, voluptate molestiae quas officiis illo. Provident, nulla? Debitis culpa consequuntur repellat sunt quam. Officia!",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/drmva2bnx/image/upload/v1701495533/YelpCamp/huxlz88py1by3d8rvphr.jpg",
          filename: "YelpCamp/huxlz88py1by3d8rvphr",
        },
        {
          url: "https://res.cloudinary.com/drmva2bnx/image/upload/v1701495577/YelpCamp/whzvmkk685bxikguni8x.jpg",
          filename: "YelpCamp/whzvmkk685bxikguni8x",
        },
      ],
    });
    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
