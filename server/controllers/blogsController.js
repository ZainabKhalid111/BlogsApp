const Blogs = require('../models/Blogs');

exports.createBlog = async (req, res) => {
    try {
        const { title, content, tags, author } = req.body;
        // Optional: Use authenticated user's info
        const userId = req.user.id;
        const blog = new Blogs({ title, content, tags, author, user: userId });
        await blog.save();
        res.status(200).json({ message: "Blog uploaded successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Error creating blog post' });
    }
}

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blogs.find();
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json({ message: 'Error getting blogs' });
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blogs.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully", blog });
    }
    catch (error) {
        res.status(500).json({ message: 'Error while deleting blog. Try later!' });
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const updatedBlog = await Blogs.findByIdAndUpdate(
            req.params.id,               // Blog ID from the URL
            req.body,                     // Data sent in the request body
            { new: true }                 // Returns the updated document
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog updated successfully", updatedBlog });
    }
    catch (error) {
        res.status(500).json({ message: 'Error while updating blog. Try later!' });
    }
}