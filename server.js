const axios = require("axios");
const cheerio = require("cheerio");

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
            const relicImgUrl = $(element).find(".hsr-relic-image img").attr("src");
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
            }
        });
        
        // Log the extracted relic data
        console.log(relics);
    } catch (error) {
        console.error(`Error fetching data from ${url}`, error);
    }
}

// URL of the webpage to scrape
const url = "https://www.prydwen.gg/star-rail/guides/relic-sets/";

// Fetch the relic data from the specified URL
fetchRelicData(url);
