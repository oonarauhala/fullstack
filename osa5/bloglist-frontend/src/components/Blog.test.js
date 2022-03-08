import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders blog in small', () => {
    const blog = {
      title: 'Testiblogi',
      author: 'Testaaja',
      url: 'testiblogi.com',
      likes: 20,
      user: {
        username: 'testaaja1',
        name: 'T. Testaaja'
      }
    }
    const mockHandleLike = jest.fn()
    const mockRemoveBlog = jest.fn()

    render(<Blog blog={blog} handleLike={mockHandleLike} removeBlog={mockRemoveBlog}/>)

    const title = screen.findByText('Testiblogi')
    const likeButton = screen.queryByText('like')
    expect(title).toBeDefined()
    expect(likeButton).toBeNull()
  })
})