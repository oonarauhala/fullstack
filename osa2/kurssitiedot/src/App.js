import React from 'react'

const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  const result = courses.map(course =>
    <div key={course.id}>
      <Course course={course} />
    </div>
  )
  return (
    <div>
      <h1>
        Web development curriculum
      </h1>
      {result}
    </div>
  )
}

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
)

const Header = (props) => (
  <>
    <h1>{props.course.name}</h1>
  </>
)

const Content = ({ course }) => {
  const result = course.parts.map(part =>
    <div key={part.id}>
      <Part name={part.name} exercises={part.exercises} />
    </div>
  )
  return (
    <>
      {result}
    </>
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <>
      <p> Number of exercises {total}</p>
    </>
  )
}

const Part = ({ name, exercises }) => (
  <>
    <p>{name} {exercises}</p>
  </>
)

export default App