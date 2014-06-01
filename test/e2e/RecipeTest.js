var HomePage = require('./pageobjects/homePage.js').HomePage;
var db = require('../../data/schema/DB.js').mangoose.connection.db;
var tools = require('../api/tools');
var RecipeListPage = require('./pageobjects/RecipeListPage.js').RecipeListPage;
var EditRecipePage = require('./pageobjects/editRecipePage.js').EditRecipePage;
var UserModel = require('../../data/schema/UserModel').UserModel;
var UserDao = require('../../data/dao/GenericDao.js').Dao.create(UserModel);
var ProductModel = require('../../data/schema/ProductModel').ProductModel;
var ProductDao = require('../../data/dao/GenericDao.js').Dao.create(ProductModel);
var webdriver = require('selenium-webdriver');

var item = {
    title: 'some recipe',
    calories: '12',
    fats: '23',
    carbs: '34',
    proteins: '45',
    weight: '90',
    list: function (f) {
        for (var p in item) {
            if ((typeof this[p]) === 'string') {
                f(p)
            }
        }
    }
}


describe('create new recipe with manual enter parameters', function () {
    var me = this;


    it('prepare, login', function () {
        (function () {
            var d = webdriver.promise.defer();
            db.dropCollection('recipes', function () {
                db.dropCollection('users', function () {
                    UserDao.save({
                        username: 'user',
                        password: 'user',
                        email: 'user@mail.com',
                        group: 'user'
                    }, function () {
                        d.fulfill('done');
                    })
                });
            })
            return d.promise
        })()

        browser.get('http://localhost:3001/#/')
        HomePage.loginAs('user', 'user');
        HomePage.goRecipes.click()
        me.page = RecipeListPage.build()
    })

    it('should create a new recipe without items when all data is entered manually', function () {
        me.page.createNew.click();

        var editRecipePage = EditRecipePage.build();

        item.list(function (p) {
            editRecipePage[p].sendKeys(item[p])
        })

        editRecipePage.submit.click().then(function () {
            console.log('\nSubmit clicked');
        });
    })

    it('should redirect to the list after save', function () {
        expect(me.page.createNew.isPresent()).toBe(true);
    })

    it('should display a newly created item in the list', function () {
        expect(element.all(by.xpath('//td/a[text() = "some recipe"]')).count()).toBe(1);
        expect(element.all(by.xpath('//td[text() = "12"]')).count()).toBe(1);
    });

    it('should open edit dialog', function () {
        element(by.xpath('//a[contains(span/@class, "glyphicon-edit")]')).click().then(function () {
            console.log('\nEdit page');
        });
    })

    it('should populate recipe data in entry fields', function () {
        var editRecipePage = EditRecipePage.build();

        item.list(function (p) {
            expect(editRecipePage[p].getAttribute('value')).toBe(item[p])
        })
    })

    it('should modify', function () {
        var editRecipePage = EditRecipePage.build();

        item.list(function (p) {
            editRecipePage[p].clear()
            editRecipePage[p].sendKeys(item[p] + '1')
        })

        editRecipePage.submit.click().then(function () {
            console.log('\nSubmit clicked');
        });
    })

    it('should display a modified item in the list', function () {
        expect(element.all(by.xpath('//td/a[text() = "some recipe1"]')).count()).toBe(1);
        expect(element.all(by.xpath('//td[text() = "121"]')).count()).toBe(1);
    });

    it('should open edit dialog again', function () {
        element(by.xpath('//a[contains(span/@class, "glyphicon-edit")]')).click().then(function () {
            console.log('\nEdit page');
        });
    })

    it('should populate modified recipe data in entry fields', function () {
        var editRecipePage = EditRecipePage.build();
        item.list(function (p) {
            expect(editRecipePage[p].getAttribute('value')).toBe(item[p] + '1')
        })
    })

    it('cancel should redirect to home page', function () {
        var editRecipePage = EditRecipePage.build();
        editRecipePage.cancel.click();
    })

    it('should close remove dialog and should not remove when no button is clicked', function () {
        element(by.xpath('//button[contains(span/@class, "glyphicon-remove-circle")]')).click();
        expect(element(by.css('h4.modal-title')).getText()).toBe('Удаление рецепта');
        element(by.id('cancel')).click();
        expect(element.all(by.xpath('//td/a[text() = "some recipe1"]')).count()).toBe(1);
    })

    it('should remove a recipe', function () {
        element(by.xpath('//button[contains(span/@class, "glyphicon-remove-circle")]')).click();
        expect(element(by.css('h4.modal-title')).getText()).toBe('Удаление рецепта');
        element(by.id('delete')).click();
        expect(element.all(by.xpath('//td/a[text() = "some recipe1"]')).count()).toBe(0);
    })

    describe('items', function () {

        beforeEach(function () {
            function product(name) {
                return {
                    title: name,
                    description: 'descr',
                    calories: '10',
                    proteins: '10.1',
                    fats: '1',
                    carbs: '2',
                    owner: 'dummy user'
                }
            }

            var d = webdriver.promise.defer();
            (function saveProductArray(arr, index) {
                ProductDao.save(product(arr[index]), function () {
                    if (index < arr.length - 1) {
                        saveProductArray(arr, index + 1)
                    } else {
                        d.fulfill('done');
                    }
                })
            })(['one', 'two', 'three'], 0)
            return d.promise;
        })

        afterEach(function () {
            (function () {
                var d = webdriver.promise.defer();
                db.dropCollection('products', function () {
                    d.fulfill('done');
                })
                return d.promise
            })();

        })

        it('should add items', function () {
            me.page.createNew.click();
            var editRecipePage = EditRecipePage.build();
            editRecipePage.title.sendKeys('calculated')
            editRecipePage.createItem('one', 10);
            editRecipePage.createItem('two', 20);
            editRecipePage.createItem('three', 30);
            var divs = element.all(by.css('table.items-table > tbody > tr > td > div'));
            expect(divs.count()).toBe(3);
            expect(divs.get(0).getText()).toBe('one');
            expect(divs.get(1).getText()).toBe('two');
            expect(divs.get(2).getText()).toBe('three');
            var weightSpans = element.all(by.css('table.items-table > tbody > tr > td > span > input'));
            expect(weightSpans.count()).toBe(3);
            expect(weightSpans.get(0).getAttribute('value')).toBe('10');
            expect(weightSpans.get(1).getAttribute('value')).toBe('20');
            expect(weightSpans.get(2).getAttribute('value')).toBe('30');
            expect(editRecipePage.calories.getAttribute('value')).toBe('6');
        })

        it('should save recipe with items', function() {
            var editRecipePage = EditRecipePage.build();
            editRecipePage.submit.click()
        })

        it('should display recipe with items', function() {
            expect(element.all(by.xpath('//td/a[text() = "calculated"]')).count()).toBe(1);
            expect(element.all(by.xpath('//td[text() = "6"]')).count()).toBe(1);
        })

        it('should recalculate and save new calories when items weight is modified', function() {
            var editRecipePage = EditRecipePage.build();

            element.all(by.xpath('//a[contains(span/@class, "glyphicon-edit")]')).first().click()
            var weightSpans = element.all(by.css('table.items-table > tbody > tr > td > span > input'));
            weightSpans.get(0).sendKeys('1')
            weightSpans.get(1).sendKeys('1')
            weightSpans.get(2).sendKeys('1')
            expect(editRecipePage.calories.getAttribute('value')).toBe('60.300000000000004');

            editRecipePage.submit.click()

            expect(element.all(by.xpath('//td/a[text() = "calculated"]')).count()).toBe(1);
            expect(element.all(by.xpath('//td[text() = "60.300000000000004"]')).count()).toBe(1);
        })

        it('should remove item', function() {
            var editRecipePage = EditRecipePage.build();

            element.all(by.xpath('//a[contains(span/@class, "glyphicon-edit")]')).first().click()
            var removeItem = element.all(by.css('table.items-table > tbody > tr > td > span > span > button'));
            removeItem.get(1).click().then(function() {
                1;
            })
            expect(editRecipePage.calories.getAttribute('value')).toBe('40.2');

            editRecipePage.submit.click()

            expect(element.all(by.xpath('//td[text() = "40.2"]')).count()).toBe(1);
        })
    })

    it('should save description', function() {
        me.page.createNew.click();

        var editRecipePage = EditRecipePage.build();

        item.list(function (p) {
            editRecipePage[p].sendKeys(item[p])
        })

        editRecipePage.description.sendKeys('qweqweqweqweqweqweqweasdasdasdasadasdasasdasdasda')

        editRecipePage.submit.click()
    })

    it('should description when edit', function() {
        element.all(by.xpath('//a[contains(span/@class, "glyphicon-edit")]')).get(1).click().then(function() {
            1;
        })
        var editRecipePage = EditRecipePage.build();
        expect(editRecipePage.description.getAttribute('value'))
            .toBe('qweqweqweqweqweqweqweasdasdasdasadasdasasdasdasda')
    })

    it('should view recipe without items', function() {

    })


    it('cleanup', function () {
        (function () {
            var d = webdriver.promise.defer();
            db.dropCollection('recipes', function () {
                db.dropCollection('users', function () {
                    d.fulfill('done');
                });
            })
            return d.promise
        })();

        HomePage.logout();
    })
})