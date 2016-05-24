(function (angular) {
	angular.module('project.resource',['ngResource'])
	.factory('Project', function($resource){
		var Project = $resource('/api/projects/:_id',
			{_id:'@_id'});
		return Project;
	})
}(angular));