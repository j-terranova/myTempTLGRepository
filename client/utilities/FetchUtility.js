// FetchUtilty.js
const _apiHost = "";

async function request(url, params, method = "GET", credentials, signal) {
  const options = {
    method,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + credentials.t,
    },
    signal
  };
  console.log("FetchUtility - request  -params =  ", params);

  if (params) {
    if (method === "GET") {
      url += "?" + objectToQueryString(params);
    } else {
      //options.body = JSON.stringify(params);
      options.body = params;
    }
  }

  console.log("FetchUtility - request method = ", method);
  console.log("FetchUtility - request  -url =  ", url);
  console.log("FetchUtility - request  -_apiHost + url =  ", _apiHost + url);
  console.log("FetchUtility - request  - options =  ", options);

  const response = await fetch(_apiHost + url, options);

  if (response.status !== 200) {
    console.log("FetchUtility - response.status =  ", response.status);
    console.log("FetchUtility - response.message =  ", response.message);
    return generateErrorResponse(
      "The server responded with an unexpected status."
    );
  }

  const result = await response.json();

  return result;
}

function objectToQueryString(obj) {
  return Object.keys(obj)
    .map(
      (key) =>
        obj[key] != undefined &&
        obj[key] != null &&
        obj[key] != "" &&
        obj[key] != false &&
        key + "=" + obj[key]
    )
    .join("&");
}

function generateErrorResponse(message) {
  return {
    status: "error",
    message,
  };
}

function get(url, params, credentials, signal) {
  console.log("FetchUtility - get start ");
  console.log("FetchUtility - get start  - url =  ", url);
  console.log("FetchUtility - get start  -params.userId =  ", params.userId);
  console.log("FetchUtility - get start  -params.skeletonStatement =  ", params.skeletonStatement);

  return request(url, params, "GET", credentials, signal);
}

function create(url, params, credentials) {
  return request(url, params, "POST", credentials);
}

function update(url, params, credentials) {
  console.log("FetchUtility - update  - url =  ", url);
  console.log("FetchUtility - update  - params =  ", params);
  console.log("FetchUtility - update  - credentials =  ", credentials);
  return request(url, params, "PUT", credentials);
}

function remove(url, params, credentials) {
  return request(url, params, "DELETE", credentials);
}

export default {
  get,
  create,
  update,
  remove,
};
