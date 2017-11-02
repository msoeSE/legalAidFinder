/* eslint-disable key-spacing,object-shorthand */
module.exports = {
  'Load home screen' : function (browser) {
    browser
      .url('http://ec2-54-187-102-77.us-west-2.compute.amazonaws.com/')
      .waitForElementVisible('body', 1000);
  },

  'Select Family & Safety' : function (browser) {
    browser
      .waitForElementVisible('a[href="/categories/59e56e7a5daf4408184b1a6a"', 5000)
      .click('a[href="/categories/59e56e7a5daf4408184b1a6a"');
  },

  'Select Divorce' : function (browser) {
    browser
      .waitForElementVisible('a[href="/categories/59cb1f260e0bdf302c196e18"', 5000)
      .click('a[href="/categories/59cb1f260e0bdf302c196e18"');
  },

  'Select Divorce not filed yet' : function (browser) {
    browser
      .waitForElementVisible('a[href="/categories/59cd3cf22f8011133c2a1d5b"', 5000)
      .click('a[href="/categories/59cd3cf22f8011133c2a1d5b"');
  },

  'Select Need help starting paperwok' : function (browser) {
    browser
      .waitForElementVisible('a[href="/categories/59cd3d9d2f8011133c2a1d62"', 5000)
      .click('a[href="/categories/59cd3d9d2f8011133c2a1d62"');
  },

  'Milwaukee Justice Center listed' : function (browser) {
    browser
      .waitForElementVisible('a[href="http://milwaukee.gov/MJC"', 5000)
      .end();
  },
};
