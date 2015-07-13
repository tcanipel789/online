app.controller('deviceCtrl', function($scope) {
$scope.isVisible = false;
$scope.status = '';
$scope.name = '';
$scope.tags = '';

$scope.devices = [
{id:'1', status:'offline', name:'i5-test',  tags: 'test'},
{id:'2', status:'offline', name:'i5-test',  tags: 'test'},
{id:'3', status:'offline', name:'i5-test',  tags: 'test'},
{id:'4', status:'offline', name:'i5-test',  tags: 'test'},
{id:'5', status:'offline', name:'i5-test',  tags: 'test'},
{id:'6', status:'offline', name:'i5-test',  tags: 'test'},
{id:'7', status:'offline', name:'i5-test',  tags: 'test'}
];

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false;

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

});