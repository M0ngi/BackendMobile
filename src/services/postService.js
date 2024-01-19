const Posts = require('../models/postModel')

const createNewPost = async (creator, postData) => {
    const newPost = new Posts(postData)
    newPost.postedBy = creator;
    await newPost.save();

    return newPost;
}

const findById = async (id) => {
    return await Posts.findById(id);
}

const findAll = async (page, pageSize) => {
    return await (Posts.find().skip(page * pageSize).limit(pageSize))
}

const deletePost = async (id) => {
    await Posts.deleteOne({ _id: id })
}

const updatePost = async (id, postData) => {
    return await Posts.findOneAndUpdate({ _id: id }, { $set: { ...postData } }, { new: true })
}

module.exports = {
    createNewPost,
    findById,
    findAll,
    deletePost,
    updatePost,
}
