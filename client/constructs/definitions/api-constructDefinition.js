import Fetch from "../../utilities/FetchUtility.js";
import auth from "./../../auth/auth-helper";

const create = async (userId, credentials, constructDefinitionData) => {
  console.log("api-constructDefinition - enter create component ");
  console.log(
    "api-constructDefinition - constructDefinitionData =  ",
    constructDefinitionData
  );
  try {
    let response = await fetch("/api/constructs/definitions/by/" + userId.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(constructDefinitionData)
    })
      return await response.json()
    } catch(err) { 
      console.log(err);
      return {
        error: err,
      };
    }
}

const update = async (userId, credentials, constructDefinitionData) => {
  console.log("api-constructDefinition - enter update component ");
  console.log(
    "api-constructDefinition - constructDefinitionData =  ",
    constructDefinitionData
  );
  try {
    let response = await fetch("/api/constructs/definitions/by/" + userId.userId, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t
        },
      body: JSON.stringify(constructDefinitionData)
    })
    console.log("api-constructDefinition - update - response =  ", response);
    return await response.json()
  } catch(err) {
    console.log("api-constructDefinition - update - ERROR!!! =  ", err);
    console.log(err);
    return {
      error: err,
    };
  }
}

const listByCriteria = async (userId, params, credentials, signal) => {
  console.log("api-constructDefinition - enter listByCriteria ");
  console.log("api-constructDefinition - listByCriteria - params =  ", params);
  try {
    let response = await Fetch.get(
      "/api/constructs/definitions/byCriteria/" + userId.userId,
      params,
      credentials,
      signal,
    );
    return await response;
  } catch (err) {
    console.log("api-constructDefinition - listByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const readById = async (userId, params, credentials, signal) => {
  console.log("api-constructDefinition - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/constructs/definitions/byId/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-constructDefinition - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-constructDefinition - readById - There is an error");
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
      "/api/constructs/definitions/byMaxUpdateDate/" + userId.userId,
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

  console.log("api-constructDefinition - uid = ", uid)
  console.log("api-constructDefinition - difficultyLevel = ", difficultyLevel)
  console.log("api-constructDefinition - numberToRetrieve = ", numberToRetrieve)
  try {
    let response = await fetch(
      "/api/constructs/definitions/byDifficultyLevel/" + userId.userId,
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
      "/api/constructs/definitions/" + params.ConstructDefinitionId,
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
    let response = await fetch("/api/constructs/definitions/by/" + params.userId, {
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
    let response = await fetch("/api/constructs/definitions/approvedPublic", {
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


const loadGutenbergDefinitionData = async (params, credentials) => {
  //params =userId, fileName, skeletonDefinition
  console.log("api-constructDefinition - load ConstructDefinitions function");
  console.log("api-constructDefinition - load ConstructDefinitions params.userId = ", params.userId);
  console.log("api-constructDefinition - load ConstructDefinitions params.skeletonDefinition = ", params.skeletonDefinition);
  console.log("api-constructDefinition - load ConstructDefinitions credentials = ",credentials);
  console.log("api-referenceData - constructDefinition function");

  const jwt = auth.isAuthenticated();
  console.log("api-referenceData - jwt.token = " + jwt.token);
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log("api-referenceData - signal = " + signal);
  try {
    let response = await fetch("/api/constructs/definitions/load/by/" + params.userId,
    {
      method: "PUT",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt.token,
      }, 
      //body: params,  
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
  loadGutenbergDefinitionData,
  remove,
  listByOwner,
  listApprovedPublic,
};
