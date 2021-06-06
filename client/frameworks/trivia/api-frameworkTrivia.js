import Fetch from "../../utilities/FetchUtility.js";
import auth from "./../../auth/auth-helper";

const create = async (userId, credentials, frameworkTriviaData) => {
  console.log("api-frameworkTrivia - enter create component ");
  console.log(
    "api-frameworkTrivia - frameworkTriviaData =  ",
    frameworkTriviaData
  );
  try {
    let response = await fetch("/api/frameworks/trivias/by/" + userId.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(frameworkTriviaData)
    })
      return await response.json()
    } catch(err) { 
      console.log(err);
      return {
        error: err,
      };
    }
}

const update = async (userId, credentials, frameworkTriviaData) => {
  console.log("api-frameworkTrivia - enter update component ");
  console.log(
    "api-frameworkTrivia - frameworkTriviaData =  ",
    frameworkTriviaData
  );
  try {
    let response = await fetch("/api/frameworks/trivias/by/" + userId.userId, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t
        },
      body: JSON.stringify(frameworkTriviaData)
    })
    console.log("api-frameworkTrivia - update - response =  ", response);
    return await response.json()
  } catch(err) {
    console.log("api-frameworkTrivia - update - ERROR!!! =  ", err);
    console.log(err);
    return {
      error: err,
    };
  }
}

const listByCriteria = async (userId, params, credentials, signal) => {
  console.log("api-frameworkTrivia - enter listByCriteria ");
  console.log("api-frameworkTrivia - listByCriteria - params =  ", params);
  try {
    let response = await Fetch.get(
      "/api/frameworks/trivias/byCriteria/" + userId.userId,
      params,
      credentials,
      signal,
    );
    return await response;
  } catch (err) {
    console.log("api-frameworkTrivia - listByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const readById = async (userId, params, credentials, signal) => {
  console.log("api-frameworkTrivia - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/frameworks/trivias/by/" + userId.userId,
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

const getCurrentFrameworkByMaxUpdateDateAndUserId = async (
  userId,
  credentials,
  signal
) => {
  try {
    let response = await fetch(
      "/api/frameworks/trivias/byMaxUpdateDate/" + userId.userId,
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
      "/api/frameworks/trivias/" + params.FrameworkTriviaId,
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
    let response = await fetch("/api/frameworks/trivias/by/" + params.userId, {
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
    let response = await fetch("/api/frameworks/trivias/approvedPublic", {
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
  //params =userId, fileName, skeletonTrivia
  console.log("api-frameworkTrivia - load FrameworkTrivias function");
  console.log("api-frameworkTrivia - load FrameworkTrivias params.userId = ", params.userId);
  console.log("api-frameworkTrivia - load FrameworkTrivias params.skeletonTrivia = ", params.skeletonTrivia);
  console.log("api-frameworkTrivia - load FrameworkTrivias credentials = ",credentials);
  console.log("api-referenceData - frameworkTrivia function");

  const jwt = auth.isAuthenticated();
  console.log("api-referenceData - jwt.token = " + jwt.token);
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log("api-referenceData - signal = " + signal);
  try {
    let response = await fetch("/api/frameworks/trivias/load/by/" + params.userId,
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


const newUserWithAccess = async (params, credentials, userWithAccess) => {
  try {
    let response = await fetch(
      "/api/frameworks/trivias/" +
        params.frameworkTriviaId +
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
      "/api/frameworks/trivias/" + params.frameworkTriviaId,
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
  getCurrentFrameworkByMaxUpdateDateAndUserId,
  readById,
  listByDifficultyLevelRange,
  read,
  load,
  remove,
  listByOwner,
  listApprovedPublic,
  newUserWithAccess
};