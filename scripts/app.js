'use strict';

angular.module('lush', [])

.controller('TaskController', function($scope) {
    
    $scope.sortList = ['title', 'date'];
    $scope.sortBy = { choose: 'title' };
    console.log($scope.sortBy);
    
    $scope.testObject = function(sortObj){
        return sortObj == $scope.sortBy.choose;
    };
    
    // Filter Tab panel
    $scope.filterAssign = function (task){
        if(!task.isDone){
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

//    $scope.tasks1=[
//        {
//            title: 'aClean the toilet assign not',
//            assignee: 'John',
//            description: 'task 1',
//            assigner: 'Mr.Peter',
//            date: "2014-09-05T17:57:28.556094Z",
//            isPersonal: false,
//            isDone: false
//        },
//        {
//            title: 'dClean the floor assign not',
//            assignee: 'John2',
//            description: 'task 2',
//            assigner: 'Mr.Peter2',
//            date: "2016-09-05T17:57:28.556094Z",
//            isPersonal: false,
//            isDone: false
//        },
//        {
//            title: 'eClean the floor2 person not',
//            assignee: 'John2',
//            description: 'task 2',
//            assigner: 'Mr.Peter2',
//            date: "2017-10-05T17:57:28.556094Z",
//            isPersonal: true,
//            isDone: false
//        },
//        {
//            title: 'gClean the floor3 person done',
//            assignee: 'John2',
//            description: 'task 2',
//            assigner: 'Mr.Peter2',
//            date: "2015-09-05T17:57:28.556094Z",
//            isPersonal: true,
//            isDone: true
//        },
//        {
//            title: 'xClean the floor4 assign done',
//            assignee: 'John2',
//            description: 'task 2',
//            assigner: 'Mr.Peter2',
//            date: "2013-09-05T17:57:28.556094Z",
//            isPersonal: false,
//            isDone: true
//        },
//        {
//            title: 'aaaaaaa',
//            assignee: 'bbbbbb',
//            description: 'cccccc',
//            assigner: 'dddddddd',
//            date: "2019-09-05T17:57:28.556094Z",
//            isPersonal: false,
//            isDone: false
//        }
//    ];
        
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
        
        $('#addTaskModal').modal('hide');
        $('.modal-backdrop').remove();
    };
    
}])

.controller('LoginController', ['$scope', function($scope) {
    
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

.controller('UserController', ['$scope', function($scope) {
    
    $scope.user = {
        username: 'abc',
        fullname: 'abc',
        password: 'qwerty',
        isManager: true,
    };

    $scope.tasks = [];
    
    $.ajax({
        type: "GET",
        async: false,
        url: 'http://localhost:8080/Taskzone/api/users/'+$scope.user.username+'/tasks',
        dateType: 'application/json',
        success: function(data) {
            console.log(data);
            $scope.tasks = data;
        }
    });
      
    $scope.editTask = function(task, id){
        console.log("chuan bi")
        console.log(task);
        console.log(id);
        console.log($("#textEdit").val());
        var newData = {};
        newData["created"] = task.created;
        newData["description"] = $("#descriptionEdit"+id).val();
        newData["dueDate"] = task.dueDate;
        newData["feedback"] = task.feedback;
        newData["id"] = task.id;
        newData["isDone"] = task.isDone;
        newData["text"] = $("#textEdit"+id).val();
        
        $.ajax({
            type: "PUT",
            async: false,
            url: 'http://localhost:8080/Taskzone/api/users/'+$scope.user.username+'/tasks/'+task.id,
            contentType: 'application/json',
            data: JSON.stringify(newData),
            success: function(editedTask) {
                console.log("sau khi edit")
                console.log(editedTask);
                for (var i = 0; i < $scope.tasks.length; i++) { 
                    if($scope.tasks[i].id == editedTask.id){
                        $scope.tasks[i] = editedTask;
                    }
                }
                $('#editTaskModal').modal('hide');
                $('.modal-backdrop').remove();
                $("body").removeClass("modal-open");
            }
        });
        
        console.log("asd");
        
        
    }
    
}])

;
    
    
    
    
    