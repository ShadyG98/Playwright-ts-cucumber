import { BeforeAll, AfterAll, Before, After, BeforeStep, AfterStep, Status } from "@cucumber/cucumber";
import { chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import fs from "fs-extra";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    browser = await chromium.launch({ headless: !false });
});

Before(async function () {
    context = await browser.newContext();
    const page = await context.newPage();
    pageFixture.page = page;
});

Before({ tags: "@requiresLogin" }, async function () {
    await pageFixture.page.goto("https://cadetpro.devgine.com.ar/app/orders");
    await pageFixture.page.locator("//button[contains(., 'Iniciar sesión')]").click();
    await pageFixture.page.locator("//input[@type='text']").fill("brenda");
    await pageFixture.page.getByRole('textbox', { name: 'Contraseña' }).fill("123456");
    await pageFixture.page.locator("//button[contains(., 'Iniciar sesión')]").click();
    await pageFixture.page.waitForLoadState();
});

// AfterStep(async function ({ pickle, result }) {
//     const img = await pageFixture.page.screenshot({ path: `./test-result/screenshots/${pickle.name}.png`, type: "png" })
//     await this.attach(img, "image/png");
// });

After(async function ({ pickle, result }) {
    if (result?.status === Status.FAILED) {
        await fs.ensureDir("test-results/screenshots");
        const img = await pageFixture.page.screenshot({
            path: `test-results/screenshots/${pickle.name}.png`,
            type: "png"
        });
        await this.attach(img, "image/png");
    }
    await pageFixture.page.close();
});

AfterAll(async function () {
    await browser.close();
})
