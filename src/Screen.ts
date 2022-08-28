const puppeteer = require('puppeteer');

const getPage = async (url: string, img: string | null = null) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
        await page.goto(url);
    } catch (e : any) {
        await browser.close()
        throw new Error(e.message);
    }

    await page.screenshot({path: 'example.png'});
    await browser.close();
}

module.exports = class Screen {

    async capture(url: string, selector: string | null = null) {
        try {
            await getPage(url);
            return true;
        }catch (e: any) {
            throw new Error(e.message);
        }
    }
}