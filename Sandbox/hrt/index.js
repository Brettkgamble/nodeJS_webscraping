const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function main() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("http://www.harness.org.au/racing/fields/race-fields/?rc=REC03041906&ms=qld#REC03041906");

    const html = await page.content();
    const $ = cheerio.load(html);
    // $(".raceTitle").each((index, element) => console.log($(element).text()))
    // $(".horse_name_link").each((index, element) => console.log($(element).attr('href')))
    // const results = $(".horse_name_link").map((index, element) => {
    //     const horseName = $(element).text();
    //     const horseUrl = $(element).attr("href");
    //     return { horseName, horseUrl }
    // }).get();
    const r = $(".raceFieldTable")
        .map((index, element) => {
            const rowElement = $(element).find("tr");
            const res = rowElement.map((index, element) =>{
                let finishPos = index;
                const horseElement = $(element).find(".horse_name_link");
                const horseName = $(horseElement).text().trim();
                const horseUrl = $(horseElement).attr("href");
                const prizeMoneyElement = $(element).find(".prizemoney");
                const prizeMoney = $(prizeMoneyElement).text().replace('$','').replace(",",'').trim();
                const hcapElement = $(element).find(".hcp");
                const hcap = $(hcapElement).text().trim();
                const barrierElement = $(element).find(".barrier");
                const barrier = $(barrierElement).text().trim();
                const trainerElement = $(element).find(".trainer");
                const trainer = $(trainerElement).text().trim();
                const trainerShortElement = $(element).find(".trainer-short");
                const trainerShort = $(trainerShortElement).text().trim();
                const driverElement = $(element).find(".driver");
                const driver = $(driverElement).text().trim();
                const driverShortElement = $(element).find(".driver-short");
                const driverShort = $(driverShortElement).text().trim();
                const marginElement = $(element).find(".margin");
                const margin = $(marginElement).text().trim();
                const startPriceElement = $(element).find(".starting_price");
                const startPrice = $(startPriceElement).text().replace('$','').replace(",",'').trim();
                const stewardCommentElement = $(element).find(".stewardsTooltip");
                const stewardComment = $(stewardCommentElement).attr("data-original-title");
                // index[0] is the table header, skip it
                if (index > 0) {
                    if (index == 2) {
                        finishPos ='';
                    } else if (index == 1) {
                        finishPos = index;
                    } else {
                        finishPos = index -1;
                    }
                }
                return { finishPos, horseName, horseUrl, prizeMoney,
                        hcap, barrier, trainer, trainerShort, driver,
                        driverShort, margin, startPrice, stewardComment}
            }).get();
            console.log(res);
    }).get();
}



main();