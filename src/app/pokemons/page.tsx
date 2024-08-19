import React from 'react';
import PokemonsList from '@/components/pokemonList';
import SearchPokemon from '@/components/pokemonSearch';

const Home = ({ 
  searchParams,
}: {
  searchParams? : {
    search? : string;
  }
}) => {
  const search = searchParams?.search || "";
  return (
    <div className='container mx-auto p-6'>
      <h1 className='font-bold text-6xl mb-4 md:mb-0 text-center'>Pokédex</h1>
      <SearchPokemon />
      <PokemonsList search={search} /> {/* Change the number as needed */}
    </div>
  );
};

export default Home;