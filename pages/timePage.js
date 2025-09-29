import { test, expect } from "@playwright/test";
import { StringDecoder } from "string_decoder";

export class TimePage{
    constructor(page){
        this.page = page;
        this.timeMenu = page.getByRole('link', { name: 'Time' });
        this.weekDropdown = page.locator("form i").first();
        this.timeDetailsInput = page.getByRole('textbox', { name: 'Type for hints...' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.successMessage = page.locator("//div[contains(text(),'Timesheet submitted successfully')]");
        this.viewButton = page.locator('form').getByRole('button', { name: 'View' });
          this.searchUsernameInput = page.getByRole('textbox').nth(1);
    }

    async navigateToTimePage(){
        await this.timeMenu.click();
    }

    async selectWeek(week){
        await this.weekDropdown.click();
        console.log("clicked dropdown");
        console.log(`Selecting week: ${week}`);
        await this.page.locator(`//div[@role='option']//span[text()='${week}']`).click();
    }

    async enterTimeDetails(details){
        await this.timeDetailsInput.fill(details);
        await this.searchUsernameInput.click();
        await this.viewButton.click();
    }
    async updateTimeDetails(details){
        await this.timeDetailsInput.fill(details + " - Updated");
        await this.searchUsernameInput.click();
        await this.viewButton.click();
    }

    async clickSubmitButton(){
        await this.submitButton.click();
    }

    async verifySuccessMessage(){
        await expect(this.successMessage).toBeVisible();
    }
}