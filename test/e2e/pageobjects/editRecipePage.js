var webdriver = require('selenium-webdriver');

exports.EditRecipePage = {
    build: function () {
        return {
            header: element(by.css('.custom-form-header')),
            title: element(by.id('recipe-title')),
            calories: element(by.id('recipe-calories')),
            proteins: element(by.id('recipe-proteins')),
            carbs: element(by.id('recipe-carbs')),
            fats: element(by.id('recipe-fats')),
            weight: element(by.id('recipe-weight')),
            submit: element(by.id('recipe-submit')),
            cancel: element(by.id('recipe-cancel')),
            addItem: element(by.id('addItem')),
            newItemTitle: element(by.id('new-item-title')),
            newItemAmount: element(by.id('item-amount')),
            submitItem: element(by.id('item-add')),
            closeItem: element(by.id('item-close')),
            description: element(by.id('description')),
            selectProduct: function(name) {
                var d = webdriver.promise.defer();
                this.addItem.click();
                this.newItemTitle.sendKeys(name).then(function() {
                    element.all(by.css('ul.dropdown-menu a.ng-scope')).first().click().then(function() {
                        d.fulfill()
                    })
                })
                return d.promise
            }, enterItem: function(name, amount) {
                var d = webdriver.promise.defer();
                var me = this;
                me.selectProduct(name).then(function() {
                    me.newItemAmount.sendKeys(amount).then(function() {
                        d.fulfill()
                    })
                })
                return d.promise
            }, createItem: function(name, amount) {
                var d = webdriver.promise.defer();
                var me = this;
                me.enterItem(name, amount).then(function() {
                    me.submitItem.click().then(function() {
                        me.closeItem.click().then(function() {
                            d.fulfill()
                        })
                    })
                })
                return d.promise
            }
        }
    }
}