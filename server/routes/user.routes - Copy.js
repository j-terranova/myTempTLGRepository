import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)

router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.route('/api/users/groups/:userId')
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.updateUserGroupsOwned)
router.route('/api/users/groups/addUser/:userId')
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.updateAddToGroupMembership)
router.route('/api/users/groups/removeUser/:userId')
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.updateRemoveFromGroupMembership)

  
router.route('/api/users/bycriteria/:userId')
  .get(authCtrl.requireSignin, userCtrl.listUsersByCriteria)

router.route('/api/users/onebycriteria/:userId')
  .get(authCtrl.requireSignin, userCtrl.getOneByCriteria)

router.route('/api/users/data/by/:userId')
  .get(authCtrl.requireSignin, userCtrl.readById)
 
router.param('userId', userCtrl.userById)

export default router
