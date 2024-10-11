const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');

// router.route('/').post(protect, accessChats);
// router.route('/').get(protect, fetchChats);
// router.route('/group').post(protect, createGroupChat);
// router.route('/rename').put(protect, renameGroup);
// router.route('/remove').put(protect, removeFromGroup);
// router.route('/goupadd').put(protect, addToGroup);

module.exports = router;