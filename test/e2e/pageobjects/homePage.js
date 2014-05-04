exports.HomePage = {
    goProducts: element(by.id('go-products')),
    signin: element(by.id('signin')),
    login: element(by.id('userName')),
    password: element(by.id('password')),
    loginButton: element(by.id('submit-login')),
    signup: element(by.id('signup')),
    goAdmin: element(by.id('go-admin')),
    currentUser: element(by.id('current-user')),
    logoutLink: element(by.id('logout')),
    loginAdmin: function () {
        this.signin.click();
        this.login.sendKeys('admin');
        this.password.sendKeys('admin');
        this.loginButton.click();
    }, logout: function() {
        this.currentUser.click();
        this.logoutLink.click();
    }
};
