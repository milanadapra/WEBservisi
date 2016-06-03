(function (angular) {
	angular.module('comment',['comment.resource', 'task.resource'])
	.controller('commentCtrl', function($scope, Comment, Task, $location) {

		var loadComments = function() {
		$scope.comment = new Comment();
		$scope.comments = Task.comments;
		};
		loadComments();

		$scope.save = function (task) {
			//pri pozivu custom post metode (save) prosledjuje se parametar blogEntryId
			if (!$scope.comment._id){
			$scope.comment.$save({'taskId':task._id},function () {
				loadComments();
				task.$get();
			});	
			}
			else {
				console.log("dosaoo");
				$scope.comment.$update();	
				console.log("prosao update");	
			}

		} 
		$scope.delete = function(task, comm){

			$scope.comment.$delete({'taskId':task._id, 'commentId':comm._id}, function () {
			$scope.comment.$delete(comm);
			task.$get();
			});
		}	

		$scope.edit = function(comm) {
			$scope.comment = comm;
		}	
		
	});
}(angular));


