@requiresLogin

Feature: Add movements

  Scenario: Add a movement for Brenda
    Given User navigates to "Caja"
    When the user adds a movement with entity "Personal de cadeteria", person "Brenda" and amount "300"
    Then the movement should be updated

  Scenario: Add a movement for Ale
    Given User navigates to "Caja"
    When the user adds a movement with entity "Personal de cadeteria", person "Ale" and amount "200"
    Then the movement should be updated
