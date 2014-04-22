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
            }

        )
            .factory('AdminService', function ($http) {
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
                    }, isUserExists: function(user) {

                    }
                };
            }

        );
    }
);