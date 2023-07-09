const express = require('express')
const { getAllPost, addPost, getPostById, updatePost, deletePost } = require('../controllers/post-controller')
const postRouter = express.Router()

postRouter.get('/', getAllPost)
postRouter.post('/', addPost)
postRouter.get('/:id', getPostById)
postRouter.put('/update/:id', updatePost)
postRouter.delete('/delete/:id', deletePost)






module.exports = postRouter