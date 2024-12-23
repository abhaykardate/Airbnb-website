const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")

const Listing = require("../models/listing.js");
const {isLoggedIn ,isOwner ,validateListings} = require("../middleware.js");
const ListingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudconfig.js");
const upload = multer({storage});


router.
route("/")
.get( wrapAsync ( ListingController.index))
.post( isLoggedIn,
  
   upload.single('listing[image]'),
   validateListings,
  wrapAsync(ListingController.createListings))
 


 //new route
 router.get("/new" , isLoggedIn ,ListingController.renderNewForm)

router.route("/:id")
.get( wrapAsync (ListingController.showListings))
.put(isLoggedIn
 ,isOwner,
 upload.single('listing[image]'),
  validateListings,wrapAsync (ListingController.updateListings)
 ) 
 .delete(isLoggedIn
  ,isOwner
   ,wrapAsync(ListingController.deleteListings))



 


 //edit route
 router.get("/:id/edit"
 ,isLoggedIn
 ,isOwner
 ,wrapAsync (ListingController.renderEdit))
 

 

 module.exports = router;
