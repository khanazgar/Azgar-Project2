Feature: Login test of orangeHMR using JSON data

  @login
  Scenario Outline: Login validation with JSON test data
    Given User is able to access orangeHMR
    And User enters credentials from JSON test case "<testCase>"
    When User click on the login button
    Then Login should be verified based on expected result

        Examples:
      | testCase               |
      | Valid credentials      |
      | Invalid username       |
      | Empty username         |
      | Empty password         |
      | Invalid password       |
      | Both fields empty      |


 
@logout
 Scenario Outline: Ensure user can successfully log out and is redirected to the login page
    Given User is able to access orangeHMR
    And User enters credentials from JSON test case "<testCase>"
    When User click on the login button
    Then Login should be verified based on expected result
    When User clicks on the logout button
    Then User should be redirected to the login page

        Examples:
      | testCase               |
      | Valid credentials      |

