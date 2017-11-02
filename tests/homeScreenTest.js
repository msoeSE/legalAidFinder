module.exports = {
  'Home screen loads' : function (browser) {
    browser
      .url('http://ec2-54-187-102-77.us-west-2.compute.amazonaws.com/')
      .waitForElementVisible('body', 5000)
      .pause(1000)
      .assert.containsText('h2', 'Select a category that corresponds with your legal issue:')
      .end();
  }
};
