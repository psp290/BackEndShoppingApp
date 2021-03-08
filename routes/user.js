const express = require('express');

const { createUser, userLogin, getUserInfo, deactivateUser, activateUser, deleteUser, loginWithGit } = require('../controllers/user');

const router = express.Router();

router.post('/newUser',createUser);
router.post('/login',userLogin);
router.get('/userInfo',getUserInfo);
router.put('/deactivateUser',deactivateUser);
router.put('/activateUser',activateUser);
router.delete('/removeUser',deleteUser);
router.post('/loginWithGit',loginWithGit);

module.exports = router;




