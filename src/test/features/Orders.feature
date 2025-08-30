@requiresLogin

Feature: Modify order

Scenario: Add Movement to box
Given User navigates to menu
Given User navigates to box
And the user adds a movement
Then the movement should be updated

    # Examples: 
    #   | username | password  | book |
    #   | andy   | 123456 | Roomies  |