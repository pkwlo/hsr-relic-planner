# HSR Relic Manager

# To Do

## Dashboard

- populate with info saved from character page
- sort by set
- sidebar with links to character and relic-sets pages

## Character Page

- select owned character -> save to user
- for each character select relic set(s) + ornament set to farm -> save to user

1. select set
2. select stats per part

for each user: (example)
{'character': Dan Heng,
'relic': {musketeer: {head:{main: , sub: {}}, arm: {main: , sub: {}}, feet: {main: {}, sub: {}}, body: {main: {}, sub: {}}},
eagle: {head:{main: , sub: {}}, arm: {main: , sub: {}}, feet: {main: {} , sub: {}}, body: {main: {} , sub: {}}}},
'ornament': {hss: {orb: {main: {atk%,wind dmg%}},substats: {atk%,spd,crit rate,crit dmg}rope: {main: {atk%}},substats: {atk%,spd,crit rate,crit dmg}}, salsotto {orb: {main:{}, sub:{}} ,rope: {main:{}, sub:{}}}}
}

- show list of chars
- click to expand
- list of relic sets (set 1, set 2...etc)
- click to expand to see each piece with the stats you are farming for
- check mark for done/not done on each piece
- mark all as complete button

## Relic Sets Page

- search bar
- filter options
  - relic vs ornaments
- filter options (search 2pc description)
  - ATK
  - DEF
  - Lightning DMG
  - Effect RES
  - CRIT DMG/CRIT Rate
  - Physical DMG
  - Wind DMG
  - Fire DMG
  - HP
  - Quantum DMG
  - Reduces DMG
  - Ice DMG
  - SPD
  - Effect Hit Rate
  - Energy Regeneration Rate
  - debuff
  - Break Effect
  - follow-up
  - Imaginary DMG
- or manually add tags and make it so that rerunning server.js does not overwrite relics that are already present
- add css and beautify page
- add responsiveness

# Libraries Used

## Axios

axios is a promise-based HTTP client for JavaScript, often used in both browser and Node.js environments. It simplifies making HTTP requests, such as GET, POST, PUT, DELETE, etc., and handling responses. Here are some key features:

Promise-based: Uses Promises to handle asynchronous operations, making it easier to work with asynchronous code.
Requests and responses: Simplifies making requests and handling responses, including automatic transformation of JSON data.
Error handling: Provides better error handling compared to the native fetch API.
Interceptors: Allows you to intercept requests or responses before they are handled, useful for adding headers, logging, or modifying request data.

## Cheerios

cheerio is a fast, flexible, and lean implementation of core jQuery designed specifically for the server. It is commonly used for web scraping, allowing you to parse and manipulate HTML and XML in a jQuery-like syntax. Cheerio is often used to extract data from HTML documents after fetching them using an HTTP client like axios.

Key features of cheerio:

DOM Manipulation: Enables manipulation of DOM elements with a syntax similar to jQuery.
HTML Parsing: Parses HTML and XML documents, allowing you to traverse and extract elements.
Lightweight: Designed for server-side operations, without the overhead of a full browser environment.
