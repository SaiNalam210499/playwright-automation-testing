import { test, expect } from '@playwright/test';
import infoReq from "../data/info.json";

test('Automated Qualcomm Job Application Workflow with Validations', async ({ page }) => {
  // Navigate to job application URL
  await page.goto(infoReq.url);
  await expect(page).toHaveURL(infoReq.url);

  // Validate Apply button visible & click
  const applyButton = page.locator("//button[@data-test-id='apply-button']");
  await expect(applyButton).toBeVisible();
  await applyButton.click();

  // Validate Resume upload input visible
  const resumeInput = page.locator("//input[@type='file']");
  await expect(resumeInput).toBeVisible();
  await resumeInput.setInputFiles(infoReq.filePath);

  // Validate Submit Resume button and click
  const submitResumeButton = page.locator("//button[contains(text(),'Submit My Resume')]");
  await expect(submitResumeButton).toBeEnabled();
  await submitResumeButton.click();

  // Validate First & Last name fields and fill
  await page.fill("#first-name-input", infoReq.firstName);
  await expect(page.locator("#first-name-input")).toHaveValue(infoReq.firstName);

  await page.fill("#last-name-input", infoReq.lastName);
  await expect(page.locator("#last-name-input")).toHaveValue(infoReq.lastName);

  // Select Country Code
  await page.click("//div[contains(text(),'Select country code')]");
  const countryCodeInput = page.locator("#phone-country-code-dropdown");
  await countryCodeInput.fill(infoReq.countryCode);
  await countryCodeInput.press('Enter');
  await expect(countryCodeInput).toHaveValue(infoReq.countryCode);

  // Contact Details validations
  await page.fill('#phone-input', infoReq.phoneNumber);
  await expect(page.locator('#phone-input')).toHaveValue(infoReq.phoneNumber);

  await page.fill('#postion-apply-input-email', infoReq.email);
  await expect(page.locator('#postion-apply-input-email')).toHaveValue(infoReq.email);

  // Location & Address selections
  await page.click('//*[@id="0-0-additional-questions-dropdown"]');
  await page.click('//*[@id="India100"]');

  await page.fill('//*[@id="0-2-additional-questions-text-row"]', infoReq.address);
  await expect(page.locator('//*[@id="0-2-additional-questions-text-row"]')).toHaveValue(infoReq.address);

  await page.fill('//*[@id="0-3-additional-questions-text-row"]', infoReq.city);
  await expect(page.locator('//*[@id="0-3-additional-questions-text-row"]')).toHaveValue(infoReq.city);

  await page.fill('//*[@id="0-4-additional-questions-text-row"]', infoReq.zipCode);
  await expect(page.locator('//*[@id="0-4-additional-questions-text-row"]')).toHaveValue(infoReq.zipCode);

  await page.click('//*[@id="0-5-additional-questions-dropdown"]');
  await page.click('//*[@id="Telangana31"]/span/span/span');

  // Application Questions — dynamically validate and answer
  const questions = [
    {
      locator: '//*[@id="previous_employee"]/span',
      expectedText: 'Have you worked for Qualcomm or any of its subsidiaries in the past as an intern, temp, consultant, employee?',
      responseDropdown: '//*[@id="1-0-additional-questions-dropdown"]',
      responseOption: '//*[@id="No1"]/span/span/span'
    },
    {
      locator: '//*[@id="QUESTION_SETUP-6-88"]/span',
      expectedText: 'Position Location',
      responseDropdown: '//*[@id="3-0-additional-questions-dropdown"]',
      responseOption: '//*[@id="I am applying for a position outside the United States only.1"]/span/span/span'
    },
    {
      locator: '//*[@id="QUESTION_SETUP-6-89"]/span',
      expectedText: 'Can you, upon employment, submit verification of your legal right to work in the countries to which you have applied?',
      responseDropdown: '//*[@id="3-1-additional-questions-dropdown"]',
      responseOption: '//*[@id="Yes0"]/span/span/span'
    },
    {
      locator: '//*[@id="QUESTION_SETUP-6-4184"]/span',
      expectedText: 'Do you have a close relative or relatives that is/are employed by Qualcomm?',
      responseDropdown: '//*[@id="3-2-additional-questions-dropdown"]',
      responseOption: '//*[@id="No1"]/span/span/span'
    },
   {
      locator: '//*[@id="QUESTION_SETUP-6-87bede5ca8c0100d8676df457eb90000"]/span',
      expectedText: 'Do you have an extended relative or relatives that is/are employed by Qualcomm?',
      responseDropdown: '//*[@id="3-3-additional-questions-dropdown"]',
      responseOption: '//*[@id="No1"]/span/span/span'
    }
  ];

  for (const q of questions) {
    await expect(page.locator(q.locator)).toBeVisible();
    const actualText = await page.locator(q.locator).textContent();
    expect(actualText?.trim()).toBe(q.expectedText);
    await page.click(q.responseDropdown);
    await page.click(q.responseOption);
  }

  // Select Gender
  await expect(page.locator(`//i[@aria-label='${infoReq.gender}']`)).toBeVisible();
  await page.locator(`//i[@aria-label='${infoReq.gender}']`).click();

  // Agree to terms checkbox
  await expect(page.locator('//*[@id="apply-form-main-content"]/div[9]/div[7]/fieldset/div/fieldset/div/div/div/div[1]/span[1]/i')).toBeVisible();
  await page.click('//*[@id="apply-form-main-content"]/div[9]/div[7]/fieldset/div/fieldset/div/div/div/div[1]/span[1]/i');

  // Submit Application
  const submitButton = page.locator('//*[@id="apply-form-main-content"]/div[10]/div/button[2]');
  await expect(submitButton).toBeEnabled();
  await submitButton.click();

  // Validate Confirmation Message
  const confirmationMessage = await page.locator('//*[@id="EFSmartApplyContainer"]/div/div[1]/div/div[1]/p').textContent();
  expect(confirmationMessage).toContain('Thank you'); // or whatever your expected message contains
  console.log(`✅ Application Status: ${confirmationMessage}`);

  // Close page
  await page.close();
});