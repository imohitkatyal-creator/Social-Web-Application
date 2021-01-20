const express=require('express');
const router=express.Router();

const users_controller=require('../controllers/users_controller');

router.get('/profile',users_controller.profile);
router.get('/posts',users_controller.posts);
router.get('/sign-up',users_controller.signup);
router.get('/sign-in',users_controller.signin);
router.post('/users/create',users_controller.create);
module.exports=router;