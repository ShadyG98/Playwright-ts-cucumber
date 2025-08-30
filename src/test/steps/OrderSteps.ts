import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { pageFixture } from "../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2);

// Helper functions
async function clickButtonByText(text: string) {
    await pageFixture.page.locator(`button:has-text("${text}")`).click();
}

async function selectFromDropdown(dropdownSelector: string, optionText: string) {
    await pageFixture.page.locator(dropdownSelector).click();
    await pageFixture.page.locator(`//li[@role='option' and text()='${optionText}']`).click();
}

async function fillInput(selector: string, value: string) {
    await pageFixture.page.locator(selector).fill(value);
}

// Step definitions
Given('User navigates to {string}', async function (menuName: string) {
    await clickButtonByText(menuName);
});

When('the user adds a movement with entity {string}, person {string} and amount {string}', async function (entity, person, amount) {
    // Click Add icon
    await pageFixture.page.locator("svg[data-testid='AddIcon']").click();

    // Select entity
    await selectFromDropdown("#related-entity-select", entity);

    // Select person
    await pageFixture.page.locator("button[aria-label='Open']").click();
    await pageFixture.page.locator("//ul[@role='listbox']//li", { hasText: person }).click();

    // Fill amount
    await fillInput("input[name='amount']", amount);
});

Then('the movement should be updated', async function () {
    await pageFixture.page.locator('button[type="submit"]').click();
});
