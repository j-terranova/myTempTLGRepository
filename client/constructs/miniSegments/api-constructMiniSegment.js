import Fetch from "../../utilities/FetchUtility.js";
import auth from "./../../auth/auth-helper";

const create = async (userId, credentials, constructMiniSegmentData) => {
  console.log("api-constructMiniSegment - enter create component ");
  console.log(
    "api-constructMiniSegment - constructMiniSegmentData =  ",
    constructMiniSegmentData
  );
  try {
    let response = await fetch("/api/constructs/minisegments/by/" + userId.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(constructMiniSegmentData)
    })
      return await response.json()
    } catch(err) { 
      console.log(err);
      return {
        error: err,
      };
    }
}

const update = async (userId, credentials, constructMiniSegmentData) => {
  console.log("api-constructMiniSegment - enter update component ");
  console.log(
    "api-constructMiniSegment - constructMiniSegmentData =  ",
    constructMiniSegmentData
  );
  try {
    let response = await fetch("/api/constructs/minisegments/by/" + userId.userId, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t
        },
      body: JSON.stringify(constructMiniSegmentData)
    })
    console.log("api-constructMiniSegment - update - response =  ", response);
    return await response.json()
  } catch(err) {
    console.log("api-constructMiniSegment - update - ERROR!!! =  ", err);
    console.log(err);
    return {
      error: err,
    };
  }
}

const listByCriteria = async (userId, params, credentials, signal) => {
  console.log("api-constructMiniSegment - enter listByCriteria ");
  console.log("api-constructMiniSegment - listByCriteria - params =  ", params);
  try {
    let response = await Fetch.get(
      "/api/constructs/minisegments/byCriteria/" + userId.userId,
      params,
      credentials
    );
    return await response;
  } catch (err) {
    console.log("api-constructMiniSegment - listByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const readById = async (userId, params, credentials, signal) => {
  console.log("api-constructMiniSegment - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/constructs/minisegments/byId/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-constructMiniSegment - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-constructMiniSegment - readById - There is an error");
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
      "/api/constructs/minisegments/byMaxUpdateDate/" + userId.userId,
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
      "/api/constructs/minisegments/" + params.constructMiniSegmentId,
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
    let response = await fetch("/api/constructs/minisegments/by/" + params.userId, {
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
    let response = await fetch("/api/constructs/minisegments/approvedPublic", {
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
  //params =userId, fileName, skeletonMiniSegment
  console.log("api-constructMiniSegment - load constructMiniSegments function");
  console.log("api-constructMiniSegment - load constructMiniSegments params.userId = ", params.userId);
  console.log("api-constructMiniSegment - load constructMiniSegments params.skeletonMiniSegment = ", params.skeletonMiniSegment);
  console.log("api-constructMiniSegment - load constructMiniSegments credentials = ",credentials);
  console.log("api-referenceData - constructMiniSegment function");

  const jwt = auth.isAuthenticated();
  console.log("api-referenceData - jwt.token = " + jwt.token);
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log("api-referenceData - signal = " + signal);
  try {
    let response = await fetch("/api/constructs/minisegments/load/by/" + params.userId,
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
  load,
  remove,
  listByOwner,
  listApprovedPublic,
};
