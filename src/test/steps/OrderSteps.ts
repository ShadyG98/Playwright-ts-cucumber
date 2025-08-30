import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

setDefaultTimeout(60 * 1000 * 2)

import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

Given('User navigates to menu', async function () {
    await pageFixture.page.locator("//button[span[text()='Ordenes']]").click();
});

Given('User navigates to box', async function () {
    await pageFixture.page.locator("//button[.//span[text()='Caja']]").click();
});

Given('the user adds a movement', async function () {
    await pageFixture.page.locator("svg[data-testid='AddIcon']").click();
    await pageFixture.page.locator("//div[@id='related-entity-select']").click();
    await pageFixture.page.locator("//li[@role='option' and text()='Personal de cadeteria']").click();
    await pageFixture.page.locator("button[aria-label='Open']").click();
    await pageFixture.page.locator("//li[@role='option' and text()='Brenda']").click();
    await pageFixture.page.locator("input[name='amount']").fill("150");

});

Then('the movement should be updated', async function () {
    await pageFixture.page.locator('button[type="submit"]').click();
});