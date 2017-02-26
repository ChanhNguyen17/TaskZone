'use strict';

angular.module('lush', [])

.controller('TaskController', function($scope) {
    
    $scope.sortBy = "";
    
    $scope.sortAssign = false;
    $scope.sortPersonal = false;
    $scope.sortHistory = false;

    $scope.checkChange = function() {
        
    }
    
    $scope.filterTask = function(){
        console.log($scope.sortAssign);
        return;
    };
    
    $scope.tasks=[
        {
            assignee: 'John',
            description: 'task 1',
            assigner: 'Mr.Peter',
            date: "2014-09-05T17:57:28.556094Z",
            isPersonal: false,
            isDone: false
        },
        {
            assignee: 'John2',
            description: 'task 2',
            assigner: 'Mr.Peter2',
            date: "2015-09-05T17:57:28.556094Z",
            isPersonal: false,
            isDone: false
        }
    ];
        
})

.controller('TaskFormController', ['$scope', function($scope) {
    
    $scope.taskObject = {assignee: "", description: "", assigner:"", date:"", isPersonal: false, isDone: false};
    
    $scope.submitTask = function() {
        $scope.taskObject.date = new Date().toISOString();
        
        $scope.taskObject.isPersonal = $scope.taskObject.isPersonal == "1";
        console.log($scope.taskObject);
        $scope.tasks.push($scope.taskObject);
        
        $scope.taskForm.$setPristine();
        $scope.taskObject = {assignee: "", description: "", assigner:"", date:"", isPersonal: false, isDone: false};
        console.log($scope.taskObject);
    };
    
}])

;
    
    
    
    
    