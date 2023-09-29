const Total = ({course}) =>{
    const total = course.parts.reduce((acc, part) => acc + part.exercises, 0);
    return (
        <h4>total of exerices {total}</h4>
    )
} 

export default Total