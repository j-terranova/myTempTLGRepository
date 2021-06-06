import Fetch from "../../utilities/FetchUtility.js";
import auth from "../../auth/auth-helper";


const create = async (params, credentials, frameworkRecentlyViewed) => {
  console.log("api-frameworkRecentlyViewed - enter create component ");
  console.log(
    "api-frameworkRecentlyViewed - frameworkRecentlyViewed =  ",
    frameworkRecentlyViewed
  );
  try {
    let response = await fetch("/api/frameworks/recentlyviewed/by/" + params.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(frameworkRecentlyViewed)
    })
    return await response.json()
  } catch(err) { 
    console.log(err);
    return {
      error: err,
    };
  }
}

const update = async (params, credentials, frameworkRecentlyViewed) => {
  console.log("api-frameworkRecentlyViewed - update - start");
  console.log("api-frameworkRecentlyViewed - update - params = ", params);
  console.log("api-frameworkRecentlyViewed - update - credentials = ", credentials);
  console.log("api-frameworkRecentlyViewed - update - frameworkRecentlyViewed = ", frameworkRecentlyViewed);
  try {
    console.log("api-frameworkRecentlyViewed - update - inside Try");
    let response = await fetch("/api/frameworks/recentlyViewed/by/" + params.userId, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(frameworkRecentlyViewed)
    })
    console.log("api-constructAssociation - update - response =  ", response);
    return await response.json()
  } catch(err) { 
    console.log(err);
    return {
      error: err,
    };
  }
}

const readRecentlyViewedBySubType = async (userId, params, credentials, signal) => {
  console.log("api-learnerLesson - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/frameworks/recentlyviewed/lessons/bySubType/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-learnerLesson - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-learnerLesson - readById - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const readById = async (userId, params, credentials, signal) => {
  console.log("api-learnerLesson - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/frameworks/recentlyviewed/by/" + userId.userId,
    params,
    credentials,
    signal
  );
    console.log("api-learnerLesson - readById - response = ", response);
    return await response;
  } catch (err) {
    console.log("api-learnerLesson - readById - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const listRecentlyViewed = async (
  userId,
  params,
  credentials,
  signal,
) => {
  try {
    console.log(
      "api-frameworkRecentlyViewed - listRecentlyViewed - just entering "
    );
    console.log(
      "api-frameworkRecentlyViewed - listRecentlyViewed - userId = ", userId
    );
    console.log(
      "api-frameworkRecentlyViewed - listRecentlyViewed - credentials = ", credentials
    );
    console.log(
      "api-frameworkRecentlyViewed - listRecentlyViewed - params = ", params.userId
    );
    console.log(
      "api-frameworkRecentlyViewed - listRecentlyViewed - subType = ", params.subType
    );
    let response = await Fetch.get(
      "/api/frameworks/recentlyviewed/lessons/by/" + userId.userId,
      params, //params
      credentials,
      signal,
    );
    console.log(
      "api-frameworkRecentlyViewed - listRecentlyViewed - just after get userframeworkstatus "
    );
    console.log(
      "api-frameworkRecentlyViewed - listRecentlyViewed - response ",
      response
    );
    return await response;
  } catch (err) {
    console.log("api-frameworkRecentlyViewed - listByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const listRecentlyViewedLearnings = async (
  userId,
  params,
  credentials,
  signal,
) => {
  try {
    console.log(
      "api-frameworkRecentlyViewed - getRecentlyViewedLearning - just entering "
    );
    console.log(
      "api-frameworkRecentlyViewed - getRecentlyViewedLearning - userId = ", userId
    );
    console.log(
      "api-frameworkRecentlyViewed - getRecentlyViewedLearning - credentials = ", credentials
    );
    console.log(
      "api-frameworkRecentlyViewed - getRecentlyViewedLearning - params = ", params
    );
    let response = await Fetch.get(
      "/api/frameworks/recentlyviewed/learning/by/" + userId.userId,
      params, //params
      credentials,
      signal,
    );
    console.log(
      "api-frameworkRecentlyViewed - getRecentlyViewedLearning - just after get userframeworkstatus "
    );
    console.log(
      "api-frameworkRecentlyViewed - getRecentlyViewedLearning - response ",
      response
    );
    return await response;
  } catch (err) {
    console.log("api-frameworkRecentlyViewed - listByCriteria - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const read = async (params, signal) => {
  try {
    let response = await fetch(
      "/api/userframeworkstatus/" + params.frameworkLessonId,
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


const remove = async (params, credentials) => {
  try {
    let response = await fetch(
      "/api/userframeworkstatus/" + params.frameworkLessonId,
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

export {
  create,
  update,
  readRecentlyViewedBySubType,
  readById,
  listRecentlyViewed,
  listRecentlyViewedLearnings,
  read,
  remove,

};
