const express = require("express");
const router = express.Router();
// const data = require("../data");

// using SYNC will wait for response to get ready before moving ahead with execution
router.get("/",async(req,res)=>{
    try{
        const personData = {name:"Parthkumar Anilkumar Gandhi", Age:23,GPA:3.67};
        res.json(personData);
    }catch(e){
        res.status(404).json({message:"NOT FOUND"});
    }
});

// Exporting each route that has been declared in Routes folder
module.exports = router;