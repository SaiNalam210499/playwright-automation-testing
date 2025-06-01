import {test} from '@playwright/test';
import infoReq from "../data/info.json"

test("Deloitte Open Roles", async({page})=>{

    await page.goto(infoReq.url);
    const search = await page.locator(`//*[@id="10566"]`);
    await search.fill(infoReq.role);
    await search.press('Enter');

    // const roles = await page.locator(`//a[contains(text(),'Quality')]`).allTextContents();
    // console.log(roles);

  await page.waitForSelector('.jobTitle'); 

  // Get all job titles
  const jobTitles = await page.$$eval('.jobTitle', elements =>
    elements.map(el => el.textContent?.trim())
  );

  // Print them in the console
  console.log('Job Listings:', jobTitles);

});