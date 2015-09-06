
app.controller('broadcastCtrl', function($scope, $http) {
$scope.isVisible = false;
$scope.edit = true;
$scope.error = false;
$scope.incomplete = false;

$http = $http;
$http.get('/online/broadcasts').success(function(data, status, headers, config) {
		$scope.broadcasts = data;
	  }).
	  error(function(data, status, headers, config) {
	   console.log("error when retrieving broadcasts");
	  });
  
$scope.reload = function() {
	$http.get('/online/broadcasts').success(function(data, status, headers, config) {
		$scope.broadcasts = data;
	  }).
	  error(function(data, status, headers, config) {
	   console.log("error when retrieving broadcasts");
	  });
}

/*
$scope.editBroadcast = function(id) {
  $scope.isVisible = true;
  if (id == 'new') {
    $scope.edit = true;
    $scope.incomplete = true;
    } else {
    $scope.edit = false;
    $scope.status = $scope.broadcasts[id-1].status;
    $scope.name = $scope.broadcasts[id-1].name;
	$scope.tags = $scope.broadcasts[id-1].tags;
  }
};

$scope.openForm = function(){
	
};

$scope.save = function() {
 $scope.isVisible = false;
};

$scope.$watch('status',function() {$scope.test();});
$scope.$watch('name', function() {$scope.test();});
$scope.$watch('tags', function() {$scope.test();});

$scope.test = function() {
  $scope.incomplete = false;
  if ($scope.edit && (!$scope.name.length ||
  !$scope.status.length)) {
       $scope.incomplete = true;
  }
};
*/
});