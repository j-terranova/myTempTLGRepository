import express from "express";
import constructQuestionCtrl from "../controllers/constructQuestion.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();
router
  .route("/api/constructs/questions/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructQuestionCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructQuestionCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructQuestionCtrl.listByOwner
  );

router
.route("/api/constructs/questions/byId/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  constructQuestionCtrl.readById)

router
  .route("/api/constructs/questions/byMaxUpdateDate/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructQuestionCtrl.getCurrentConstructByMaxUpdateDateAndUserId
  );

router
.route("/api/constructs/questions/byDifficultyLevel/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  constructQuestionCtrl.getRandomOptions
);

router
  .route("/api/constructs/questions/byCriteria/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructQuestionCtrl.listByCriteria
  );

router
  .route("/api/constructs/questions/photo/:constructQuestionId")
  .get(constructQuestionCtrl.photo, constructQuestionCtrl.defaultPhoto);

router
  .route("/api/constructs/questions/defaultphoto")
  .get(constructQuestionCtrl.defaultPhoto);

router
  .route("/api/constructs/questions/:constructQuestionId/usersWithAccess/new")
  .put(
    authCtrl.requireSignin
    //constructQuestionCtrl.isInstructor,
    //constructQuestionCtrl.newUsersWithAccess
  );

router
  .route("/api/constructs/questions/:constructQuestionId")
  .get(
    authCtrl.requireSignin,
    //authCtrl.hasAuthorization,
    constructQuestionCtrl.readById)

router.param(
  "constructQuestionId",
  constructQuestionCtrl.constructQuestionById
);
router.param("userId", userCtrl.userById);

export default router;
