var productName = require('../ProductTest.js').productName;
exports.EditProductPage = {
    build: function () {
        return {
            header: element(by.css('.custom-form-header')),
            title: element(by.model('product.title')),
            description: element(by.model('product.description')),
            calories: element(by.model('product.calories')),
            proteins: element(by.model('product.proteins')),
            fats: element(by.model('product.fats')),
            carbs: element(by.model('product.carbs')),
            saveProduct: element(by.id('save-product')),
            dummyFill: function () {
                this.title.sendKeys(productName);
                this.description.sendKeys('dummy description');
                this.calories.sendKeys('1234');
                this.proteins.sendKeys('2345');
                this.fats.sendKeys('123');
                this.carbs.sendKeys('456');
            }
        }
    }
};
