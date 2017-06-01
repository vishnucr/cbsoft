angular.module('app').factory('getStaff', ['$rootScope', '$http', function ($rootScope, $http) {
	var staff = {};

	//get staff list
	staff.getStaffList = function (userId, token, callback) {
		$http({
			method: 'GET',
			url: 'http://ec2-34-205-129-137.compute-1.amazonaws.com/usermanager/staff/get/?user_id=user_id',
			params : { user_id: userId },
			headers: {
				'access-token': token
			}						
		})
		.then(function (response) {
			callback(response);
		},
		function (error) {
			callback(error);
		});
	};

	return staff; 

}]);