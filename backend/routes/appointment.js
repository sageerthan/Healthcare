const express=require('express');
const { isAuthenticatedPatient, isAuthenticatedAdmin } = require('../middlewares/authenticate');
const { postAppointment, getAllAppointments, updateAppointmentStatus, deleteAppointment } = require('../controllers/appointmentController');
const router=express.Router();


router.route('/appointmentrequest').post(isAuthenticatedPatient,postAppointment);
router.route('/getall').get(isAuthenticatedAdmin,getAllAppointments);
router.route('/updatestatus/:id').put(isAuthenticatedAdmin,updateAppointmentStatus);
router.route('/delete/:id').delete(isAuthenticatedAdmin,deleteAppointment);
module.exports=router;