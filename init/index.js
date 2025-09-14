const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listings.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/StayEase";
async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("DataBase Connected ⚙️");
  })
  .catch((err) => {
    console.log(err);
  });

const initDB = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(data.data);
    console.log("data was saved")
}

initDB();

