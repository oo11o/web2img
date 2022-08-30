"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const puppeteer = require('puppeteer');
module.exports = class Screen {
    constructor() {
        this.conf = {
            image: {
                web: 'web.png',
                selector: 'selector.png'
            }
        };
    }
    capture(url, selector = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer.launch({ headless: true });
            const page = yield browser.newPage();
            yield page.setViewport({
                width: 1920,
                height: 1080,
                deviceScaleFactor: 1,
            });
            try {
                yield page.goto(url);
            }
            catch (e) {
                yield browser.close();
                throw new Error(e.message);
            }
            if (selector) {
                try {
                    yield page.waitForSelector(selector, { timeout: 2000 }); // Method to ensure that the element is loaded
                    const section = yield page.$(selector);
                    yield section.screenshot({
                        path: this.conf.image.selector
                    });
                    yield browser.close();
                    return this.conf.image.selector;
                }
                catch (e) {
                    yield browser.close();
                    throw new Error(`Can't find selector \n ${e.message}`);
                }
            }
            yield page.screenshot({ path: this.conf.image.web });
            yield browser.close();
            return this.conf.image.web;
        });
    }
};
