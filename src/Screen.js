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
const getPage = (url, img = null) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch();
    const page = yield browser.newPage();
    try {
        yield page.goto(url);
    }
    catch (e) {
        yield browser.close();
        throw new Error(e.message);
    }
    yield page.screenshot({ path: 'example.png' });
    yield browser.close();
});
module.exports = class Screen {
    capture(url, selector = null) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield getPage(url);
                return true;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
};
