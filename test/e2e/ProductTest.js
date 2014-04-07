var webdriver = require('selenium-webdriver');//.WebDriver.prototype;
var productName = 'dummy product';

var HomePage = {
    goProducts: element(by.id('go-products'))
};

var EditProductPage = {
    build: function () {
        return {
            header: element(by.id('editProductForm-header')),
            title: element(by.model('product.title')),
            description: element(by.model('product.description')),
            calories: element(by.model('product.calories')),
            proteins: element(by.model('product.proteins')),
            fats: element(by.model('product.fats')),
            carbs: element(by.model('product.carbs')),
            portion: element(by.model('product.portion')),
            portion_unit: element(by.model('product.portion_unit')),
            saveProduct: element(by.id('save-product')),
            dummyFill: function () {
                this.title.sendKeys(productName);
                this.description.sendKeys('dummy description');
                this.calories.sendKeys('1234');
                this.proteins.sendKeys('2345');
                this.fats.sendKeys('123');
                this.carbs.sendKeys('456');
                this.portion.sendKeys('100');
                this.portion_unit.sendKeys('litres');
            }
        }
    }
};

var ProductList = {
    newProduct: element(by.id('new-product-btn')),
    targetEntry: function (text) {
        var entryEl = element(by.xpath('//div[@class = "thumbnail" and contains(., "' + text + '")]'));
        return {
            description: entryEl.findElement(by.css('.view-description')),
            calories: entryEl.findElement(by.css('.view-calories')),
            fats: entryEl.findElement(by.css('.view-fats')),
            proteins: entryEl.findElement(by.css('.view-proteins')),
            carbs: entryEl.findElement(by.css('.view-carbs')),
            portion: entryEl.findElement(by.css('.view-portion-and-unit')),
            editProduct: entryEl.findElement(by.css('.edit-product')),
            deleteProduct: entryEl.findElement(by.css('.delete-product'))
        }
    }
};

var DeleteProductPage = {
    build: function () {
        return {
            question: element(by.id('delete-product-question')),
            delete: element(by.id('delete')),
            cancel: element(by.id('cancel'))
        }
    }
}


describe('Products', function () {
    beforeEach(function () {
        browser.get('http://localhost:3000/#/');
        HomePage.goProducts.click();
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
        expect(entry.portion.getText()).toEqual('100 litres');
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
        expect(editProductPage.portion.getAttribute('value')).toEqual('100');
        expect(editProductPage.portion_unit.getAttribute('value')).toEqual('litres');
    });
    it('As a user I want to be able to delete a product', function () {
        HomePage.goProducts.click();
        var entry = ProductList.targetEntry(productName);
        entry.deleteProduct.click();

        var deleteForm = DeleteProductPage.build();
        expect((deleteForm.question.getText())).toEqual("Вы действительно хотите удалить продукт '" + productName + "'?");
        deleteForm.delete.click();
    });
    it('As an administrator I want the product title to be mandatory', function() {
        ProductList.newProduct.click();
        var editProductPage = EditProductPage.build();
        editProductPage.description.sendKeys('dummy description');
        editProductPage.calories.sendKeys('1234');
        editProductPage.proteins.sendKeys('2345');
        editProductPage.fats.sendKeys('123');
        editProductPage.carbs.sendKeys('456');
        editProductPage.portion.sendKeys('100');
        editProductPage.portion_unit.sendKeys('litres');
        expect(editProductPage.saveProduct.isEnabled()).toEqual(false);
    });
    it('As an administrator I want the calories to be less than 10000', function() {
        ProductList.newProduct.click();
        var editProductPage = EditProductPage.build();
        editProductPage.title.sendKeys('dummy product');
        editProductPage.description.sendKeys('dummy description');
        editProductPage.calories.sendKeys('10001');
        editProductPage.proteins.sendKeys('2345');
        editProductPage.fats.sendKeys('123');
        editProductPage.carbs.sendKeys('456');
        editProductPage.portion.sendKeys('100');
        editProductPage.portion_unit.sendKeys('litres');
        expect(editProductPage.saveProduct.isEnabled()).toEqual(false);
    });
    it('As an administrator I want the calories to be more than 0 (positive only)', function() {
        ProductList.newProduct.click();
        var editProductPage = EditProductPage.build();
        editProductPage.title.sendKeys('dummy product');
        editProductPage.description.sendKeys('dummy description');
        editProductPage.calories.sendKeys('-1');
        editProductPage.proteins.sendKeys('2345');
        editProductPage.fats.sendKeys('123');
        editProductPage.carbs.sendKeys('456');
        editProductPage.portion.sendKeys('100');
        editProductPage.portion_unit.sendKeys('litres');
        expect(editProductPage.saveProduct.isEnabled()).toEqual(false);
    });
});