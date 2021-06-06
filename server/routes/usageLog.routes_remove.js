import express from "express";
import usageLogCtrl from "../controllers/usageLog.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();
router
  .route("/api/usageLog/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    usageLogCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    usageLogCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    usageLogCtrl.listByCriteria
  );

router
.route("/api/usageLog/byId/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  usageLogCtrl.readById)

router
  .route("/api/usageLog/:usageLogId")
  .get(
    authCtrl.requireSignin,
    //authCtrl.hasAuthorization,
    usageLogCtrl.readById)


router.param(
  "usageLogId",
  usageLogCtrl.readById
);
router.param("userId", userCtrl.userById);

export default router;
