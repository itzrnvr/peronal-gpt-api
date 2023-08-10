const puppeteer = require("puppeteer");

const generateUser = async (gotChatHeaders) => {
  const browser = await puppeteer.launch({
    //  executablePath: '/usr/bin/chromium-browser',
    //  args: ['--no-sandbox', '--disable-setuid-sandbox'],
    // ... other options
});

  const page = await browser.newPage();

  // Intercept network requests.

  await page.setRequestInterception(true);

  page.on("request", async (req) => {
    // Modify the headers

    const headers = Object.assign({}, req.headers(), {
      // 'new-header': 'new header value'
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      "sec-ch-ua": `Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114`,
      "Sec-Ch-Ua-Platform": "macOS",
    });

    if (
      req.url().endsWith(".woff2") ||
      req.url().endsWith(".jpg") ||
      req.url().endsWith(".css") ||
      req.url() == "https://edge.fullstory.com/s/fs.js" ||
      req.url() ==
        "https://cdn.segment.com/next-integrations/actions/actions-plugin/6e09382dbc5c9f46c410.js" ||
      req.url() ==
        "https://cdn.segment.com/next-integrations/actions/amplitude-plugins/28329fafaddd9058cb0e.js" ||
      req.url() == "https://api.segment.io/v1/i" ||
      req.url() ==
        "https://cdn.segment.com/v1/projects/WyHWbjeVuDV0bHOHeOV5rGgJbyquvCQ9/settings" ||
      req.url() == "https://talktomerlin.com/api/chat" ||
      req.url() ==
        "https://cdn.segment.com/next-integrations/actions/fullstory/2281e900d2aee598859b.js"
    ) {
      if (req.url() == "https://talktomerlin.com/api/chat") {
        console.log("URL:", req.url());

        console.log("REQ_HEADERS:", req.headers());
        console.log("REQ_BODY", req.postData())
        gotChatHeaders(req.headers(), JSON.parse(req.postData()));
        await browser.close();
      }
      // Abort request and return an empty response

      req.abort();
    } else {
      // Continue request with new headers
      console.log("URL:", req.url());

      req.continue({
        headers,
      });
    }
  });

  page.on("response", async (response) => {
    const req = response.request();
  });

  await page.goto("https://talktomerlin.com/s/reading");

  // await browser.close();
};

module.exports = generateUser

