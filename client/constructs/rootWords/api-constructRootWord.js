import Fetch from "../../utilities/FetchUtility.js";
import auth from "./../../auth/auth-helper";

const create = async (userId, credentials, constructRootWordData) => {
  console.log("api-constructRootWord - enter create component ");
  console.log(
    "api-constructRootWord - constructRootWordData =  ",
    constructRootWordData
  );
  try {
    let response = await fetch("/api/constructs/rootWords/by/" + userId.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(constructRootWordData)
    })
      return await response.json()
    } catch(err) { 
      console.log(err);
      return {
        error: err,
      };
    }
}

const update = async (userId, credentials, constructRootWordData) => {
  console.log("api-constructRootWord - enter update component ");
  console.log(
    "api-constructRootWord - constructRootWordData =  ",
    constructRootWordData
  );
  try {
    let response = await fetch("/api/constructs/rootWords/by/" + userId.userId, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t
        },
      body: JSON.stringify(constructRootWordData)
    })
    console.log("api-constructRootWord - update - response =  ", response);
    return await response.json()
  } catch(err) {
    console.log("api-constructRootWord - update - ERROR!!! =  ", err);
    console.log(err);
    return {
      error: err,
    };
  }
}

const listByCriteria = async (userId, params, credentials, signal) => {
  console.log("api-constructRootWord - enter listByCriteria ");
  console.log("api-constructRootWord - listByCriteria - params =  ", params);
  try {
    let response = await Fetch.get(
      "/api/constructs/rootWords/byCriteria/" + userId.userId,
      params,
      credentials,
      signal,
    );
    return await response;
  } catch (err) {
    console.log("api-constructRootWord - listByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const readById = async (userId, params, credentials, signal) => {
  console.log("api-constructRootWord - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/constructs/rootWords/byId/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-constructRootWord - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-constructRootWord - readById - There is an error");
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
      "/api/constructs/rootWords/byMaxUpdateDate/" + userId.userId,
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

const remove = async (params, credentials) => {
  try {
    let response = await fetch(
      "/api/constructs/rootWords/" + params.constructRootWordId,
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
    let response = await fetch("/api/constructs/rootWords/by/" + params.userId, {
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
    let response = await fetch("/api/constructs/rootWords/approvedPublic", {
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


const loadGutenbergRootWordData = async (params, credentials) => {
  //params =userId, fileName, skeletonRootWord
  console.log("api-constructRootWord - load constructRootWords function");
  console.log("api-constructRootWord - load constructRootWords params.userId = ", params.userId);
  console.log("api-constructRootWord - load constructRootWords params.skeletonRootWord = ", params.skeletonRootWord);
  console.log("api-constructRootWord - load constructRootWords credentials = ",credentials);
  console.log("api-referenceData - constructRootWord function");

  const jwt = auth.isAuthenticated();
  console.log("api-referenceData - jwt.token = " + jwt.token);
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log("api-referenceData - signal = " + signal);
  try {
    let response = await fetch("/api/constructs/rootWords/load/by/" + params.userId,
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
  readById,
  update,
  loadGutenbergRootWordData,
  remove,
  listByOwner,
  listApprovedPublic,
};
