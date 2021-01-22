const express=require('express');
const router=express.Router();
const passport=require('passport');

const users_controller=require('../controllers/users_controller');

router.get('/profile',passport.checkAuthentication,users_controller.profile);
router.get('/posts',users_controller.posts);
router.get('/sign-up',users_controller.signup);
router.get('/sign-in',users_controller.signin);
router.post('/users/create',users_controller.create);
router.get('/sign-out',users_controller.destroySession);
//using passport to authenticate
router.post('/users/create-session',passport.authenticate('local',{failureRedirect:'/users/sign-in'},),users_controller.createSession);
module.exports=router;