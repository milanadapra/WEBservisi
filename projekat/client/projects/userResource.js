(function (angular) {
	angular.module('user.resource',['ngResource'])
	.factory('User', function($resource){
		var User = $resource('/api/users/:_id/:_id2',
			{_id:'@_id',_id2:'@_id2'},
			{
	
				update:{
					method:'POST',
					url:'/api/users/project/:projectId/:userId'
				},
				removeUser:{
					method:'DELETE',
					url:'/api/users/project/:projectId/:userId'
				}
			});
		return User;
	})
}(angular));