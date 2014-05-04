var HomePage = require('./pageobjects/homePage.js').HomePage;
var SignupPage = require('./pageobjects/signupPage.js').SignupPage;

describe('Signup: ', function () {
    beforeEach(function () {
        browser.get('http://localhost:3000/#/');
    });
    it('As a user I want to register an account', function () {
        HomePage.signup.click();
        var signupPage = SignupPage.build();
        signupPage.userName.sendKeys('dummy user');
        signupPage.email.sendKeys('dummy.user@mail.com');
        signupPage.password.sendKeys('dummy password');
        signupPage.confirmPassword.sendKeys('dummy password');
        signupPage.submit.click();
    });
    it('As an admin I want to delete a user account', function () {
        HomePage.goAdmin.click();
    });
});
