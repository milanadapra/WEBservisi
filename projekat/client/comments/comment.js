(function (angular) {
	angular.module('comment',['comment.resource', 'task.resource'])
	.controller('commentCtrl', function($scope, Comment, Task, $location) {
		$scope.comment = new Comment();
		$scope.comments = Task.comments;
		$scope.save = function (task) {
			//pri pozivu custom post metode (save) prosledjuje se parametar blogEntryId
			$scope.comment.$save({'taskId':task._id},function () {
				$scope.comment = new Comment();
				task.$get();
			});	
		} 
		$scope.del = function(comm, task){
			console.log("uso11");
			$scope.comment.$delete({'commentId':comm._id},function () {
				console.log("uso22");
				task.$get();

			});
		}
		
		
	});
}(angular));


