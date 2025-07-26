# Playwright-ts-cucumber

🧪 Playwright + Cucumber Setup Guide
This guide explains how to configure a project using Playwright and Cucumber in Visual Studio Code. It is based on my own experience, including the errors, issues, and needs that came up throughout the project.

🚀 Steps to Set Up
1. Create a New Project
Start by creating a new Node.js project or use an existing one.

2. Install Required Extensions
In Visual Studio Code, install the following extensions:

Playwright Test for VS Code

Cucumber (Gherkin) Full Support

3. Install Playwright
Open the terminal in your project folder and run:

Test: Install Playwright
This will set up Playwright with its dependencies.

4. Install NPM Dependencies
Run the following commands in your terminal to install Cucumber and ts-node:

npm install @cucumber/cucumber --save-dev
npm install ts-node --save-dev

5. Update package.json Script
In your package.json, add a test script like this:
"scripts": {
  "test": "cucumber-js test"
}
This command tells Node to run tests using the cucumber-js CLI in the test folder.

6. Configure Feature and Step Paths (Optional)
If you're using custom directories for your .feature files or step definitions:

1. Go to VS Code Settings.
2. Search for Cucumber.
3. Locate the following settings:
4. cucumber.features – path to your .feature files
5. cucumber.glue – path to your step definitions
6. Set the correct paths for your project structure.

