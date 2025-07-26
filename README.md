# 🎭 Playwright-ts-cucumber Setup Guide

This guide is based on my personal experience, including common errors, configuration issues, and needs that appeared during the project.

---

🛠️ **Steps to Set Up**

* Create a new Project

* Install Playwright Test and Cucumber (Gherkin) plugin in the Visual Studio Code extensions marketplace

* Open the terminal and run the following command to install Playwright:
  
  > Test: Install Playwright

* Install dependencies:

```bash
$ npm i @cucumber/cucumber -D
$ npm i ts-node -D

📦 Important:

In the folder where your package.json is located, add the following script:

"scripts": {
  "test": "cucumber-js test" // by default, runs the js command
}

⚙️ Optional Configuration: Feature and Step Definitions

If you need to modify Cucumber directory paths for .feature files and step definitions:

Go to Visual Studio Code settings

Use the search bar and type: "cucumber"

Locate the following keys inside the settings.json (or UI panel):

"cucumber.features" → path to your .feature files

"cucumber.glue" → path to your step definitions

Override the default parameters with the correct path according to your project structure.

Example:

"cucumber.features": ["src/test/features/**/*.feature"],
"cucumber.glue": ["src/test/steps/**/*.ts"]


