const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listings.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const app = express();
const MONGO_URL = "mongodb://127.0.0.1:27017/StayEase";
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

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

app.get("/", (req, res) => {
  res.send("Route Working");
});

app.get("/listings", async (req, res) => {
  const listingData = await Listing.find();
  res.render("listings.ejs", { listingData: listingData });
});

app.get("/listings/new", (req, res) => {
  res.render("addListings.ejs");
});
app.post("/listings", async (req, res) => {
  // let { title, description, image, price, country, location } = req.body;
  // const newList = new Listing({
  //   title: title,
  //   description: description,
  //   image: image,
  //   price: price,
  //   location: location,
  //   country: country,
  // });
  let newList = new Listing(req.body.listing);
  console.log(newList);
  newList
    .save()
    .then(() => {
      console.log("Data Saved");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/listings");
});

app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const data = await Listing.findById(id);
  res.render("Update.ejs", { data });
});

app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let list = await Listing.findById(id);
  res.render("Detail.ejs", { list });
});

app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const Upadter = await Listing.findByIdAndUpdate(id, {...req.body.listings});  
    res.redirect(`/listings/${Upadter._id}`)
});
app.delete("/listings/:id", async(req,res)=>{
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");

})
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is Listning at PORT ${PORT} 📡`);
});
