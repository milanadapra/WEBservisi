(function (angular) {
	angular.module('register',['authentication'])
	.controller('registerCtrl', function($scope, $log, AuthenticationService){
		$scope.user={};

		$scope.register=function () {
			console.log($scope.user.name);
			console.log($scope.user.password);
			AuthenticationService.register($scope.user.name,$scope.user.password);
			console.log($scope.user.name);
			console.log($scope.user.password);
		};
	});
}(angular));