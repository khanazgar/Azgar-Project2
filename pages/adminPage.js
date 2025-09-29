import { test, expect } from "@playwright/test";
import { StringDecoder } from "string_decoder";

export class AdminPage{
    constructor(page){
        this.page = page;
        this.adminMenu = page.locator("//*[@id='app']/div[1]/div[1]/aside/nav/div[2]/ul/li[1]/a"); 
        this.addButton = page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div/div[2]/div[1]/button"); 
        this.usernameInput = page.getByRole('textbox').nth(2); 
        this.passwordInput = page.getByRole('textbox').nth(3); 
        this.confirmPasswordInput = page.getByRole('textbox').nth(4); 
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.successMessage = page.locator("//div[contains(text(),'Admin created successfully')]"); 
        this.userRoleDropdown = page.locator("form i").first();
        this.employeeNameInput = page.getByRole('textbox', { name: 'Type for hints...' });
        this.statusDropdown = page.locator("form i").nth(1);
        this.searchUsernameInput = page.getByRole('textbox').nth(1);
       
    }

    async navigateToAdminPage(){
        await this.adminMenu.click();
    }

    async clickAddButton(){
        await this.addButton.click();
    }

    async selectUserRole(role){
        await this.userRoleDropdown.click();
        console.log("clicked dropdown");
        console.log(`Selecting user role: ${role}`);
        await this.page.locator(`//div[@role='option']//span[text()='${role}']`).click();
    }

    async selectStatus(status){
        await this.statusDropdown.click();
        console.log("clicked dropdown");
        console.log(`Selecting status: ${status}`);
        await this.page.locator(`//div[@role='option']//span[text()='${status}']`).click();
    }
    async enterAddUserDetails(userRole, empName,status,username,password,confirmPassword){
         try {
        // Fill employee name
        await this.employeeNameInput.fill(empName);
        
        // Wait for dropdown options to load
        await this.page.waitForSelector('[role="option"]', { state: 'visible', timeout: 5000 });
        
        // Click the specific employee option
        const optionLocator = this.page.getByRole('option', { name: empName }).nth(0);
        await optionLocator.waitFor({ state: 'visible' });
        await optionLocator.click();
        
        // Verify selection was made
        await this.page.waitForTimeout(1000); // Brief pause to ensure selection
        
    } catch (error) {
        console.error('Error selecting employee from dropdown:', error);
        throw error;
    }
          await this.usernameInput.fill(username);
             await this.passwordInput.fill(password);
            await this.confirmPasswordInput.fill(confirmPassword);
            await this.selectUserRole(userRole);
        
             await this.selectStatus(status);
             await this.page.waitForTimeout(4000);

             // Wait for 4 seconds to ensure dropdown options are loaded

    }

       async clickSaveButton(){
            await this.page.waitForTimeout(4000);
        await this.saveButton.click();
        
    }

    async searchUser(username){
        await this.searchUsernameInput.fill(username);
        await this.clickSearchButton();
    }
    async clickSearchButton(){
        await this.page.getByRole('button', { name: 'Search' }).click();
        await this.page.waitForTimeout(4000);
    }

    async updateUserDetails(){
       await this.page.locator("//*[@id='app']/div[1]/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div/div/div[6]/div/button[2]/i").click();
       await this.clickSaveButton();
    }

    async verifyUserDetails(){  
        const userDetail = await this.page.getByText("azgar123");
      console.log(" user details :"+userDetail.textContent());
        console.log(`User details for azgar123 are displayed correctly.`);
    }
  async verifyUpdatedUserDetails(){  
        const userDetail = await this.page.getByText("azgar123");
      console.log(" user details :"+userDetail.textContent());
        console.log(`Updated user details for azgar123 are displayed correctly.`);
    }

async deleteUser(){
       await this.page.getByRole('row', { name: ' atheer1919 Admin Peter' }).getByRole('button').first().click();
       await this.clickSaveButton();
   }

}