# HSR Relic Manager

# To Do

## Dashboard

- character tab
  - click to expand
  - list of characters
    - left click to open menu for that character
      - edit / add / view relic set
      - delete character
      - check mark for done/not done on each piece
      - mark all as complete button
    - right click to toggle character on/off in the relic section
- relic tab
  - search bar
    - filter by set name or character
  - sort by set
  - each set is expand/collapsable
  - expand / collapse all button
  - set 1, set 2, set 3...etc
    - click to expand
    - list of pieces + desired stats
    - character icons to show which characters are farming for this set
- sidebar with links to character and relic-sets pages (done)
- user log in and log out
  - create form
  - function to check if the username exists in DB
    - if yes, check if password matches
      - if yes, log in
      - if no, show error message incorrect password
    - if no, prompt to register
  - create a register page
    - register with email and password
    - check if email is already in use
    - if not, create user
  - store user info in DB
- set up DB for user storage
  - create a user schema
- update design
  - set up a theme
  - beautify page

## Character Page

- add characters button
  - delete character button
  - [future feature] char card infographic generation
    - add character level, trace levels, eidolons
    - add current lightcone button
      - select lightcone
      - select lightcone level
    - add current relic set button
      - select relic set
      - select stats per piece
    - calulate total stats
    - save all info to autogenerate character card for display
  - add new relic set button
    - select relic set
    - select stats per piece
  - current relic set information with desired stats
    - edit set
    - delete set
    - copy set (can copy into set 2 and change the set name but keep same stats)
- search bar
  - search by name
- filter options

  - rarity
  - path
  - element
  - character section shows
    - character name
    - rarity
    - path
    - element
    - current relic set
    - desired stats
    - check mark for done/not done on each piece
    - mark all as complete button

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

- update design
  - responsive
- search bar
  - search by name or description
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
