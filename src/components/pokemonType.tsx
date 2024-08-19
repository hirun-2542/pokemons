import React from 'react'
import { getTypePokemon } from './getTypePokemon';

interface PokemonTypeProps {
    types: string[];
    position: string;
  }
  
const PokemonType: React.FC<PokemonTypeProps> = ({ types, position }) => {
  
    return (
        <div className={`w-full justify-${position} flex flex-wrap mt-2`}>
        {types.map((type) => (
            <span key={type} className={`px-4 py-2 rounded block mt-2 mr-2 ${getTypePokemon(type)}`}>
                {type}
            </span>
        ))}
        </div>
    );
};

export default PokemonType;
