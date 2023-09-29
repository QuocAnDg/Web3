/* eslint-disable react/prop-types */
const Button = ({ value, onClick }) => (
    <button onClick={onClick} className={value}>
      {value}
    </button>
  );
  
  export default Button;
  