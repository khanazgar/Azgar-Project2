import { test, expect } from "@playwright/test";
import { StringDecoder } from "string_decoder";

export class loginPage{
    
    constructor(page){
        this.page = page;
        this.username = page.locator("//input[@name='username']")
        this.password = page.locator("//input[@name='password']")
        this.loginButton = page.locator("//*[@id='app']/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button")
        this.dashboard = page.locator("//h6[text()='Dashboard']")
        this.errorMessage = page.locator("//p[text()='Invalid credentials']")
        this.requiredFieldError = page.locator("//span[contains(text(),'Required')]")
    }

    async getNavigateToOrangeHMR(){
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        await this.page.waitForLoadState('networkidle');
    }

    async enterUsername(username){
        await this.username.clear();
        if (username !== '') {
            await this.username.fill(username);
        }
        // If username is empty, field remains empty
    }

    async enterPassword(password){
        await this.password.clear();
        if (password !== '') {
            await this.password.fill(password);
        }
        // If password is empty, field remains empty
    }

    async clickLogin(){
        await this.loginButton.click();
        await this.page.waitForTimeout(2000); // Wait for login process
    }

     async clickLogout(){
          await this.page.locator(".oxd-userdropdown-name").click();
           await this.page.waitForTimeout(1000);
           await this.page.locator("//a[contains(text(),'Logout')]").click();
    }

    async isLoginButtonVisible(){
        return await this.loginButton.isVisible();
    }
    async verifyLoginResult(expectedResult){
        if (expectedResult === 'success') {
            await this.verifySuccessfulLogin();
        } else {
            await this.verifyFailedLogin();
        }
    }

    async verifySuccessfulLogin(){
        await expect(this.dashboard).toBeVisible({ timeout: 10000 });
    }

    async verifyFailedLogin(){
        // Check for different error scenarios
        const invalidCredsVisible = await this.errorMessage.isVisible().catch(() => false);
        const requiredErrorVisible = await this.requiredFieldError.first().isVisible().catch(() => false);
        
        if (invalidCredsVisible) {
            await expect(this.errorMessage).toBeVisible();
        } else if (requiredErrorVisible) {
            await expect(this.requiredFieldError.first()).toBeVisible();
        } else {
            // If no specific error message, verify we're not on dashboard
            const onDashboard = await this.dashboard.isVisible().catch(() => false);
            if (onDashboard) {
                throw new Error('Login should have failed but user reached dashboard');
            }
            // If still on login page, consider it a failed login attempt
            await expect(this.loginButton).toBeVisible();
        }
    }

      




}