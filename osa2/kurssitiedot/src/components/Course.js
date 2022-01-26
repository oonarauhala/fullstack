import React from 'react'

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

export default Course