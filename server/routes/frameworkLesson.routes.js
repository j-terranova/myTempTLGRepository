import express from "express";
import frameworkLessonCtrl from "../controllers/frameworkLesson.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();
router
  .route("/api/frameworks/lessons/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkLessonCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkLessonCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkLessonCtrl.listByOwner
  );

router
.route("/api/frameworks/lessons/byId/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  frameworkLessonCtrl.readById)

router
  .route("/api/frameworks/lessons/byMaxUpdateDate/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkLessonCtrl.getCurrentFrameworkByMaxUpdateDateAndUserId
  );

router
  .route("/api/frameworks/lessons/byCriteria/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkLessonCtrl.listByCriteria
  );

router
  .route("/api/frameworks/lessons/photo/:frameworkLessonId")
  .get(frameworkLessonCtrl.photo, frameworkLessonCtrl.defaultPhoto);

router
  .route("/api/frameworks/lessons/defaultphoto")
  .get(frameworkLessonCtrl.defaultPhoto);

router
  .route("/api/frameworks/lessons/:frameworkLessonId")
  .get(
    authCtrl.requireSignin,
    //authCtrl.hasAuthorization,
    frameworkLessonCtrl.readById)

router.param(
  "frameworkLessonId",
  frameworkLessonCtrl.frameworkLessonById
);
router.param("userId", userCtrl.userById);

export default router;
