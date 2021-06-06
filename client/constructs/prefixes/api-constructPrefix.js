import Fetch from "../../utilities/FetchUtility.js";
import auth from "./../../auth/auth-helper";

const create = async (userId, credentials, constructPrefixData) => {
  console.log("api-constructPrefix - enter create component ");
  console.log(
    "api-constructPrefix - constructPrefixData =  ",
    constructPrefixData
  );
  try {
    let response = await fetch("/api/constructs/prefixs/by/" + userId.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(constructPrefixData)
    })
      return await response.json()
    } catch(err) { 
      console.log(err);
      return {
        error: err,
      };
    }
}

const update = async (userId, credentials, constructPrefixData) => {
  console.log("api-constructPrefix - enter update component ");
  console.log(
    "api-constructPrefix - constructPrefixData =  ",
    constructPrefixData
  );
  try {
    let response = await fetch("/api/constructs/prefixs/by/" + userId.userId, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t
        },
      body: JSON.stringify(constructPrefixData)
    })
    console.log("api-constructPrefix - update - response =  ", response);
    return await response.json()
  } catch(err) {
    console.log("api-constructPrefix - update - ERROR!!! =  ", err);
    console.log(err);
    return {
      error: err,
    };
  }
}

const listByCriteria = async (userId, params, credentials, signal) => {
  console.log("api-constructPrefix - enter listByCriteria ");
  console.log("api-constructPrefix - listByCriteria - params =  ", params);
  try {
    let response = await Fetch.get(
      "/api/constructs/prefixs/byCriteria/" + userId.userId,
      params,
      credentials,
      signal,
    );
    return await response;
  } catch (err) {
    console.log("api-constructPrefix - listByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const readById = async (userId, params, credentials, signal) => {
  console.log("api-constructPrefix - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/constructs/prefixs/byId/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-constructPrefix - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-constructPrefix - readById - There is an error");
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
      "/api/constructs/prefixs/byMaxUpdateDate/" + userId.userId,
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

  console.log("api-constructPrefix - uid = ", uid)
  console.log("api-constructPrefix - difficultyLevel = ", difficultyLevel)
  console.log("api-constructPrefix - numberToRetrieve = ", numberToRetrieve)
  try {
    let response = await fetch(
      "/api/constructs/prefixs/byDifficultyLevel/" + userId.userId,
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
      "/api/constructs/prefixs/" + params.constructPrefixId,
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
    let response = await fetch("/api/constructs/prefixs/by/" + params.userId, {
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
    let response = await fetch("/api/constructs/prefixs/approvedPublic", {
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


const loadGutenbergPrefixData = async (params, credentials) => {
  //params =userId, fileName, skeletonPrefix
  console.log("api-constructPrefix - load constructPrefixs function");
  console.log("api-constructPrefix - load constructPrefixs params.userId = ", params.userId);
  console.log("api-constructPrefix - load constructPrefixs params.skeletonPrefix = ", params.skeletonPrefix);
  console.log("api-constructPrefix - load constructPrefixs credentials = ",credentials);
  console.log("api-referenceData - constructPrefix function");

  const jwt = auth.isAuthenticated();
  console.log("api-referenceData - jwt.token = " + jwt.token);
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log("api-referenceData - signal = " + signal);
  try {
    let response = await fetch("/api/constructs/prefixs/load/by/" + params.userId,
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
  loadGutenbergPrefixData,
  remove,
  listByOwner,
  listApprovedPublic,
};
