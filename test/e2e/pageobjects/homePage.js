exports.HomePage = {
    goProducts: element(by.id('go-products')),
    goRecipes: element(by.id('go-recipes')),
    goMenus: element(by.id('go-menus')),
    signin: element(by.id('signin')),
    login: element(by.id('userName')),
    password: element(by.id('password')),
    loginButton: element(by.id('submit-login')),
    signup: element(by.id('do-signup')),
    goAdmin: element(by.id('go-admin')),
    currentUser: element(by.id('current-user')),
    logoutLink: element(by.id('logout')),
    loginAdmin: function () {
        this.loginAs('admin', 'admin');
    }, logout: function() {
        this.currentUser.click();
        this.logoutLink.click();
    }, loginAs: function(user, password) {
        this.signin.click();
        this.login.sendKeys(user);
        this.password.sendKeys(password);
        this.loginButton.click();
    }
};
