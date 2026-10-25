const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
      <p>
         {props.name} {props.exercises}
      </p>
  )
}

const Total = (props) => {
  console.log(props)

  const totalExercises = props.parts.reduce(
    (sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <p>
        <b>total of exercises {totalExercises} </b>
      </p>
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}

export default Course