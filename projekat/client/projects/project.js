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


	})
	.controller('projectCtrl', function($scope, $stateParams, Project){

		var projectId = $stateParams.id;
		$scope.project = Project.get({_id:projectId});

		$scope.data = [];
		$scope.labels = [];
		$scope.fun = function(project, user){
			if(project.users && user){
				var userr = [];
				var taskk = [];
				var usersId = [];
				user.forEach(function(us){
					if(project.users.indexOf(us._id)!==-1){
						userr.push(us.name);
						usersId.push(us._id);
					}
				});
				
				
					usersId.forEach(function(us){
							var ta = 0;
							var brojZad = 0;
							project.tasks.forEach(function(t){
								brojZad = brojZad + 1;
								console.log(t.assignedTo);
								if(t.assignedTo === us)	{
									console.log("usaoo");
									ta = ta + 1;
								}
							});
							ta =Math.round((ta/brojZad)*100*100)/100;
							taskk.push(ta);
					});
				console.log(taskk);
			$scope.data = taskk;
			$scope.labels = userr;
		//console.log(project.users);
		//$location.path('/projects/users/'+project._id);
			}

		}
	});
}(angular));


