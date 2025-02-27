import './App.css';
import { PokemonProvider } from './context/PokemonContext';
import { PokemonCard } from './ui/PokemonCard';

function App() {
  return (
    <>
    <PokemonProvider>
      <PokemonCard/>
    </PokemonProvider>
    </>
  );
}

export default App;
