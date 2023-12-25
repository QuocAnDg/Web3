import BadButton from '../../components/Buttons/BadButton';
import GoodButton from '../../components/Buttons/GoodButton';
import OkButton from '../../components/Buttons/OkButton';
import ResetButton from '../../components/Buttons/ResetButton';
import { Context as CounterContext } from '../../contexts/countersContext';
import { useContext } from 'react';

const App = () => {
  const { good, ok, bad } = useContext(CounterContext);
  return (
    <div>
      <ul>
        <li>
          <span>Good : {good}</span> <GoodButton />
        </li>
        <li>
          <span>Ok : {ok}</span> <OkButton />
        </li>
        <li>
          <span>Bad : {bad}</span> <BadButton />
        </li>
      </ul>
      <ResetButton />
      <form onSubmit={addName}>
        <div>
          vote: <input value={addVote} onChange={handleVoteChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default App;
