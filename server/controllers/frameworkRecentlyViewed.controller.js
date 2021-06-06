import FrameworkRecentlyViewed from "../models/frameworkRecentlyViewed.model";

import errorHandler from "../helpers/dbErrorHandler";
import createUsageLogEntry from "./../helpers/usageLogHandler";
import createErrorLogEntry from "./../helpers/errorLogHandler";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");


const create = async (req, res) => {
  console.log("FrameworkRecentlyViewed.controller - Create - Start");
  try {
    const frameworkRecentlyViewed = new FrameworkRecentlyViewed(req.body)
    const newFrameworkRecentlyViewed = FrameworkRecentlyViewed({
      userId: frameworkRecentlyViewed.userId,
      framework_id: frameworkRecentlyViewed.framework_id,
      title: frameworkRecentlyViewed.title,
      description: frameworkRecentlyViewed.description,
      topic: frameworkRecentlyViewed.topic,
      myClass: frameworkRecentlyViewed.myClass,
      category:frameworkRecentlyViewed.category,
      subject: frameworkRecentlyViewed.subject,
      type: frameworkRecentlyViewed.type,
      subType: frameworkRecentlyViewed.subtype,
      includeConstructs: frameworkRecentlyViewed.includeConstructs,
      frameworkStatus: frameworkRecentlyViewed.frameworkStatus,
      numberCorrect: frameworkRecentlyViewed.numberCorrect,
      numberInTest: frameworkRecentlyViewed.numberInTest,
      scale: frameworkRecentlyViewed.scale,
      startDate: frameworkRecentlyViewed.startDate,
      completedDate: frameworkRecentlyViewed.completedDate,
      updateDate: frameworkRecentlyViewed.updateDate,
    });
    let result = await newFrameworkRecentlyViewed.save()   
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Framework" ,
      subType:"RecentlyViewed" ,
      object_id: frameworkRecentlyViewed._id ,
      description:  "Create new RecentlyViewed Record" ,
      email: req.profile.email ,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);

    res.json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Framework" ,
      subType:"RecentlyViewed" ,
      object_id: "",
      description:  "Create new RecentlyViewed Record" ,
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
  console.log("FrameworkRecentlyViewed.controller - Update - Start");
  try {   
    const frameworkRecentlyViewed = FrameworkRecentlyViewed(req.body)
    let updatedFrameworkRecentlyViewed = {  
      userId: frameworkRecentlyViewed.userId,
      framework_id: frameworkRecentlyViewed.framework_id,
      title: frameworkRecentlyViewed.title,
      description: frameworkRecentlyViewed.description,
      topic: frameworkRecentlyViewed.topic,
      myClass: frameworkRecentlyViewed.myClass,
      category:frameworkRecentlyViewed.category,
      subject: frameworkRecentlyViewed.subject,
      type: frameworkRecentlyViewed.type,
      subType: frameworkRecentlyViewed.subtype,
      includeConstructs: frameworkRecentlyViewed.includeConstructs,
      frameworkStatus: frameworkRecentlyViewed.frameworkStatus,
      numberCorrect: frameworkRecentlyViewed.numberCorrect,
      numberInTest: frameworkRecentlyViewed.numberInTest,
      scale: frameworkRecentlyViewed.scale,
      startDate: frameworkRecentlyViewed.startDate,
      completedDate: frameworkRecentlyViewed.completedDate,
      updateDate: frameworkRecentlyViewed.updateDate,
    };
    let result = await FrameworkRecentlyViewed.replaceOne({_id: frameworkRecentlyViewed._id},updatedFrameworkRecentlyViewed)

    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Framework" ,
      subType:"RecentlyViewed" ,
      object_id: frameworkRecentlyViewed._id ,
      description:  "Update RecentlyViewed Record" ,
      email: req.profile.email ,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);

    res.json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Framework" ,
      subType:"RecentlyViewed" ,
      object_id: "",
      description:  "Update RecentlyViewed Record" ,
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

const readRecentlyViewedBySubType = async (req, res) => {
  console.log("FrameworkRecentlyViewed.controller - readRecentlyViewedBySubType -Start ");
  const findQuery = createQueryObject(req.query);
  try {

    let learnerLesson = await FrameworkRecentlyViewed.findOne(findQuery);
    
    return res.json(learnerLesson);

  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readRecentlyViewedBySubType" ,
      type: "Framework" ,
      subType:"RecentlyViewed" ,
      object_id: "",
      description:  "readRecentlyViewedBySubType RecentlyViewed Record" ,
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
  console.log("FrameworkRecentlyViewed.controller - readById - Start");
  const findQuery = createQueryObject(req.query);
  try {
    let learnerLesson = await FrameworkRecentlyViewed.findOne(findQuery);
    if (!learnerLesson)
      return res.status("400").json({
        error: "FrameworkRecentlyViewed not found",
      });
      return res.json(learnerLesson);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Framework" ,
      subType:"RecentlyViewed" ,
      object_id: "",
      description:  "readById RecentlyViewed Record" ,
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

const listRecentlyViewed = async (req, res) => {
  //for (const key in req.query) {
  //  console.log("req.query - ", key, req.query[key]);
  //}
  const findQuery = createQueryObject(req.query);
  const userId = req.query.userId;
  try {
    let response = await FrameworkRecentlyViewed.find(findQuery).select("topic description subType difficultyLevel user_id group_id lastViewed markDeleted framework_id _id");
    res.json(response);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listRecentlyViewed" ,
      type: "Framework" ,
      subType:"RecentlyViewed" ,
      object_id: "",
      description:  "listRecentlyViewed RecentlyViewed Record" ,
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

const listFrameworkByRecentlyViewed = async (req, res
) => {
  console.log("FrameworkRecentlyViewed.controller - listFrameworkByRecentlyViewed - Start");
  const findQuery = createQueryObject(req.query);

  try {
    let recentlyViewedLearning = await FrameworkRecentlyViewed.find(
      findQuery, 
    ).sort({ updateDate: -1 });

    res.json(recentlyViewedLearning);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listFrameworkByRecentlyViewed" ,
      type: "Framework" ,
      subType:"RecentlyViewed" ,
      object_id: "",
      description:  "listFrameworkByRecentlyViewed RecentlyViewed Record" ,
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

const getFrameworkRecentlyViewed = async (req, res) => {
  console.log("FrameworkRecentlyViewed.controller - getFrameworkRecentlyViewed - Start");
  try {
    let currentFrameworkRecentlyViewed = await FrameworkRecentlyViewed.findOne({
      userId: req.params.userId, 
      framework_id: req.params.framework_id,
      type: req.params.type,
      subType: req.params.subType,
      frameworkStatus: req.params.frameworkStatus,
    }).sort({ updateDate: -1 });
    res.json(currentFrameworkRecentlyViewed);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getFrameworkRecentlyViewed" ,
      type: "Framework" ,
      subType:"RecentlyViewed" ,
      object_id: "",
      description:  "getFrameworkRecentlyViewed RecentlyViewed Record" ,
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
  readRecentlyViewedBySubType,
  readById,
  listFrameworkByRecentlyViewed,
  listRecentlyViewed,
  getFrameworkRecentlyViewed,
  update,
};






