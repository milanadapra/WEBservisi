(function (angular) {
	angular.module('task',['task.resource', 'project.resource', 'App.filters','underscore'])
	.controller('tasksCtrl', function($scope, Project, Task, $location, $state, _) {
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

		$scope.createMark = function(project){
			$scope.task.mark = project.mark + '-' + project.counter;
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
		
		$scope.selectedStatus = [];
		
		$scope.setSelectedStatus = function () {
			var id = this.s.id;
			if (_.contains($scope.selectedStatus, id)) {
				$scope.selectedStatus = _.without($scope.selectedStatus, id);
			} else {
				$scope.selectedStatus.push(id);
			}
			return false;
		};

		$scope.isChecked = function (id) {
			if (_.contains($scope.selectedStatus, id)) {
				return 'icon-ok pull-right';
			}
			return false;
		};

		$scope.checkAll = function () {
			$scope.selectedStatus = _.pluck($scope.status, 'id');
		};  

	})
	.controller('taskCtrl', function($scope, $stateParams, Task){
		var taskId = $stateParams.id;
		$scope.task = Task.get({_id:taskId});
	});
	
	angular.module('App.filters', []).filter('statusFilter', [function () {
    return function (tasks, selectedStatus) {
        if (!angular.isUndefined(tasks) && !angular.isUndefined(selectedStatus) && selectedStatus.length > 0) {
            var tempTasks = [];
            angular.forEach(selectedStatus, function (id) {
                angular.forEach(tasks, function (task) {
                    if (angular.equals(task.status.id, id)) {
                        tempTasks.push(task);
                    }
                });
            });
            return tempTasks;
        } else {
            return tasks;
        }
    };
}]);
}(angular));


