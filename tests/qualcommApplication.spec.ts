import {test} from '@playwright/test';
import { clear } from 'console';
import infoReq from "../data/info.json";

test('Qualcomm Application', async ({page}) => {
    // job role url
    await page.goto(infoReq.url);

    await page.click("//button[@data-test-id='apply-button']");
    //await page.click("//a[contains(text(),'Select file')]");
    // uploading resume
    await page.setInputFiles("//input[@type='file']", `C:/Users/LENOVO/Downloads/SaiNalam_QAE.pdf`)
    await page.click("//button[contains(text(),'Submit My Resume')]");
    // filling application details
    await page.fill("#first-name-input", infoReq.firstName);
    await page.fill("#last-name-input", infoReq.lastName);
    await page.click("//div[contains(text(),'Select country code')]");
    const contryCode = await page.locator("//input[@id='phone-country-code-dropdown']");
    await contryCode.fill(infoReq.countryCode);
    await contryCode.press('Enter');
    await page.fill('#phone-input', infoReq.phoneNumber);
    await page.fill('#postion-apply-input-email', infoReq.email);
    await page.click(`//*[@id="0-0-additional-questions-dropdown"]`);
    await page.click(`//*[@id="India100"]`);

    await page.fill(`//*[@id="0-2-additional-questions-text-row"]`, infoReq.address);
    await page.fill(`//*[@id="0-3-additional-questions-text-row"]`, infoReq.city);
    await page.fill(`//*[@id="0-4-additional-questions-text-row"]`, infoReq.zipCode);
    await page.click(`//*[@id="0-5-additional-questions-dropdown"]`);
    await page.click(`//*[@id="Telangana31"]/span/span/span`);

    // answering the questions
    const question1 = await page.locator(`//*[@id="previous_employee"]/span`).textContent();
    const expectedText1 = 'Have you worked for Qualcomm or any of its subsidiaries in the past as an intern, temp, consultant, employee?';
    if(question1 === expectedText1){
        await page.click(`//*[@id="1-0-additional-questions-dropdown"]`);
        await page.click(`//*[@id="No1"]/span/span/span`);
    }
    await page.locator(`//i[@aria-label='${infoReq.gender}']`).click();

    const question2 = await page.locator(`//*[@id="QUESTION_SETUP-6-88"]/span`).textContent();
    const expectedText2 = 'Position Location';
    if(question2 === expectedText2){
        await page.click(`//*[@id="3-0-additional-questions-dropdown"]`);
        await page.click(`//*[@id="I am applying for a position outside the United States only.1"]/span/span/span`);
    }

    const question3 = await page.locator(`//*[@id="QUESTION_SETUP-6-89"]/span`).textContent();
    const expectedText3 = 'Can you, upon employment, submit verification of your legal right to work in the countries to which you have applied?';
    if(question3 === expectedText3){
        await page.click(`//*[@id="3-1-additional-questions-dropdown"]`);
        await page.click(`//*[@id="Yes0"]/span/span/span`);
    }

    const question4 = await page.locator(`//*[@id="QUESTION_SETUP-6-4184"]/span`).textContent();
    const expectedText4 = 'Do you have a close relative or relatives that is/are employed by Qualcomm? (For purposes of this question, “close relative” means spouse or significant other, parent, step-parent, child, step-child, sibling, step-sibling, grandparent, step-grandparent, aunt, uncle, niece, nephew, parent-in-law, grandparent in-law, aunt or uncle in-law, sister or brother in-law, or niece or nephew in-law.)';
    if(question4 === expectedText4){
        await page.click(`//*[@id="3-2-additional-questions-dropdown"]`);
        await page.click(`//*[@id="No1"]/span/span/span`);
    }

    const question5 = await page.locator(`//*[@id="QUESTION_SETUP-6-87bede5ca8c0100d8676df457eb90000"]/span`).textContent();
    const expectedText5 = 'Do you have an extended relative or relatives that is/are employed by Qualcomm? (For purposes of this question, “extended relative” is any relative by blood or marriage that is not a close relative as defined in the above question)';
    if(question5 === expectedText5){
        await page.click(`//*[@id="3-3-additional-questions-dropdown"]`);
        await page.click(`//*[@id="No1"]/span/span/span`);
    }
    // checking condition checkbox
    await page.click(`//*[@id="apply-form-main-content"]/div[9]/div[7]/fieldset/div/fieldset/div/div/div/div[1]/span[1]/i`);
    await page.click(`//*[@id="apply-form-main-content"]/div[10]/div/button[2]`); // submit application
    // printing the success message
    const text = await page.locator(`//*[@id="EFSmartApplyContainer"]/div/div[1]/div/div[1]/p`).textContent();
    console.log(text);

    page.close();
});




