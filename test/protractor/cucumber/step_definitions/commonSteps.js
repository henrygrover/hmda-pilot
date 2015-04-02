var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {

    this.Given(/^that I am at the HMDA homepage$/, function(next) {
        browser.get('http://dev.hmda-pilot.ec2.devis.com/#/');
        //Prevents "are you sure you want to leave?" window from popping up
        browser.executeScript("window.onbeforeunload = function(){};");
        next();
    });
};
