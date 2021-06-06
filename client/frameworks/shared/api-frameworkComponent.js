import Fetch from "../../utilities/FetchUtility.js";
import auth from "../../auth/auth-helper";

const create = async (userId, credentials, frameworkComponent) => {
  console.log("api-frameworkComponent - enter create component ");
  console.log(
    "api-frameworkComponent - frameworkComponent =  ",
    frameworkComponent
  );
  console.log("api-frameworkComponent - credentials =  ", credentials);
  console.log("api-frameworkComponent - frameworkComponent =  ");
  for (var pair of frameworkComponent.entries()) {
    console.log(pair[0] + ", " + JSON.stringify(pair[1]));
  }
  try {
    let response = await Fetch.create(
      "/api/frameworks/components/by/" + userId.userId,
      frameworkComponent,
      credentials
    );
    console.log("api-frameworkComponent - response  =  ", response);
    return await response;
  } catch (err) {
    console.log("api-frameworkComponent - error encountered = " + err);
    console.log(err);
  }
};

const update = async (userId, credentials, frameworkComponent) => {
  console.log("api-frameworkComponent - enter update component ");
  console.log(
    "api-frameworkComponent update- frameworkComponent._id =  ",
    frameworkComponent._id
  );
  console.log("api-frameworkComponent update- credentials =  ", credentials);
  console.log("api-frameworkComponent update- frameworkComponent =  ");
  //for (var pair of frameworkComponent.entries()) {
  //  console.log(pair[0] + ", " + JSON.stringify(pair[1]));
  //}
  try {
    let response = await Fetch.update(
      "/api/frameworks/components/by/" + userId.userId,
      frameworkComponent,
      credentials
    );
    console.log("api-frameworkComponent update- response  =  ", response);
    return await response;
  } catch (err) {
    console.log("api-frameworkComponent update- error encountered = " + err);
    console.log(err);
  }
};

const listByCriteria = async (selectedComponent, userId, params, credentials, signal) => {
  console.log("api-frameworkComponent - enter listByCriteria ");
  console.log(
    "api-frameworkComponent - listByCriteria -selectedComponent =  ",
    selectedComponent
  );
  console.log(
    "api-frameworkComponent - listByCriteria -params.myClass =  ",
    params.myClass
  );
  console.log(
    "api-frameworkComponent - listByCriteria -params.category =  ",
    params.category
  );
  console.log(
    "api-frameworkComponent - listByCriteria -params.subject =  ",
    params.subject
  );
  console.log(
    "api-frameworkComponent - listByCriteria - params.url =  ",
    params.url
  );
  console.log("api-frameworkComponent - listByCriteria - params =  ", params);
  console.log(
    "api-frameworkComponent - listByCriteria - just before get component "
  );

  const apiRoute = "/api/constructs/" + selectedComponent.toLowerCase()  + "s" +   "/byCriteria/";

  console.log("api-frameworkComponent - listByCriteria - apiRoute ", apiRoute);
  
  try {
    let response = await Fetch.get(
      apiRoute + userId.userId,
      params,
      credentials,
      signal,
    );
    console.log(
      "api-frameworkComponent - listByCriteria - just after get component "
    );

    //console.log(
    //  "api-frameworkComponent - listByCriteria - response ",
    //  response
    //);

    return await response;
  } catch (err) {
    console.log("api-frameworkComponent - listByCriteria - There is an error");
    console.log(err);
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
  }
};

const load = async (params, credentials) => {
  //params =userId, fileName, skeletonComponent
  console.log("api-frameworkComponent - load frameworkComponents function");
  console.log("api-frameworkComponent - load frameworkComponents params.userId = ", params.userId);
  console.log("api-frameworkComponent - load frameworkComponents params.skeletonComponent = ", params.skeletonComponent);
  console.log("api-frameworkComponent - load frameworkComponents credentials = ",credentials);
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
  }
};

const getCurrentFrameworkComponentByMaxUpdateDateAndCriteriaAndUserID = async (
  userId,
  params,
  credentials,
) => {
  try {
    console.log(
      "api-frameworkComponent - getCurrentFrameworkComponentByMaxUpdateDateAndCriteriaAndUserID - just entering "
    );
    console.log(
      "api-frameworkComponent - getCurrentFrameworkComponentByMaxUpdateDateAndCriteriaAndUserID - userId = ", userId
    );
    console.log(
      "api-frameworkComponent - getCurrentFrameworkComponentByMaxUpdateDateAndCriteriaAndUserID - credentials = ", credentials
    );
    console.log(
      "api-frameworkComponent - getCurrentFrameworkComponentByMaxUpdateDateAndCriteriaAndUserID - params = ", params
    );
    let response = await Fetch.get(
      "/api/frameworkComponentsForMaxUpdateDateAndCriteria/by/" + userId.userId,
      params, //params
      credentials.t,
    );
    console.log(
      "api-frameworkComponent - getCurrentFrameworkComponentByMaxUpdateDateAndCriteriaAndUserID - just after get component "
    );
    console.log(
      "api-frameworkComponent - getCurrentFrameworkComponentByMaxUpdateDateAndCriteriaAndUserID - response ",
      response
    );
    return await response;
  } catch (err) {
    console.log("api-frameworkComponent - listByCriteria - There is an error");
    console.log(err);
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
  }
};
export {
  create,
  listByCriteria,
  getCurrentFrameworkComponentByMaxUpdateDateAndUserID,
  getCurrentFrameworkComponentByMaxUpdateDateAndCriteriaAndUserID,
  read,
  update,
  load,
  remove,
  listByOwner,
  newUserWithAccess,
  listApprovedPublic,
};
