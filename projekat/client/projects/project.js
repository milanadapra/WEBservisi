(function (angular) {
	angular.module('project',['project.resource', 'task.resource'])
	.controller('projectsCtrl', function($scope, $location, Project, Task, $state) {
		var loadProjects = function () {
			$scope.projects = Project.query();		
			$scope.project = new Project();
		}
		loadProjects();
		
		var reloadRoute = function() {
  			 $state.reload();
		}
		
		$scope.save = function () {
			if(!$scope.project._id){
				$scope.project.$save(function(){
					loadProjects();
					reloadRoute();
				});
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


