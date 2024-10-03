const express=require('express');
const { loginUser, addNewAdmin, getAllDoctors, registerUser, getUserDetails, logoutAdmin, logoutPatient, addNewDoctor } = require('../controllers/userController');
const { isAuthenticatedAdmin, isAuthenticatedPatient } = require('../middlewares/authenticate');
const router=express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/doctors').get(getAllDoctors);
router.route('/patient/mydetails').get(isAuthenticatedPatient,getUserDetails);
router.route('/patient/logout').get(isAuthenticatedPatient,logoutPatient);


router.route('/admin/addnew').post(isAuthenticatedAdmin,addNewAdmin);
router.route('/admin/mydetails').get(isAuthenticatedAdmin,getUserDetails);
router.route('/admin/logout').get(isAuthenticatedAdmin,logoutAdmin);
router.route('/doctor/addnew').post(isAuthenticatedAdmin,addNewDoctor);
module.exports=router;