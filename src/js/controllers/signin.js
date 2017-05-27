'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    // var u = new JSON();
    
    $scope.login = function () {
      $scope.authError = null;
     
      // // Try to login
      // $http.post('api/login', {email: $scope.user.email, password: $scope.user.password})
      // .then(function(response) {
      //   if ( !response.data.user ) {
      //     $scope.authError = 'Email or Password not right';
      //   }else{
      //     $state.go('app.dashboard-v1');
      //   }
      // }, function(x) {
      //   $scope.authError = 'Server Error';
      //   });
      app.factory('authService', [ 'Base64', '$http', '$cookieStore', '$rootScope', function (Base64, $http, $cookieStore, $rootScope,) {
        var service = {};

        service.login = function (username,password,) {
          
        }

      }]
        
      $http({
        method: 'POST',
        url: 'http://ec2-34-205-129-137.compute-1.amazonaws.com/usermanager/login/',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          "username": $scope.user.username,
          "password": $scope.user.password
        }
      }).then(function (response) {
          console.log("success");
          console.log(response);
          $state.go('app.dashboard-v1');
        },        
        function (error) {
          console.log("error");
          console.log(error);
      });
    };//end of login
  
}]);//end of controller
  
  //login Auth Service

app.factory('loginAuth', ['Base64', '$http', '$cookieStore', '$rootScope', function (Base64, $http, $cookieStore, $rootScope) {
    
  }])