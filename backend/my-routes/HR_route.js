const createReview = require('../controllers/HR_Review').createReview;
const express = require('express');
const router=express.Router();

router.post('/createReview',createReview);

module.exports=router;
