define(['./module', '../app'], function (controllers) {
        'use strict';
        controllers
            .controller('AdminController',
            function ($scope, ProductFileUploadService, AdminService) {
                $scope.clear = function () {
                    $scope.uploadedFile = null;
                    $scope.upload_button_state = false;
                };

                $scope.setFileEventListener = function (element) {
                    $scope.uploadedFile = element.files[0];

                    if ($scope.uploadedFile) {
                        $scope.$apply(function () {
                            $scope.upload_button_state = true;
                        });
                    }
                };

                $scope.uploadFile = function () {
                    uploadFile();
                };


                function uploadFile() {
                    if (!$scope.uploadedFile) {
                        return;
                    }

                    ProductFileUploadService.uploadFile_init($scope.uploadedFile)
                        .then(function (result) {
                            if (result.status == 200) {
                                // todo
                            }
                        }, function (error) {
                            alert(error.message);
                        });
                }

                $scope.deleteAllProducts = function () {
                    AdminService.deleteAllProducts(function success(result) {
                        alert('Delete all products successful. ' + result);
                    }, function fail(result) {
                        alert('Failed delete all products. ' + result);
                    });
                }
            }
        )
    }
);

