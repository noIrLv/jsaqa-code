const { clickElement } = require("./commands.js");

module.exports = {
  selectDateTime: async function (page, day, time) {
    await clickElement(page, day);
    await clickElement(page, time);
  },

  orderTickets: async function (page, row, ...seats) {
    await page.waitForSelector(".buying-scheme__legend");
    try {
      for (let i = 0; i < seats.length; i++) {
        await clickElement(
          page,
          `div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${seats[i]})`
        );
        await page.waitForSelector(
          `div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${seats[i]}).buying-scheme__chair_selected`
        );
      }
    } catch (error) { throw new Error('Seat(s) reserved'); }
     
    await clickElement(page, '.acceptin-button');
    await page.waitForSelector('.ticket__check-title');
    await clickElement(page, '.acceptin-button');
  },

  isSeatReserved: async function (page, row, ...seats) {
    await page.waitForSelector(".buying-scheme__wrapper");
    try {
      for (let i = 0; i < seats.length; i++) {
        await page.waitForSelector(
          `div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${seats[i]}).buying-scheme__chair_taken`
        );
      }
    } catch (error) {
      throw new Error("Seat(s) not reserved");
    }
  }
};