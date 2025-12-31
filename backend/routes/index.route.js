const express = require('express');
const router = express.Router();
const chatRoutes = require('./chat.route');
const documentRoutes = require('./document.route');

router.use('/chat', chatRoutes);
router.use('/documents', documentRoutes);

module.exports = router;
