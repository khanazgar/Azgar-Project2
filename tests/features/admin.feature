Feature: Verify Admin functionality
 
 Background:
    Given User is able to access orangeHMR
    And User enters credentials from JSON test case "Valid credentials"
    When User click on the login button
    Then Login should be verified based on expected result

   
@admin
 Scenario: Create a new admin user
    When User navigates to the Admin page
    And User adds a new admin with details
    Then The new user should be created successfully
   
@admin
Scenario: Search for an existing user
    When User navigates to the Admin page
    And User searches for an existing user with username "azgar123"
    Then The user details should be displayed correctly
@admin
Scenario: Validate that existing user details can be updated.
    When User navigates to the Admin page
    And User searches for an existing user with username "azgar123"
    And User updates the user details
    Then The updated user details should be displayed correctly.
   @admin
   Scenario: Confirm that a user can be deleted and no longer appears in the list.
      When User navigates to the Admin page
      And User searches for an existing user with username "azgar123"
      And User deletes the user
      Then The user should no longer appear in the user list