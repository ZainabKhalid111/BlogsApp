const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth');
const { createBlog, getBlogs, deleteBlog, updateBlog } = require('../controllers/blogsController');

router.post('/create', verifyToken, createBlog);
router.delete('/delete/:id', deleteBlog);
router.post('/update/:id', updateBlog);
router.get('/getAll', verifyToken, getBlogs);

module.exports = router;