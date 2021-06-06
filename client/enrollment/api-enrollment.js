const create = async (params, credentials, enrollment) => {
  console.log("api-enrollment - enter create component ");
  console.log(
    "api-enrollment - enrollment =  ",
    enrollment
  );
  try {
    let response = await fetch("/api/enrollments/by/" + params.userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(enrollment)
    })
    return await response.json()
  } catch(err) { 
    console.log(err);
    return {
      error: err,
    };
  }
}

const update = async (params, credentials, enrollment) => {
  console.log("api-enrollment - update - start");
  console.log("api-enrollment - update - params = ", params);
  console.log("api-enrollment - update - credentials = ", credentials);
  console.log("api-enrollment - update - enrollment = ", enrollment);
  try {
    console.log("api-enrollment - update - inside Try");
    let response = await fetch("/api/enrollments/by/" + params.userId, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(enrollment)
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

const readById = async (userId, params, credentials, signal) => {
  console.log("api-learnerLesson - readById - params = ", params)
  try {
  let response = await Fetch.get(
    "/api/enrollments/by/" + userId.userId,
    params,
    credentials,
    signal,
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
  
const listEnrolledCoursesInProgress = async (userId, params, credentials, signal) => {
  console.log("api-learnerLesson - enter listLearnerEnrolledCoursesByStudent ");
  console.log(
    "api-learnerLesson - listLearnerEnrolledCoursesByStudent -params.myClass =  ",
    params.student
  );
  console.log(
    "api-learnerLesson - listLearnerEnrolledCoursesByStudent - params.url =  ",
    params.url
  );
  console.log("api-learnerLesson - listLearnerEnrolledCoursesByStudent - params =  ", params);
  console.log(
    "api-learnerLesson - listLearnerEnrolledCoursesByStudent - just before get component "
  );
  
  try {
    let response = await Fetch.get(
      "/api/enrollments/inprogress/by/" + params.student,
      params,
      credentials,
      signal,
    );
    console.log(
      "api-learnerLesson - listLearnerEnrolledCoursesByStudent - just after get component "
    );

    console.log(
      "api-learnerLesson - listLearnerEnrolledCoursesByStudent - response ",
      response
    );

    return await response;
  } catch (err) {
    console.log("api-learnerLesson - listLearnerEnrolledCoursesByStudent - There is an error");
    console.log(err);
    return {
      error: err,
    };
  }
};


  const listEnrolled = async (credentials, signal) => {
    try {
      let response = await fetch('/api/enrollment/enrolled', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        },
        signal: signal,
      })
      return await response.json()
    } catch(err) {
      console.log(err)
      return {
        error: err,
      };
    }
  }

  const enrollmentStats = async (params, credentials, signal) => {
    try {
      let response = await fetch('/api/enrollment/stats/'+params.courseId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        },
        signal: signal,
      })
      return await response.json()
    } catch(err) {
      console.log(err);
      return {
        error: err,
      };
    }
  }
  
  const read = async (params, credentials, signal) => {
    try {
      let response = await fetch('/api/enrollment/' + params.enrollmentId, {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err);
      return {
        error: err,
      };
    }
  }
  
  const complete = async (params, credentials, enrollment) => {
    try {
      let response = await fetch('/api/enrollment/complete/' + params.enrollmentId, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(enrollment)
      })
      return await response.json()
    } catch(err) {
      console.log(err);
      return {
        error: err,
      };
    }
  }
  
  const remove = async (params, credentials) => {
    try {
      let response = await fetch('/api/enrollment/' + params.enrollmentId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err);
      return {
        error: err,
      };
    }
  }
  
  export {
    create,
    update,
    readById,
    listEnrolledCoursesInProgress,
    read,
    complete,
    remove,
    listEnrolled,
    enrollmentStats
  }