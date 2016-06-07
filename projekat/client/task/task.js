(function (angular) {
	angular.module('task',['task.resource', 'project.resource'])
	.controller('tasksCtrl', function($scope, Project, Task, $location, $state) {
		var loadTasks = function () {
			$scope.tasks = Project.tasks;		
			$scope.task = new Task();
			$scope.taskses = Task.query();

			 $scope.priority = [
        		 {id: 1, name: 'Blocker'},
       			 {id: 2, name: 'Critical'},
       			 {id: 3, name: 'Major'},
       			 {id: 4, name: 'Minor'},
        		 {id: 5, name: 'Trivial'}
    		];

    		$scope.task.priority = { id: 5, name: 'Trivial' };

    		$scope.status = [
    		{id: 1, name:'To Do'},
    		{id: 2, name:'In Progress'},
    		{id: 3, name:'Verify'},
    		{id: 4, name:'Done'}
    		];

    		$scope.task.status = { id: 1, name:'To Do' };

		}
		loadTasks();

		var reloadRoute = function() {
  			 $state.reload();
		}
		$scope.save = function(project) {
			if(!$scope.task._id){
				$scope.task.$save({'projectId':project._id},function () {
				loadTasks();
				project.$get();
				reloadRoute();
			});
			}
			else{
				$scope.task.$update(function(){
				loadTasks();
				project.$get();
				reloadRoute();
				});				
			}
		} 
		$scope.delete = function (ta, project) {
			$scope.task.$delete({'projectId':project._id, 'taskId':ta._id},function (){
				$scope.task.$delete(ta);
				loadTasks();
				project.$get();
				reloadRoute();
			});
		}
		$scope.edit = function (task) {
			$scope.task = new Task(task);
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


