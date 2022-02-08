const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => {
    let total = 0
    blogs.forEach(blog => {
        total = total + blog.likes
    })
    return total
}

const favouriteBlog = blogs => {
    let blogWithMostLikes = {}
    let mostLikes = 0
    blogs.forEach(blog => {
        if (blog.likes > mostLikes) {
            mostLikes = blog.likes
            blogWithMostLikes = blog
        }
    })
    return blogWithMostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}