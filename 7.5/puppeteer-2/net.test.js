const { getText } = require("./lib/commands.js");
const { selectDateTime, orderTickets } = require("./lib/util.js");

let page;
let movieTime = "[data-seance-id='156']";      
let ticketHint = "p.ticket__hint";
let confirmingText = "Покажите QR-код нашему контроллеру для подтверждения бронирования.";

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

// happy path 1
test("Order 2 tickets for Movie tomorrow", async () => {
  await selectDateTime(page, "nav.page-nav > a:nth-child(2)", movieTime);
  await orderTickets(page, 9, 4, 5);
  actual = await getText(page, ticketHint);
  expect(actual).toContain(confirmingText);
}, 50000);

// happy path 2
test("Order 1 ticket for Movie week later", async () => {
  await selectDateTime(page, "nav.page-nav > a:nth-child(7)", movieTime);
  await orderTickets(page, 9, 1);
  const actual = await getText(page, ticketHint);
  expect(actual).toContain(confirmingText);
}, 50000);

// sad path
test("Try to order ticket for Movie on reserved seat", async () => {
  await expect(async () => {
    await selectDateTime(page, "nav.page-nav > a:nth-child(2)", movieTime);
    await orderTickets(page, 9, 4);
  }).rejects.toThrowError("Seat(s) reserved");
}); 
