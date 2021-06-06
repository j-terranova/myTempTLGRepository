import express from "express";
import frameworkMatchingCtrl from "../controllers/frameworkMatching.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();
router
  .route("/api/frameworks/matchings/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkMatchingCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkMatchingCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkMatchingCtrl.readById
  );

router
  .route("/api/frameworks/matchings/byMaxUpdateDate/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkMatchingCtrl.getCurrentFrameworkByMaxUpdateDateAndUserId
  );

router
  .route("/api/frameworks/matchings/byCriteria/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkMatchingCtrl.listByCriteria
  );

  router
  .route("/api/frameworks/matchings/byDifficultyLevel/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkMatchingCtrl.listByDifficultyLevelRange
  );

router
  .route("/api/frameworks/matchings/photo/:frameworkMatchingId")
  .get(frameworkMatchingCtrl.photo, frameworkMatchingCtrl.defaultPhoto);

router
  .route("/api/frameworks/matchings/defaultphoto")
  .get(frameworkMatchingCtrl.defaultPhoto);

router
  .route("/api/frameworks/matchings/:frameworkMatchingId")
  .get(
    authCtrl.requireSignin,
    //authCtrl.hasAuthorization,
    frameworkMatchingCtrl.readById)

router.param(
  "frameworkMatchingId",
  frameworkMatchingCtrl.frameworkMatchingById
);
router.param("userId", userCtrl.userById);

export default router;
