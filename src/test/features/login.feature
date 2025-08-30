Feature: User Login

  Background:
    Given User navigates to the application
    And User clicks on the login link

  Scenario: Login attempt with different credentials
    Given User enters username "<username>" and password "<password>"
    When User clicks on the login button
    Then Login should <result>

    Examples:
      | username     | password       | result   |

      | Brenda   | 123456    | succeed  |
      | Brenda  | 12     | fail     |
      | emptyUser    | emptyPass      | fail     |