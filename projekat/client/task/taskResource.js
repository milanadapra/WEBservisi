(function (angular) {
	angular.module('task.resource',['ngResource'])
	.factory('Task', function($resource){
		var Task = $resource('/api/tasks/:_id/:_id2',
			{_id:'@_id', _id2:'@_id2'},
			{
				update:{method:'PUT'},
				save:{
					method:'POST',
					url:'/api/tasks/project/:projectId'
				},
				delete:{
					method:'DELETE',
					url:'/api/tasks/project/:projectId/:taskId'
				}
			});
		return Task;
	})
}(angular));