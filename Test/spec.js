browser.waitForAngularEnabled(false);
describe('Protractor Demo App', function() {
	
	beforeEach(function() {
        browser.get('http://localhost:3000');
	});
	
    it('Title Test', function() {
        expect(browser.getTitle()).toEqual('Ceibacoins');
    });
    
    it('Crear persona', function(){
        //element(by.id('employee6')).click();
        element(by.id('nuip')).sendKeys(Math.round(Math.random() * 1000000));
        element(by.id('name')).sendKeys('HOLAA');
        element(by.id('lastName')).sendKeys('PRUEBITA');
        element(by.id('bornDate')).sendKeys('24/02/1998');
        element(by.id('createEmploye')).click();
        browser.navigate().refresh();
    });
	
});