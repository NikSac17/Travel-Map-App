const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const pinRoute = require("./routes/pin");
const userRoute = require("./routes/user");

const app = express();

dotenv.config();

app.use(express.json()); //to send req body ~~~~

const port = 5000;

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}).then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log(err);
});


//routes
app.use("/user",userRoute);
app.use("/pins",pinRoute);


app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
})