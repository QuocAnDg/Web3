let exercises1 = 10
let exercises2 = 7
let exercises3 = 14
const Header = (props) => {
  return <h1>{props.course}</h1>

}
const Part = (props) => {
  return <p>{props.part} {props.exoNumero} </p>

}
const Total = (props) => {
  return <p>{props.total}</p>
}
const App = () => {
  const part1 = 'Fundamentals of React'
  const part2 = 'Using props to pass data'
  const part3 = 'State of a component'
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14
  const course = 'Half Stack application development'
  return (
    <div>
      <Header course ={course}/>
       <Part part = {part1} exoNumero = {exercises1}></Part>
       <Part part = {part2} exoNumero = {exercises2}></Part>
       <Part part = {part3} exoNumero = {exercises3}></Part>
      <Total total = {exercises1+exercises2+exercises3}></Total>
    </div>
  )
}

export default App;