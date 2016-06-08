(function (angular) {
	angular.module('project',['project.resource', 'task.resource'])
	.controller('projectsCtrl', function($scope, $location, Project, Task) {
		var loadProjects = function () {
			$scope.projects = Project.query();		
			$scope.project = new Project();
		}
		loadProjects();
		$scope.save = function () {
			if(!$scope.project._id){
				$scope.project.$save(loadProjects);
			}
			else{
				$scope.project.$update(loadProjects);				
			}
		} 
	    $scope.details = function (project) {
	     	$location.path('/projects/tasks/'+project._id);
	    }
	    $scope.addUsers = function (project) {
	    	$location.path('/projects/users/'+project._id);
	    }
	    $scope.report = function(project){
	    	$location.path('/project/reports/'+project._id);
	    }


	})
	.controller('projectCtrl', function($scope, $stateParams, Project){

		var projectId = $stateParams.id;
		$scope.project = Project.get({_id:projectId});

	});
}(angular));


