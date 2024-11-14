const mongoose = require('mongoose');

const BlogsSchema = mongoose.Schema({
    title: String,
    content: String,
    author: String,
    tags: String,
    date: { type: Date, default: Date.now }
    // image: String,
})

module.exports = mongoose.model("Blogs", BlogsSchema)