exports.ProductList = {
    newProduct: element(by.id('new-product-btn')),
    targetEntry: function (text) {
        var entryEl = element(by.xpath('//div[@class = "thumbnail" and contains(., "' + text + '")]'));
        return {
            description: entryEl.findElement(by.css('.view-description')),
            calories: entryEl.findElement(by.css('.view-calories')),
            fats: entryEl.findElement(by.css('.view-fats')),
            proteins: entryEl.findElement(by.css('.view-proteins')),
            carbs: entryEl.findElement(by.css('.view-carbs')),
            editProduct: entryEl.findElement(by.css('.edit-product')),
            deleteProduct: entryEl.findElement(by.css('.delete-product'))
        }
    }
};
