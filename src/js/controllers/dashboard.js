angular.module('app')
	.controller('dashboardController', ['$rootScope', '$scope', '$http', 'getStaff', function ($rootScope, $scope, $http, getStaff) {
		var getStaff = getStaff;
		$scope.staffList = null;
		var user = $rootScope.globals.currentUser;

		getStaff.getStaffList(user.secret.id, user.secret.access_token,
			function (response) {
				$scope.staffList = response.data.objects;
				console.log(response.data.objects[1]);				
			});								
	}]);