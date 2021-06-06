import ConstructDefinition from "../models/constructDefinition.model";
import fs from "fs";
import readline   from 'readline';

import errorHandler from "./../helpers/dbErrorHandler";
import createUsageLogEntry from "./../helpers/usageLogHandler";
import createErrorLogEntry from "./../helpers/errorLogHandler";
import defaultImage from "./../../client/assets/images/default.png";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  console.log("ConstructDefinition.controller - Create -Start");
  try {
    const constructDefinitionData = new ConstructDefinition(req.body)
    let result = await constructDefinitionData.save()
      
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Component" ,
      subType:"Definition" ,
      object_id: constructDefinitionData._id ,
      description:  "Create new Definition Record" ,
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
      subType:"Definition" ,
      object_id: "",
      description:  "Create new Definition Record" ,
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
    console.log("ConstructDefinition.controller - Update - Start");
    try {
    const constructDefinitionData = ConstructDefinition(req.body)
    let updatedConstructDefinitionData = {   
      topic: constructDefinitionData.topic ,
      description:  constructDefinitionData.description ,
      myClass: constructDefinitionData.myClass ,
      category:constructDefinitionData.category ,
      subject: constructDefinitionData.subject ,
      type: constructDefinitionData.type ,
      subType: constructDefinitionData.subType ,
      difficultyLevel: constructDefinitionData.difficultyLevel ,
      ageRange: constructDefinitionData.ageRange ,
      image_id: constructDefinitionData.image_id ,
      imageFileName: constructDefinitionData.imageFileName ,
      owner_id: constructDefinitionData.owner_id ,
      group_id: constructDefinitionData.group_id ,
      groupName: constructDefinitionData.groupName ,
      keepPrivate: constructDefinitionData.keepPrivate ,
      approvedForPublicUse: constructDefinitionData.approvedForPublicUse ,
      constructDefinition: constructDefinitionData.constructDefinition ,
      markDeleted: constructDefinitionData.markDeleted ,
      createDate:  Date.now(),
      updatedBy: constructDefinitionData.updatedBy ,
      updateDate:  Date.now(),
    };

    let result = await ConstructDefinition.replaceOne({_id: constructDefinitionData._id},updatedConstructDefinitionData)
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Component" ,
      subType:"Definition" ,
      object_id: constructDefinitionData._id ,
      description:  "Update Definition Record" ,
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
      subType:"Definition" ,
      object_id: "",
      description:  "Update new Definition Record" ,
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
  console.log("ConstructDefinition.controller - listByCriteria - Start");
  //for (const key in req.query) {
  //  console.log("req.query - ", key, req.query[key]);
  //}
  const findQuery = createQueryObject(req.query);
  //const userId = req.query.userId;
  try {
    let listOfDefinitions = await ConstructDefinition.find(findQuery).select("topic description owner_id group_id markDeleted _id");
    res.json(listOfDefinitions);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByCriteria" ,
      type: "Component" ,
      subType:"Definition" ,
      object_id: "",
      description:  "listByCriteria Definition Records" ,
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

const constructDefinitionById = async (req, res, next, id) => {
  console.log("ConstructDefinition.controller - constructDefinitionById - Start");
  try {
    let constructDefinition = await ConstructDefinition.findById(id);
    if (!constructDefinition)
      return res.status("400").json({
        error: "ConstructDefinition not found",
      });
    req.constructDefinition = constructDefinition;
    next();
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "constructDefinitionById" ,
      type: "Component" ,
      subType:"Definition" ,
      object_id: "",
      description:  "get constructDefinitionById Definition Record" ,
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
  console.log("ConstructDefinition.controller - readById - Start");
  const id = req.query.id;
  try {
    let constructDefinition = await ConstructDefinition.findOne({_id: id});
    return res.json(constructDefinition);
} catch (err) {
  let newErrorLogData = {   
    userId: req.profile._id ,
    activity:  "readById" ,
    type: "Component" ,
    subType:"Definition" ,
    object_id: "",
    description:  "get readById Definition Record" ,
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
  req.constructDefinition.image = undefined;
  return res.json(req.constructDefinition);
};

const list = async (req, res) => {
  try {
    let constructDefinitions = await ConstructDefinition.find();
    res.json(constructDefinitions);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const newUserWithAccess = async (req, res) => {
  try {
    let usersWithAccess = req.body.usersWithAccess;
    let result = await ConstructDefinition.findByIdAndUpdate(
      req.constructDefinition._id,
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
    let constructDefinition = req.constructDefinition;
    let deleteConstructDefinition = await constructDefinition.remove();
    res.json(deleteConstructDefinition);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isOwner = (req, res, next) => {
  const isOwner =
    req.constructDefinition &&
    req.auth &&
    req.constructDefinition.owner._id == req.auth._id;
  if (!isOwner) {
    return res.status("403").json({
      error: "User is not the Owner",
    });
  }
  next();
};

const listByOwner = async (req, res) => {
  console.log("ConstructDefinition.controller - listByOwner - Start "
  );
  try {
    let constructDefinitions = await ConstructDefinition.find({
      owner_id: req.params.userId,
    });

    res.json(constructDefinitions);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "Component" ,
      subType:"Definition" ,
      object_id: "",
      description:  "listByOwner Definition Records" ,
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
  console.log("ConstructDefinition.controller - getCurrentConstructByMaxUpdateDateAndUserId - Start");
  try {
    let currentConstructDefinition = await ConstructDefinition.findOne({
      owner_id: req.params.userId,
    }).sort({ updateDate: -1 });
    res.json(currentConstructDefinition);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getCurrentConstructByMaxUpdateDateAndUserId" ,
      type: "Component" ,
      subType:"Definition" ,
      object_id: "",
      description:  "getCurrentConstructByMaxUpdateDateAndUserId Definition Record" ,
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
  console.log("ConstructDefinition.controller - getRandomOptions - Start");
  
  try {
    let definitionList = await ConstructDefinition.aggregate([
      { $match:  { difficultyLevel: { $lt: 9 } },  },
      { "$project": {"constructDefinition.wordToDefine": 1, "constructDefinition.wordDefinitions": 1}},
      {$sample: {size: 50}},
    ])
    res.json(definitionList);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getRandomOptions" ,
      type: "Component" ,
      subType:"Definition" ,
      object_id: "",
      description:  "getRandomOptions Definition List" ,
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
  ConstructDefinition.find(
    { approvedPublic: true },
    (err, constructDefinitions) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
      }
      res.json(constructDefinitions);
    }
  );
};

const photo = (req, res, next) => {
  if (req.constructDefinition.image.data) {
    res.set("Content-Type", req.constructDefinition.image.contentType);
    return res.send(req.constructDefinition.image.data);
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

function loadGutenbergDefinitionData(req, res) {
    console.log("Load GutenbergDefinition Data - started");
    const userId=req.body.params.userId;
    const skeletonDefinition = req.body.params.skeletonDefinition;
    const lookupFilePath =
    "C:\\TeachLearnGame\\SourceFiles\\K-12WordList.csv";
    let lookupWordArray = loadArrayOfLookupData(lookupFilePath);

    const filePath =
    "C:\\TeachLearnGame\\SourceFiles\\NewDictionary.txt";
   
    console.log("Load GutenbergDefinition Data - userId = ", userId);
    console.log("Load GutenbergDefinition Data - fileName = ", filePath);
    console.log("Load GutenbergDefinition Data - req.body = ", req.body);
    console.log("Load GutenbergDefinition Data - req.body.params = ", req.body.params);
    console.log("Load GutenbergDefinition Data - req.body.params.skeletonDefinition = ", req.body.params.skeletonDefinition);
  
    console.log("Load GutenbergDefinition Data - Reading File = " + filePath);
   
    var lineReader = readline.createInterface({
      input: fs.createReadStream(filePath)
    });
    
    let constructDefinition = {};
    let wordToDefine = "";
    let soundOut = "";
    let partOfSpeechAbrev = "";
    let partOfSpeech = "";
    let etymology = "";
    let classification = "";
    let pluralForm = "";
    let wordUseExample = "";
    let wordDefinitions = [];
    let description = "";

    //Word to Define: ZYLONITE
    //SoundOut : Zy"lon*ite
    //Part Of Speech:  n.
    //ETYM: Gr.
    //Classification: Physiol. Chem.
    //Definition Number 1: Celluloid.

    let criteria = {};
    var totalCnt = 0;
    var cnt = 0;

    lineReader.on('line', function (line) {
      cnt = cnt+1
      totalCnt = totalCnt + 1;
      if (cnt >= 500)
      {
        lineReader.pause();
        setTimeout(_ => {
          console.log("Total Count Processed : ", totalCnt );
          console.log(line);
          cnt=0;
          lineReader.resume();
      }, 10000);
      }
      totalCnt = totalCnt + 1;
      if (line.substring(0,14) == "Word to Define")
      {
        wordToDefine = wordToDefine.trim();
        if (wordToDefine != "" && !wordToDefine.includes("-"))
          //wordToDefine.substring(wordToDefine.length-1,1) != "-"  && 
          //wordToDefine.substring(0,1) != "-")
        {   
          if (partOfSpeechAbrev.trim() == "n.")
          {
            partOfSpeech = "noun";
          } else if (partOfSpeechAbrev.trim() == "v.")
          {
            partOfSpeech = "verb";
          } else if (partOfSpeechAbrev.trim() == "a.")
          {
            partOfSpeech = "adjective";
          } else if (partOfSpeechAbrev.trim() == "adv.")
          {
            partOfSpeech = "adverb";
          } else if (partOfSpeechAbrev.trim() == "obs.")
          {
            partOfSpeech = "obsolete";
          } else if (partOfSpeechAbrev.trim() == "")
          {
            partOfSpeech = "";
          } else 
          {
            partOfSpeech = partOfSpeechAbrev;
          }    
          
          if (partOfSpeech.length > 0)
          {
            description = "Word: " +  wordToDefine + "; Part of Speech: " +  partOfSpeech;
          } else
          {
            description = "Word: " +  wordToDefine;
          }
    
          if (wordDefinitions[0] != undefined && wordDefinitions[0] != null)
          {
            if (wordDefinitions[0].length > 0)
            {
              description = description + "; Definition: " +  wordDefinitions[0]
            }
          }
          criteria = searchForWord(wordToDefine, lookupWordArray)
          //console.log(soundOut);
          //console.log(partOfSpeech);
          //console.log(etymology);
          //console.log(classification);
          //console.log(wordDefinitions);
          constructDefinition = {
            wordToDefine: wordToDefine,
            soundOut: soundOut?soundOut:"",
            partOfSpeech: partOfSpeech?partOfSpeech:"",
            etymology: etymology?etymology:"",
            classification: classification?classification:"",
            pluralForm: "",
            wordUseExample: "",
            wordDefinitions: wordDefinitions?wordDefinitions:""
          }
          insertGutenbergDefinitionData(userId, skeletonDefinition,constructDefinition,criteria, description)
        }
        wordToDefine = line.substring(16).toLowerCase().trim();      
        soundOut = "";
        partOfSpeechAbrev = "";
        partOfSpeech = "";
        etymology = "";
        classification = "";
        wordDefinitions = [];
        description = "";
      } else if (line.substring(0,8) == "SoundOut")
      {
        soundOut = line.substring(10).trim();
      } else if (line.substring(0,14) == "Part Of Speech")
      {
        partOfSpeechAbrev = line.substring(16).trim().toLowerCase();
      } else if (line.substring(0,4) == "ETYM")
      {
        etymology = line.substring(6).trim();
      } else if (line.substring(0,14) == "Classification")
      {
        classification = line.substring(16).trim();
      } else if (line.substring(0,17) == "Definition Number")
      {
        wordDefinitions.push(line.substring(21).trim())
      }
    });
    // Write out the last record
    if (wordToDefine != "")
    {  
      if (partOfSpeechAbrev.trim() == "n.")
      {
        partOfSpeech = "noun";
      } else         if (partOfSpeechAbrev.trim() == "v.")
      {
        partOfSpeech = "verb";
      } else         if (partOfSpeechAbrev.trim() == "a.")
      {
        partOfSpeech = "adjective";
      } else         if (partOfSpeechAbrev.trim() == "adv.")
      {
        partOfSpeech = "adverb";
      }         if (partOfSpeechAbrev.trim() == "obs.")
      {
        partOfSpeech = "obsolete";
      } else         if (partOfSpeechAbrev.trim() == "")
      {
        partOfSpeech = "";
      } else 
      {
        partOfSpeech = partOfSpeechAbrev;
      }

      if (partOfSpeech.length > 0)
      {
        description = "Word: " +  wordToDefine + "; Part of Speech: " +  partOfSpeech;
      } else
      {
        description = "Word: " +  wordToDefine;
      }

      if (wordDefinitions[0].length > 0)
      {
        description = description + "; Definition: " +  wordDefinitions[0]
      }
      
      console.log(wordToDefine);
      criteria = searchForWord(wordToDefine, lookupWordArray)
      console.log(soundOut);
      console.log(partOfSpeech);
      console.log(etymology);
      console.log(classification);
      console.log(wordDefinitions);
      constructDefinition = {
        wordToDefine: wordToDefine,
        soundOut: soundOut?soundOut:"",
        partOfSpeech: partOfSpeech?partOfSpeech:"",
        etymology: etymology?etymology:"",
        classification: classification?classification:"",
        pluralForm: "",
        wordUseExample: "",
        wordDefinitions: wordDefinitions?wordDefinitions:""
      }

      if (partOfSpeech.length > 0)
      {
        description = "Word: " +  wordToDefine + "; Part of Speech: " +  partOfSpeech;
      } else
      {
        description = "Word: " +  wordToDefine;
      }

      if (wordDefinitions[0].length > 0)
      {
        description = description + "; Definition: " +  wordDefinitions[0]
      }
      //console.log ("Load program - Description = ",   description)
      insertGutenbergDefinitionData(userId, skeletonDefinition,constructDefinition,criteria,description)
    }
  }

  const insertGutenbergDefinitionData = async (userId, skeletonDefinition,constructDefinitionDetails,criteria,description) => {
    if (constructDefinitionDetails && constructDefinitionDetails.wordToDefine) 
    {
      //console.log ("insertGutenbergDefinitionData - Description = ",   description)
      //console.log( "insertGutenbergDefinitionData -  inside the if statement creating a new Definition");
      const newConstructDefinition = new ConstructDefinition({
        topic: constructDefinitionDetails.wordToDefine,
        description: description,
        myClass: skeletonDefinition.myClass,
        category: skeletonDefinition.category,
        subject: (criteria && criteria.subject)? criteria.subject: skeletonDefinition.subject,
        type: skeletonDefinition.type,
        subType: skeletonDefinition.subType,
        difficultyLevel: (criteria && criteria.difficultyLevel)? criteria.difficultyLevel: skeletonDefinition.difficultyLevel,
        ageRange: (criteria && criteria.ageRange)? criteria.ageRange: skeletonDefinition.ageRange,
        image_id: skeletonDefinition.image_id ,
        imageFileName: skeletonDefinition.imageFileName ,
        owner_id: skeletonDefinition.owner_id ,
        group_id: skeletonDefinition.group_id ,
        groupName: skeletonDefinition.groupName ,
        keepPrivate: skeletonDefinition.keepPrivate ,
        approvedForPublicUse: skeletonDefinition.approvedForPublicUse ,
        constructDefinition: constructDefinitionDetails,
        markDeleted: skeletonDefinition.markDeleted ,
        createDate:  skeletonDefinition.createDate,
        updatedBy: skeletonDefinition.updatedBy ,
        updateDate:  skeletonDefinition.updateDate,
    
      });
      try {
        let result = await newConstructDefinition.save();

      } catch (err) {
        let newErrorLogData = {   
          userId: userId,
          activity:  "insertGutenbergDefinitionData" ,
          type: "Component" ,
          subType:"Definition" ,
          object_id: "",
          description:  "Bulk Load Definition Records" ,
          email: "" ,
          errorCode: err,
          errorMessage: errorHandler.getErrorMessage(err),
          serverOrClient: "Server",
          dateTimeStamp: Date.now() ,
        };
        createErrorLogEntry(newErrorLogData);
        if (err.toString().indexOf("E11000") > -1) {
          const error = new Error("Duplicate GutenbergDefinition Data");
          console.log(error);
        } else
        {
          const error = errorHandler.getErrorMessage(err)
          console.log(error);
        }
        
      }
    } else
    {
      console.log("Problem with the data - constructDefinitionDetails = ", constructDefinitionDetails )
    }

  };

export default {
  create,
  constructDefinitionById,
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
  loadGutenbergDefinitionData,
};




