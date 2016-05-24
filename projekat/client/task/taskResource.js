(function (angular) {
	angular.module('task.resource',['ngResource'])
	.factory('Task', function($resource){
		var Task = $resource('/api/tasks/:_id',
			{_id:'@_id'},
			{update:{method:'PUT'}});
		return Task;
	})
}(angular));