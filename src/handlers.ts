import { FastifyRequest, FastifyReply } from "fastify";
import PokemonWithStats from "models/PokemonWithStats";

export async function getPokemonByName(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const https = require("https");
  const name: string = request.params["name"];

  https
    .get(`https://pokeapi.co/api/v2/pokemon/${name}`, (result) => {
      let data = [];

      result.on("data", (dataChunck) => {
        data.push(dataChunck);
      });

      result.on("end", () => {
        const pokemon: PokemonWithStats = buildPokemon(data);
        reply.send(pokemon);
      });
    })
    .on("error", (err) => {
      console.error("Error: ", err.message);
    });
}

const buildPokemon = (data) => {
  const parsedData = JSON.parse(Buffer.concat(data).toString());
  const { name, height, base_experience, id, species, sprites, stats } = parsedData;

  return {
    name, height, baseExperience: base_experience, id, spriteFrontDefaultImg: sprites.front_default, species, stats, statsAverage: getStatsAverage(stats)
  }
}

const getStatsAverage = (stats) => {
  return stats.reduce((acc, cur) => acc + cur.base_stat, 0) / stats.length;
}