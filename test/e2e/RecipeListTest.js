var HomePage = require('./pageobjects/homePage.js').HomePage;
var db = require('../../data/schema/DB.js').mangoose.connection.db;
var tools = require('../api/tools');
var RecipeListPage = require('./pageobjects/RecipeListPage.js').RecipeListPage;

var webdriver = require('selenium-webdriver');

describe('recipe list', function () {
    var me = this;

    beforeEach(function () {
        browser.get('http://localhost:3001/#/')
        HomePage.goRecipes.click()
        me.page = RecipeListPage.build()
    })

    describe('not logged in', function () {

        beforeEach(function () {
        })

        it('should not be possible to create recipe', function () {
            expect(me.page.createNew.isDisplayed()).toBeFalsy()
        })
        it('should display login warning', function () {
            expect(me.page.loginWarn.isDisplayed()).toBeTruthy()
        })


        describe('having 50 recipes in database', function () {

            beforeEach(function () {

                (function () {
                    var d = webdriver.promise.defer();
                    db.dropCollection('recipes', function () {
                        tools.spamRecipes(50, function () {
                            d.fulfill('done');
                        });
                    })
                    return d.promise
                })()

                browser.get('http://localhost:3001/#/')
                HomePage.goRecipes.click()
                me.page = RecipeListPage.build()
            })

            it('should have 3 pages', function() {
                // 3 pages + 4 nav elements
                expect(element.all(by.css('ul.pagination > li')).count()).toBe(7);
            })
            it('should have 20 items on the page 1', function() {
                expect(element.all(by.css('td > a.truncate250')).count()).toBe(20);
            })
            it('should properly display items text and calories', function() {
                expect(element.all(by.xpath('//td/a[text() = "soup"]')).count()).toBe(20);
                expect(element.all(by.xpath('//td[text() = "100.2"]')).count()).toBe(20);
            })
            it('should have 10 items on the page 3', function() {
                element(by.xpath('//li/a[text() = "3"]')).click();
                expect(element.all(by.css('td > a.truncate250')).count()).toBe(10);
            })
        })
    })

})