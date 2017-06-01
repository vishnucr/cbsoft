'use strict';

/* Controllers */
  // signin controller
        
app.controller('SigninFormController', ['$rootScope','$scope', '$http', '$state', 'authService', function($rootScope, $scope, $http, $state, authService) {
    $scope.user = {};
    $scope.authError = null;    
    var loginService = authService;

    authService.clearCredential();

    $scope.login = function () {
        loginService.login($scope.user.username, $scope.user.password, function (response) {
            console.log(response.status);
            if (response.status <= 300) {
                loginService.setCredential($scope.user.username, $scope.user.password, response.data);
                $state.go('app.dashboard-v1');     
            }
            else {
                $scope.authError = "Login Error";
                authService.clearCredential();
            }
        });       
    }    
}]);//end of controller
