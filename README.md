# 🎭 Playwright-ts-cucumber Setup Guide

This guide is based on my personal experience, including common errors, configuration issues, and needs that appeared during the project.

---

## 🛠️ **Steps to Set Up**

* Create a new Project

* Install Playwright Test and Cucumber (Gherkin) plugin in the Visual Studio Code extensions marketplace

* Open the terminal and run the following command to install Playwright:
```
Test: Install Playwright
```
* Install dependencies:

```bash
$ npm i @cucumber/cucumber -D
$ npm i ts-node -D
```

## 📦 Important:

In the folder where your package.json is located, add the following script:

```
"scripts": {
  "test": "cucumber-js test" // by default, runs the js command
}
```

## ⚙️ Optional Configuration: Feature and Step Definitions

If you need to modify Cucumber directory paths for .feature files and step definitions:

* Go to Visual Studio Code settings
* Use the search bar and type: "cucumber"
* Locate the following keys inside the settings.json (or UI panel):
* "cucumber.features" → path to your .feature files
* "cucumber.glue" → path to your step definitions
* Override the default parameters with the correct path according to your project structure.

Example:
```
"cucumber.features": ["src/test/features/**/*.feature"],
"cucumber.glue": ["src/test/steps/**/*.ts"]
```

## 🧪 Playwright + Cucumber + Gherkin Automation Setup

This guide explains how to structure and write tests using **Playwright**, **Cucumber**, and **Gherkin**. It’s based on my experience, including real errors, needs, and challenges encountered throughout the setup and development process.

## 📂 What Are "Steps" or "Phrases"?

These are natural language sentences written inside `.feature` files using Gherkin syntax. Each phrase maps to a code function that performs an action.

```gherkin
Given the user navigates to the login page  
When the user enters valid credentials  
Then the user should be redirected to the dashboard
```
These lines do nothing by themselves—they need to be linked to executable code, which is done in the Step Definitions.

## 🗂 General Structure
1. .feature File
This is where you describe scenarios using natural language.

```Feature: Login to the application

  Scenario: Successful login with valid credentials
    Given the user navigates to the login page
    When the user enters valid credentials
    Then the user should be redirected to the dashboard
```
2. Step Definitions (*.ts or *.js)
This is where you connect each phrase to executable Playwright code.

```
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('the user navigates to the login page', async function () {
  this.page = await this.browser.newPage();
  await this.page.goto('https://my-app.com/login');
});

When('the user enters valid credentials', async function () {
  await this.page.fill('#username', 'user');
  await this.page.fill('#password', 'password');
  await this.page.click('#submit');
});

Then('the user should be redirected to the dashboard', async function () {
  await expect(this.page).toHaveURL(/.*dashboard/);
});

```

3. Runner (e.g. npm run test)
Runs the .feature files by finding the phrases and executing their linked functions.

## 🧩 Why "Phrases"?
Because Cucumber connects human-readable sentences to real automated behaviors.

This is part of BDD (Behavior Driven Development), a practice that helps QA, devs, and non-technical people collaborate. The goal is to describe what the software should do in plain English (or any Gherkin-supported language).

## ✅ Benefits:
* Living documentation
* Clear communication
* Maintainable, reusable, human-readable tests

## 🔄 How Does Gherkin Link to Code?
Cucumber matches phrases exactly (or via regex). For example:

In your .feature file:
```
Given the user navigates to the login page

```

You must define a matching step:

```
Given('the user navigates to the login page', async function () {
  ...
});

```
Or use parameters:
```
Given('the user navigates to the {string} page', async function (pageName) {
  await this.page.goto(`https://my-app.com/${pageName}`);
});

```
🔹 Scenario: Test Case
Each Scenario represents a specific test. It’s made of Given, When, and Then steps.

```
Scenario: Successful login with valid credentials
  Given the user navigates to the login page
  When the user enters valid credentials
  Then the user should be redirected to the dashboard

```
* Given: initial state
* When: user action
* Then: expected result

## 🔸 Background: Common Setup
Use Background to share setup steps across multiple scenarios, avoiding repetition.

```
Feature: Login functionality

  Background:
    Given the user navigates to the login page

  Scenario: Valid login
    When the user enters valid credentials
    Then the user should be redirected to the dashboard

  Scenario: Invalid login
    When the user enters invalid credentials
    Then an error message should be displayed

```

The Background runs before every scenario in the feature file.


## 🔧 Optional: Change Feature & Step Paths
Open VS Code Settings

Search for cucumber and modify:

* cucumber.features: path to your .feature files
* cucumber.glue: path to your step definitions
* Make sure paths reflect your actual folder structure.

## ✅ Summary Flow
Write natural language scenarios in .feature files

* Implement each phrase in steps.ts files
* Run tests with npm run test
* Cucumber matches each phrase to code
* Playwright automates the browser

##  🧪 How to Use XPath in Playwright
Playwright supports XPath selectors using the xpath= prefix or the .locator() method.

## 🧭 What is XPath?
XPath (XML Path Language) is a query language used to navigate through elements and attributes in an XML or HTML document. In web automation with tools like Playwright, XPath is used to locate elements in the DOM (Document Object Model).

🔹 Basic Syntax in Playwright
```
const element = page.locator('xpath=//button[text()="Login"]');
await element.click();
```

Or alternatively:
```
const element = await page.$('//button[text()="Login"]');
await element.click();
```

Both approaches locate a button with the text "Login" and simulate a click.

## 🔍 Common XPath Examples


| XPath Expression                     | Description                                           |
|--------------------------------------|-------------------------------------------------------|
| `//button`                           | Selects all `<button>` elements                       |
| `//input[@id='username']`            | Selects an input element with ID `"username"`         |
| `//div[@class='card'][1]`            | Selects the first `<div>` with class `"card"`         |
| `//a[contains(text(), "Next")]`      | Selects a link containing the text `"Next"`           |
| `//ul/li`                            | Selects all `<li>` elements inside a `<ul>`           |



## ✅ Best Practices When Using XPath in Playwright
Prefer CSS selectors when possible (faster and easier to read).

Use XPath if:

* You need to select elements based on visible text.
* You need to navigate through complex nested structures.
* You're working with dynamic elements without reliable CSS selectors.


## 🧰 Tip: How to Test XPath in the Browser
You can test your XPath expressions directly in your browser:

```
1. Open DevTools (F12).
2. Go to the Elements tab.
3. Press Ctrl + F (or Cmd + F on Mac).
4. Paste your XPath — matching elements will be highlighted.

```
## 📘 Failed login attempt

🧩 Example
```
When('Login should fail', async function () {
  const failureMessage = page.locator("mat-error[role='alert']");
  await expect(failureMessage).toBeVisible();
  await browser.close();
});
```

🧩 Step-by-step breakdown:

```
When('Login should fail', ...):

```
This defines a Cucumber step that gets triggered when the .feature file includes the phrase When Login should fail.

```
const failureMessage = page.locator("mat-error[role='alert']");:

```
This line locates the UI element where the error message appears after a failed login. In this case, it targets a <mat-error> component with the role="alert" attribute.

```
await expect(failureMessage).toBeVisible();:

```
This line asserts that the error message is visible, meaning the app responded correctly to the invalid credentials.

```
await browser.close();:

```
Closes the browser once the test is completed.
