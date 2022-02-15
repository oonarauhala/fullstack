const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    let user = await User.find({})
    user = user[0]

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    if (!blog.title || !blog.url) {
        response.status(400).end()
    }
    if (!blog.likes) {
        blog.likes = 0
    }
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    const blog = await Blog.findById(id)
    if (blog) {
        await Blog.findByIdAndRemove(id)
        response.status(204).end()
    } else {
        response.status(400).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const id = request.params.id
    if (body.title && body.url) {
        const updatedBlog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        }
        await Blog.findByIdAndUpdate(id, updatedBlog, { new: true })
        return response.status(200).json(updatedBlog)
    }
    response.status(400).json({ error: 'blog not found' })
})

module.exports = blogsRouter