"use client";
import { useQuery } from '@apollo/client';
import { FC, useState } from 'react';
import Image from 'next/image';
import { GET_POKEMONS, GET_POKEMON_BY_NAME_QUERY } from '@/app/graphql/quries';
import PokemonType from './pokemonType';
import Link from 'next/link';
  
interface Attack {
  name: string;
  type: string;
  damage: number;
}

interface Evolution {
  id: string;
  number: string;
  name: string;
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  classification: string;
  types: string[];
  resistant: string[];
  attacks: {
    fast: Attack[];
    special: Attack[];
  };
  weaknesses: string[];
  fleeRate: string;
  maxCP: number;
  maxHP: number;
  image: string;
}

interface Pokemon {
  id: string;
  number: string;
  name: string;
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  classification: string;
  types: string[];
  resistant: string[];
  attacks: {
    fast: Attack[];
    special: Attack[];
  };
  weaknesses: string[];
  fleeRate: string;
  maxCP: number;
  maxHP: number;
  image: string;
  evolutions?: Evolution[]; // Optional, as not all Pokémon may have evolutions
}

  
interface PokemonListProps {
  search: string
}

const PokemonsList: FC<PokemonListProps> = ({ search }) => {
    const [first, setFirst] = useState<number>(12);

    const { data: pokemonsData, loading, error, fetchMore } = useQuery(search ? GET_POKEMON_BY_NAME_QUERY : GET_POKEMONS, {
        variables: search ? { name: search } : { first: first },
      });
    
      if (loading) return (
        <div className="flex justify-center items-center h-screen">
          <div className="w-16 h-16 border-4 border-red-500 border-dashed border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
      if (error) return <p>Error: {error.message}</p>;
    
      const pokemons: Pokemon[] = search ?(pokemonsData?.pokemon ?[pokemonsData?.pokemon] : []) : pokemonsData?.pokemons;

      const handleLoadMore = async () => {
        if (!search) {
          try {
            await fetchMore({
              variables: { first: first + 12 },
              updateQuery: (prevResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prevResult;
      
                // Combine previous and new results
                return {
                  pokemons: [
                    ...prevResult.pokemons, // Keep existing results
                    ...fetchMoreResult.pokemons // Append new results
                  ],
                };
              },
            });
      
            // Update the state to load more items in the future
            setFirst(prevFirst => prevFirst + 12);
          } catch (error) {
            console.error('Error fetching more data:', error);
            // Optionally, handle the error state here
          }
        }
      };
    
      return (
        <div className='container py-4'>
            <div className='grid gap-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-1'>
            {pokemons.length> 0 && pokemons?.map((pokemon: Pokemon) => (
                <div key={pokemon.id} className='bg-white shadow-lg rounded-xl text-center py-4'>
                <Link href={`/pokemons/${pokemon.name}`}>
                  <Image className='mx-auto h-32 object-contain' src={pokemon.image} alt={pokemon.name} width={128} height={128} priority />
                </Link>
                <p className='font-thin mt-2'>#{pokemon.number}</p>
                <h4 className='font-bold text-xl'>{pokemon.name}</h4>
                <div className='text-center'>
                  <PokemonType types={pokemon.types} position="center" />
                </div>
                </div>
            ))}
            </div>
            <div className='text-center mt-5'>
            {!search && (
              <button className='bg-red-500 rounded-lg text-white p-3 cursor-pointer hover:bg-red-600' onClick={handleLoadMore}>Load More Pokémon</button>
            )}
            </div>
            {pokemons.length == 0 && <div className='w-full text-center font-bold text-3xl text-red-500'>No Pokemon Matched!</div>}
        </div>
      );
    };
    
export default PokemonsList;