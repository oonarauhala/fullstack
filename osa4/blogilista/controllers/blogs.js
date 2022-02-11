const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })
    if (!blog.title || !blog.url) {
        response.status(400).end()
    }
    else if (blog.likes) {
        const savedBlog = await blog.save()
        response.json(savedBlog.toJSON())
    } else {
        blog.likes = 0
        const savedBlog = await blog.save()
        response.json(savedBlog.toJSON())
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    const blogs = await Blog.find({})
    let idExists = false
    blogs.forEach(blog => {
        if (blog.id === id) {
            idExists = true
        }
    })
    if (idExists) {
        await Blog.findByIdAndRemove(id)
        response.status(204).end()
    } else {
        response.status(400).end()
    }

})

module.exports = blogsRouter