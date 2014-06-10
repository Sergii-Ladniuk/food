'use strict';
define(
    ['../module'], function(services) {
        services.factory('LocalObjectStorageService', function() {

            function createStorage() {
                if (typeof(Storage) !== "undefined") {
                    return {
                        save : function(key, value) {
                            if (typeof key !== 'string') {
                                throw key + 'is not string';
                            }
                            if (typeof value !== 'string') {
                                throw value + 'is not string';
                            }
                            localStorage.setItem(key, value);
                        }, retrieve: function(key) {
                            if (typeof key !== 'string') {
                                throw key + 'is not string';
                            }
                            return localStorage[key];
                        }, clear: function() {
                            localStorage.clear();
                        }
                    }
                } else {
                    // todo : fallback ?
                    throw 'local storage not supported';
                }
            }

            var storageImpl = createStorage();

            return {
                saveObject: function(key, data) {
                    if (typeof data !== 'object') {
                        throw data + ' is not an object';
                    }
                    storageImpl.save(key, angular.toJson(data));
                }, getObject: function(key) {
                    return storageImpl.retrieve(key);
                }
            }
        })
    }
)