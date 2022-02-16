import { FastifyRequest, FastifyReply } from "fastify";
import PokemonWithStats, { Stat } from "models/PokemonWithStats";
import { sendError } from "helpers/helpers";

export async function getPokemonByName(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const https = require("https");
  let name: string = request.params["name"];

  if (name === null || name.trim() === "") {
    sendError(reply, "Please set a valid pokemon name", 400);
    return;
  }

  name = name.toLowerCase();
  https
    .get(`https://pokeapi.co/api/v2/pokemon/${name}`, (result) => {
      let data: Buffer[] = [];

      result.on("data", (dataChunck: Buffer) => {
        data.push(dataChunck);
      });

      result.on("end", () => {
        if (result.statusCode === 404) {
          sendError(reply, `Pokemon with name ${name} does not exist`, 404);
          return;
        }

        const pokemon: PokemonWithStats = buildPokemon(data);
        reply.send(pokemon);
      });
    })
    .on("error", (err: Error) => {
      console.error("Error: ", err.message);
      sendError(reply, "Something went wrong ¯_(ツ)_/¯", 500);
      return;
    });
}

const buildPokemon = (data: Buffer[]): PokemonWithStats => {
  const parsedData = JSON.parse(Buffer.concat(data).toString());
  const {
    name,
    height,
    base_experience,
    id,
    species,
    sprites,
    stats,
  } = parsedData;

  return {
    name,
    height,
    baseExperience: base_experience,
    id,
    spriteFrontDefaultImg: sprites.front_default,
    species,
    stats,
    statsAverage: getStatsAverage(stats),
  };
};

const getStatsAverage = (stats: Array<Stat>): number => {
  // if by any mean the stats array is empty, return 0;
  if (!stats.length) return 0;
  return stats.reduce((acc, cur) => acc + cur.base_stat, 0) / stats.length;
};
