'use strict';

angular.module('lush', [])

.controller('TaskController', function($scope) {
    
    $scope.names = ['date', 'title'];
    $scope.my = { favorite: '-date' };
    
    $scope.sortList = ['date', 'title'];
    $scope.sortBy = '-date';
    console.log($scope.sortBy);

    $scope.filterAssign = function (task){
        if(!task.isPersonal && !task.isDone){
            return task;
        }
        return;
    }
    $scope.filterPersonal = function (task){
        if(task.isPersonal && !task.isDone){
            return task;
        }
        return;
    }
    $scope.filterHistory = function (task){
        if(task.isDone){
            return task;
        }
        return;
    }

    $scope.tasks=[
        {
            title: 'aClean the toilet assign not',
            assignee: 'John',
            description: 'task 1',
            assigner: 'Mr.Peter',
            date: "2014-09-05T17:57:28.556094Z",
            isPersonal: false,
            isDone: false
        },
        {
            title: 'dClean the floor assign not',
            assignee: 'John2',
            description: 'task 2',
            assigner: 'Mr.Peter2',
            date: "2016-09-05T17:57:28.556094Z",
            isPersonal: false,
            isDone: false
        },
        {
            title: 'eClean the floor2 person not',
            assignee: 'John2',
            description: 'task 2',
            assigner: 'Mr.Peter2',
            date: "2017-10-05T17:57:28.556094Z",
            isPersonal: true,
            isDone: false
        },
        {
            title: 'gClean the floor3 person done',
            assignee: 'John2',
            description: 'task 2',
            assigner: 'Mr.Peter2',
            date: "2015-09-05T17:57:28.556094Z",
            isPersonal: true,
            isDone: true
        },
        {
            title: 'xClean the floor4 assign done',
            assignee: 'John2',
            description: 'task 2',
            assigner: 'Mr.Peter2',
            date: "2013-09-05T17:57:28.556094Z",
            isPersonal: false,
            isDone: true
        },
        {
            title: 'aaaaaaa',
            assignee: 'bbbbbb',
            description: 'cccccc',
            assigner: 'dddddddd',
            date: "2019-09-05T17:57:28.556094Z",
            isPersonal: false,
            isDone: false
        }
    ];
        
})

.controller('TaskFormController', ['$scope', function($scope) {
    
    $scope.taskObject = {title: "", assignee: "", description: "", assigner:"", date:"", isPersonal: true, isDone: false};
    
    $scope.submitTask = function() {
        console.log($scope.taskObject);
        console.log($scope.sortBy);
        $scope.taskObject.date = new Date().toISOString();
        
        console.log($scope.taskObject);
        $scope.tasks.push($scope.taskObject);
        
        $scope.taskForm.$setPristine();
        $scope.taskObject = {title: "", assignee: "", description: "", assigner:"", date:"", isPersonal: true, isDone: false};
    };
    
}])

;
    
    
    
    
    