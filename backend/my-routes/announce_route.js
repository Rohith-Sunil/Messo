const express = require('express');
const router = express.Router();

const announceController = require('../controllers/announce')


router.post('/createAnnouncement', announceController);

module.exports = router;