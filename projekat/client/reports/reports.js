(function (angular) {
	angular.module('reports',[])
	.controller('reportsCtrl', function($scope, $stateParams, $location){
		$scope.data = [];
		$scope.labels = [];


		$scope.fun = function(project, user){

			if(project.users && user){
				var userr = [];
				var taskk = [];
				var usersId = [];
				user.forEach(function(us){
					if(project.users.indexOf(us._id)!==-1){
						userr.push(us.name);
						usersId.push(us._id);
					}
				});
				
				
					usersId.forEach(function(us){
							var ta = 0;
							var brojZad = 0;
							project.tasks.forEach(function(t){
								brojZad = brojZad + 1;
								if(t.assignedTo === us)	{
									ta = ta + 1;
								}
							});
							ta =Math.round((ta/brojZad)*100*100)/100;
							taskk.push(ta);
					});
			$scope.data = taskk;
			$scope.labels = userr;

		//console.log(project.users);
		//$location.path('/projects/users/'+project._id);
			}
		}
	});
}(angular));


