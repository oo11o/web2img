const ScreenTest = require('../src/Screen');
let screen;

beforeEach(()=>{
    screen = new ScreenTest();
})

test('should return error', async () => {
    await expect(screen.capture('http://non-existent-site.com'))
        .rejects
        .toThrowError();
});

test('should return', async () => {
    await expect(screen.capture('http://example.com')).toBeTruthy();
});