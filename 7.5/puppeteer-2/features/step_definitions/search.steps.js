const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { getText } = require("../../lib/commands.js");

const {
  isSeatReserved,
  selectDateTime,
  orderTickets,
} = require("../../lib/util.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on page", async function () {
  return await this.page.goto(`http://qamid.tmweb.ru/client/index.php`, {
    setTimeout: 90000000,
  });
});

When("user choose {int}-th day and movie", async function (int1) {
  //выбор дня по дате и сеанса
  return await selectDateTime(
    this.page,
    `nav.page-nav > a:nth-child(${int1})`,
    "[data-seance-id='156']"
  );
});

When(
  "select {int} row and {int},{int} seats",
  async function (int1, int2, int3) {
    //выбор ряда и нескольких мест
    return await orderTickets(this.page, int1, int2, int3);
  }
);

When(
  "trying to select reserved {int} row and {int} seat",
  async function (int1, int2) {
    //проверка занято ли место 
    await isSeatReserved(this.page, int1, int2);
  }
);

When(
  "select {int} row and {int} seat",
  async function (int1, int2) {
    //выбор ряда и 1 места
    return await orderTickets(this.page, int1, int2);
  }
);

Then("ticket purchase is confirmed", async function () {
  //подтверждение бронирования
  const actual = await getText(this.page, "p.ticket__hint");
  expect(actual).contains(
    "Покажите QR-код нашему контроллеру для подтверждения бронирования."
  );
});

Then("booking is not possible", async function () {
  //проверка что кнопка не активна
  const buttonStatus = await this.page.$eval(
    `.acceptin-button`,
    (el) => el.disabled
  );
  expect(buttonStatus).equal(true);
});