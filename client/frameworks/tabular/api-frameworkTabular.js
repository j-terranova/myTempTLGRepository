import Fetch from "../../utilities/FetchUtility.js";
import auth from "./../../auth/auth-helper";

const create = async (userId, credentials, frameworkTabularData) => {
  console.log("api-frameworkTabular - enter create component ");
  console.log(
    "api-frameworkTabular - frameworkTabularData =  ",
    frameworkTabularData
  );
  try {
    let response = await fetch("/api/frameworks/tabulars/by/" + userId.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(frameworkTabularData)
    })
      return await response.json()
    } catch(err) { 
      console.log(err);
      return {
        error: err,
      };
    }
}

const update = async (userId, credentials, frameworkTabularData) => {
  console.log("api-frameworkTabular - enter update component ");
  console.log(
    "api-frameworkTabular - frameworkTabularData =  ",
    frameworkTabularData
  );
  try {
    let response = await fetch("/api/frameworks/tabulars/by/" + userId.userId, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t
        },
      body: JSON.stringify(frameworkTabularData)
    })
    console.log("api-frameworkTabular - update - response =  ", response);
    return await response.json()
  } catch(err) {
    console.log("api-frameworkTabular - update - ERROR!!! =  ", err);
    console.log(err);
    return {
      error: err,
    };
  }
}

const listByCriteria = async (userId, params, credentials, signal) => {
  console.log("api-frameworkTabular - enter listByCriteria ");
  console.log("api-frameworkTabular - listByCriteria - params =  ", params);
  try {
    let response = await Fetch.get(
      "/api/frameworks/tabulars/byCriteria/" + userId.userId,
      params,
      credentials,
      signal,
    );
    return await response;
  } catch (err) {
    console.log("api-frameworkTabular - listByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const readById = async (userId, params, credentials, signal) => {
  console.log("api-frameworkTabular - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/frameworks/tabulars/by/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-frameworkTabular - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-frameworkTabular - readById - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const listByDifficultyLevelRange = async (userId, params, credentials, signal) => {
  console.log("api-frameworkTabular - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/frameworks/tabulars/byDifficultyLevel/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-frameworkTabular - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-frameworkTabular - readById - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};


const listMatchingsByCriteriaByStudent = async (selectedCriteriaFramework, userId, params, credentials) => {
  console.log("api-gamerMatching - enter listMatchingsByCriteriaByStudent ");
  console.log(
    "api-gamerMatching - listMatchingsByCriteriaByStudent -selectedCriteriaFramework =  ",
    selectedCriteriaFramework
  );
  console.log(
    "api-gamerMatching - listMatchingsByCriteriaByStudent - params.url =  ",
    params.url
  );
  console.log("api-gamerMatching - listMatchingsByCriteriaByStudent - params =  ", params);
  console.log(
    "api-gamerMatching - listMatchingsByCriteriaByStudent - just before get component "
  );

  const apiRoute = "/api/frameworks/matchings/gamerByCriteria/" + userId.userId;
  console.log("api-gamerMatching - listMatchingsByCriteriaByStudent - apiRoute ", apiRoute);
  
  try {
    let response = await Fetch.get(
      apiRoute,
      params,
      credentials
    );
    console.log(
      "api-gamerMatching - listMatchingsByCriteriaByStudent - just after get component "
    );

    console.log(
      "api-gamerMatching - listMatchingsByCriteriaByStudent - response ",
      response
    );

    return await response;
  } catch (err) {
    console.log("api-gamerMatching - listMatchingsByCriteriaByStudent - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const getSelectedMatching = async (selectedCriteriaFramework, userId, params, credentials) => {
  console.log("api-gamerMatching - enter getSelectedMatching ");
  console.log(
    "api-gamerMatching - getSelectedMatching -selectedCriteriaFramework =  ",
    selectedCriteriaFramework
  );
  console.log(
    "api-gamerMatching - getSelectedMatching - params.url =  ",
    params.url
  );
  console.log("api-gamerMatching - getSelectedMatching - params =  ", params);
  console.log(
    "api-gamerMatching - getSelectedMatching - just before get component "
  );

  const apiRoute = "/api/frameworks/tabulars/matching/" + userId.userId;
  console.log("api-gamerMatching - getSelectedMatching - apiRoute ", apiRoute);
  
  try {
    let response = await Fetch.get(
      apiRoute,
      params,
      credentials
    );
    console.log(
      "api-gamerMatching - getSelectedMatching - just after get component "
    );

    console.log(
      "api-gamerMatching - getSelectedMatching - response ",
      response
    );

    return await response;
  } catch (err) {
    console.log("api-gamerMatching - getSelectedMatching - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const getCurrentFrameworkByMaxUpdateDateAndUserId = async (
  userId,
  credentials,
  signal
) => {
  try {
    let response = await fetch(
      "/api/frameworks/tabulars/byMaxUpdateDate/" + userId.userId,
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
      "/api/frameworks/tabulars/" + params.FrameworkTabularId,
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
    let response = await fetch("/api/frameworks/tabulars/by/" + params.userId, {
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
    let response = await fetch("/api/frameworks/tabulars/approvedPublic", {
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
  //params =userId, fileName, skeletonTabular
  console.log("api-frameworkTabular - load FrameworkTabulars function");
  console.log("api-frameworkTabular - load FrameworkTabulars params.userId = ", params.userId);
  console.log("api-frameworkTabular - load FrameworkTabulars params.skeletonTabular = ", params.skeletonTabular);
  console.log("api-frameworkTabular - load FrameworkTabulars credentials = ",credentials);
  console.log("api-referenceData - frameworkTabular function");

  const jwt = auth.isAuthenticated();
  console.log("api-referenceData - jwt.token = " + jwt.token);
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log("api-referenceData - signal = " + signal);
  try {
    let response = await fetch("/api/frameworks/tabulars/load/by/" + params.userId,
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

      
const getCurrentFrameworkComponentByMaxUpdateDateAndUserID = async (
  userId,
  credentials,
  signal
) => {
  console.log("api-referenceData - getCurrentFrameworkComponentByMaxUpdateDateAndUserID userId.userId", userId.userId);
  try {
    let response = await fetch(
      "/api/frameworkComponentsForMaxUpdateDate/by/" + userId.userId,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + credentials.t,
        },
        signal: signal,
      }
    );
    console.log("api-referenceData - getCurrentFrameworkComponentByMaxUpdateDateAndUserID-after query-response", response);
    return response.json();
  } catch (err) {
    console.log(err);
    return {
      error: err,
    };
  }
};

const newUserWithAccess = async (params, credentials, userWithAccess) => {
  try {
    let response = await fetch(
      "/api/frameworks/tabulars/" +
        params.frameworkTabularId +
        "/userWithAccess/new",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
        body: JSON.stringify({ userWithAccess: userWithAccess }),
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
    return {
      error: err,
    };
  }
}

const read = async (params, signal) => {
  try {
    let response = await fetch(
      "/api/frameworks/tabulars/" + params.frameworkTabularId,
      {
        method: "GET",
        signal: signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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

export {
  create,
  update,
  listByCriteria,
  listMatchingsByCriteriaByStudent,
  getSelectedMatching,
  getCurrentFrameworkByMaxUpdateDateAndUserId,
  getCurrentFrameworkComponentByMaxUpdateDateAndUserID,
  readById,
  listByDifficultyLevelRange,
  read,
  load,
  remove,
  listByOwner,
  listApprovedPublic,
  newUserWithAccess
};