import { FastifyRequest, FastifyReply } from "fastify";
import { PokemonWithStats } from "models/PokemonWithStats";

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
        const pokemon = JSON.parse(Buffer.concat(data).toString());
        reply.send(pokemon);
      });
    })
    .on("error", (err) => {
      console.error("Error: ", err.message);
    });
}

export const computeResponse = async (
  response: any,
  reply: FastifyReply
) => {
  const resp = response as any;

  let types = resp.types
    .map((type) => type.type)
    .map((type) => {
      return type.url;
    })
    .reduce((types, typeUrl) => types.push(typeUrl));

  let pokemonTypes = [];

  types.forEach((element) => {
    const http = require("http");
    const keepAliveAgent = new http.Agent({ keepAlive: true });

    http.request({ hostname: element }, (response) =>
      pokemonTypes.push(response)
    );
  });

  if (pokemonTypes == undefined) throw pokemonTypes;

  response.stats.forEach((element) => {
    var stats = [];

    pokemonTypes.map((pok) =>
      pok.stats.map((st) =>
        st.stat.name.toUpperCase() == element.stat.name
          ? stats.push(st.base_state)
          : []
      )
    );

    if (stats) {
      let avg = stats.reduce((a, b) => a + b) / stats.length;
      element.averageStat = avg;
    } else {
      element.averageStat = 0;
    }
  });
};
