const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

describe('with blogs in a list', () => {
    test('the right number of blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('blogs are identified with a field `id`', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})

describe('adding blog', () => {
    test('increases the count of blogs by one', async () => {
        await api
            .post('/api/blogs')
            .send(helper.oneBlog)
            .expect(200)
            .expect('Content-type', /application\/json/)
        const notesAtEnd = await helper.blogsInDB()
        expect(notesAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    })
    test('added data is correct', async () => {
        await api
            .post('/api/blogs')
            .send(helper.oneBlog)
            .expect(200)
            .expect('Content-type', /application\/json/)
        const notesAtEnd = await helper.blogsInDB()
        const titles = notesAtEnd.map(res => res.title)
        expect(titles).toContain('Canonical string reduction')
    })
    test('if likes not defined, set it to 0', async () => {
        await api
            .post('/api/blogs')
            .send(helper.oneBlogUndefinedLikes)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const notesAtEnd = await helper.blogsInDB()
        const likes = notesAtEnd.map(note => note.likes)
        expect(likes.at(-1)).toBe(0)
    })
    test('if title or url not defined, expect 400', async () => {
        await api
            .post('/api/blogs')
            .send(helper.oneBlogNoTitleOrUrl)
            .expect(400)
    })
})

describe('delete post', () => {
    test('works with existing post', async () => {
        const blogs = await helper.blogsInDB()
        const idOfBlogToBeDeleted = blogs.at(-1).id
        await api
            .delete(`/api/blogs/${idOfBlogToBeDeleted}`)
            .expect(204)
        const notesAtEnd = await helper.blogsInDB()
        expect(notesAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    })
    test('gives 400 if id does not exist', async () => {
        await api
            .delete('/api/blogs/112233')
            .expect(400)
        const notesAtEnd = await helper.blogsInDB()
        expect(notesAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})