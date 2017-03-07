'use strict';

angular.module('lush', [])

.controller('TaskController', function($scope) {
    
//    $scope.sortList = ['title', 'date'];
//    $scope.sortBy = { choose: 'title' };
//    console.log($scope.sortBy);
    
    $scope.testObject = function(sortObj){
        return sortObj == $scope.sortBy.choose;
    };
    
    // Filter Tab panel
    $scope.filterAssign = function (task){
        if(!task.isDone){
            return true;
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
    
//    $scope.taskObject = {title: "", assignee: "", description: "", assigner:"", date:"", isPersonal: true, isDone: false};
    
    $scope.taskObject = {
        "dueDate": "2017-12-31T00:00:00+02:00",
        "isDone": false,
        "text": ""
    }
    
    $scope.submitTask = function() {
    
        var assignee = $("#assignee").val();
        $scope.taskObject.text = $("#title").val();
        
        $.ajax({
            type: "POST",
            async: false,
            url: 'http://localhost:8080/Taskzone/api/users/'+assignee+'/tasks',
            contentType: 'application/json',
            data: JSON.stringify($scope.taskObject),
            success: function() {
                console.log("add Task Completed")
            }
        });
        
        $scope.tasks = [];
        $scope.getTasks();
        
        
//        $scope.tasks.push($scope.taskObject);
        
        $scope.taskForm.$setPristine();
//        $scope.taskObject = {title: "", assignee: "", description: "", assigner:"", date:"", isPersonal: true, isDone: false};
        
        $scope.taskObject = {
        "dueDate": "2017-12-31T00:00:00+02:00",
        "isDone": false,
        "text": ""
        }
        
    };
    
}])


.controller('UserController', ['$scope', function($scope) {
    
    $scope.user = {
        username: 'abc',
        fullname: 'abc',
        password: 'qwerty',
        isManager: true,
    };

    $scope.getTasks = function(){
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
    }
    
    $scope.tasks = [];
    $scope.getTasks();
    
    console.log("duoi");
    console.log($scope.tasks);
      
    $scope.editTaskAssign = function(task, id){
        var newData = task;
        newData["description"] = $("#descriptionEditAssign"+id).val();
        newData["text"] = $("#textEditAssign"+id).val();
        
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
                $('#taskModalAssign'+editedTask.id).modal('hide');
                $('.modal-backdrop').remove();
                $("body").removeClass("modal-open");
            }
        });  
    }
    
    $scope.editTaskAll = function(task, id){
        var newData = task;
        newData["description"] = $("#descriptionEditAll"+id).val();
        newData["text"] = $("#textEditAll"+id).val();
        
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
                $('#taskModalAll'+editedTask.id).modal('hide');
                $('.modal-backdrop').remove();
                $("body").removeClass("modal-open");
            }
        });  
    }
    
    $scope.editTaskHistory = function(task, id){
        var newData = task;
        newData["description"] = $("#descriptionEditHistory"+id).val();
        newData["text"] = $("#textEditHistory"+id).val();
        
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
                $('#taskModalHistory'+editedTask.id).modal('hide');
                $('.modal-backdrop').remove();
                $("body").removeClass("modal-open");
            }
        });  
    }
    
    $scope.taskDoneFunc = function(task) {
        var newTask = task;
        newTask.isDone = true;
        $.ajax({
            type: "PUT",
            async: false,
            url: 'http://localhost:8080/Taskzone/api/users/'+$scope.user.username+'/tasks/'+task.id,
            contentType: 'application/json',
            data: JSON.stringify(newTask),
            success: function(editedTask) {
                console.log("sau khi edit")
                console.log(editedTask);
                for (var i = 0; i < $scope.tasks.length; i++) { 
                    if($scope.tasks[i].id == editedTask.id){
                        $scope.tasks[i] = editedTask;
                    }
                }
            }
        });
    };
    
    $scope.taskDeleteFunc = function(task) {
        $.ajax({
            type: "DELETE",
            async: false,
            url: 'http://localhost:8080/Taskzone/api/users/'+$scope.user.username+'/tasks/'+task.id,
            contentType: 'application/json',
            success: function() {
                console.log("deleted");
            }
        });
        
        $scope.tasks = [];
        $scope.getTasks();
    };
    
}])

;