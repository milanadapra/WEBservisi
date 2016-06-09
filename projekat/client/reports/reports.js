(function (angular) {
	angular.module('reports',[])
	.controller('reportsCtrl', function($scope, $stateParams, $location, $filter){
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
			}
		}


		$scope.labels1 = [];
  		$scope.data1 = [];

		$scope.fun1 = function(project, user){

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
								if(t.assignedTo === us && t.status.name==="Done")	{
									ta = ta + 1;
									brojZad = brojZad + 1;
								}else if(t.assignedTo === us && t.status.name!=="Done"){
									brojZad = brojZad + 1;
								}
							});
							if(brojZad===0)
								taskk.push(0);
							else{
								ta = Math.round((ta/brojZad)*100*100)/100;
								taskk.push(ta);
							}
					});
			$scope.labels1 = userr;
			$scope.data1 = [taskk];
			}
		}

		$scope.labels2 = [];
		$scope.data2 = [];

		$scope.fun2 = function(project){

			if(project.users){
				var userr1 = ["07/06/2016 00:00:00","07/06/2016 12:00:00","08/06/2016 00:00:00","08/06/2016 12:00:00","09/06/2016 00:00:00", "09/06/2016 12:00:00", "10/06/2016 00:00:00", "10/06/2016 12:00:00", "11/06/2016 00:00:00"];
				var userr = [];
				var taskk = [];
	
				var ta = 0;
				project.tasks.forEach(function(t){
					ta = ta + 1;
						if(t.history.length !== 0){
							userr.push($filter('date')(t.history[0].createdAt, "dd/MM/yyyy HH:mm:ss"));				
						}
						else{
							userr.push($filter('date')(t.createdAt, "dd/MM/yyyy HH:mm:ss"));					
						}
						taskk.push(ta);	
				});

				userr = $filter('orderBy')(userr, -Date );

				
				userr1.forEach(function(u1){
					var keepGoing = true;
					userr.forEach(function(u){
						if(keepGoing) {
							if(u1<u){
								taskk.push(userr.indexOf(u));
								keepGoing = false;
							}
						}
					});
				});
			
			userr.push.apply(userr,userr1);
			$scope.labels2 = $filter('orderBy')(userr, -Date );
			$scope.data2 = [$filter('orderBy')(taskk, -Number )];
			}
		}

		$scope.labels3 = [];
		$scope.data3 = [];

		$scope.fun3 = function(project){

			if(project.users){
				var userr = [];
				var taskk = [];
				var userr1 = ["07/06/2016 00:00:00","07/06/2016 12:00:00","08/06/2016 00:00:00","08/06/2016 12:00:00","09/06/2016 00:00:00", "09/06/2016 12:00:00", "10/06/2016 00:00:00", "10/06/2016 12:00:00", "11/06/2016 00:00:00"];
				
	
				var ta = 0;
				project.tasks.forEach(function(t){
					ta = ta + 1;
					if(t.status.name==="Done") {
					userr.push($filter('date')(t.createdAt, "dd/MM/yyyy HH:mm:ss"));
					taskk.push(ta);					
					}
				});

				userr = $filter('orderBy')(userr, -Date );

				userr1.forEach(function(u1){
					var keepGoing = true;
					userr.forEach(function(u){
						if(keepGoing) {
							if(u1<u){
								taskk.push(userr.indexOf(u));
								keepGoing = false;
							}
						}
					});
				});
			
			userr.push.apply(userr,userr1);
			
			$scope.labels3 = $filter('orderBy')(userr, -Date );
			$scope.data3 = [$filter('orderBy')(taskk, -Number )];
			}
		}

		$scope.labels4 = [];
		$scope.data4 = [];
		$scope.series = [];

		$scope.fun4 = function(project, user){

			if(project.users && user){
				var userr = [];
				var taskk = [];

					var timeline = [];
					user.forEach(function(us){
							var ta = 0;
							var noviNiz = [];
							project.tasks.forEach(function(t){
								if(t.assignedTo === us._id && t.status.name==="Done"){
									ta = ta + 1;
								
									timeline.push($filter('date')(t.createdAt, "dd/MM/yyyy HH:mm:ss"));
									if(userr.indexOf(us.name)==-1)
										userr.push(us.name);
								}
							noviNiz.push(ta);
							});
							if(ta!==0){
								taskk.push(noviNiz);
							}
					});
			$scope.series = userr;
			$scope.labels4 = $filter('orderBy')(timeline, -Date );
			$scope.data4 = taskk;
			}
		}

		


	});
}(angular));


