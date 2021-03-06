define(['./module', '../app'], function (services) {
        'use strict';
        services
            .factory('ProductFileUploadService', function ($http) {
                return {
                    uploadFile_init: function (uploadedFile) {
                        var fd = new FormData();
                        fd.append("uploadedFile", uploadedFile);
                        var upload_promise = $http.post('/products/import',
                            fd, {
                                headers: {
                                    'Content-Type': undefined   //'multipart/form-data;'
                                },
                                transformRequest: angular.identity
                            });

                        return upload_promise;
                    }
                }
            })
            .factory('UserResource', function ($resource) {
                return $resource('/user/:id', {id: '@id'},
                    {
                        save: {method: 'POST'},
                        exists: {
                            method: 'GET',
                            params: { checkExists: true }
                        }

                    });
            })
            .factory('UserService', function ($http, $q, UserResource) {
                return {
                    createUser: function () {
                        return new UserResource();
                    }, isUserExists: function (userName) {
                        var delay = $q.defer();
                        UserResource.exists(
                            {id: userName},
                            function success(response) {
                                delay.resolve(response.answer === 'yes');
                            }
                        );
                        return delay.promise;
                    }, saveUser: function (user, success) {
                        user.$save(
                            function ok(response) {
                                success(response);
                            },
                            function fail(error) {
                                //todo
                            }
                        );
                    }, login: function (user) {
                        return $http.post('/login', user);
                    }, isLoggedIn: function () {
                        return $http.get('/loggedin');
                    }, logout: function () {
                        return $http.post('/logout');
                    }, getUsersPage: function (pageNumber, pageSize) {
                        var deferred = $q.defer();
                        UserResource.query(
                            {
                                "pageNumber": pageNumber,
                                "pageSize": pageSize
                            }, function (res) {
                                deferred.resolve(res);
                            }, function () {
                                deferred.reject('Unable to fetch a users page');
                            }
                        );
                        return deferred.promise;
                    }, getUserCount: function () {
                        return $http.get('/count/user');
                    }
                }
            })
            .factory('User', function (UserService, $http, $q) {
                var name;
                var group;
                return {
                    isLoggedIn: function () {
                        return typeof name === 'string';
                    }, getUserName: function () {
                        return name;
                    }, checkIsLoggedIn: function () {
                        var delay = $q.defer();
                        UserService.isLoggedIn().then(function (response) {
                            name = response.data.username;
                            group = response.data.group;
                            delay.resolve(name);
                        });
                        return delay.promise;
                    }, isAdmin: function () {
                        return group === 'admin';
                    }, isModerator: function () {
                        return group === 'admin' || group === 'moderator';
                    }
                }
            })
            .factory('AdminService', function ($http, $q) {
                return {
                    deleteAllProducts: function (success, fail) {
                        $http.delete('/collection/products').then(function (result) {
                            if (result.status === 'ok') {
                                success(result);
                            }
                            else {
                                fail(result);
                            }
                        }, function (error) {
                            fail(result);
                        });
                    }
                };
            }
        );
    }
)
;