module.exports = {
  'Home screen loads' : function (browser) {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible('body', 5000)
      .pause(1000)
      .assert.containsText('h2', 'Select a category that corresponds with your legal issue:')
      .end();
  }
};
