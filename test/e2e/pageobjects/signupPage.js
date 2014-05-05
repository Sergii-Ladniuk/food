exports.SignupPage = {
    build: function() {
        return {
            userName: element(by.id('signup-username')),
            email: element(by.id('signup-email')),
            password: element(by.id('signup-password')),
            confirmPassword: element(by.id('signup-confirmPassword')),
            submit: element(by.id('signup-submit'))
        };
    }
};