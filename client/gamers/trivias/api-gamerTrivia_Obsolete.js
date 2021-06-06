import Fetch from "../../utilities/FetchUtility.js";
import auth from "../../auth/auth-helper";

const create = async (userId, credentials, frameworkComponent) => {
  console.log("api-gamerTrivia - enter create component ");
  console.log(
    "api-gamerTrivia - frameworkComponent =  ",
    frameworkComponent
  );
  try {
    let response = await fetch("/api/frameworks/trivias/by/" + userId.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(frameworkComponent)
    })
      return await response.json()
    } catch(err) { 
      console.log(err);
      return {
        error: err,
      };
    }
}

const update = async (userId, credentials, frameworkComponent) => {
  console.log("api-gamerTrivia - enter update component ");
  console.log(
    "api-gamerTrivia - frameworkComponent =  ",
    frameworkComponent
  );
  try {
    let response = await fetch("/api/frameworks/trivias/by/" + userId.userId, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t
        },
      body: JSON.stringify(frameworkComponent)
    })
    console.log("api-gamerTrivia - update - response =  ", response);
    return await response.json()
  } catch(err) {
    console.log("api-gamerTrivia - update - ERROR!!! =  ", err);
    console.log(err);
    return {
      error: err,
    };
  }
}

const listByCriteria = async (userId, params, credentials, signal) => {
  console.log("api-gamerTrivia - enter listByCriteria ");
  console.log("api-gamerTrivia - listByCriteria - params =  ", params);
  try {
    let response = await Fetch.get(
      "/api/frameworks/trivias/byCriteria/" + userId.userId,
      params,
      credentials,
      signal,
    );
    return await response;
  } catch (err) {
    console.log("api-gamerTrivia - listByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const readById = async (userId, params, credentials, signal) => {
  console.log("api-gamerTrivia - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/frameworks/trivias/by/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-gamerTrivia - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-gamerTrivia - readById - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};


const listByDifficultyLevelRange = async (userId, params, credentials, signal) => {
  console.log("api-frameworkTrivia - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/frameworks/trivias/byDifficultyLevel/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-frameworkTrivia - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-frameworkTrivia - readById - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};


const listTriviasByCriteriaByStudent = async (selectedCriteriaFramework, userId, params, credentials) => {
  console.log("api-gamerTrivia - enter listTriviasByCriteriaByStudent ");
  console.log(
    "api-gamerTrivia - listTriviasByCriteriaByStudent -selectedCriteriaFramework =  ",
    selectedCriteriaFramework
  );
  console.log(
    "api-gamerTrivia - listTriviasByCriteriaByStudent - params.url =  ",
    params.url
  );
  console.log("api-gamerTrivia - listTriviasByCriteriaByStudent - params =  ", params);
  console.log(
    "api-gamerTrivia - listTriviasByCriteriaByStudent - just before get component "
  );

  const apiRoute = "/api/frameworks/trivias/gamerByCriteria/" + userId.userId;
  console.log("api-gamerTrivia - listTriviasByCriteriaByStudent - apiRoute ", apiRoute);
  
  try {
    let response = await Fetch.get(
      apiRoute,
      params,
      credentials
    );
    console.log(
      "api-gamerTrivia - listTriviasByCriteriaByStudent - just after get component "
    );

    console.log(
      "api-gamerTrivia - listTriviasByCriteriaByStudent - response ",
      response
    );

    return await response;
  } catch (err) {
    console.log("api-gamerTrivia - listTriviasByCriteriaByStudent - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const getSelectedMatching = async (selectedCriteriaFramework, userId, params, credentials) => {
  console.log("api-gamerTrivia - enter getSelectedMatching ");
  console.log(
    "api-gamerTrivia - getSelectedMatching -selectedCriteriaFramework =  ",
    selectedCriteriaFramework
  );
  console.log(
    "api-gamerTrivia - getSelectedMatching - params.url =  ",
    params.url
  );
  console.log("api-gamerTrivia - getSelectedMatching - params =  ", params);
  console.log(
    "api-gamerTrivia - getSelectedMatching - just before get component "
  );

  const apiRoute = "/api/frameworks/trivias/frameworkById/" + userId.userId;
  console.log("api-gamerTrivia - getSelectedMatching - apiRoute ", apiRoute);
  
  try {
    let response = await Fetch.get(
      apiRoute,
      params,
      credentials
    );
    console.log(
      "api-gamerTrivia - getSelectedMatching - just after get component "
    );

    console.log(
      "api-gamerTrivia - getSelectedMatching - response ",
      response
    );

    return await response;
  } catch (err) {
    console.log("api-gamerTrivia - getSelectedMatching - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const read = async (params, signal) => {
  try {
    let response = await fetch(
      "/api/frameworks/components/" + params.frameworkComponentId,
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

const load = async (params, credentials) => {
  //params =userId, fileName, skeletonComponent
  console.log("api-gamerTrivia - load frameworkComponents function");
  console.log("api-gamerTrivia - load frameworkComponents params.userId = ", params.userId);
  console.log("api-gamerTrivia - load frameworkComponents params.skeletonComponent = ", params.skeletonComponent);
  console.log("api-gamerTrivia - load frameworkComponents credentials = ",credentials);
  console.log("api-referenceData - frameworkComponent function");

  const jwt = auth.isAuthenticated();
  console.log("api-referenceData - jwt.token = " + jwt.token);
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log("api-referenceData - signal = " + signal);
  try {
    let response = await fetch("/api/frameworks/components/load/by/" + params.userId,
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

const remove = async (params, credentials) => {
  try {
    let response = await fetch(
      "/api/frameworks/components/" + params.frameworkComponentId,
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
    let response = await fetch("/api/frameworks/components/by/" + params.userId, {
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
      "/api/frameworks/components/" +
        params.frameworkComponentId +
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
};
const listApprovedPublic = async (signal) => {
  try {
    let response = await fetch("/api/frameworks/components/approvedPublic", {
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

export {
  create,
  update,
  listByCriteria,
  readById,
  listByDifficultyLevelRange,
  listTriviasByCriteriaByStudent,
  getSelectedMatching,
  getCurrentFrameworkComponentByMaxUpdateDateAndUserID,
  read,
  load,
  remove,
  listByOwner,
  newUserWithAccess,
  listApprovedPublic,
};
