import express from "express";
import frameworkTabularCtrl from "../controllers/frameworkTabular.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();
router
  .route("/api/frameworks/tabulars/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkTabularCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkTabularCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkTabularCtrl.readById
  );

router
  .route("/api/frameworks/tabulars/byCriteria/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkTabularCtrl.listByCriteria
  );

  router
  .route("/api/frameworks/tabulars/byDifficultyLevel/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkTabularCtrl.listByDifficultyLevelRange
  );

  //router
  //.route("/api/frameworks/tabulars/matching/:userId")
  //.get(
  //  authCtrl.requireSignin,
  //  authCtrl.hasAuthorization,
  //  frameworkTabularCtrl.getSelectedMatching
  //);

  router
  .route("/api/frameworks/tabulars/byMaxUpdateDate/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkTabularCtrl.getCurrentFrameworkByMaxUpdateDateAndUserId
  );

router
  .route("/api/frameworks/tabulars/photo/:frameworkTabularId")
  .get(frameworkTabularCtrl.photo, frameworkTabularCtrl.defaultPhoto);

router
  .route("/api/frameworks/tabulars/defaultphoto")
  .get(frameworkTabularCtrl.defaultPhoto);

router
  .route("/api/frameworks/tabulars/:frameworkTabularId")
  .get(
    authCtrl.requireSignin,
    //authCtrl.hasAuthorization,
    frameworkTabularCtrl.readById)

router.param(
  "frameworkTabularId",
  frameworkTabularCtrl.frameworkTabularById
);
router.param("userId", userCtrl.userById);

export default router;
