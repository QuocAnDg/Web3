import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { JokeContext } from '../../contexts/JokesContext';
import scoreService from "../../services/scoreApi"

const JokePage = () => {
  const { id } = useParams(); // joke id
  const { getJokeWithScores } = useContext(JokeContext);
  const navigate = useNavigate();
  const [newScore, setNewScore] = useState(
    {
        username: "",
        date: "",
        score: 0,
        joke:"",
    }
  );
  const [jokeWithScores, setJokeWithScores] = useState(null);
  useEffect(() => {
    const fetchData =  () => {
      try {
        // Check if id is available before fetching the joke data
  
        const jokeData =  getJokeWithScores(id);
        setJokeWithScores(jokeData);
      
      } catch (error) {
        console.error('Error fetching joke:', error.message);
      }
    };
  
    fetchData();
  }, [id, getJokeWithScores]);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewScore((prevNewScore) => {
      return {
        ...prevNewScore,
        [name]: value,
      };
    });
  };

  const addScore = async (score) => {
    try {
      // Call your scoreApi service to add a score
      await scoreService.addOneScore(score);
      // Update jokeWithScores with the new data
     
    } catch (error) {
      console.error('Error adding score:', error.message);
      throw error;
    }
  };
  const handleAddScore = (e) => {
    e.preventDefault();
    try {
      // Validate inputs
      if (!newScore.username || isNaN(newScore.score) || newScore.score < 0 || newScore.score > 10) {
        alert('Please enter a valid username and score (between 0 and 10).');
        return;
      }
  
      // Add date and joke ID to the new score
      const currentDate = new Date().toISOString();
      const scoreToAdd = {
        ...newScore,
        date: currentDate,
        joke: id,
      };
  
      addScore(scoreToAdd);

  
      // Update jokeWithScores with the new data
      setJokeWithScores((prevJokeWithScores) => {
        if (!prevJokeWithScores) {
          return null;
        }
        return {
          ...prevJokeWithScores,
          scores: [...prevJokeWithScores.scores, scoreToAdd],
        };
      }); 

        //reset form
        e.target.reset();
        setNewScore({
          username: "",
          date: "",
          score: 0,
          joke: "",
        });
      // navigate("/jokes")
    } catch (error) {
      console.error('Error adding score:', error.message);
    }
  };
  
  
  return (
    <div>
      <h2>Joke Detail</h2>
      {jokeWithScores && jokeWithScores ?(
        <>
          <h3>{`Question: ${jokeWithScores.question}`}</h3>
          <p>{`Answer: ${jokeWithScores.answer}`}</p>
          <p>{`Category: ${jokeWithScores.category}`}</p>
          <p>{`Average Score: ${jokeWithScores.averageScore}`}</p>
          <p>{`Score Count: ${jokeWithScores.scoreCount}`}</p>
          <p>{`joke id: ${jokeWithScores.id}`}</p>
          <ul>
            {jokeWithScores.scores.map(score => (
              <li key={score.id}>{`${score.username} - ${score.score}`}</li>
            ))}
          </ul>
          <div>
          <form onSubmit={handleAddScore}>
            <input name='username' type="text" placeholder="Username" value={newScore.username} onChange={handleOnChange}/>
            <input name="score" placeholder="Score" value={newScore.score} onChange={handleOnChange} />
            <input type="submit" value = "add score"/>
          </form>
          </div>
        </>
      ): (
        // Handle case when joke is not found
        <p>Joke not found.</p>)}
    </div>
  );
};

export default JokePage;
