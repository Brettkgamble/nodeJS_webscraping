const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function main() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("http://www.harness.org.au/racing/fields/race-fields/?rc=REC03041906&ms=qld#REC03041906");

    const html = await page.content();
    const $ = cheerio.load(html);
    $(".raceTitle").each((index, element) => console.log($(element).text()))
    $(".horse_name_link").each((index, element) => console.log($(element).attr('href')))
}



main();