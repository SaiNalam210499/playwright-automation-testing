# 📄 Automated Qualcomm Job Application Portal Testing

This project is an end-to-end automation script built using **Playwright**, **TypeScript**, and **Node.js** to simulate job application workflows on the **Qualcomm careers portal**.

---

## 🚀 Project Overview

The primary objective of this project is to automate the process of:
- Navigating to the Qualcomm careers page
- Selecting a job listing
- Filling out the application form
- Submitting the application
- Validating UI components, input validations, and application status messages

This automation improves efficiency by simulating multiple user profiles and validating consistent application behavior.

---

## 🛠️ Tech Stack

- **Playwright** for UI automation
- **TypeScript** for scripting
- **Node.js** as the runtime environment
- **Playwright Test Runner** for test orchestration and reporting
- **JSON Data Files** for data-driven testing

---

## 📂 Project Structure

├── tests/
│ ├── jobApplication.spec.ts
│
├── data/
│ ├── userProfiles.json
│
├── reports/
│ └── html-report/
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md


---

## 📈 Features

✅ Automates end-to-end job application workflow  
✅ Validates UI components and form validations  
✅ Data-driven testing with dynamic user profiles  
✅ Generates HTML test reports post-execution  

---

## 📦 How to Run

1️⃣ Clone the repository  
```bash
git clone https://github.com/yourusername/qualcomm-job-application-automation.git
cd qualcomm-job-application-automation

# Install dependencies
npm install

#Run the tests
npx playwright test

#View the HTML report
Navigate to the reports/html-report folder and open index.html

