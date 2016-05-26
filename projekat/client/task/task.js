(function (angular) {
	angular.module('task',['task.resource', 'project.resource'])
	.controller('tasksCtrl', function($scope,Project, Task,$location) {
		var loadTasks = function () {
			$scope.tasks = Project.tasks;		
			$scope.task = new Task();
		}
		loadTasks();
		$scope.save = function(project) {
			if(!$scope.task._id){
				$scope.task.$save({'projectId':project._id},function () {
				loadTasks();
				project.$get();
			});
			}
			else{
				$scope.task.$update(loadTasks);				
			}
		} 
		$scope.delete = function (task) {
			task.$delete(loadTasks);
		}
		$scope.edit = function (task) {
			$scope.task = task;
		}
	    $scope.details = function (task) {
	      $location.path('/tasks/'+task._id);
	    }
	})
	.controller('taskCtrl', function($scope, $stateParams, Task){
		var taskId = $stateParams.id;
		$scope.task = Task.get({_id:taskId});
	});
}(angular));


