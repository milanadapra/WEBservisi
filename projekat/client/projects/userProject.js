(function (angular) {
	angular.module('user',['user.resource', 'project.resource'])
	.controller('userCtrl', function($scope, Project, User, $location, $state) {

		var loadUser = function(){
		$scope.user  = User.query();
		$scope.us = new User();
		}
		loadUser();

		$scope.save2 = function(project, u) {
			$scope.us.$update({'projectId':project._id, 'userId':u._id},function () {
			});
			$scope.disabled();
		}

		$scope.remUser = function(project, u) {
			$scope.us.$removeUser({'projectId':project._id, 'userId':u._id},function () {
			});
			$scope.disabled();
		}

		$scope.show = true;

		$scope.disabled = function(){
    		$scope.sSave=!$scope.show;
  		}

  		$scope.reloadRoute = function() {
  			 $state.reload();
		}
  		

	});
}(angular));