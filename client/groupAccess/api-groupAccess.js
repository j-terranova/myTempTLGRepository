import Fetch from "../utilities/FetchUtility.js";
import auth from "../auth/auth-helper";

const create = async (userId, credentials, groupAccessData) => {
  console.log("api-groupAccess - enter create component ");
  console.log(
    "api-groupAccess - groupAccessData =  ",
    groupAccessData
  );
  console.log(
    "api-groupAccess - userId =  ",
    userId
  );
  console.log(
    "api-groupAccess - credentials =  ",
    credentials
  );
  console.log("api-groupAccess - credentials =  ", credentials);
  try {
    let response = await fetch("/api/groupaccess/byOwner/" + userId.userId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(groupAccessData)
    })
      return await response.json()
    } catch(err) { 
      console.log(err);
      return {
        error: err,
      };
    }
}

const update = async (userId, credentials, groupAccessData) => {
  console.log("api-groupAccess - enter update component ");
  console.log(
    "api-groupAccess - groupAccessData =  ",
    groupAccessData
  );
  console.log(
    "api-groupAccess - update - userId =  ",
    userId
  );
  console.log(
    "api-groupAccess - update - credentials =  ",
    credentials
  );
  console.log("api-groupAccess - update - credentials =  ", credentials);
  try {
    let response = await fetch("/api/groupaccess/byOwner/" + userId.userId, {
      method: 'PUT',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
      body: JSON.stringify(groupAccessData)
    })
    return await response.json()
  } catch(err) {
    console.log(err);
    return {
      error: err,
    };
  }
}

const listByOwner = async (userId, params, credentials) => {
  console.log("api-groupAccessData - enter listGroupAccessByOwner ");
  console.log(
    "api-groupAccessData - listGroupAccessByOwner - params.url =  ",
    params.url
  );
  console.log("api-groupAccessData - listGroupAccessByOwner - params =  ", params);
  console.log(
    "api-groupAccessData - listGroupAccessByOwner - just before get component "
  );
 
  try {
    let response = await Fetch.get(
      "/api/groupaccess/byOwner/" + userId.userId,
      params,
      credentials
    );
    console.log(
      "api-groupAccessData - listGroupAccessByOwner - just after get component "
    );

    console.log(
      "api-groupAccessData - listGroupAccessByOwner - response ",
      response
    );

    return await response;
  } catch (err) {
    console.log("api-groupAccessData - listGroupAccessByOwner - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const getUserListData = async (userId, params, credentials) => {
  console.log("api-groupAccessData - enter getUserlistData ");
  console.log(
    "api-groupAccessData - getUserlistData - params.url =  ",
    params.url
  );
  console.log("api-groupAccessData - getUserlistData - params =  ", params);
  console.log(
    "api-groupAccessData - getUserlistData - just before get component "
  );
 
  try {
    let response = await Fetch.get(
      "/api/groupaccess/UserList/" + userId.userId,
      params,
      credentials
    );
    console.log(
      "api-groupAccessData - getUserlistData - just after get component "
    );

    console.log(
      "api-groupAccessData - getUserlistData - response ",
      response
    );

    return await response;
  } catch (err) {
    console.log("api-groupAccessData - getUserlistData - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const getSelectedGroupAccess = async ( userId, params, credentials) => {
  console.log("api-groupAccessData - enter getSelectedGroupAccess ");

  console.log(
    "api-groupAccessData - getSelectedGroupAccess - params.url =  ",
    params.url
  );
  console.log("api-groupAccessData - getSelectedGroupAccess - params =  ", params);
  console.log(
    "api-groupAccessData - getSelectedGroupAccess - just before get component "
  );
 
  try {
    let response = await Fetch.get(
      "/api/groupaccess/byGroupId/" + userId.userId,
      params,
      credentials
    );
    console.log(
      "api-groupAccessData - getSelectedGroupAccess - just after get component "
    );

    console.log(
      "api-groupAccessData - getSelectedGroupAccess - response ",
      response
    );

    return await response;
  } catch (err) {
    console.log("api-groupAccessData - getSelectedGroupAccess - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};

const read = async (params, signal) => {
  try {
    let response = await fetch(
      "/api/groupaccess/by/" + params.groupAccessDataId,
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
  console.log("api-groupAccessData - load groupAccessDatas function");
  console.log("api-groupAccessData - load groupAccessDatas params.userId = ", params.userId);
  console.log("api-groupAccessData - load groupAccessDatas params.skeletonComponent = ", params.skeletonComponent);
  console.log("api-groupAccessData - load groupAccessDatas credentials = ",credentials);
  console.log("api-referenceData - groupAccessData function");

  const jwt = auth.isAuthenticated();
  console.log("api-referenceData - jwt.token = " + jwt.token);
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log("api-referenceData - signal = " + signal);
  try {
    let response = await fetch("/api/groupaccess/load/by/" + params.userId,
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
  console.log("api-groupAccess - remove - Start")
  console.log("api-groupAccess - remove - params.GroupId = ", params.groupId)
  try {
    let response = await Fetch.remove(
      "/api/groupaccess/" + params.groupId,
      params,
      credentials,
    );
    console.log("api-groupAccess - remove - response", response)
    return await response;
  } catch (err) {
    console.log("api-groupAccess - remove - err", err)
    console.log(err);
    return {
      error: err,
    };
  }
};

export {
  create,
  update,
  listByOwner,
  getUserListData,
  getSelectedGroupAccess,
  read,
  load,
  remove,
};
