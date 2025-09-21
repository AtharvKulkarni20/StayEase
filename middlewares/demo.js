const express = require("express");
const app = express();
const path = require("path");
const ExpressError = require("./ExpressError");

const CheckToken = (req, res, next) => {
  let { token } = req.query;
  if (token === "ANK") {
    next();
  }
  throw new ExpressError( 401, "ACCESS DENIED");
};

app.get("/admin", (req,res)=>{
    throw new ExpressError(403, "No Admin Found");
})
app.use((err,req,res,next)=>{
    let {status=500, message} = err;
    res.status(status).send(message);
})

app.get("/profile", (req, res) => {
  data = data;
});

app.get("/", CheckToken, (req, res) => {
  res.send("Route Working");
});

app.listen(8080, () => {
  console.log("Server is Listning at PORT 8080 📡");
});
