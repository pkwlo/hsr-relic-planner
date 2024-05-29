const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");

const imageFolder = path.join(__dirname, "../public/char-images");
if (!fs.existsSync(imageFolder)) {
  fs.mkdirSync(imageFolder, { recursive: true });
}

async function downloadImage(url, filename) {
  const writer = fs.createWriteStream(filename);
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

async function fetchCharInfo(maxPages = 1) {
  // initialized with the first webpage to visit
  const paginationURLsToVisit = ["https://genshin.gg/star-rail"];
  const visitedURLs = [];
  const characterURLs = new Set();

  while (paginationURLsToVisit.length !== 0 && visitedURLs.length <= maxPages) {
    const paginationURL = paginationURLsToVisit.pop();
    const pageHTML = await axios.get(paginationURL);
    visitedURLs.push(paginationURL);
    const $ = cheerio.load(pageHTML.data);

    $(".placeholder").each((index, element) => {
      const paginationURL = $(element).attr("href");
      if (
        !visitedURLs.includes(paginationURL) &&
        !paginationURLsToVisit.includes(paginationURL)
      ) {
        paginationURLsToVisit.push(paginationURL);
      }
    });

    // retrieving the character URLs
    $(".character-list a").each((index, element) => {
      const rawcharacterURL = $(element).attr("href");
      const characterURL = path.join("https://genshin.gg", rawcharacterURL);
      characterURLs.add(characterURL);
    });
  }

  // Fetch and extract character details from each character URL
  const characters = [];
  var charID = 0;

  for (const characterURL of characterURLs) {
    try {
      const characterHTML = await axios.get(characterURL);
      const $ = cheerio.load(characterHTML.data);

      const charName = $(".character-info-portrait").attr("alt");
      const charElement = $(".character-info-element").attr("alt");
      const charRarity = $(".character-info-portrait")
        .attr("class")
        .split(" ")[1];
      const charPath = $(".character-info-path").text().trim();
      const charImage = $(".character-info-portrait")
        .attr("src")
        .replace("Full", "Thumb")
        .replace(/-\d+(\.png)$/, "$1");

      const imageFilename = path.join(
        imageFolder,
        `${charName.replace(/\s+/g, "_")}.png`,
      );

      const imgLocal = path.join(
        "/char-images",
        `${charName.replace(/\s+/g, "_")}.png`,
      );

      // Download and save the image if it doesn't already exist
      if (charImage) {
        if (!fs.existsSync(imageFilename)) {
          downloadImage(`${charImage}`, imageFilename)
            .then(() => console.log(`Image saved: ${imageFilename}`))
            .catch((err) =>
              console.error(`Error saving image ${imageFilename}:`, err),
            );
        } else {
          console.log(`Image already exists: ${imageFilename}`);
        }
      }

      characters.push({
        id: charID,
        name: charName,
        element: charElement,
        rarity: charRarity,
        path: charPath,
        image: charImage,
        local: imgLocal,
      });
      charID++;

      const jsonString = JSON.stringify(characters, null, 2);
      fs.writeFileSync(
        path.join(__dirname, "../app/characters/characters.json"),
        jsonString,
        "utf-8",
      );
      console.log("Character data has been saved.");
    } catch (error) {
      console.error(`Error fetching character page: ${characterURL}`, error);
    }
  }
}

fetchCharInfo();
