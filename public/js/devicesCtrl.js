
app.controller('deviceCtrl', function($scope, $http) {
	
$scope.isVisible = false;

$scope.status = '';
$scope.name = '';
$scope.tags = '';
$scope.lastseen = '';
$scope.created = '';
$scope.description = '';
$scope.owner = '';

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false;
$scope.listVisible = true;

$scope.styleSave="glyphicon glyphicon-save";
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
	$scope.temperature = $scope.devices[index].temperature;
	$scope.lastseen = $scope.devices[index].lastseen;
	$scope.created = $scope.devices[index].created;
	$scope.localip = $scope.devices[index].localip;
	$scope.description =  $scope.devices[index].description;
	$scope.owner =  $scope.devices[index].owner;

};


$scope.save = function() {
	
	// SEND THE NEW CONTENT TO THE SERVER

	var deviceData = {string: {name: $scope.name , description: $scope.description, owner: $scope.owner , tags: $scope.tags}};
	var jsonDevice = JSON.stringify(deviceData);
	$scope.styleSave="glyphicon glyphicon-transfer";
	$http.post('/online/devices/'+$scope.name, deviceData).
	  then(function(response) {
		if (response.status == 200){
			$scope.styleSave="glyphicon glyphicon-save";
			$scope.isVisible = false;
			$scope.listVisible = true;
			$scope.reload(); // refresh the list
		}
	  }, function(error) {
		// called asynchronously if an error occurs
		console.log("> error when savings" + error);
		$scope.styleSave="glyphicon glyphicon-save";
	  });
	
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
  if ($scope.edit && (!$scope.name.length || !$scope.status.length)) {
       $scope.incomplete = true;
  }
};




});