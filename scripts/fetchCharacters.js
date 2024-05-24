const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const url = "https://genshin.gg/star-rail/";

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

async function fetchCharacterImage(url) {
  try {
    const { data: pageHTML } = await axios.get(url);
    const $ = cheerio.load(pageHTML);

    const characters = [];
    var charID = 0;

    $(".character-list a").each((index, element) => {
      const charName = $(element).find(".character-name").text().trim();
      const charElement = $(element).find(".character-type").attr("alt");
      const charRarity = $(element)
        .find(".character-icon")
        .attr("class")
        .split(" ")[1];

      // Getting Image URL
      const baseURL = "https://genshin.gg/";
      const charImage = $(element).find(".character-icon").attr("src");
      const fullCharImgUrl = new URL(charImage, baseURL).href;

      const imgLocal = path.join(
        "/char-images",
        `${charName.replace(/\s+/g, "_")}.png`,
      );
      //   const imgElement = pictureElement.find("img");
      //   const relicImgUrl = imgElement.attr("src") || imgElement.attr("data-src");
      //   const fullRelicImgUrl = new URL(relicImgUrl, baseURL).href;
      //   const placeholderImage = "/set-images/placeholder.png";
      //   const imageLocation = path.join(
      //     "/set-images",
      //     `${relicName.replace(/\s+/g, "_")}.png`,
      //   );
      const imageFilename = path.join(
        imageFolder,
        `${charName.replace(/\s+/g, "_")}.png`,
      );

      // Download and save the image if it doesn't already exist
      if (fullCharImgUrl && fullCharImgUrl !== "https://genshin.gg/undefined") {
        if (!fs.existsSync(imageFilename)) {
          downloadImage(`${fullCharImgUrl}`, imageFilename)
            .then(() => console.log(`Image saved: ${imageFilename}`))
            .catch((err) =>
              console.error(`Error saving image ${imageFilename}:`, err),
            );
        } else {
          console.log(`Image already exists: ${imageFilename}`);
        }
      }

      const character = {
        id: charID,
        name: charName,
        type: charElement,
        rarity: charRarity,
        image: fullCharImgUrl,
        local: imgLocal,
      };

      charID++;
      characters.push(character);
    });

    const jsonString = JSON.stringify(characters, null, 2);
    fs.writeFileSync(
      path.join(__dirname, "../app/characters/characters.json"),
      jsonString,
      "utf-8",
    );
    console.log("Character data has been saved to /characters/characters.json");
  } catch (error) {
    console.error(`Error fetching data from ${url}`, error);
  }
}

fetchCharacterImage(url);
