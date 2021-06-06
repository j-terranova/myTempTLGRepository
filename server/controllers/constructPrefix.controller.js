import ConstructPrefix from "../models/constructPrefix.model";
import fs from "fs";
import readline   from 'readline';

import errorHandler from "./../helpers/dbErrorHandler";
import createUsageLogEntry from "./../helpers/usageLogHandler";
import createErrorLogEntry from "./../helpers/errorLogHandler";
import defaultImage from "./../../client/assets/images/default.png";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  console.log("ConstructPrefix.controller - Create -Start");
  try {
    const constructPrefixData = new ConstructPrefix(req.body)
    let result = await constructPrefixData.save()

    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Component" ,
      subType:"Prefix" ,
      object_id: constructPrefixData._id ,
      description:  "Create new Prefix Record" ,
      email: req.profile.email ,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);

    res.json(result)
  } catch (err) {   
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Component" ,
      subType:"Prefix" ,
      object_id: "",
      description:  "Create new Prefix Record" ,
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
  console.log("ConstructPrefix.controller - Update - Start " );
  try {
    const constructPrefixData = ConstructPrefix(req.body)
    let updatedConstructPrefixData = {   
      topic: constructPrefixData.topic ,
      description:  constructPrefixData.description ,
      myClass: constructPrefixData.myClass ,
      category:constructPrefixData.category ,
      subject: constructPrefixData.subject ,
      type: constructPrefixData.type ,
      subType: constructPrefixData.subType ,
      difficultyLevel: constructPrefixData.difficultyLevel ,
      ageRange: constructPrefixData.ageRange ,
      image_id: constructPrefixData.image_id ,
      imageFileName: constructPrefixData.imageFileName ,
      owner_id: constructPrefixData.owner_id ,
      group_id: constructPrefixData.group_id ,
      keepPrivate: constructPrefixData.keepPrivate ,
      approvedForPublicUse: constructPrefixData.approvedForPublicUse ,
      constructPrefix: constructPrefixData.constructPrefix ,
      markDeleted: constructPrefixData.markDeleted ,
      createDate:  Date.now(),
      updatedBy: constructPrefixData.updatedBy ,
      updateDate:  Date.now(),
    };

    let result = await ConstructPrefix.replaceOne({_id: constructPrefixData._id},updatedConstructPrefixData)
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Component" ,
      subType:"Prefix" ,
      object_id: constructPrefixData._id ,
      description:  "Update Prefix Record" ,
      email: req.profile.email ,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);
    
    res.json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Component" ,
      subType:"Prefix" ,
      object_id: "",
      description:  "Update new Prefix Record" ,
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

const listByCriteria = async (req, res) => {
  console.log("ConstructPrefix.controller - listByCriteria - Start");
  for (const key in req.query) {
    console.log("req.query - ", key, req.query[key]);
  }
  const findQuery = createQueryObject(req.query);
  console.log("ConstructPrefix.controller - listByCriteria - findQuery = ", findQuery);
  const userId = req.query.userId;
  try {
    //let listOfPrefixs = await ConstructPrefix.find(findQuery).select("topic description owner_id group_id constructPrefix markDeleted _id");
    let listOfPrefixs = await ConstructPrefix.find(findQuery).select("topic description owner_id group_id markDeleted _id");
    res.json(listOfPrefixs);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByCriteria" ,
      type: "Component" ,
      subType:"Prefix" ,
      object_id: "",
      description:  "listByCriteria Prefix Records" ,
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

const constructPrefixById = async (req, res, next, id) => {
  console.log("ConstructPrefix.controller - constructPrefixById - Start");
  try {
    let constructPrefix = await ConstructPrefix.findById(id);
    if (!constructPrefix)
      return res.status("400").json({
        error: "ConstructPrefix not found",
      });
    req.constructPrefix = constructPrefix;
    next();
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "constructPrefixById" ,
      type: "Component" ,
      subType:"Prefix" ,
      object_id: "",
      description:  "get constructPrefixById Record" ,
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

const readById = async (req, res) => {
  console.log("ConstructPrefix.controller - readById - Start");
  const id = req.query.id;
  try {
    let constructPrefix = await ConstructPrefix.findOne({_id: id});
    return res.json(constructPrefix);
} catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Component" ,
      subType:"Prefix" ,
      object_id: "",
      description:  "get readById Prefix Record" ,
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

const readAll = (req, res) => {
  req.constructPrefix.image = undefined;
  return res.json(req.constructPrefix);
};

const list = async (req, res) => {
  try {
    let constructPrefixs = await ConstructPrefix.find();
    res.json(constructPrefixs);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const newUserWithAccess = async (req, res) => {
  try {
    let usersWithAccess = req.body.usersWithAccess;
    let result = await ConstructPrefix.findByIdAndUpdate(
      req.constructPrefix._id,
      { $push: { UsersWithAccess: usersWithAccess }, updated: Date.now() },
      { new: true }
    ).exec();
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let constructPrefix = req.constructPrefix;
    let deleteConstructPrefix = await constructPrefix.remove();
    res.json(deleteConstructPrefix);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isOwner = (req, res, next) => {
  const isOwner =
    req.constructPrefix &&
    req.auth &&
    req.constructPrefix.owner._id == req.auth._id;
  if (!isOwner) {
    return res.status("403").json({
      error: "User is not the Owner",
    });
  }
  next();
};

const listByOwner = async (req, res) => {
  console.log("constructPrefix.controller - listByOwner - Start");
  try {
    let constructPrefixs = await ConstructPrefix.find({
      owner_id: req.params.userId,
    });
    res.json(constructPrefixs);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "Component" ,
      subType:"Prefix" ,
      object_id: "",
      description:  "listByOwner Prefix Records" ,
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

const getCurrentConstructByMaxUpdateDateAndUserId = async (req, res) => {
  console.log("ConstructPrefix.controller - getCurrentConstructByMaxUpdateDateAndUserId - Start");
  try {
    let currentConstructPrefix = await ConstructPrefix.findOne({
      owner_id: req.params.userId,
    }).sort({ updateDate: -1 });
    res.json(currentConstructPrefix);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getCurrentConstructByMaxUpdateDateAndUserId" ,
      type: "Component" ,
      subType:"Prefix" ,
      object_id: "",
      description:  "getCurrentConstructByMaxUpdateDateAndUserId Prefix Record" ,
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

const getRandomOptions = async (req, res) => {
  console.log("ConstructPrefix.controller - getRandomOptions - Start");
  
  try {
    let definitionList = await ConstructPrefix.aggregate([
      { $match:  { difficultyLevel: { $lt: 18 } },  },
      { "$project": {"constructPrefix.prefix": 1, "constructPrefix.meaning": 1}},
      {$sample: {size: 50}},
    ])
    res.json(definitionList);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getRandomOptions" ,
      type: "Component" ,
      subType:"Prefix" ,
      object_id: "",
      description:  "getRandomOptions Prefix List" ,
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
  ConstructPrefix.find(
    { approvedPublic: true },
    (err, constructPrefixs) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
      }
      res.json(constructPrefixs);
    }
  );
};

const photo = (req, res, next) => {
  if (req.constructPrefix.image.data) {
    res.set("Content-Type", req.constructPrefix.image.contentType);
    return res.send(req.constructPrefix.image.data);
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

function searchForWord(wordToMatch, lookupArray){
  for (var i=0; i < lookupArray.length; i++) {
      if (lookupArray[i].wordToDefine === wordToMatch) {
          return lookupArray[i];
      }
  }
  return null;
}

function loadArrayOfLookupData(filePath) {
  console.log("Load loadArrayOfLookup Data - started");
  let lookupArray = [];
  // Read .txt file that must be comma delimited
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  // Split on row
  const dataSplit = data.split("\n");
  const headers = dataSplit.shift().split(",");
  //console.log("Load loadArrayOfLookup Data - Set Headers ");
  for (
    let L = headers.length;
    L--;
    headers[L] = headers[L].replace(/(\r\n|\n|\r)/gm, "")
  );

  let cnt = 0;
  dataSplit.forEach(function (d) {
    for (let K = d.length; K--; d[K] == d[K].replace(/(\r\n|\n|\r)/gm, ""));
    d = d.replace(/(\r\n|\n|\r)/gm, "");

    // Loop through each row
    cnt = cnt + 1;
    var tmp = {};
    var row = d.split(",");
    for (let L = row.length; L--; L >= 0) {
      row[L] == row[L].replace(/(\r\n|\n|\r)/gm, "");
    }

    for (let i = 0; i < headers.length; i++) {
      tmp[headers[i]] = row[i];
    }
    lookupArray.push(tmp);
  });
  console.log("Load loadArrayOfLookup Data - completed");
  return lookupArray;
}

function loadGutenbergPrefixData(req) {
  // This version allows the keyword to appear one time with
  // each keyword having a different matching word.
    console.log("Load GutenbergPrefix Data - started");
    const userId=req.body.params.userId;
    const skeletonPrefix = req.body.params.skeletonPrefix;
    const lookupFilePath =
    "C:\\TeachLearnGame\\Lookups\\K-12WordList.csv";
    let lookupWordArray = loadArrayOfLookupData(lookupFilePath);

    const filePath =
    "C:\\TeachLearnGame\\PrefixesANDSuffixes\\GuttenbergConsolidatedPrefixes.csv";
   
    console.log("Load GutenbergPrefix Data - userId = ", userId);
    console.log("Load GutenbergPrefix Data - fileName = ", filePath);
    console.log("Load GutenbergPrefix Data - req.body = ", req.body);
    console.log("Load GutenbergPrefix Data - req.body.params = ", req.body.params);
    console.log("Load GutenbergPrefix Data - req.body.params.skeletonPrefix = ", req.body.params.skeletonPrefix);
  
    console.log("Load GutenbergPrefix Data - Reading File = " + filePath);
  
    var lineReader = readline.createInterface({
      input: fs.createReadStream(filePath)
    });
    
    let constructPrefix = {};
    let prefix = "";
    let meaning = "";
    let etymology = "";
    let type = "";
    let difficultyLevel = 0;
    let ageRange = 0;
    let examples = [];
    let description = "";

    let criteria = {};
    var totalCnt = 0;
    var cnt = 0;
    let prefixArray = [];

    lineReader.on('line', function (line) {
      cnt = cnt+1
      totalCnt = totalCnt + 1;
      prefix = "";
      meaning = "";
      etymology = "";
      type = "";
      difficultyLevel = 0;
      ageRange = 0;
      examples = [];
      if (cnt >= 500)
      {
        console.log("Total Count Processed : ", totalCnt );
        lineReader.pause();
        setTimeout(_ => {
          //console.log(line);
          cnt=0;
          lineReader.resume();
      }, 30000);
      }
      totalCnt = totalCnt + 1;

      let newLine = line.replace(/"/g, "")
      prefixArray = newLine.toLowerCase().trim().split(",");
      
      prefix = prefixArray[0].toLowerCase().trim().replace(/-/g, "");

      if (prefix.length > 0)
      {
        prefix = prefix.trim() + "-"; 
        type = prefixArray[1].toLowerCase().trim();
        meaning = prefixArray[2].toLowerCase().trim();

        difficultyLevel = parseInt(prefixArray[4].trim());
        ageRange = parseInt(prefixArray[5].trim());
        criteria = searchForWord(prefix, lookupWordArray)

        if (prefixArray.length >= 7)
        {
          for (let i = 6; i < prefixArray.length; i++)
          {   
            if (prefixArray[i].trim().length > 0)
            {
              examples.push(prefixArray[i]);
            }
          }
        } 
        if (meaning.length > 0)
        {
          description = "Prefix: " +  prefix + "; Meaning: " +  meaning;
        } else
        {
          description = "Prefix: " +  prefix
        }

        if (type.length > 0)
        {
          description = description + "; Word Type: " +  type
        }

        constructPrefix = {
          prefix: prefix,
          meaning: meaning,
          etymology: etymology,
          type: type,
          examples: examples
        }

        console.log("Load GutenbergPrefix Data - prefixArray = " + prefixArray);
        console.log("Load GutenbergPrefix Data - constructPrefix = " + constructPrefix);
        console.log("Load GutenbergPrefix Data - prefix = " + prefix);
        
        getExistingGutenbergPrefix(userId, prefix, type, meaning,skeletonPrefix, constructPrefix,criteria,difficultyLevel, ageRange,description);
      }
    });
  }

  const getExistingGutenbergPrefix = async (userId, prefix, type, meaning,skeletonPrefix, constructPrefix,criteria,difficultyLevel, ageRange,description) => {
    let existingPrefix = null

    console.log("Load getExistingGutenbergPrefix Data - constructPrefix = " + constructPrefix);
    console.log("Load getExistingGutenbergPrefix Data - prefix = " + prefix);
    try {    
      let listOfPrefixs = await ConstructPrefix.find({"constructPrefix.prefix": prefix});
      if (listOfPrefixs.length > 0)
      {
        for (let i=0; i<listOfPrefixs.length; i++ )
        {
          if (type.trim().length > 0 && listOfPrefixs[i].constructPrefix.type.trim() === type.trim())
          {
            existingPrefix = listOfPrefixs[i];
            console.log("Load GutenbergPrefix Data - existingPrefix = " + existingPrefix);
            updateGutenbergPrefixData(userId, existingPrefix,constructPrefix,criteria,difficultyLevel, ageRange,description)
            return;
          } else if (meaning.trim().length > 0  && listOfPrefixs[i].constructPrefix.meaning.trim() === meaning.trim() )
          {
            existingPrefix = listOfPrefixs[i];
            console.log("Load GutenbergPrefix Data - existingPrefix = " + existingPrefix);
            updateGutenbergPrefixData(userId, existingPrefix,constructPrefix,criteria,difficultyLevel, ageRange,description)
            return;
          }
        }
        existingPrefix = listOfPrefixs[0];
        console.log("Load GutenbergPrefix Data - existingPrefix = " + existingPrefix);
        updateGutenbergPrefixData(userId, existingPrefix,constructPrefix,criteria,difficultyLevel, ageRange,description)
        return;
      }
      if (existingPrefix === null)
      {
        insertGutenbergPrefixData(userId,skeletonPrefix,constructPrefix,criteria,difficultyLevel, ageRange, description)
      } 

      return null;
    } catch (err) {
      let newErrorLogData = {   
        userId: userId,
        activity:  "getGutenbergPrefix" ,
        type: "Component" ,
        subType:"Prefix" ,
        object_id: "",
        description:  "getGutenbergPrefix Prefix Records" ,
        email: "" ,
        errorCode: err,
        errorMessage: errorHandler.getErrorMessage(err),
        serverOrClient: "Server",
        dateTimeStamp: Date.now() ,
      };
      createErrorLogEntry(newErrorLogData);  
    };
    if (existingPrefix === null)
    {
      insertGutenbergPrefixData(userId,skeletonPrefix,constructPrefix,criteria,difficultyLevel, ageRange, description)
    } 
    return null;
  }

  const updateGutenbergPrefixData = async (userId,existingGutenbergPrefix,constructPrefixDetails,criteria,difficultyLevel, ageRange,description) => {
    console.log("ConstructPrefix.controller - Update - Start " );
    try {
      let updatedConstructPrefixData = {   
        topic: constructPrefixDetails.prefix,
        description: description,                 
        myClass: existingGutenbergPrefix.myClass,
        category: existingGutenbergPrefix.category,
        subject: (criteria && criteria.subject)? criteria.subject: existingGutenbergPrefix.subject,
        type: "Component",
        subType: "Prefix",
        difficultyLevel: difficultyLevel ? difficultyLevel : (criteria && criteria.difficultyLevel)? criteria.difficultyLevel: existingGutenbergPrefix.difficultyLevel,
        ageRange: ageRange ? ageRange : (criteria && criteria.ageRange)? criteria.ageRange: existingGutenbergPrefix.ageRange,
        image_id: existingGutenbergPrefix.image_id ,
        imageFileName: existingGutenbergPrefix.imageFileName ,
        owner_id: existingGutenbergPrefix.owner_id ,
        group_id: existingGutenbergPrefix.group_id ,
        groupName: existingGutenbergPrefix.groupName ,
        keepPrivate: false ,
        approvedForPublicUse: true,
        constructPrefix: constructPrefixDetails,
        markDeleted: false ,
        createDate:  existingGutenbergPrefix.createDate,
        updatedBy: existingGutenbergPrefix.updatedBy ,
        updateDate:  Date.now(),
      };
  
      let result = await ConstructPrefix.replaceOne({_id: existingGutenbergPrefix._id},updatedConstructPrefixData)
     
    } catch (err) {
      let newErrorLogData = {   
        userId: userId ,
        activity:  "Update" ,
        type: "Component" ,
        subType:"Prefix" ,
        object_id: "",
        description:  "Update new Prefix Record" ,
        email: "" ,
        errorCode: err,
        errorMessage: errorHandler.getErrorMessage(err),
        serverOrClient: "Server",
        dateTimeStamp: Date.now() ,
      };
      createErrorLogEntry(newErrorLogData);
    }
  }

  const insertGutenbergPrefixData = async (userId,skeletonPrefix,constructPrefixDetails,criteria,difficultyLevel, ageRange,description) => {

    if (constructPrefixDetails && constructPrefixDetails.prefix) 
    {
      //console.log( "insertGutenbergPrefixData -  inside the if statement creating a new Prefix");
      const newConstructPrefix = new ConstructPrefix({
        topic: constructPrefixDetails.prefix,
        description: description,                 
        myClass: skeletonPrefix.myClass,
        category: skeletonPrefix.category,
        subject: (criteria && criteria.subject)? criteria.subject: skeletonPrefix.subject,
        type: "Component",
        subType: "Prefix",
        difficultyLevel: difficultyLevel ? difficultyLevel : (criteria && criteria.difficultyLevel)? criteria.difficultyLevel: skeletonPrefix.difficultyLevel,
        ageRange: ageRange ? ageRange : (criteria && criteria.ageRange)? criteria.ageRange: skeletonPrefix.ageRange,
        image_id: skeletonPrefix.image_id ,
        imageFileName: skeletonPrefix.imageFileName ,
        owner_id: skeletonPrefix.owner_id ,
        group_id: skeletonPrefix.group_id ,
        groupName: skeletonPrefix.groupName ,
        keepPrivate: false ,
        approvedForPublicUse: true,
        constructPrefix: constructPrefixDetails,
        markDeleted: false ,
        createDate:  Date.now(),
        updatedBy: skeletonPrefix.updatedBy ,
        updateDate:  Date.now(),
    
      });
      try {
        let result = await newConstructPrefix.save();

      } catch (err) {
        let newErrorLogData = {   
          userId: userId ,
          activity:  "insertGutenbergPrefixData" ,
          type: "Component" ,
          subType:"Prefix" ,
          object_id: "",
          description:  "Bulk load Prefix Records" ,
          email: "" ,
          errorCode: err,
          errorMessage: errorHandler.getErrorMessage(err),
          serverOrClient: "Server",
          dateTimeStamp: Date.now() ,
        };
        createErrorLogEntry(newErrorLogData);  
        if (err.toString().indexOf("E11000") > -1) {
          const error = new Error("Duplicate GutenbergPrefix Data");
          console.log(error);
          return;
        } else
        {
          const error = errorHandler.getErrorMessage(err)
          console.log(error);
          return;
        }
        
      }
    } else
    {
      console.log("Problem with the data - constructPrefixDetails = ", constructPrefixDetails )
    }

  };

export default {
  create,
  constructPrefixById,
  readById,
  readAll,
  list,
  getCurrentConstructByMaxUpdateDateAndUserId,
  getRandomOptions,
  listByCriteria,
  remove,
  update,
  isOwner,
  listByOwner,
  photo,
  defaultPhoto,
  newUserWithAccess,
  listApprovedPublic,
  loadGutenbergPrefixData,
};




