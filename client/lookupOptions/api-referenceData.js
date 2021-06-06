import auth from "../auth/auth-helper";

const listAll = async (signal) => {
  try {
    let response = await fetch("/api/lookupOptions/", {
      method: "GET",
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const readByTag = async (params, credentials, signal) => {
  console.log("api-refernceData - inside readByTag ");
  console.log("api-refernceData - inside readByTag - params.tag " + params.tag);
  console.log(
    "api-refernceData - inside readByTag - params.userId " + params.userId
  );
  console.log(
    "api-refernceData - inside readByTag - credentials.t " + credentials.t
  );
  console.log("api-refernceData - inside readByTag - signal " + signal);
  try {
    let response = await fetch("/api/lookupOptions/by/" + params.tag, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    console.log("api-refernceData - inside readByTag - after fetch");
    return await response.json();
  } catch (err) {
    console.log("api-refernceData - inside readByTag - Error Occurred");
    console.log("api-refernceData - inside readByTag - err" + err);
  }
};

const readByID = async (params, credentials, signal) => {
  try {
    let response = await fetch(
      "/api/lookupOptions/by/" + params.referenceDataID,
      {
        method: "GET",
        signal: signal,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + credentials.t,
        },
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const loadReferenceData = async () => {
  console.log("api-referenceData - loadReferenceData function");
  const jwt = auth.isAuthenticated();
  console.log("api-referenceData - jwt = " + jwt);
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log("api-referenceData - signal = " + signal);
  try {
    let response = await fetch("/api/lookupOptions/load/", {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + jwt.token,
      },
    });
    return await response.json();
  } catch (err) {
    console.log("api-referenceData - ERROR");
    console.log(err);
  }
};

const create = async (params, credentials, referenceData) => {
  try {
    let response = await fetch(
      "/api/lookupOptions/by/" + params.referenceDataId,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + credentials.t,
        },
        body: referenceData,
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const update = async (params, credentials, referenceData) => {
  try {
    let response = await fetch("/api/lookupOptions/" + params.referenceDataId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: referenceData,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch("/api/lookupOptions/" + params.referenceDataId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  listAll,
  readByTag,
  readByID,
  loadReferenceData,
  create,
  update,
  remove,
};
