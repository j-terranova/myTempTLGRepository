import GroupAccess from "../models/GroupAccess.model";
import errorHandler from "../helpers/dbErrorHandler";
import createUsageLogEntry from "./../helpers/usageLogHandler";
import createErrorLogEntry from "./../helpers/errorLogHandler";
import defaultImage from "./../../client/assets/images/default.png";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  console.log("GroupAccess.controller - Create - Start");
  try {
    const groupAccessData = new GroupAccess(req.body)
    let result = await groupAccessData.save()

    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "GroupAccess" ,
      subType:"GroupAccess" ,
      object_id: groupAccessData._id ,
      description:  "Create new GroupAccess Record" ,
      email: req.profile.email ,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);

    res.json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "GroupAccess" ,
      subType:"GroupAccess" ,
      object_id: "",
      description:  "Create new GroupAccess Record" ,
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
  console.log("GroupAccess.controller - Update - Start");
  try {
    const groupAccessData = GroupAccess(req.body)
    let updateGroupAccessData = {   
      owner_id: groupAccessData.owner_id,
      groupName: groupAccessData.groupName,
      groupDescription:  groupAccessData.groupDescription,
      groupFunction: groupAccessData.groupFunction,
      role: groupAccessData.role,
      userList: groupAccessData.userList,
      markDeleted: groupAccessData.markDeleted,
      createDate: (groupAccessData.createDate)  ? groupAccessData.createDate : Date.now(),
      updatedBy: (groupAccessData.updatedBy)  ? groupAccessData.updatedBy : GroupAccessData.owner_id,
      updateDate: (groupAccessData.updateDate)  ? groupAccessData.updateDate : Date.now(),
    };

    let result = await GroupAccess.replaceOne({_id: groupAccessData._id},updateGroupAccessData)
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "GroupAccess" ,
      subType:"GroupAccess" ,
      object_id: groupAccessData._id ,
      description:  "Update GroupAccess Record" ,
      email: req.profile.email ,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);

    res.json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "GroupAccess" ,
      subType:"GroupAccess" ,
      object_id: "",
      description:  "Update GroupAccess Record" ,
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

const listByOwner = async (req, res) => {
  console.log("GroupAccess.controller -  listByCriteria - Start");
  //for (const key in req.query) {
  //  console.log("req.query - ", key, req.query[key]);
  //}
  const findQuery = createQueryObject(req.query);
  try {
    console.log(
      "GroupAccess.controller - server side - inside listByCriteria - right before find statement - query " +
        req.query
    );
    let listOfGroupAccess = await GroupAccess.find(
      findQuery
    ).populate("userList", "_id email name lastName");;
    res.json(listOfGroupAccess);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "GroupAccess" ,
      subType:"GroupAccess" ,
      object_id: "",
      description:  "listByOwner GroupAccess Record" ,
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

const getUserListData = async (req, res) => {
  console.log("GroupAccess.controller - listByCriteria - Start");
  //for (const key in req.query) {
  //  console.log("req.query - ", key, req.query[key]);
  //}

  const findQuery = createQueryObject(req.query);
  try {

    let listOfGroupAccess = await GroupAccess.find(
      findQuery
    ).populate("userList", "_id email name lastName");;
    res.json(listOfGroupAccess);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getUserListData" ,
      type: "GroupAccess" ,
      subType:"GroupAccess" ,
      object_id: "",
      description:  "getUserListData GroupAccess Record" ,
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

const GetById = async (req, res, next, id) => {
  console.log("groupAccess.controller - GetById - Start")
  try {
    let groupAccessData = await GroupAccess.findById(id);
    if (!groupAccessData)
      return res.status("400").json({
        error: "GroupAccess not found",
      });
    req.groupAccessData = groupAccessData;
    next();
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "GetById" ,
      type: "GroupAccess" ,
      subType:"GroupAccess" ,
      object_id: "",
      description:  "GetById GroupAccess Record" ,
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
};

const read = (req, res) => {
  req.GroupAccessData.image = undefined;
  return res.json(req.GroupAccessData);
};

const list = async (req, res) => {
  try {
    let GroupAccesssData = await GroupAccessData.find();
    res.json(GroupAccesssData);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isOwner = (req, res, next) => {
  console.log("groupAccess.controller - isOwner - Start")
  console.log("groupAccess.controller - isOwner - req.groupAccessData = ",req.groupAccessData)
  const isOwner =
    req.groupAccessData && req.auth && req.groupAccessData.owner_id == req.auth._id;
  if (!isOwner) {
    return res.status("403").json({
      error: "User is not authorized",
    });
  }
  next();
};

const remove = async (req, res) => {
  console.log("groupAccess.controller - Remove - Start")
  const groupId = req.params.groupId;
  try {    
    
    let deleteGroupAccessData = await GroupAccess.deleteOne({_id: groupId});
    res.json(deleteGroupAccessData);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Remove" ,
      type: "GroupAccess" ,
      subType:"GroupAccess" ,
      object_id: "",
      description:  "Remove GroupAccess Record" ,
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

const listApprovedPublic = (req, res) => {
  GroupAccess.find(
    { approvedPublic: true },
    (err, GroupAccesss) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
      }
      res.json(GroupAccesss);
    }
  );
};

const photo = (req, res, next) => {
  if (req.GroupAccess.image.data) {
    res.set("Content-Type", req.GroupAccess.image.contentType);
    return res.send(req.GroupAccess.image.data);
  }
  next();
};
const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd() + defaultImage);
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
  GetById,
  read,
  list,
  remove,
  update,
  isOwner,
  listByOwner,
  getUserListData,
  photo,
  defaultPhoto,
  listApprovedPublic,
};



