const express=require('express');
const { sendMessage, getAllMessages } = require('../controllers/messageController');
const { isAuthenticatedAdmin } = require('../middlewares/authenticate');
const router=express.Router();

router.route('/send').post(sendMessage);
router.route('/getmessages').get(isAuthenticatedAdmin,getAllMessages);

module.exports=router;