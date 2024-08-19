

export const getTypePokemon = (type: string): string => {
    switch (type.toLowerCase()) {
      case 'normal':
        return 'bg-type-normal text-white';
      case 'fire':
        return 'bg-type-fire text-white';
      case 'water':
        return 'bg-type-water text-white';
      case 'electric':
        return 'bg-type-electric text-black';
      case 'grass':
        return 'bg-type-grass text-white';
      case 'ice':
        return 'bg-type-ice text-black';
      case 'fighting':
        return 'bg-type-fighting text-white';
      case 'poison':
        return 'bg-type-poison text-white';
      case 'ground':
        return 'bg-type-ground text-black';
      case 'flying':
        return 'bg-type-flying text-white';
      case 'psychic':
        return 'bg-type-psychic text-white';
      case 'bug':
        return 'bg-type-bug text-black';
      case 'rock':
        return 'bg-type-rock text-white';
      case 'ghost':
        return 'bg-type-ghost text-white';
      case 'dragon':
        return 'bg-type-dragon text-white';
      case 'dark':
        return 'bg-type-dark text-white';
      case 'steel':
        return 'bg-type-steel text-black';
      case 'fairy':
        return 'bg-type-fairy text-white';
      default:
        return 'bg-gray-200 text-black'; 
  }
};