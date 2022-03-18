import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import AnecdoteList from './AnecdoteList'
import About from './About'
import CreateNew from './CreateNew'

const Menu = ({ anecdotes, addNew }) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Router>
      <div>
        <Link style={padding} to='/'>anecdotes</Link>
        <Link style={padding} to='/create'>create new</Link>
        <Link style={padding} to='/about'>about</Link>
      </div>

      <Routes>
        <Route path='/create' element={<CreateNew addNew={addNew}/>} />
        <Route path='/about' element={<About />} />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes}/>} />
      </Routes>
    </Router>
  )
}

export default Menu