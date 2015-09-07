
app.controller('deviceCtrl', function($scope, $http) {
$scope.isVisible = false;
$scope.status = '';
$scope.name = '';
$scope.tags = '';
$scope.lastseen = '';
$scope.created = '';
$scope.edit = true;
$scope.error = false;
$scope.incomplete = false;
$scope.listVisible = true;

$scope.reload = function() {
	if ($scope.playerVisible == true){
		
	$http.get('/online/devices').
	  success(function(data, status, headers, config) {
		$scope.devices = data;
	  }).
	  error(function(data, status, headers, config) {
	   console.log("error when retrieving devices");
	  });
  }
}
  
  
$scope.editDevice = function(id) {
  $scope.isVisible = true;
  $scope.listVisible = false;
  if (id == 'new') {
    $scope.edit = true;
    $scope.incomplete = true;
    } else {
		$scope.edit = false;
		$scope.status = $scope.devices[id-1].status;
		$scope.name = $scope.devices[id-1].name;
		$scope.tags = $scope.devices[id-1].tags;
		$scope.temp = $scope.devices[id-1].temp;
		$scope.lastseen = $scope.devices[id-1].lastseen;
		$scope.created = $scope.devices[id-1].created;
		$scope.localip = $scope.devices[id-1].localip;
  }
};

$scope.save = function() {
 $scope.isVisible = false;
 $scope.listVisible = true;
};

$scope.cancel = function() {
 $scope.isVisible = false;
 $scope.listVisible = true;
};

$scope.$watch('playerVisible',function(){$scope.reload();});
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

});