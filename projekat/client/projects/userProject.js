(function (angular) {
	angular.module('user',['user.resource', 'project.resource'])
	.controller('userCtrl', function($scope, Project, User, $location) {

		var loadUser = function(){
		$scope.user  = User.query();
		$scope.users = Project.users;
		$scope.us = new User();
		}
		loadUser();

		$scope.save2 = function(project, u) {
			$scope.us.$update({'projectId':project._id, 'userId':u._id},function () {
			loadUser();
			});
		}

	});
}(angular));