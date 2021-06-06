import express from "express";
import learnerCtrl from "../controllers/learnerLesson.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router
  .route("/api/learner/lessons/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    learnerCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    learnerCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    learnerCtrl.listByCriteria
  );

router
  .route("/api/frameworks/lessons/byId/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    learnerCtrl.readById
  );

router.param("userId", userCtrl.userById);

export default router;
