import Part from "../Part/Part"
import Header from "../Header/Header";
import Total from "../Total/Total";

const Course = ({ course }) => {
    return (
       <div>
        <Header name={course.name}></Header>
        {course.parts.map(part => <Part key = {part.id} name = {part.name} exercises = {part.exercises}></Part>)}
        <Total course = {course}></Total>
        </div>


    )
  }
export default Course