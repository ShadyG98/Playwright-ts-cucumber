import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2)

Given('User navigates to the application', async function () {
    await pageFixture.page.goto("https://cadetpro.devgine.com.ar/app/orders");
})

Given('User click on the login link', async function () {
    await pageFixture.page.locator("//button[contains(., 'Iniciar sesión')]").click();
});

Given('User enter the username as {string}', async function (username) {
    this.username = username;
    await pageFixture.page.locator("//input[@type='text']").fill(username);
});

Given('User enter the password as {string}', async function (password) {
    this.password = password;
    await pageFixture.page.getByRole('textbox', { name: 'Contraseña' }).fill(password);
})

When('User click on the login button', async function () {
    await pageFixture.page.locator("//button[contains(., 'Iniciar sesión')]").click();
    await pageFixture.page.waitForLoadState();
    await pageFixture.page.waitForTimeout(2000);
});

Then('Login should be success', async function () {
    const response = await pageFixture.page.request.post(
        "https://cadetpro.devgine.com.ar/api/auth/login",
        {
            data: {
                username: this.username,
                password: this.password
            }
        }
    );
    await pageFixture.page.waitForTimeout(2000);
    expect(response.status()).toBe(200);
});

When('Login should fail', async function () {
    const response = await pageFixture.page.request.post(
        "https://cadetpro.devgine.com.ar/api/auth/login",
        { data: { username: this.username, password: this.password } }
    );
    expect(response.status()).toBe(401);
    const failureMessage = pageFixture.page.locator("//p[contains(text(),'Usuario o contraseña incorrectos')]");
    await expect(failureMessage).toBeVisible();
});
