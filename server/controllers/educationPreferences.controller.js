import EducationPreferences from "../models/educationPreferences.model";
import fs from "fs";

import errorHandler from "../helpers/dbErrorHandler";
import createUsageLogEntry from "../helpers/usageLogHandler";
import createErrorLogEntry from "../helpers/errorLogHandler";
import defaultImage from "./../../client/assets/images/default.png";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  console.log("EducationPreferences.controller - Create - Start");
  try {
    const educationPreferencesData = new EducationPreferences(req.body)
    let result = await educationPreferencesData.save()
    
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Education" ,
      subType:"Preferences" ,
      object_id: educationPreferencesData._id ,
      description:  "Create new Education Preferences Record" ,
      email: req.profile.email ,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);

    res.json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Education" ,
      subType:"Preferences" ,
      object_id: "",
      description:  "Create new Education Preferences Record" ,
      email: req.profile.email ,
      errorCode: err,
      errorMessage: errorHandler.getErrorMessage(err),
      serverOrClient: "Server",
      dateTimeStamp: Date.now() ,
    };
    createErrorLogEntry(newErrorLogData);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res) => {
  console.log("EducationPreferences.controller - Update - Start");
  try {
    const educationPreferencesData = EducationPreferences(req.body)
    let updatedEducationPreferencesData = {  
      user_id:  educationPreferencesData.user_id , 
      topic: educationPreferencesData.topic ,
      myClass: educationPreferencesData.myClass ,
      category:educationPreferencesData.category ,
      subject: educationPreferencesData.subject ,
      type: educationPreferencesData.type ,
      subType: educationPreferencesData.subType ,
      difficultyLevel: educationPreferencesData.difficultyLevel ,
      ageRange: educationPreferencesData.ageRange ,
      group_id: educationPreferencesData.group_id ,
      keepPrivate: educationPreferencesData.keepPrivate ,
      rowsPerPage: educationPreferencesData.rowsPerPage ,
      themeBrightness: educationPreferencesData.themeBrightness ,
      primaryButtonColor: educationPreferencesData.primaryButtonColor ,
      primaryBackgroundColor: educationPreferencesData.primaryBackgroundColor, 
      createDate:  educationPreferencesData.createDate,
      updatedBy: educationPreferencesData.updatedBy ,
      updateDate:  educationPreferencesData.updateDate,
    };
    let result = await EducationPreferences.replaceOne({_id: educationPreferencesData._id},updatedEducationPreferencesData)
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Education" ,
      subType:"Preferences" ,
      object_id: educationPreferencesData._id ,
      description:  "Update Education Preferences Record" ,
      email: req.profile.email ,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);
    
    res.json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Education" ,
      subType:"Preferences" ,
      object_id: "",
      description:  "Update Education Preferences Record" ,
      email: req.profile.email ,
      errorCode: err,
      errorMessage: errorHandler.getErrorMessage(err),
      serverOrClient: "Server",
      dateTimeStamp: Date.now() ,
    };
    createErrorLogEntry(newErrorLogData);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const readById = async (req, res) => {
  console.log("EducationPreferences.controller - readById - Start");
  const findQuery = createQueryObject(req.query);
  console.log(
    "educationPreferences.controller - readById - right before find preferences - findQuery " +
      findQuery
  );
  try {
    let educationPreferences = await EducationPreferences.findOne(findQuery);
    return res.json(educationPreferences);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Education" ,
      subType:"Preferences" ,
      object_id: "",
      description:  "get readById Preferences Record" ,
      email: req.profile.email ,
      errorCode: err,
      errorMessage: errorHandler.getErrorMessage(err),
      serverOrClient: "Server",
      dateTimeStamp: Date.now() ,
    };
    createErrorLogEntry(newErrorLogData);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
}

const remove = async (req, res) => {
  try {
    let educationPreferences = req.educationPreferences;
    let deleteEducationPreferences = await educationPreferences.remove();
    res.json(deleteEducationPreferences);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listByOwner = async (req, res) => {
  try {
    let educationPreferences = await EducationPreferences.find({
      owner_id: req.params.userId,
    });

    res.json(educationPreferences);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "Education" ,
      subType:"Preferences" ,
      object_id: "",
      description:  "listByOwner Preferences Record" ,
      email: req.profile.email ,
      errorCode: err,
      errorMessage: errorHandler.getErrorMessage(err),
      serverOrClient: "Server",
      dateTimeStamp: Date.now() ,
    };
    createErrorLogEntry(newErrorLogData);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

function createQueryObject(obj) {
  let queryString = "{";
  let cnt = 0;
  for (const key in obj) {
    if (
      key != "false" &&
      obj[key] != undefined &&
      obj[key] != "undefined" &&
      obj[key] != null &&
      obj[key] != "" &&
      obj[key] != false &&
      obj[key] != "false" &&
      obj[key].length > 0
    ) {
      cnt > 0 ? (queryString = queryString + ",") : queryString;
      queryString = queryString + '"' + key + '": "' + obj[key] + '"';
      cnt = cnt + 1;
      console.log(
        " createQueryObj - iteration : " + cnt + "  " + key + ":  " + obj[key]
      );
    }
  }

  queryString = queryString + "}";
  console.log("createQueryObject - queryString = ", queryString);
  const queryObj = JSON.parse(queryString);
  return queryObj;
}

export default {
  create,
  update,
  readById,
  remove,
  listByOwner,
};



