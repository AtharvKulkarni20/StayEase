const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    default: "https://pixabay.com/photos/building-tower-tall-skyscraper-9192241/",
    set: (v) => (v === "" ? "https://pixabay.com/photos/building-tower-tall-skyscraper-9192241/" : v),
  },
  price: {
    type: Number,
  },
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
