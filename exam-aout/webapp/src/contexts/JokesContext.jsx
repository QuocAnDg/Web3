import React, { createContext, useState, useEffect } from 'react';
import jokeService from '../services/jokeApi'
import scoreService from '../services/scoreApi'

const JokeContext = React.createContext(null)

const JokeContextProvider = ({ children }) => {
  const [jokes, setJokes] = useState([]);
  const [scores, setScores] = useState([]);
  const [scoreCount, setScoreCount] = useState([]);


  useEffect(() => {
    // Charger les blagues depuis l'API
    jokeService.getAllJokes().then((jokes) => setJokes(jokes));
    // Charger les scores depuis l'API
    scoreService.getAllScores().then((scores) => setScores(scores));
    
  }, []);

  // Fonction pour calculer le nombre de scores et le score moyen pour chaque blague
  const calculateJokeStats = () => {
    if (!jokes || !scores) {
        return [];
    }

    const jokeStats = jokes.map(joke => {
      const jokeScores = scores.filter(score => score.joke === joke.id);
      const scoreCount = jokeScores.length;
      const totalScore = jokeScores.reduce((sum, score) => sum + score.score, 0);
      const averageScore = scoreCount > 0 ? parseFloat((totalScore / scoreCount).toFixed(1)) : 0;

      return {
        ...joke,
        scoreCount,
        averageScore,
      };
    });

    return jokeStats;
  };

  const getJokeWithScores = (id) => {
    const selectedJoke = jokes.find(joke => joke.id === id);

    const jokeScores = scores.filter(score => score.joke === selectedJoke.id);
    const scoreCount = jokeScores.length;
    const totalScore = jokeScores.reduce((sum, score) => sum + score.score, 0);
    const averageScore = scoreCount > 0 ? parseFloat((totalScore / scoreCount).toFixed(1)) : 0;

    return {
      ...selectedJoke,
      scores: jokeScores,
      scoreCount,
      averageScore,
    };
  };


  const contextValue = {
    jokes: calculateJokeStats(),
    scores,
    getJokeWithScores,

  };

  return <JokeContext.Provider value={contextValue}>{children}</JokeContext.Provider>;
};

export { JokeContext, JokeContextProvider };