(function (angular) {
	angular.module('task',['task.resource'])
	.controller('tasksCtrl', function($scope, $location, Task) {
		var loadTasks = function () {
			$scope.tasks = Task.query();		
			$scope.task = new Task();
		}
		loadTasks();
		$scope.save = function () {
			if(!$scope.task._id){
				$scope.task.$save(loadTasks);
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


