exports.AdminPage = {
    build: function () {
        return {
            usersTab: {
                click: function () {
                    element(by.id('users-tab')).click();
                },
                removeUser: function (userName) {
                    element(by.id('remove-' + userName)).click();
                },
                nameElement: function(userName) {
                    return element(by.id('name-' + userName));
                }
            }
        };
    }
};