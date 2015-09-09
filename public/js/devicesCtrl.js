
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

$scope.stylereload = "glyphicon glyphicon-refresh";
 
$scope.reload = function() {

	if ($scope.playerVisible == true){
	$scope.stylereload = "glyphicon glyphicon-transfer";
	
	$http.get('/online/devices').
	  success(function(data, status, headers, config) {
		$scope.devices = data;
		$scope.stylereload = "glyphicon glyphicon-refresh";
	  }).
	  error(function(data, status, headers, config) {
	   console.log("error when retrieving devices");
	   $scope.stylereload = "glyphicon glyphicon-refresh";
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
		
		var index = 0;
		var numDevices;
		for(var i = 0, numDevices = $scope.devices.length; i < numDevices; i++)
		{
		  if($scope.devices[i].id == id)
		  {
			index = i;
		  }
		}
		
		$scope.edit = false;
		$scope.status = 'online';
		$scope.name = $scope.devices[index].name;
		$scope.tags = $scope.devices[index].tags;
		$scope.temp = $scope.devices[index].temperature;
		$scope.lastseen = $scope.devices[index].lastseen;
		$scope.created = $scope.devices[index].created;
		$scope.localip = $scope.devices[index].localip;
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