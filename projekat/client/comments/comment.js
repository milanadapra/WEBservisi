(function (angular) {
	angular.module('comment',['comment.resource', 'task.resource'])
	.controller('commentCtrl', function($scope, Comment, Task, $location) {
		$scope.comment = new Comment();
		$scope.save = function (task) {
			//pri pozivu custom post metode (save) prosledjuje se parametar blogEntryId
			$scope.comment.$save({'taskId':task._id},function () {
				$scope.comment = new Comment();
				task.$get();
			});	
		} 
	});
}(angular));


