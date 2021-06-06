import express from "express";
import frameworkTriviaCtrl from "../controllers/frameworkTrivia.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();
router
  .route("/api/frameworks/trivias/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkTriviaCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkTriviaCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkTriviaCtrl.readById
  );

router
  .route("/api/frameworks/trivias/byMaxUpdateDate/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkTriviaCtrl.getCurrentFrameworkByMaxUpdateDateAndUserId
  );

router
  .route("/api/frameworks/trivias/byCriteria/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkTriviaCtrl.listByCriteria
  );

  router
  .route("/api/frameworks/trivias/byDifficultyLevel/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkTriviaCtrl.listByDifficultyLevelRange
  );

router
  .route("/api/frameworks/trivias/photo/:frameworkTriviaId")
  .get(frameworkTriviaCtrl.photo, frameworkTriviaCtrl.defaultPhoto);

router
  .route("/api/frameworks/trivias/defaultphoto")
  .get(frameworkTriviaCtrl.defaultPhoto);

router
  .route("/api/frameworks/trivias/:frameworkTriviaId")
  .get(
    authCtrl.requireSignin,
    //authCtrl.hasAuthorization,
    frameworkTriviaCtrl.readById)

router.param(
  "frameworkTriviaId",
  frameworkTriviaCtrl.frameworkTriviaById
);
router.param("userId", userCtrl.userById);

export default router;
