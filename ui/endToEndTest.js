module.exports = {
    'Load home screen' : function (browser) {
        browser
            .url('http://www.legalhelpwi.com/')
            .waitForElementVisible('body', 1000);
    }
};