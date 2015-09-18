
app.controller('mediaCtrl', function($scope, $http) {
$scope.isVisible = false;
$scope.listVisible = true;

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false;

$scope.styleSave="glyphicon glyphicon-save";
$scope.stylereload = "glyphicon glyphicon-refresh";

$scope.reload = function() {

	if ($scope.mediaVisible == true){
	$scope.stylereload = "glyphicon glyphicon-transfer";
	
	$http.get('/online/medias').
	  success(function(data, status, headers, config) {
		$scope.medias = data;
		$scope.stylereload = "glyphicon glyphicon-refresh";
	  }).
	  error(function(data, status, headers, config) {
	   console.log("error when retrieving devices");
	   $scope.stylereload = "glyphicon glyphicon-refresh";
	  });
  }
}
 
$scope.$watch('mediaVisible',function() {$scope.reload();}); 




});