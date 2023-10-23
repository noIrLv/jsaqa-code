let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {

  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual("GitHub for teams · Build like the best teams on the planet · GitHub");
  }, 7000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 7000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 7000);
});

describe("Github page tests - second task", () => {

  beforeEach(async () => {
    await page.goto("https://github.com/about");
  });

  test("The h1 header content (Docs)", async () => {
    const firstLink = await page.$("footer div div div+div+div ul li a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title = await page.title();
    expect(title).toEqual("GitHub Docs");
  }, 11000);

  test("The h1 header content (Partner Portal)", async () => {
    const firstLink = await page.$("footer div div div+div+div ul li+li a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title = await page.title();
    expect(title).toEqual("Partner with GitHub | GitHub Partner Portal");
  }, 11000);

  test("The h1 header content (Electron)", async () => {
    const firstLink = await page.$("footer div div div+div+div ul li+li+li a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title = await page.title();
    expect(title).toEqual("Build cross-platform desktop apps with JavaScript, HTML, and CSS | Electron");
  }, 11000);
});
