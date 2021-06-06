import Fetch from "../../utilities/FetchUtility.js";
import auth from "./../../auth/auth-helper";

const create = async (userId, credentials, constructQuestionData) => {
  console.log("api-constructQuestion - enter create component ");
  console.log(
    "api-constructQuestion - constructQuestionData =  ",
    constructQuestionData
  );
  try {
    let response = await fetch("/api/constructs/questions/by/" + userId.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(constructQuestionData)
    })
      return await response.json()
    } catch(err) { 
      console.log(err);
      return {
        error: err,
      };
    }
}

const update = async (userId, credentials, constructQuestionData) => {
  console.log("api-constructQuestion - enter update component ");
  console.log(
    "api-constructQuestion - constructQuestionData =  ",
    constructQuestionData
  );
  try {
    let response = await fetch("/api/constructs/questions/by/" + userId.userId, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t
        },
      body: JSON.stringify(constructQuestionData)
    })
    console.log("api-constructQuestion - update - response =  ", response);
    return await response.json()
  } catch(err) {
    console.log("api-constructQuestion - update - ERROR!!! =  ", err);
    console.log(err);
    return {
      error: err,
    };
  }
}

const listByCriteria = async (userId, params, credentials, signal) => {
  console.log("api-constructQuestion - enter listByCriteria ");
  console.log("api-constructQuestion - listByCriteria - params =  ", params);
  try {
    let response = await Fetch.get(
      "/api/constructs/questions/byCriteria/" + userId.userId,
      params,
      credentials,
      signal,
    );
    return await response;
  } catch (err) {
    console.log("api-constructQuestion - listByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const readById = async (userId, params, credentials, signal) => {
  console.log("api-constructQuestion - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/constructs/questions/byId/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-constructQuestion - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-constructQuestion - readById - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const getCurrentConstructByMaxUpdateDateAndUserId = async (
  userId,
  credentials,
  signal
) => {
  try {
    let response = await fetch(
      "/api/constructs/questions/byMaxUpdateDate/" + userId.userId,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + credentials.t,
        },
        signal: signal,
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
    return {
      error: err,
    };
  }
};

const getRandomOptions = async (
  userId,
  credentials,
  params,
  signal
) => {

  let uid = userId.userId;
  let difficultyLevel = params.difficultyLevel 
  let numberToRetrieve = params.numberToRetrieve

  console.log("api-constructQuestion - uid = ", uid)
  console.log("api-constructQuestion - difficultyLevel = ", difficultyLevel)
  console.log("api-constructQuestion - numberToRetrieve = ", numberToRetrieve)
  try {
    let response = await fetch(
      "/api/constructs/questions/byDifficultyLevel/"  + userId.userId,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + credentials.t,
        },
        signal: signal,
      },
    );
    return response.json();
  } catch (err) {
    console.log(err);
    return {
      error: err,
    };
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch(
      "/api/constructs/questions/" + params.constructQuestionId,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    return {
      error: err,
    };
  }
};

const listByOwner = async (params, credentials, signal) => {
  try {
    let response = await fetch("/api/constructs/questions/by/" + params.userId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      signal: signal,
    });
    return response.json();
  } catch (err) {
    console.log(err);
    return {
      error: err,
    };
  }
};


const listApprovedPublic = async (signal) => {
  try {
    let response = await fetch("/api/constructs/questions/approvedPublic", {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return {
      error: err,
    };
  }
};


const load = async (params, credentials) => {
  //params =userId, fileName, skeletonQuestion
  console.log("api-constructQuestion - load constructQuestions function");
  console.log("api-constructQuestion - load constructQuestions params.userId = ", params.userId);
  console.log("api-constructQuestion - load constructQuestions params.skeletonQuestion = ", params.skeletonQuestion);
  console.log("api-constructQuestion - load constructQuestions credentials = ",credentials);
  console.log("api-referenceData - constructQuestion function");

  const jwt = auth.isAuthenticated();
  console.log("api-referenceData - jwt.token = " + jwt.token);
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log("api-referenceData - signal = " + signal);
  try {
    let response = await fetch("/api/constructs/questions/load/by/" + params.userId,
    {
      method: "PUT",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt.token,
      }, 
      body: JSON.stringify({ params: params }),     
     });
    return await response.json();
  } catch (err) {
    console.log("api-referenceData - ERROR");
    console.log(err);
    return {
      error: err,
    };
  }
};

export {
  create,
  listByCriteria,
  getCurrentConstructByMaxUpdateDateAndUserId,
  getRandomOptions,
  readById,
  update,
  load,
  remove,
  listByOwner,
  listApprovedPublic,
};
