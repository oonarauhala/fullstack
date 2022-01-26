import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
  </div>
)

const Header = (props) => (
  <>
    <h1>{props.course.name}</h1>
  </>
)

const Content = ({ course }) => {
  const result = course.parts.map(part =>
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  )
  return (
    <>
      {result}
    </>
  )
}

const Total = (props) => (
  <>
    <p> Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
  </>
)

const Part = (props) => (
  <>
    <p>{props.part.name} {props.part.exercises}</p>
  </>
)

export default App