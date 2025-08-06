const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware.js');
const { createPostController } = require('../controllers/post.controller.js');

const router = express.Router();
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage()});

/*POST /api/post */
router.post('/',authMiddleware,upload.single('image'),createPostController);

module.exports = router;