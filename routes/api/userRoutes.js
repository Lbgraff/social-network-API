const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  createFriend,
  deleteFriend,
  deleteUser
} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);

router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

  router
    .route('/:userId/friends/:friendId')
    .post(createFriend)
    .delete(deleteFriend)

module.exports = router;