const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const url = "https://www.prydwen.gg/star-rail/guides/relic-sets/";

const imageFolder = path.join(__dirname, "public/set-images");
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

async function fetchRelicData(url) {
  try {
    const { data: pageHTML } = await axios.get(url);
    const $ = cheerio.load(pageHTML);

    const relics = [];
    var relicID = 0;

    $(".col").each((index, element) => {
      const relicName = $(element).find(".hsr-relic-data h4").text().trim();
      const relicType = $(element)
        .find(".hsr-relic-info")
        .text()
        .trim()
        .split(": ")[1];

      // Getting Image URL
      const baseURL = "https://www.prydwen.gg";
      const pictureElement = $(element).find(".hsr-relic-image picture");
      const imgElement = pictureElement.find("img");
      const relicImgUrl = imgElement.attr("src") || imgElement.attr("data-src");
      const fullRelicImgUrl = new URL(relicImgUrl, baseURL).href;

      // Separate the bonus into two parts: (2) and (4)
      const setBonus = $(element).find(".hsr-set-description").text().trim();
      const [bonus2, bonus4] = setBonus.split("(4)").map((part) => part.trim());

      // Add the relic data to the array
      const relic = {
        id: relicID,
        image: fullRelicImgUrl,
        name: relicName,
        type: relicType,
        bonus2pc: bonus2.split("(2) ")[1],
      };

      if (relicType === "Relic Set") {
        relic.bonus4pc = bonus4;
      }

      relicID++;
      relics.push(relic);

      // Download and save the image only if it doesn't already exist
      if (
        fullRelicImgUrl &&
        fullRelicImgUrl !== "https://www.prydwen.gg/undefined"
      ) {
        const imageFilename = path.join(
          imageFolder,
          `${relicName.replace(/\s+/g, "_")}.png`,
        );
        if (!fs.existsSync(imageFilename)) {
          downloadImage(`${fullRelicImgUrl}`, imageFilename)
            .then(() => console.log(`Image saved: ${imageFilename}`))
            .catch((err) =>
              console.error(`Error saving image ${imageFilename}:`, err),
            );
        } else {
          console.log(`Image already exists: ${imageFilename}`);
        }
      }
    });

    // Convert the relics array to JSON string and save it to relics.json
    const jsonString = JSON.stringify(relics, null, 2);
    fs.writeFileSync(
      path.join(__dirname, "/app/relic-sets/relics.json"),
      jsonString,
      "utf-8",
    );
    console.log("Relic data has been saved to relics.json");
  } catch (error) {
    console.error(`Error fetching data from ${url}`, error);
  }
}

// Fetch the relic data from the specified URL
fetchRelicData(url);
