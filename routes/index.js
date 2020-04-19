const personalInfo = require("./personalInfo");
const subject = require("./subject");

const constructorMethod = app =>{
    app.use("/personalInfo",personalInfo);
    app.use("/subject",subject);

    app.use("*",(req,res)=>{
        res.status(404).json({error:"NOT FOUND."});
    });
};

// Without exporting the routes we are setting here, it wont apear on screen
module.exports = constructorMethod;