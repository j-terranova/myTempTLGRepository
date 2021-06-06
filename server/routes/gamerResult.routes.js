import express from "express";
import gamerResultCtrl from "../controllers/gamerResult.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router
  .route("/api/games/results/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    gamerResultCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    gamerResultCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    gamerResultCtrl.readById
  );

router
.route("/api/games/results/byCriteria/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  gamerResultCtrl.listByCriteria
);
router
.route("/api/games/results/OnebyCriteria/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  gamerResultCtrl.readOneByCriteria
);
router
.route("/api/games/results/OnebySubType/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  gamerResultCtrl.getInProgressGamerPlayedBySubType
);

router.param("userId", userCtrl.userById);

export default router;
