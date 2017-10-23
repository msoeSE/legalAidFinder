module.exports = {
  'Demo test Google' : function (browser) {
    browser
      .url('http://www.google.com')
      .waitForElementVisible('body', 5000)
      .setValue('input[type=text]', 'nightwatch')
      .waitForElementVisible('input[name=btnK]', 5000)
      .click('input[name=btnK]')
      .pause(1000)
      .assert.containsText('#main', '')
      .end();
  }
};
