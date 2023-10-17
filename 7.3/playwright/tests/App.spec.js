const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const {
  email,
  password,
  incorrectEmail,
  incorrectPassword,
} = require("../user");

  // test("test", async ({ page }) => {
  //   // Go to https://netology.ru/free/management#/
  //   await page.goto("https://netology.ru/free/management#/");

  //   // Click a
  //   await page.click("a");
  //   await expect(page).toHaveURL("https://netology.ru/");

  //   // Click text=Учиться бесплатно
  //   await page.click("text=Учиться бесплатно");
  //   await expect(page).toHaveURL("https://netology.ru/free");

  //   page.click("text=Бизнес и управление");

  //   // Click text=Как перенести своё дело в онлайн
  //   await page.click("text=Как перенести своё дело в онлайн");
  //   await expect(page).toHaveURL(
  //     "https://netology.ru/programs/kak-perenesti-svoyo-delo-v-onlajn-bp"
  //   );
  // });

  test("Failed authorization", async ({ page }) => {
    await page.goto("https://netology.ru/?modal=sign_in");
    await page.fill('[placeholder="Email"]', incorrectEmail);
    await page.fill('[placeholder="Пароль"]', incorrectPassword);
    await page.click('[data-testid="login-submit-btn"]');
    const error = page.locator('[data-testid="login-error-hint"]');
    await expect(error).toHaveText("Вы ввели неправильно логин или пароль");
  }, 60000);

  test("Successful authorization", async ({ page }) => {
    await page.goto("https://netology.ru/?modal=sign_in");
    await page.fill('[placeholder="Email"]', email);
    await page.fill('[placeholder="Пароль"]', password);
    await page.click('[data-testid="login-submit-btn"]');
    await expect(page).toHaveURL("https://netology.ru/profile");
    await expect(page.locator("h2")).toContainText(["Моё обучение"]);
  }, 60000);