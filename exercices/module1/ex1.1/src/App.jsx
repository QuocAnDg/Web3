let exercises1 = 10
let exercises2 = 7
let exercises3 = 14
const Header = (props) => {
  return <h1>{props.course}</h1>

}
const Content = () => {
  const part1 = 'Fundamentals of React'
  const part2 = 'Using props to pass data'
  const part3 = 'State of a component'
  return <div>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
  </div>
}
const Total = (props) => {
  return <p>{props.total}</p>
}
const App = () => {

  const course = 'Half Stack application development'
  return (
    <div>
      <Header course ={course}/>
      <Content/>
      <Total total = {exercises1+exercises2+exercises3}></Total>
    </div>
  )
}

export default App;