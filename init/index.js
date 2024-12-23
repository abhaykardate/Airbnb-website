const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main().then(() =>{
    console.log("conected to db");
}).catch(err =>console.log(err));
async function main(){
     await mongoose.connect(MONGO_URL);
}

const initDB = async () =>{
    await Listing.deleteMany({});
 initData.data =  initData.data.map((obj) =>({
...obj,
owner:"66dac7317b0172133c19ebd7"
    }))
    await Listing.insertMany(initData.data);
    console.log("data was initalialize");
}
initDB();

