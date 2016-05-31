(function (angular) {
	angular.module('task.resource',['ngResource'])
	.factory('Task', function($resource){
		var Task = $resource('/api/tasks/:_id',
			{_id:'@_id'},
			{
				update:{method:'PUT'},
				save:{
					method:'POST',
					url:'/api/tasks/project/:projectId'
				}
			});
		return Task;
	})
}(angular));