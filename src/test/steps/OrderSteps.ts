import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

setDefaultTimeout(60 * 1000 * 2)

import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

Given('User navigates to order', async function () {
    
});

Given('User modify type of delivery', async function () {

});
Then('the state should be updated', async function () {
    
});