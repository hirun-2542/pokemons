"use client"
import React from 'react'
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { GET_POKEMON_BY_NAME_QUERY } from '@/app/graphql/quries';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import PokemonType from '@/components/pokemonType';
import { getTypePokemon } from '@/components/getTypePokemon';
import Router from 'next/router'

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
  
function PokemonDetail({ params } : { params: { name: string}}) { 
    const searchParams = useSearchParams();
    const search: string = searchParams.get('search')?.toString() || ""
 
    const { data, loading, error } = useQuery(GET_POKEMON_BY_NAME_QUERY, {
      variables: !search ? params : { name: search},
      skip: !params.name,
    });
  
    if (loading) return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-red-500 border-dashed border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
    if (error) return <p>Error: {error.message}</p>;
  
    const pokemon: Pokemon = data?.pokemon;
  
    // if (!pokemon) return <p>No Pokémon found with the name "{name}".</p>;
  
    return (
      <div className='container mx-auto p-6'>
        <div className='flex justify-between items-center'>
          <Link href={'/pokemons'}  className='text-red-500 py-2 px-4 rounded-lg hover:text-red-700'> 
            <span className='text-xl font-bold'>&lt;</span> 
            <span className='text-xl font-bold pl-2'>Back</span>
          </Link>
          <div className='flex justify-center items-center'>
            <h1 className='font-bold text-3xl'>{pokemon.name}</h1>
            <span className='text-3xl ml-2'> #{pokemon.number}</span>
          </div>
          <div></div>
        </div>
        <div className='text-center'>
          <div className='flex min-lg:justify-center min-lg:items-start space-x-4 mt-10 lg:flex-col lg:items-center sm:flex-col sm:items-center '>
            <Image className='object-contain mr-5 shadow-lg ' src={pokemon.image} alt={pokemon.name} width={400} height={400} />
            <div>
              <h3 className='text-start font-bold text-2xl text-red-500 uppercase my-4 lg:text-center'>Pokédex data</h3>
              <table>
                <tr className='border-b'>
                  <th className="py-2 text-right">Classification: </th>
                  <td className='py-2 text-left pl-4'>{pokemon.classification}</td>
                </tr>
                <tr className='border-b'>
                  <th className="py-2 text-right">Height: </th>
                  <td className='py-2 text-left pl-4'>{pokemon.height.minimum} - {pokemon.height.maximum}</td>
                </tr>
                <tr className='border-b'>
                  <th className="py-2 text-right">Weight: </th>
                  <td className='py-2 text-left pl-4'>{pokemon.weight.minimum} - {pokemon.weight.maximum}</td>
                </tr>
                <tr className='border-b'>
                  <th className="py-2 text-right">Attack: </th>
                  <td className='text-left py-2 pl-4 content-start flex space-x-5 lg:flex-col lg:space-x-0'>
                    <div>
                      <h3 className='font-bold text-lg text-red-500'>Fast Attack</h3>
                      <table>
                        <tr className='bg-slate-200'>
                          <th className='border-2 text-center px-2 py-1'>Name</th>
                          <th className='border-2 text-center px-2 py-1'>Type</th>
                          <th className='border-2 text-center px-2 py-1'>Damage</th>
                        </tr>
                      {pokemon.attacks.fast.map((attack, index) => (
                        <tr key={index}>
                          <td className='border-2 text-center px-2 py-1'>{attack.name}</td> 
                          <td className={`border-2 text-center px-2 py-1 ${getTypePokemon(attack.type)}`}>{attack.type}</td> 
                          <td className='border-2 text-center px-2 py-1'>{attack.damage}</td> 
                      </tr>
                    ))}
                    </table>
                    </div>
                  <div>
                    <h3 className='font-bold text-lg text-red-500'>Special Attack</h3>
                      <table>
                        <tr className='bg-slate-200'>
                          <th className='border-2 text-center px-2 py-1'>Name</th>
                          <th className='border-2 text-center px-2 py-1'>Type</th>
                          <th className='border-2 text-center px-2 py-1'>Damage</th>
                        </tr>
                      {pokemon.attacks.special.map((attack, index) => (
                        <tr key={index}>
                          <td className='border-2 text-center px-2 py-1'>{attack.name}</td> 
                          <td className={`border-2 text-center px-2 py-1 ${getTypePokemon(attack.type)}`}>{attack.type}</td> 
                          <td className='border-2 text-center px-2 py-1'>{attack.damage}</td> 
                      </tr>
                    ))}
                    </table>
                  </div>
                  </td>
                </tr>
                <tr className='border-b'>
                  <th className="py-2 text-right">Types: </th>
                  <td className='text-left pl-4'><PokemonType position='start' types={pokemon.types} /></td>
                </tr>
                <tr className='border-b'>
                  <th className="py-2 text-right">Resistant to: </th>
                  <td className='py-2 text-left pl-4 break-all'><PokemonType position='start' types={pokemon.resistant} /></td>
                </tr>
                <tr className='border-b'>
                  <th className="py-2 text-right">Weaknesses: </th>
                  <td className='py-2 text-left pl-4'><PokemonType position='start' types={pokemon.weaknesses} /></td>
                </tr>
                <tr className='border-b'>
                  <th className="py-2 text-right">Flee Rate: </th>
                  <td className='py-2 text-left pl-4'>{pokemon.fleeRate}</td>
                </tr>
                <tr className='border-b'>
                  <th className="py-2 text-right">Max CP: </th>
                  <td className='py-2 text-left pl-4'>{pokemon.maxCP}</td>
                </tr>
                <tr className='border-b'>
                  <th className="py-2 text-right">Max HP: </th>
                  <td className='py-2 text-left pl-4'>{pokemon.maxHP}</td>
                </tr>
              </table>
            </div>
          </div>
          {pokemon.evolutions && 
          <div className='mt-5 bg-white rounded-lg py-5 shadow-xl'>
            <p className='font-bold text-2xl text-red-600 uppercase'>Evolution</p>
            <div className='flex justify-around relative'>
                {pokemon.evolutions?.map((evolution, index) => (
                  <div key={index} className='pokemon-evolution '>
                    <Link href={`/pokemons/${params.name}?search=${evolution.name}`}>
                      <Image className='mx-auto h-32 object-contain' src={evolution.image} width={150} height={150} alt={evolution.name}></Image>
                      <p>#{evolution.number}</p>
                      <p className='font-bold text-xl'>{evolution.name}</p>
                      <PokemonType position='start' types={evolution.types} />
                    </Link>
                  </div>
            ))}
            </div>
          </div>
          }
        </div>
      </div>
    );
  };
export default PokemonDetail