import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import AnecdoteList from './AnecdoteList'
import About from './About'
import CreateNew from './CreateNew'
import Anecdote from './Anecdote'

const Menu = ({ anecdotes, addNew }) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Router>
      <div>
        <Link style={padding} to='/anecdotes'>anecdotes</Link>
        <Link style={padding} to='/create'>create new</Link>
        <Link style={padding} to='/about'>about</Link>
      </div>

      <Routes>
        <Route path='/anecdotes/:id' element={<Anecdote anecdotes={anecdotes}/>} />
        <Route path='/create' element={<CreateNew addNew={addNew}/>} />
        <Route path='/about' element={<About />} />
        <Route path='/anecdotes' element={<AnecdoteList anecdotes={anecdotes}/>} />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes}/>} />
      </Routes>
    </Router>
  )
}

export default Menu