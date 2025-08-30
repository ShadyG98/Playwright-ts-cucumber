import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2);

// --- Helpers ---
async function loginApi(username: string, password: string) {
    return await pageFixture.page.request.post(
        "https://cadetpro.devgine.com.ar/api/auth/login",
        { data: { username, password } }
    );
}

async function fillLoginForm(username: string, password: string) {
    await pageFixture.page.locator("//input[@type='text']").fill(username);
    await pageFixture.page.getByRole('textbox', { name: 'Contraseña' }).fill(password);
}

// --- Steps ---
Given('User navigates to the application', async () => {
    await pageFixture.page.goto("https://cadetpro.devgine.com.ar/app/orders");
});

Given('User clicks on the login link', async () => {
    await pageFixture.page.locator("//button[contains(., 'Iniciar sesión')]").click();
});

Given('User enters username {string} and password {string}', async function (username, password) {
    this.username = username;
    this.password = password;
    await fillLoginForm(username, password);
});

When('User clicks on the login button', async () => {
    await pageFixture.page.locator("//button[contains(., 'Iniciar sesión')]").click();
    await pageFixture.page.waitForLoadState();
    await pageFixture.page.waitForTimeout(2000);
});

Then('Login should succeed', async function () {
    const response = await loginApi(this.username, this.password);
    expect(response.status()).toBe(200);
});

Then('Login should fail', async function () {
    const response = await loginApi(this.username, this.password);
    expect(response.status()).toBe(401);
});

