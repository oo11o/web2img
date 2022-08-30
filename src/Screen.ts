const puppeteer = require('puppeteer');

module.exports = class Screen {
    conf = {
        image: {
            web: 'web.png',
            selector: 'selector.png'
        }
    }

    async capture(url: string, selector: string | null = null) {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.setViewport({
            width:  1920,
            height: 1080,
            deviceScaleFactor: 1,
        });

        try {
            await page.goto(url);
        } catch (e: any) {
            await browser.close()
            throw new Error(e.message);
        }

        if (selector) {
            try {
                await page.waitForSelector(selector, {timeout: 2000});          // Method to ensure that the element is loaded
                const section = await page.$(selector);
                await section.screenshot({
                    path: this.conf.image.selector
                })
                 await browser.close();
                return this.conf.image.selector;
            } catch (e: any){
                await browser.close();
                throw new Error(`Can't find selector \n ${e.message}`);
            }
        }

        await page.screenshot({path: this.conf.image.web});
        await browser.close();
        return this.conf.image.web;
    }

}