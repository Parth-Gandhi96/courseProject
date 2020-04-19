const mongoCollections = require("../config/mongoCollections");
const subjects = mongoCollections.subjects;
const uuid = require("node-uuid");

async function create(name,code,professor,maxStudentCount){
    if(!name || !code || !professor || !maxStudentCount)
        throw("Incomplete subject data.");
    
    if(typeof name != "string" || typeof code != "number" || typeof professor != "string" || typeof maxStudentCount != "number")
        throw("Incompatible datatype for inserting data of subject.");

    const subjectCollection = await subjects();

    let newSubject = {
        name : name,
        code :code,
        professor : professor,
        maxStrudentCount : maxStudentCount,
        _id : uuid.v4()   // Always gives unique ID each time
    };
    const insertedInfo = await subjectCollection.insertOne(newSubject);

    if(insertedInfo.insertedCount ==0 ) throw("Error occured while insetring the new subject data.");

    const newSubjectID = insertedInfo.insertedId;
    const subjectAdded = await get(newSubjectID);

    return subjectAdded;
};

async function getByName(name){
    if(!name || typeof name!="string")  throw("The name is NULL or not string.");

    const subjectCollection = await subjects();
    let subjectCurser = await subjectCollection.find({name: name}).toArray();
    let ans = {};
    let index= 0;
    for(let obj of subjectCurser){
        ans[index] = obj;
        index++;
    }
    return ans;
};

async function get(id){
    if(!id) throw("Please provide the ID for the search.");

    const subjectCollection = await subjects();
    const subjectSeached = subjectCollection.findOne({_id : id});

    if(subjectSeached===null)   throw("No Subject with given id: "+id);

    return subjectSeached;
};

async function removeById(id){
    if(!id) throw("Please provide the ID for the search.");

    const subjectCollection = await subjects();
    const removedSubject = subjectCollection.deleteOne({_id : id});

    if(removedSubject.deletedCount==0)   throw("No Subject with given id: "+id);

    return removedSubject;
};

async function update(id,name,code,professor,maxStudentCount){
    if(!name || !code || !professor || !maxStudentCount)
        throw("Incomplete subject data.");
    
    if(typeof name != "string" || typeof code != "number" || typeof professor != "string" || typeof maxStudentCount != "number")
        throw("Incompatible datatype for updating data of subject.");

    const subjectCollection = await subjects();
    let updatedSubject = {
        name : name,
        code :code,
        professor : professor,
        maxStrudentCount : maxStudentCount
    };
    const updatedInfo = await subjectCollection.updateOne({_id:id},updatedSubject);
    const subjectUpdated = await get(id);

    return subjectUpdated;
};

module.exports = {
    create,
    get,
    getByName,
    update,
    removeById
};