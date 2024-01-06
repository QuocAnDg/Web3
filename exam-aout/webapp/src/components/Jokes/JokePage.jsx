import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { JokeContext } from '../../contexts/JokesContext';
import scoreService from "../../services/scoreApi"

const JokePage = () => {
  const { id } = useParams(); // joke id
  const { getJokeWithScores } = useContext(JokeContext);
  const [newScore, setNewScore] = useState(
    {
        username: "",
        date: "",
        score: 0,
        joke:"",
    }
  );
  const [jokeWithScores, setJokeWithScores] = useState(null);

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
      const updatedJoke = getJokeWithScores(id);
      setJokeWithScores(updatedJoke);
    } catch (error) {
      console.error('Error adding score:', error.message);
      throw error;
    }
  };
  const handleAddScore = async () => {
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
  
      // Add score through context function
      await addScore(scoreToAdd);
  
      // Reset form
      setNewScore({
        username: "",
        date: "",
        score: 0,
        joke: "",
      });
  
    } catch (error) {
      console.error('Error adding score:', error.message);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if id is available before fetching the joke data
        if (id) {
          const jokeData = await getJokeWithScores(id);
          setJokeWithScores(jokeData);
        }
      } catch (error) {
        console.error('Error fetching joke:', error.message);
      }
    };
  
    fetchData();
  }, [id, getJokeWithScores]);
  
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
          <ul>
            {jokeWithScores.scores.map(score => (
              <li key={score.id}>{`${score.username} - ${score.score}`}</li>
            ))}
          </ul>
          <div>
            <input name='username' type="text" placeholder="Username" value={newScore.username} onChange={handleOnChange}/>
            <input name="score" placeholder="Score" value={newScore.score} onChange={handleOnChange} />
            <button onClick={handleAddScore}>Add Score</button>
          </div>
        </>
      ): (
        // Handle case when joke is not found
        <p>Joke not found.</p>)}
    </div>
  );
};

export default JokePage;
