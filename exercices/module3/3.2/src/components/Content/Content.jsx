import Course from "../Course/Course"

const Content = ({courses}) =>{
    return (
        <div>
        {courses.map(course => <Course key = {course.id} course = {course}></Course>)}
      </div>
    )
} 

export default Content