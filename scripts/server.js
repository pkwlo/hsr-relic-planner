/***
 * Runs both fetchCharacters and fetchRelics in parallel.
 * Run this to update the json files for characters and relics after each new patch.
 */
const fetchCharacters = require("./fetchCharacters.js");
const fetchRelics = require("./fetchRelics.js");

async function initialize() {
  try {
    // Option 1: Sequential execution
    // await fetchCharacters();
    // await fetchRelics();

    // Option 2: Parallel execution
    await Promise.all([fetchCharacters(), fetchRelics()]);

    console.log("Characters and relics fetched successfully.");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

initialize();
