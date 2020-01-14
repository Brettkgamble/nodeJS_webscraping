const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function main() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    // await page.goto("http://www.harness.org.au/national/remote/calendar.cfm?state=all&start=2010-01-01&end=2010-12-31");
    await page.goto("https://sfbay.craigslist.org/d/software-qa-dba-etc/search/sfc/sof");

    const html = await page.content();
    const $ = cheerio.load(html);
    // $(".result-title").each((index, element) => console.log($(element).text()))
    $(".result-title").each((index, element) => console.log($(element).attr("href")))
}



main();