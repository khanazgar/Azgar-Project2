 
const {Given, When, Then, Before, After, setDefaultTimeout}= require('@cucumber/cucumber');
const {chromium, expect} = require('@playwright/test');
const Page = require("playwright");
const { loginPage } = require('../../pages/loginPage');
const { AdminPage } = require('../../pages/adminPage');
const { TimePage } = require('../../pages/timePage');
const loginData = require('../../testdata/login-data.json');



setDefaultTimeout(50000);

let page, browser, login, adminPage, timePage;
let currentTestCase; // To store current test case data


Before(async function(){
    browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    page = await context.newPage();
    login = new loginPage(page);
    adminPage = new AdminPage(page);
    timePage = new TimePage(page);
    console.log("Before Hooks Executed");
});

Given('User is able to access orangeHMR', async function () {
    await login.getNavigateToOrangeHMR();
});

Given('User enters credentials from JSON test case {string}', async function (testCaseName) {
    // Find the test case in JSON data
    const testCase = loginData.loginTestCases.find(tc => tc.testCase === testCaseName);
    
    if (!testCase) {
        throw new Error(`Test case '${testCaseName}' not found in JSON data`);
    }
    
    // Store current test case for use in verification step
    currentTestCase = testCase;
    
    // Enter credentials
    await login.enterUsername(testCase.username);
    await login.enterPassword(testCase.password);
});

When('User click on the login button', async function () {
    await login.clickLogin();
});

Then('Login should be verified based on expected result', async function () {
    if (!currentTestCase) {
        throw new Error('No test case data available for verification');
    }
    
    await login.verifyLoginResult(currentTestCase.expectedResult);
});


   When('User clicks on the logout button', async function () {
              await login.clickLogout();
        
           
         });
    Then('User should be redirected to the login page', async function () {
         await login.isLoginButtonVisible();
          
         });


          When('User navigates to the Admin page', async function () {
              await adminPage.navigateToAdminPage();
          });

          Given('User adds a new admin with details', async function () {
              await adminPage.clickAddButton();
              await adminPage.enterAddUserDetails(
                  'Admin',
                  'Azgar khan  Abdul',
                  'Enabled',
                  'Azgarkhan123',
                  'password123',
                  'password123'
              );
              await adminPage.clickSaveButton();
          });

          Then('The new user should be created successfully', async function () {
              console.log("Verifying user creation");
          });

         Given('User searches for an existing user with username {string}', async function (username) {
              await adminPage.searchUser(username);
              await adminPage.clickSearchButton();
          });

        Then('The user details should be displayed correctly', async function () {
            await adminPage.verifyUserDetails();
        });

        Given('User updates the user details', async function () {
            await adminPage.clickSaveButton();
        });
        Then('The updated user details should be displayed correctly.', async function () {
            await adminPage.verifyUpdatedUserDetails();
        }); 

    Given('User deletes the user', async function () {
        await adminPage.deleteUser();
    });

    Then('The user should no longer appear in the user list', async function () {
         await adminPage.searchUser(username);
              await adminPage.clickSearchButton();
        console.log("Verifying user deletion");
    });

When('User navigates to the Time page', async function () {
    await timePage.navigateToTimePage();
});

Given('User selects a week and enters time details', async function () {
    await timePage.enterTimeDetails("Azgarkhan  Abdul");
    await timePage.selectWeek('Week 1');
  
});

Given('User update the existing time details', async function () {
    await timePage.updateTimeDetails("Azgarkhan  Abdul");
});

Then('Submited time details should be displayed correctly', async function () {
    await timePage.clickSubmitButton();
    await timePage.verifySuccessMessage();
});









        After(async function(){ 
    await browser.close();
    console.log("After Hooks Executed");
});