import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'
import createUsageLogEntry from "./../helpers/usageLogHandler";

const create = async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    return res.status(200).json({
      message: "Successfully signed up!"
    })
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "User" ,
      subType:"User" ,
      object_id: "",
      description:  "Create new User Record" ,
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
  console.log("user.controller - Update - Start")
  try {
    let user = req.profile
    user = extend(user, req.body)
    user.updated = Date.now()
    let result = await user.save()
    result.hashed_password = undefined
    result.salt = undefined
    res.json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "User" ,
      subType:"User" ,
      object_id: "",
      description:  "Update User Record" ,
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
  
const updateUserGroupsOwned = async (req, res) => {
  try {
    console.log("user.controller - updateUserGroupsOwned - Start ")
    let user = req.profile;
    let id =  user._id;
    let listOfGroups = req.body.listOfGroups
        
    let result = await User.findByIdAndUpdate(id, { $set:  {groupsUserOwns:  listOfGroups }})
    res.json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "updateUserGroupsOwned" ,
      type: "User" ,
      subType:"User" ,
      object_id: "",
      description:  "updateUserGroupsOwned User Record" ,
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

const updateAddToGroupMembership = async (req, res) => {
  console.log("user.controller - updateAddToGroupMembership - Start")
  try {
    let user = req.profile;
    let groupToAdd = req.body.groupToAdd;
    let idOfUserToAdd = req.body.idOfUserToAdd;
    
    let result = await User.findByIdAndUpdate(idOfUserToAdd, { $push:  {groupsUserMembership:  groupToAdd }})
    res.json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "updateAddToGroupMembership" ,
      type: "User" ,
      subType:"User" ,
      object_id: "",
      description:  "updateAddToGroupMembership User Record" ,
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

const updateRemoveFromGroupMembership = async (req, res) => {
  console.log("user.controller - updateRemoveFromGroupMembership - Start")
  try {
    let user = req.profile;
    let groupToRemove = req.body.groupToRemove;
    let idOfUserToRemove = req.body.idOfUserToRemove;
    
    let result = await User.findByIdAndUpdate(idOfUserToRemove, { $pull:  {groupsUserMembership:  groupToRemove }})
    res.json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "updateRemoveFromGroupMembership" ,
      type: "User" ,
      subType:"User" ,
      object_id: "",
      description:  "updateRemoveFromGroupMembership User Record" ,
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
  console.log("userData.controller - readById -  Start");
  const findQuery = createQueryObject(req.query);
  try {
    console.log(
      "userData.controller - readById - right before find preferences - query " +
        req.query
    );
    let userData = await User.findOne(findQuery)
    .select(  "user_id educator status affiliation_id importLimit membershipLevel state city zip")
    .populate("groupsUserOwns", "_id groupName") 
    .populate("groupsUserMembership", "_id groupName")      
    
    return res.json(userData);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "User" ,
      subType:"User" ,
      object_id: "",
      description:  "get readById User Record" ,
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


const userById = async (req, res, next, id) => {
  try {
    let user = await User.findById(id)
    if (!user)
      return res.status('400').json({
        error: "User not found"
      })
    req.profile = user
    next()
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "userById" ,
      type: "User" ,
      subType:"User" ,
      object_id: "",
      description:  "get userById User Record" ,
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

const read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}


const listUsersByCriteria = async (req, res) => {
  console.log("user.controller - listUsersByCriteria - Start");
  //for (const key in req.query) {
  //  console.log("req.query - ", key, req.query[key]);
  //}
  const findQuery = createQueryObject(req.query);
  try {

    let listOfUsers = await User.find(
      findQuery
    ).select('_id email name lastName');

    res.json(listOfUsers);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listUsersByCriteria" ,
      type: "User" ,
      subType:"User" ,
      object_id: "",
      description:  "listUsersByCriteria User Records" ,
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


const getOneByCriteria = async (req, res) => {
  console.log("user.controller - getOneByCriteria - Start" );
  //for (const key in req.query) {
  //  console.log("req.query - ", key, req.query[key]);
  //}
  const findQuery = createQueryObject(req.query);
  try {
    let userData = await User.find(
      findQuery
    ).select('_id email name lastName');
    res.json(userData);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getOneByCriteria" ,
      type: "User" ,
      subType:"User" ,
      object_id: "",
      description:  "getOneByCriteria User Records" ,
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

const list = async (req, res) => {
  try {
    let users = await User.find().select('name email updated created')
    res.json(users)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    let user = req.profile
    let deletedUser = await user.remove()
    deletedUser.hashed_password = undefined
    deletedUser.salt = undefined
    res.json(deletedUser)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const isEducator = (req, res, next) => {
  const isEducator = req.profile && req.profile.educator
  if (!isEducator) {
    return res.status('403').json({
      error: "User is not an educator"
    })
  }
  next()
}

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
  userById,
  read,
  readById,
  listUsersByCriteria,
  getOneByCriteria,
  list,
  remove,
  update,
  updateUserGroupsOwned,
  updateAddToGroupMembership,
  updateRemoveFromGroupMembership,
  isEducator
}
