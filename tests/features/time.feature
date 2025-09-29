Feature: Verify time sheet functionality
 
 Background:
    Given User is able to access orangeHMR
    And User enters credentials from JSON test case "Valid credentials"
    When User click on the login button
    Then Login should be verified based on expected result

   
@time
 Scenario: Verify timesheet can be submitted for a week
    When User navigates to the Time page
    And User selects a week and enters time details
    And User update the existing time details
    Then Submited time details should be displayed correctly