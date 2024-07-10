# HSR Relic Manager

# Roadmap

The HSR Relic Manager is currently in the Alpha Phase.

## Alpha

Goal: complete the core features and initial testing

- [x] registration
- [x] login/logout
- [ ] password/email update
- [x] add characters to inventory
- [x] add relics to inventory
- [ ] bug report/contanct us
- [x] delete relics from inventory
- [ ] edit relics in inventory
- [ ] left click to open menu for that character
- [ ] right click to toggle character on/off in the relic section

## Beta

Goal: in depth test of the core features and bug fixes

Test scenarios:

- [ ] registration
- [ ] login/logout
- [ ] password/email update
- [ ] add characters to inventory
- [ ] add relics to inventory
  - [ ] 4pc relic
  - [ ] 2pc ornament
  - [ ] 4pc relic/ornament
  - [ ] 2pc relic/relic
  - [ ] 2pc relic/relic/ornament
- [ ] delete relics from inventory
- [ ] edit relics in inventory

## Release

Goal: first version release and user feedback

## Future Versions

Goal: add additional features and improvements based on user feedback, work on the feature backlog, and update the UI/UX and design of the site

- [ ] mobile design
- [ ] account delete
- [ ] password reset

### Dashboard

- relic tab
  - search bar
    - filter by set name or character
  - sort by set name
- add character and add relic
  - search bar with interactive filtering
  - if character selected: recommended relic/oranment sets show up first

### Character Page

- char card infographic generation
  - add character level, trace levels, eidolons
  - add current lightcone button
    - select lightcone
    - select lightcone level
  - add current relic set button
    - select relic set
    - select stats per piece
  - calulate total stats
  - save all info to autogenerate character card for display
  - character info shows char best sets and target stat goals/lc from prydwen
- search bar
  - search by name
- filter options
  - rarity
  - path
  - element

### Relic Sets Page

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

# Database

## MongoDB

Used to:

- READ stored user and relic data and populate the relic planner with each user's saved information.
- WRITE new user data from new registrations and relic data from adding a new character and relic set to farm to the user's account.
- UPDATE user email and password and already saved relic data that the user wants to edit.
- DELETE user account and relic data that the user no longer wants.
