import Fetch from "../../utilities/FetchUtility.js";
import auth from "./../../auth/auth-helper";

const create = async (userId, credentials, constructAssociationData) => {
  console.log("api-constructAssociation - enter create component ");
  console.log(
    "api-constructAssociation - constructAssociationData =  ",
    constructAssociationData
  );
  try {
    let response = await fetch("/api/constructs/associations/by/" + userId.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(constructAssociationData)
    })
      return await response.json()
    } catch(err) { 
      console.log(err);
      return {
        error: err,
      };
    }
}

const update = async (userId, credentials, constructAssociationData) => {
  console.log("api-constructAssociation - enter update component ");
  console.log(
    "api-constructAssociation - constructAssociationData =  ",
    constructAssociationData
  );
  try {
    let response = await fetch("/api/constructs/associations/by/" + userId.userId, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t
        },
      body: JSON.stringify(constructAssociationData)
    })
    console.log("api-constructAssociation - update - response =  ", response);
    return await response.json()
  } catch(err) {
    console.log("api-constructAssociation - update - ERROR!!! =  ", err);
    console.log(err);
    return {
      error: err,
    };
  }
}

const listByCriteria = async (userId, params, credentials, signal) => {
  console.log("api-constructAssociation - enter listByCriteria ");
  console.log("api-constructAssociation - listByCriteria - params =  ", params);
  try {
    let response = await Fetch.get(
      "/api/constructs/associations/byCriteria/" + userId.userId,
      params,
      credentials,
      signal,
    );
    return await response;
  } catch (err) {
    console.log("api-constructAssociation - listByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const readById = async (userId, params, credentials, signal) => {
  console.log("api-constructAssociation - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/constructs/associations/byId/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-constructAssociation - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-constructAssociation - readById - There is an error");
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
      "/api/constructs/associations/byMaxUpdateDate/" + userId.userId,
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

const getAntonymRandomOptions = async (
  userId,
  credentials,
  params,
  signal
) => {

  let uid = userId.userId;
  let difficultyLevel = params.difficultyLevel 
  let numberToRetrieve = params.numberToRetrieve

  console.log("api-constructAssociation - uid = ", uid)
  console.log("api-constructAssociation - difficultyLevel = ", difficultyLevel)
  console.log("api-constructAssociation - numberToRetrieve = ", numberToRetrieve)
  try {
    let response = await fetch(
      "/api/constructs/associations/antonym/" + userId.userId,
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

const getSynonymRandomOptions = async (
  userId,
  credentials,
  params,
  signal
) => {

  let uid = userId.userId;
  let difficultyLevel = params.difficultyLevel 
  let numberToRetrieve = params.numberToRetrieve

  console.log("api-constructAssociation - uid = ", uid)
  console.log("api-constructAssociation - difficultyLevel = ", difficultyLevel)
  console.log("api-constructAssociation - numberToRetrieve = ", numberToRetrieve)
  try {
    let response = await fetch(
      "/api/constructs/associations/synonym/" + userId.userId,
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
      "/api/constructs/associations/" + params.constructAssociationId,
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
    let response = await fetch("/api/constructs/associations/by/" + params.userId, {
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
    let response = await fetch("/api/constructs/associations/approvedPublic", {
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


const loadGutenbergAssociationData = async (params, credentials) => {
  //params =userId, fileName, skeletonAssociation
  console.log("api-constructAssociation - load constructAssociations function");
  console.log("api-constructAssociation - load constructAssociations params.userId = ", params.userId);
  console.log("api-constructAssociation - load constructAssociations params.skeletonAssociation = ", params.skeletonAssociation);
  console.log("api-constructAssociation - load constructAssociations credentials = ",credentials);
  console.log("api-referenceData - constructAssociation function");

  const jwt = auth.isAuthenticated();
  console.log("api-referenceData - jwt.token = " + jwt.token);
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log("api-referenceData - signal = " + signal);
  try {
    let response = await fetch("/api/constructs/associations/load/by/" + params.userId,
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
  getAntonymRandomOptions,
  getSynonymRandomOptions,
  readById,
  update,
  loadGutenbergAssociationData,
  remove,
  listByOwner,
  listApprovedPublic,
};
