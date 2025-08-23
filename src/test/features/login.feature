Feature: User Authentication tests

  Background:
    Given User navigates to the application
    And User click on the login link

  Scenario: Login should be success
    And User enter the username as "andy"
    And User enter the password as "123456"
    When User click on the login button
    Then Login should be success

  Scenario: Login should not be success
    Given User enter the username as "string"
    Given User enter the password as "string"
    When User click on the login button
    But Login should fail