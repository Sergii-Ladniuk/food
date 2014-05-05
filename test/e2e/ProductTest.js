var webdriver = require('selenium-webdriver');//.WebDriver.prototype;
var productName = 'dummy product';
exports.productName = productName;
var HomePage = require('./pageobjects/homePage.js').HomePage;
var EditProductPage = require('./pageobjects/editProductPage.js').EditProductPage;
var ProductList = require('./pageobjects/productListPage.js').ProductList;
var DeleteProductPage = {
    build: function () {
        return {
            question: element(by.id('delete-product-question')),
            delete: element(by.id('delete')),
            cancel: element(by.id('cancel'))
        }
    }
};


describe('Products: ', function () {

    beforeEach(function () {
        browser.get('http://localhost:3000/#/');
        HomePage.goProducts.click();
    });
//    afterEach(function () {
//        HomePage.logout();
//    });

    it('login', function() {
        HomePage.loginAdmin();
    });

    it('As a user I want to create a product', function () {
        ProductList.newProduct.click();
        var editProductPage = EditProductPage.build();
        expect(editProductPage.header.getText()).toEqual('Редактирование продукта');
        editProductPage.dummyFill();
        editProductPage.saveProduct.click();
    });
    it('As a user I want to have my new product correctly displayed', function () {
        var entry = ProductList.targetEntry(productName);
        expect(entry.description.getText()).toEqual('dummy description');
        expect(entry.calories.getText()).toEqual('1234');
        expect(entry.proteins.getText()).toEqual('2345');
        expect(entry.fats.getText()).toEqual('123');
        expect(entry.carbs.getText()).toEqual('456');
    });
    it('As a user I want the Edit Product form to be pre-populated with a correct data.', function () {
        var entry = ProductList.targetEntry(productName);
        entry.editProduct.click();

        var editProductPage = EditProductPage.build();
//        protractor.getInstance().wait(function () {
//           return editProductPage.saveProduct.isEnabled();
//        });
        expect(editProductPage.description.getAttribute('value')).toEqual('dummy description');
        expect(editProductPage.calories.getAttribute('value')).toEqual('1234');
        expect(editProductPage.proteins.getAttribute('value')).toEqual('2345');
        expect(editProductPage.fats.getAttribute('value')).toEqual('123');
        expect(editProductPage.carbs.getAttribute('value')).toEqual('456');
    });
    it('As a user I want to be able to delete a product', function () {
        HomePage.goProducts.click();
        var entry = ProductList.targetEntry(productName);
        entry.deleteProduct.click();

        var deleteForm = DeleteProductPage.build();
        expect((deleteForm.question.getText())).toEqual("Вы действительно хотите удалить продукт '" + productName + "'?");
        deleteForm.delete.click();
    });
    it('As an administrator I want the product title to be mandatory', function () {
        ProductList.newProduct.click();
        var editProductPage = EditProductPage.build();
        editProductPage.description.sendKeys('dummy description');
        editProductPage.calories.sendKeys('1234');
        editProductPage.proteins.sendKeys('2345');
        editProductPage.fats.sendKeys('123');
        editProductPage.carbs.sendKeys('456');
        expect(editProductPage.saveProduct.isEnabled()).toEqual(false);
    });
    it('As an administrator I want the calories to be less than 10000', function () {
        ProductList.newProduct.click();
        var editProductPage = EditProductPage.build();
        editProductPage.title.sendKeys('dummy product');
        editProductPage.description.sendKeys('dummy description');
        editProductPage.calories.sendKeys('10001');
        editProductPage.proteins.sendKeys('2345');
        editProductPage.fats.sendKeys('123');
        editProductPage.carbs.sendKeys('456');
        expect(editProductPage.saveProduct.isEnabled()).toEqual(false);
    });
    it('As an administrator I want the calories to be more than 0 (positive only)', function () {
        ProductList.newProduct.click();
        var editProductPage = EditProductPage.build();
        editProductPage.title.sendKeys('dummy product');
        editProductPage.description.sendKeys('dummy description');
        editProductPage.calories.sendKeys('-1');
        editProductPage.proteins.sendKeys('2345');
        editProductPage.fats.sendKeys('123');
        editProductPage.carbs.sendKeys('456');
        expect(editProductPage.saveProduct.isEnabled()).toEqual(false);
    });

    it('logout', function() {
        HomePage.logout();
    });
});