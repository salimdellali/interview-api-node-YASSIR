# INTERVIEW API NODE YASSIR

## How to run the server
- clone this repo to your local working directory
- install the packages with `npm install`
- run `npm run dev`, make sure you have `ts-node` package installed correctly, you should see `🚀  Fastify server running on port 3000` message in the console 
- open Postman client, and start making requests

## Endpoints
- GET `/poke/:name` - where `name` is a valid pokemon name (eg: pikachu, weedle, lugia ...etc)

## Project structure
- `src/handlers/`: holds the actions to take when hitting the endpoints
- `src/helpers/`: holds usefull functions that can be used all over the project
- `src/models/`: holds the data schemas definitions
- `src/routes/`: holds the possible routes the Rest API can provide
- `src/tests/Rest API testing/`: holds insctructions on how to test this Rest API
- `src/server.ts`: file that sets up & initializes the server, and glues everything together

## Scripts

```bash
# development: hot reload with nodemon
$ npm run dev

# debug
$ npm run debug

# format with prettier
$ npm run format

# build for production
$ npm run build

# production
$ npm run prod
```

## Lessons Learned
- using Fastify to make Rest APIs (because originally I'm used to work with express.js)
- debugging Node.js in VSCode
- Rest API testing with Postman

## Steps I took to solve this challenge
1. starting by fixing the server because it was broken, to be able to run it
2. implementing a proper way to make https requests
3. reverse engineering the `computeResponse` function
4. reverse engineering the type `PokemonWithStats`
5. returning a response in the best case scenario
6. treating edge cases
7. typing everything
8. improving project structure to make the app extensible as the app can grow in size
9. pretty-ing all the code 
10. integrating Rest API tests


check the commits history for more details
## Last Note
- I had a lot of fun solving this challenge, I decided to not rush and take the time I needed to craft the best code I could (of course withing the time frame allowed)
- Hope my solution will meet your expectations
- Built with <3 and excitement by @salimdellali