
app.controller('deviceCtrl', function($scope, $http) {
$scope.isVisible = false;
$scope.status = '';
$scope.name = '';
$scope.tags = '';

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false;

	
$http.get('/online/devices').
  success(function(data, status, headers, config) {
    $scope.devices = data;
  }).
  error(function(data, status, headers, config) {
   console.log("error when retrieving devices");
  });

$scope.reload = function() {
$http.get('/online/devices').
  success(function(data, status, headers, config) {
    $scope.devices = data;
  }).
  error(function(data, status, headers, config) {
   console.log("error when retrieving devices");
  });
}
  
  
$scope.editDevice = function(id) {
  $scope.isVisible = true;
  if (id == 'new') {
    $scope.edit = true;
    $scope.incomplete = true;
    } else {
    $scope.edit = false;
    $scope.status = $scope.devices[id-1].status;
    $scope.name = $scope.devices[id-1].name;
	$scope.tags = $scope.devices[id-1].tags;
	$scope.temp = $scope.devices[id-1].temp;
  }
};

$scope.save = function() {
 $scope.isVisible = false;
};

$scope.cancel = function() {
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

});