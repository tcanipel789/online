
app.controller('mediaCtrl', function($scope, $http) {
$scope.isVisible = false;
$scope.edit = true;
$scope.error = false;
$scope.incomplete = false;

  
 $scope.reload = function() {
	if ($scope.mediaVisible == true){
	$http.get('/online/medias').
	success(function(data, status, headers, config) {
		$scope.medias = data;
	}).
	error(function(data, status, headers, config) {
		console.log("error when retrieving medias");
	});
  }
}
  
$scope.$watch('mediaVisible',function() {$scope.reload();}); 

/*
$scope.editmedia = function(id) {
  $scope.isVisible = true;
  if (id == 'new') {
    $scope.edit = true;
    $scope.incomplete = true;
    } else {
    $scope.edit = false;
    $scope.status = $scope.medias[id-1].status;
    $scope.name = $scope.medias[id-1].name;
	$scope.tags = $scope.medias[id-1].tags;
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