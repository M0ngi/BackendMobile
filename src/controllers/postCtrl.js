const postService = require('../services/postService')
const { successResp, errorResp } = require('../utils/apiResponse');
const Users = require('../models/userModel');

const authCtrl = {
    create: async (req, res) => {
        try {
            const newPost = await postService.createNewPost(req.user, req.body);
            return successResp(res, 201, newPost._doc)
        } catch (err) {
            return errorResp(res, 500, err.message)
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params
            if (!id) {
                return errorResp(res, 404, "Invalid post id.")
            }

            const post = await postService.findById(id)
            if (!post) return errorResp(res, 404, "Post does not exist.")

            const newPost = await postService.updatePost(id, req.body)

            return successResp(res, 200, newPost)
        } catch (err) {
            return errorResp(res, 500, err.message)
        }
    },
    delete: async (req, res) => {
        try {
            const { user } = req
            const { id } = req.params
            if (!id) {
                return errorResp(res, 404, "Invalid post id.")
            }

            const post = await postService.findById(id)
            if (!post) return errorResp(res, 404, "Post does not exist.")

            if (post.postedBy._id.toString() != user._id.toString()) return errorResp(res, 401, "You do not own this post.")
            await postService.deletePost(id);

            return successResp(res, 200, post);
        } catch (err) {
            return errorResp(res, 500, err.message)
        }
    },
    findOne: async (req, res) => {
        try {
            if (!req.params.id) {
                return errorResp(res, 404, "Invalid post id.")
            }
            const post = await postService.findById(req.params.id)
            if (!post) return errorResp(res, 404, "Post does not exist.")

            return successResp(res, 200, post)
        } catch (err) {
            console.log(err)
            return errorResp(res, 500, err.message)
        }
    },
    findAll: async (req, res) => {
        try {
            const { page, pageSize } = req.query
            const post = await postService.findAll(page ?? 0, pageSize ?? 5)
            if (!post) return successResp(res, 200, [])

            return successResp(res, 200, post)
        } catch (err) {
            console.log(err)
            return errorResp(res, 500, err.message)
        }
    },
}

module.exports = authCtrl
