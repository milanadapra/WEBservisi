(function (angular) {
	angular.module('comment.resource',['ngResource'])
	.factory('Comment', function($resource){
		var Comment = $resource('/api/comments/:_id/:_id2',
			{_id:'@_id',_id2:'@_id2'},
			{	
				update: {method:'PUT'},
				save:{//custom post metoda koja postavlja komentar za zapis
					method:'POST',
					url:'/api/comments/task/:taskId'
				},
				delete:{
					method:'DELETE',
					url: '/api/comments/task/:taskId/:commentId'
				}
			}
			);
		return Comment;
	});
}(angular));