
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



 // array for dropped items
    $scope.dropped = [];
 
    // array of items for dragging
    $scope.items = [
        {id: 1, name: "Microwave"}, 
        {id: 2, name: "Dishwasher" },
        {id: 3, name: "Phone" },
        {id: 4, name: "Punching Bag" }
    ];
 
    $scope.moveToBox = function(id) {
 
        for (var index = 0; index < $scope.items.length; index++) {
 
            var item = $scope.items[index];
                 
            if (item.id == id) {
                // add to dropped array
                $scope.dropped.push(item);
 
                // remove from items array
                $scope.items.splice(index, 1);
            }
        }
 
        $scope.$apply();
    };
 
    $scope.showItmesLeft = function () {
        alert($scope.items.length + " items left.");
    };
     
    $scope.showItmesDropped = function () {
        alert($scope.dropped.length + " items in drop-box.");
    };




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