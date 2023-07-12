const Post = require('../model/Post')
const bcrypt = require('bcrypt')
const User = require('../model/User')
const mongoose = require('mongoose')

const getAllPost = async(req, res, next) => {
    let posts
    try {
        posts = await Post.find()
    } catch (err) {
        console.log("Error while getting posts ", err)
    }
    if (!posts) {
        return res.status(404).json({ message: "No posts found" })
    }
    return res.status(200).json({ posts })
}

const addPost = async(req, res, next) => {
    const { title, description, location, date, image, user } = req.body
    if (!title &&
        title.trim() === "" &&
        !description &&
        description.trim() === "" &&
        !location &&
        location.trim() === "" &&
        !date &&
        !image &&
        image.trim() === "" &&
        !user
    ) {
        return res.status(422).json({ message: "Invalid data" })
    }
    let oldUser
    try {
        oldUser = await User.findById(user)
    } catch (err) {
        return console.log(err)
    }

    if (!oldUser) {
        return res.status(404).json({ message: "User not found" })
    }


    let post

    try {
        post = new Post({
            title,
            description,
            location,
            date: new Date(`${date}`),
            image,
            user
        })

        const session = await mongoose.startSession()
        session.startTransaction()
        oldUser.posts.push(post)
        await oldUser.save({ session })
        post = await post.save()
        session.commitTransaction()

    } catch (err) {
        console.log('Error while adding post', err)
    }
    return res.status(201).json({ post })
}

const getPostById = async(req, res, next) => {
    const id = req.params.id
    let post
    try {
        post = await Post.findById(id)
    } catch (err) {
        return console.log('Error while getting post by id', err)
    }
    if (!post) {
        return res.status(404).json({ message: "No posts found" })
    }
    return res.status(200).json({ post })
}

const updatePost = async(req, res, next) => {
    const { title, description, location, date, image } = req.body

    const id = req.params.id
    let post
    try {
        post = await Post.findByIdAndUpdate(id, {
            title,
            description,
            location,
            date,
            image
        })

    } catch (err) {
        return console.log('Error while updating post', err)
    }
    if (!post) {
        return res.status(500).json({ message: "Unable to update" })
    }
    return res.status(200).json({ post })
}

const deletePost = async(req, res, next) => {
    const id = req.params.id
    let post
    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        post = await Post.findById(id).populate("user")
        post.user.posts.pull(post)
        await post.user.save({ session })
        post = await Post.findByIdAndRemove(id)
        session.commitTransaction()

    } catch (err) {
        return console.log('Error while getting post by id', err)
    }
    if (!post) {
        return res.status(500).json({ message: "Unable to delete" })
    }
    return res.status(200).json({ message: "Deletion successful" })
}

module.exports = { getAllPost, addPost, getPostById, updatePost, deletePost }