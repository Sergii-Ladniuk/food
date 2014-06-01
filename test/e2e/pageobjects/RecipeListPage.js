exports.RecipeListPage = {
    build: function () {
        return {
            createNew: element(by.id('new-recipe')),
            loginWarn: element(by.id('login-warn'))
        }
    }
}