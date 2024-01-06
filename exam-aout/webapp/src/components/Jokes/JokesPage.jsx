  import React, { useContext, useState } from 'react';
  import { Link } from 'react-router-dom';
  import { JokeContext } from '../../contexts/JokesContext';

  const JokesPage = () => {
    const { jokes } = useContext(JokeContext);

    return (
      <div>
        <h2>Jokes List</h2>
        <ul>
          {jokes.map((joke, index) => (
            <li key={index}>
              <Link to={`/jokes/${joke.id}`}>{`${joke.question} - ${joke.answer}`}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default JokesPage;
