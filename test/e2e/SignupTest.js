var HomePage = require('./pageobjects/homePage.js').HomePage;
var SignupPage = require('./pageobjects/signupPage.js').SignupPage;
var AdminPage= require('./pageobjects/adminPage').AdminPage;

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
    it('As a user I want to login using my new account', function () {
        HomePage.loginAs('dummy user', 'dummy password');
        expect(HomePage.currentUser.getText()).toEqual('dummy user');
        HomePage.logout();
    });
    it('As an admin I want to see a user in the list', function () {
        HomePage.loginAdmin();
        HomePage.goAdmin.click();
        var adminPage = AdminPage.build();
        adminPage.usersTab.click();
        expect(adminPage.usersTab.nameElement('dummy user').getText()).toEqual('dummy user');
        HomePage.logout();
    });
    it('As an admin I want to delete a user account', function () {
        HomePage.loginAdmin();
        HomePage.goAdmin.click();
        var adminPage = AdminPage.build();
        adminPage.usersTab.click();
        adminPage.usersTab.removeUser('dummy user');
        HomePage.logout();
    });
});
