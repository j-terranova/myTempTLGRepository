import express from "express";
import frameworkTicTacToeCtrl from "../controllers/frameworkTicTacToe.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();
router
  .route("/api/frameworks/ticTacToes/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkTicTacToeCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkTicTacToeCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkTicTacToeCtrl.readById
  );

router
  .route("/api/frameworks/ticTacToes/byMaxUpdateDate/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkTicTacToeCtrl.getCurrentFrameworkByMaxUpdateDateAndUserId
  );

router
  .route("/api/frameworks/ticTacToes/byCriteria/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkTicTacToeCtrl.listByCriteria
  );

  router
  .route("/api/frameworks/ticTacToes/byDifficultyLevel/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkTicTacToeCtrl.listByDifficultyLevelRange
  );

router
  .route("/api/frameworks/ticTacToes/photo/:frameworkTicTacToeId")
  .get(frameworkTicTacToeCtrl.photo, frameworkTicTacToeCtrl.defaultPhoto);

router
  .route("/api/frameworks/ticTacToes/defaultphoto")
  .get(frameworkTicTacToeCtrl.defaultPhoto);

router
  .route("/api/frameworks/ticTacToes/:frameworkTicTacToeId")
  .get(
    authCtrl.requireSignin,
    //authCtrl.hasAuthorization,
    frameworkTicTacToeCtrl.readById)

router.param(
  "frameworkTicTacToeId",
  frameworkTicTacToeCtrl.frameworkTicTacToeById
);
router.param("userId", userCtrl.userById);

export default router;
