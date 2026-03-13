const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");

async function fetchBestRelics(maxPages = 1) {
  const baseUrl = "https://www.prydwen.gg";
  const paginationURLsToVisit = [`${baseUrl}/star-rail/characters/`];
  const visitedURLs = [];
  const characterURLs = new Set();

  while (paginationURLsToVisit.length !== 0 && visitedURLs.length < maxPages) {
    const paginationURL = paginationURLsToVisit.pop();
    const pageHTML = await axios.get(paginationURL);
    visitedURLs.push(paginationURL);
    const $ = cheerio.load(pageHTML.data);

    $(".placeholder a").each((index, element) => {
      const relativeURL = $(element).attr("href");
      const absoluteURL = new URL(relativeURL, baseUrl).href;
      if (
        !visitedURLs.includes(absoluteURL) &&
        !paginationURLsToVisit.includes(absoluteURL)
      ) {
        paginationURLsToVisit.push(absoluteURL);
      }
    });

    $(".avatar-card a").each((index, element) => {
      const relativeURL = $(element).attr("href");
      const absoluteURL = new URL(relativeURL, baseUrl).href;
      characterURLs.add(absoluteURL);
    });
  }

  const bestRelics = [];

  for (const characterURL of characterURLs) {
    try {
      const characterHTML = await axios.get(characterURL);
      const $ = cheerio.load(characterHTML.data);

      const charName = $(".character-top strong").text();
      const relicNames = [];

      $();
      $(".hsr-set-image picture").each((index, element) => {
        const imgElement = $(element).find("img");
        const relicSet = imgElement.attr("alt");
        if (relicSet) {
          relicNames.push(relicSet);
        }
      });

      bestRelics.push({
        name: charName,
        relics: relicNames,
      });
    } catch (error) {
      console.error(`Error fetching character page: ${characterURL}`, error);
    }
  }

  const outputDir = path.join(__dirname, "../app/characters/");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const jsonString = JSON.stringify(bestRelics, null, 2);
  fs.writeFileSync(path.join(outputDir, "bestsets.json"), jsonString, "utf-8");
  console.log("Set data has been saved.");
}

fetchBestRelics();
