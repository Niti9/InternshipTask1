



import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link ,useParams} from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Home Page Component
function Home() {
  const [pokemon, setPokemon] = React.useState([]);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=30');
        setPokemon(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter(poke =>
    poke.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Pokémon Gallery</h1>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="cards">
        {filteredPokemon.map((poke) => (
          <Link key={poke.name} to={`/pokemon/${poke.name}`} className="card-link">
            <PokemonCard name={poke.name} />
          </Link>
        ))}
      </div>
    </div>
  );
}

// Pokémon Card Component
function PokemonCard({ name }) {
  const [pokemonData, setPokemonData] = React.useState(null);

  React.useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, [name]);

  if (!pokemonData) return <div className="card">Loading...</div>;

  return (
    <div className="card">
      <img src={pokemonData.sprites.other.dream_world.front_default} alt={name} />

      <h2 >{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <p>Height: {pokemonData.height / 10} m</p>
            <p>Weight: {pokemonData.weight / 10} kg</p>
    
             
    </div>
  );
}



// Pokémon Details Page Component
function PokemonDetails() {
  const { name } = useParams();
  const [pokemonData, setPokemonData] = React.useState(null);

  React.useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, [name]);

  if (!pokemonData) return <div>Loading...</div>;

  return (
    <div className="details">
      <div className="detailsPage">
      <Link to="/" className="close">Back</Link>
      <h2 style={{
       fontFamily:'serif'

      }}>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      {/* <img src={pokemonData.sprites.front_default} alt={name} /> */}
       <img src={pokemonData.sprites.other.dream_world.front_default} alt={name} />

      <p style={{
        color:"black",
        fontSize:'20px',
      }}>Height: {pokemonData.height } cm</p>
      <p style={{
        color:"black",
        fontSize:'20px',
      }}>Weight: {pokemonData.weight / 10} kg</p>
      <p style={{
        color:"black",
        fontSize:'20px',
      }}>Types: {pokemonData.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
      <p style={{
        color:"black",
        fontSize:'20px',
      }}>Abilities: {pokemonData.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</p>
      
   


      
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
