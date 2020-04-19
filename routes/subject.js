const express = require("express");
const router = express.Router();
const data = require("../data");
const subjectsData = data.subjects;

router.post('/insert/',async(req,res) => {
    const subjectsInfo = req.body;
    try{
        console.log( subjectsInfo);
        const {name,code,professor,maxStudentCount} = subjectsInfo;
        const newSubject = await subjectsData.create(name,code,professor,maxStudentCount);
        res.json(newSubject);
    }catch(e){
        res.status(500).json({error:e});
    }
});

router.get('/search/:id',async(req,res) => {
    try{
        console.log("id: "+req.params.id);
        const subject =  await subjectsData.getByName(req.params.id);
        console.log(subject);
        res.json(subject);
    }catch(e){
        res.status(500).json({error:e});
    }
});

router.post('/update/',async(req,res) => {
    const subjectInfo = req.body;
    try{
        console.log("In udpate subject: "+subjectInfo);
        const {_id,name,code,professor,maxStudentCount} = subjectInfo;
        const subject =  await subjectsData.update(_id,name,code,professor,maxStudentCount);
        res.json(subject);
    }catch(e){
        res.status(500).json({error:e});
    }
});


router.get('/removeById/:id',async(req,res) => {
    try{
        console.log("ID to delete: "+req.params.id);
        const subjectDeleted =  await subjectsData.removeById(req.params.id);
        res.json(subjectDeleted);
    }catch(e){
        res.status(500).json({error:e});
    }
});

module.exports = router;
