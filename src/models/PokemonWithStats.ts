type PokemonWithStats = {
    name: String,
    height: number,
    baseExperience: number,
    id: number,
    spriteFrontDefaultImg: String,
    species: Species,
    stats: Array<Stat>,
    statsAverage: number
}

type Species = {
  name: String;
  url: String;
};

type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name : String;
    url: String;
  }
}

export default PokemonWithStats;