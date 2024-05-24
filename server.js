const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

// Create the images directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'images'))) {
    fs.mkdirSync(path.join(__dirname, 'images'));
}

async function downloadImage(url, filename) {
    const writer = fs.createWriteStream(filename);
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

async function fetchRelicData(url) {
    try {
        // Fetch the HTML content of the page
        const { data: pageHTML } = await axios.get(url);
        
        // Load the HTML into Cheerio
        const $ = cheerio.load(pageHTML);
        
        // Array to store the relic data
        const relics = [];
        
        // Select and iterate over each relic element to extract the name and set bonus
        $(".col").each((index, element) => {
            // const relicImgUrl = $(element).find(".hsr-relic-image img").attr("srcset");
            const relicName = $(element).find(".hsr-relic-data h4").text().trim();
            const relicType = ($(element).find(".hsr-relic-info").text().trim()).split(": ")[1];
            
            const baseURL = "https://www.prydwen.gg";
            // const relicImgUrl = $(element).find("picture img").attr("src");

            // Extract the correct image URL
            const pictureElement = $(element).find(".hsr-relic-image picture");
            const imgElement = pictureElement.find("img");
            const relicImgUrl = imgElement.attr("src") || imgElement.attr("data-src");
            const fullRelicImgUrl = new URL(relicImgUrl, baseURL).href;
            
            // Separate the bonus into two parts: (2) and (4)
            const setBonus = $(element).find(".hsr-set-description").text().trim();
            const [bonus2, bonus4] = setBonus.split("(4)").map(part => part.trim());

            // Add the relic data to the array
            if (relicType === "Relic Set"){
                relics.push({
                    image: fullRelicImgUrl,
                    name: relicName,
                    type: relicType,
                    bonus2pc: bonus2.split("(2) ")[1],
                    bonus4pc: bonus4
                });
            
            } else {
                relics.push({
                    image: fullRelicImgUrl,
                    name: relicName,
                    type: relicType,
                    bonus2pc: bonus2.split("(2) ")[1]
                });

            // Download and save the image only if it doesn't already exist
            if (relicImgUrl) {
                const imageFilename = path.join(__dirname, 'images', `${relicName.replace(/\s+/g, '_')}.png`);
                if (!fs.existsSync(imageFilename)) {
                    downloadImage(`https://www.prydwen.gg${relicImgUrl}`, imageFilename)
                        .then(() => console.log(`Image saved: ${imageFilename}`))
                        .catch(err => console.error(`Error saving image ${imageFilename}:`, err));
                } else {
                    console.log(`Image already exists: ${imageFilename}`);
                }
            }
        }
    });
        // Log the extracted relic data
        console.log(relics);

        // Convert the relics array to JSON string
        const jsonString = JSON.stringify(relics, null, 2);

        // Save the JSON string to a file
        fs.writeFileSync("relics.json", jsonString, "utf-8");

        // Log the message indicating successful save
        console.log("Relic data has been saved to relics.json");

    } catch (error) {
        console.error(`Error fetching data from ${url}`, error);
    }
}

// URL of the webpage to scrape
const url = "https://www.prydwen.gg/star-rail/guides/relic-sets/";

// Fetch the relic data from the specified URL
fetchRelicData(url);
