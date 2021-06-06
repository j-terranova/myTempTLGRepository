import express from "express";
import constructSuffixCtrl from "../controllers/constructSuffix.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();
router
  .route("/api/constructs/suffixs/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructSuffixCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructSuffixCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructSuffixCtrl.listByOwner
  );

router
.route("/api/constructs/suffixs/byId/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  constructSuffixCtrl.readById)

router
  .route("/api/constructs/suffixs/byMaxUpdateDate/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructSuffixCtrl.getCurrentConstructByMaxUpdateDateAndUserId
  );

  router
.route("/api/constructs/suffixs/byDifficultyLevel/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  constructSuffixCtrl.getRandomOptions
);

router
  .route("/api/constructs/suffixs/byCriteria/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructSuffixCtrl.listByCriteria
  );

router
  .route("/api/constructs/suffixs/photo/:constructSuffixId")
  .get(constructSuffixCtrl.photo, constructSuffixCtrl.defaultPhoto);

router
  .route("/api/constructs/suffixs/defaultphoto")
  .get(constructSuffixCtrl.defaultPhoto);

router
  .route("/api/constructs/suffixs/:constructSuffixId")
  .get(
    authCtrl.requireSignin,
    //authCtrl.hasAuthorization,
    constructSuffixCtrl.readById)


router
  .route("/api/constructs/suffixs/load/by/:userId")
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    authCtrl.requireSignin, constructSuffixCtrl.loadGutenbergSuffixData);

router.param(
  "constructSuffixId",
  constructSuffixCtrl.constructSuffixById
);
router.param("userId", userCtrl.userById);

export default router;
