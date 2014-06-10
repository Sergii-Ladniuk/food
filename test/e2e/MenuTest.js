var HomePage = require('./pageobjects/homePage.js').HomePage;
var db = require('../../data/schema/DB.js').mangoose.connection.db;
var tools = require('../api/tools');
var MenuListPage = require('./pageobjects/menuListPage.js').MenuListPage;
var MenuGeneralPage = require('./pageobjects/menuGeneralPage.js').MenuGeneralPage;
var MenuDayPage = require('./pageobjects/menuDayPage.js').MenuDayPage;
var UserModel = require('../../data/schema/UserModel').UserModel;
var UserDao = require('../../data/dao/GenericDao.js').Dao.create(UserModel);
var ProductModel = require('../../data/schema/ProductModel').ProductModel;
var ProductDao = require('../../data/dao/GenericDao.js').Dao.create(ProductModel);
var webdriver = require('selenium-webdriver');


describe('Menu Test', function () {
    it('should create menu owner', function () {
        (function () {
            var d = webdriver.promise.defer();
            db.dropCollection('menus', function () {
                db.dropCollection('users', function () {
                    UserDao.save({
                        username: 'menu owner',
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

    })
    it('should show not logged in warning', function () {
        browser.get('http://localhost:3001/#/')
        HomePage.goMenus.click();
        var menuListPage = MenuListPage();
        expect(menuListPage.loginWarn.isPresent()).toBeTruthy();
        expect(menuListPage.loginWarn.getText()).toBe('Пожалуйста, войдите в систему, чтобы создавать свои собственные меню');
    })
    it('should login', function () {
        HomePage.loginAs('menu owner', 'user')
    })
    it('should start create menu wizard', function () {
        var menuListPage = MenuListPage();
        menuListPage.createMenu.click();
    })

    function listScalarProperties(obj, f) {
        for (var i in obj) {
            if ((typeof obj[i]) === 'string' || (typeof obj[i]) === 'number') {
                f(i);
            }
        }
    }

    function toArray(obj) {
        var res = [];
        listScalarProperties(obj, function (p) {
            res[res.length] = {
                key: p,
                value: obj[p]
            }
        })
        return res;
    }

    var generalStepGood = {
        title: 'qwe',
        dayNumber: 3,
        memberNumber: 6
    }

    Array.prototype.head = function () {
        return this[0]
    }

    Array.prototype.tail = function () {
        return this.slice(1, this.length);
    }

    function enterAll(data, page) {
        var d = webdriver.promise.defer();
        (function fill(arr) {
            if (arr.length > 0) {
                page[arr.head().key].sendKeys(arr.head().value).then(function () {
                    fill(arr.tail())
                });
            } else {
                d.fulfill()
            }
        })(toArray(data));
        (function () {
            return d.promise
        })()
    }

    it('should fill good data in general step and submit', function () {
        var menuGeneralPage = MenuGeneralPage();
        enterAll(generalStepGood, menuGeneralPage);
        menuGeneralPage.submit.click();
    })
    it('should show day 1 of 3', function() {
        var menuDayPage = MenuDayPage();
        expect(menuDayPage.currentDay.getText()).toBe('1');
        expect(menuDayPage.totalDays.getText()).toBe('3');
    })
    it('should log out', function () {
        HomePage.logout();
    })
    it('should clean up db', function () {
        (function () {
            var d = webdriver.promise.defer();
            db.dropCollection('menus', function () {
                db.dropCollection('users', function () {
                    d.fulfill('done');
                });
            })
            return d.promise
        })()

    })
})