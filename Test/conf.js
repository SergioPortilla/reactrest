exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },

  package: "protractor-react-selector",
  onPrepare: async()=> {
   await browser.waitForAngularEnabled(false);
  }

}