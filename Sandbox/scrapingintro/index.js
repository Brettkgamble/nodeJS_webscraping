const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");

async function main() {
    const html = await request.get("https://reactnativetutorial.net/css-selectors/");
    // const html = await request.get("https://www.lakewoodchev.com/used-inventory/index.htm?start");

    fs.writeFileSync("./test.html", html);

    const $ = cheerio.load(html);
    const theText = $("h1").text();
    console.log(theText);

}

main();