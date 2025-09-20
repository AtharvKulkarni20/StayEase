const express = require("express");
const app = express();
const path = require("path");


app.use((req,res,next)=>{
    const {token} = req.query
    if(token==="ANK"){
        next();
    }else{
        res.status(401).send("Unauthorized")
    }
    
})

app.get("/", (req, res) => {
    res.send("Route Working");
})

app.listen(8080, () => {
    console.log("Server is Listning at PORT 8080 📡");
})