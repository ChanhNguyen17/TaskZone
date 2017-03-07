'use strict';

angular.module('lush', [])

//.config(function ($routeProvider) {
//    $routeProvider
//    .when('/login', {
//        templateUrl: 'login.html',
////        controller: 'LoginController'
//    })
//
//})

.controller('TaskController', function($scope) {
    
//    $scope.sortList = ['title', 'date'];
//    $scope.sortBy = { choose: 'title' };
//    console.log($scope.sortBy);
    
    console.log("task here");
    
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
        "title":"",
        "dueDate": "2017-12-31T00:00:00+02:00",
        "isDone": false,
        "text": ""
    }
    
    $scope.submitTask = function() {
    
        var assignee = $("#assignee").val();
        $scope.taskObject.title = $("#title").val();
        $scope.taskObject.text = $("#text").val();
        
        var dateTypeVar = $("#addDueDate").datepicker('getDate');
        var date = $.datepicker.formatDate('yy-mm-dd', dateTypeVar);
                
        $scope.taskObject.dueDate = date+'T15:05:04+02:00';
        
        $.ajax({
            type: "POST",
            async: false,
            url: 'http://localhost:8080/Taskzone/api/users/'+assignee+'/tasks',
            contentType: 'application/json',
            data: JSON.stringify($scope.taskObject),
            success: function() {
                console.log("add Task Completed");
                $( function() {
                    $( ".datepicker" ).datepicker({
                        dateFormat: 'M d, yy',
                    });
                });
                $('#addTaskModal').modal('hide');
                $('.modal-backdrop').remove();
                $("body").removeClass("modal-open");
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
 
    console.log("loading");
//    console.log(sharedProperties.getProperty());
    
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
    };
    
    console.log("fun");
    $scope.tasks = [];
    if($scope.user.username!=''){
        $scope.getTasks();
    }
    
//    $scope.loginSubmit = function() {
//        console.log("ok");
//        var userLogin = $("#userNameLogin").val();
//        var passwordLogin = $("#passwordLogin").val();
//        $scope.user.username = userLogin;
//        $scope.user.password = passwordLogin;
//        window.location.href = "index.html";
//        $scope.getTasks();
//    };

    for (var i = 0; i < $scope.tasks.length; i++) { 

        var date = $scope.tasks[i].dueDate;
        date = new Date(date);
        
        $scope.tasks[i].dueDate = date;
    };
    
    console.log("duoi");
    console.log($scope.tasks);
      
    $scope.editTaskAssign = function(task, id){
        var newData = task;
        newData["text"] = $("#descriptionEditAssign"+id).val();
        newData["title"] = $("#titleEditAssign"+id).val();
        
        var dateTypeVar = $("#dueDateAssign"+id).datepicker('getDate');
        var date = $.datepicker.formatDate('yy-mm-dd', dateTypeVar);
                
        newData["dueDate"] = date+'T15:05:04+02:00';

        $.ajax({
            type: "PUT",
            async: false,
            url: 'http://localhost:8080/Taskzone/api/users/'+$scope.user.username+'/tasks/'+task.id,
            contentType: 'application/json',
            data: JSON.stringify(newData),
            success: function(editedTask) {
                for (var i = 0; i < $scope.tasks.length; i++) { 
                    if($scope.tasks[i].id == editedTask.id){
                        $scope.tasks[i] = editedTask;
                    }
                }
                $('#taskModalAssign'+editedTask.id).modal('hide');
                $('.modal-backdrop').remove();
                $("body").removeClass("modal-open");
                
                $( function() {
                    $( ".datepicker" ).datepicker({
                        dateFormat: 'M d, yy',
                    });
                });
            }
        });  
    };
    
    $scope.editTaskAll = function(task, id){
        var newData = task;
        newData["text"] = $("#descriptionEditAll"+id).val();
        newData["title"] = $("#textEditAll"+id).val();
   
        var dateTypeVar = $("#dueDateAll"+id).datepicker('getDate');
        var date = $.datepicker.formatDate('yy-mm-dd', dateTypeVar);
                
        newData["dueDate"] = date+'T15:05:04+02:00';
        
        $.ajax({
            type: "PUT",
            async: false,
            url: 'http://localhost:8080/Taskzone/api/users/'+$scope.user.username+'/tasks/'+task.id,
            contentType: 'application/json',
            data: JSON.stringify(newData),
            success: function(editedTask) {
                for (var i = 0; i < $scope.tasks.length; i++) { 
                    if($scope.tasks[i].id == editedTask.id){
                        $scope.tasks[i] = editedTask;
                    }
                }
                $('#taskModalAll'+editedTask.id).modal('hide');
                $('.modal-backdrop').remove();
                $("body").removeClass("modal-open");
                
                $( function() {
                    $( ".datepicker" ).datepicker({
                        dateFormat: 'M d, yy',
                    });
                });
            }
        });  
    };
    
    $scope.editTaskHistory = function(task, id){
        var newData = task;
        newData["text"] = $("#descriptionEditHistory"+id).val();
        newData["title"] = $("#textEditHistory"+id).val();
        
        var dateTypeVar = $("#dueDateHistory"+id).datepicker('getDate');
        var date = $.datepicker.formatDate('yy-mm-dd', dateTypeVar);
                
        newData["dueDate"] = date+'T15:05:04+02:00';
        
        $.ajax({
            type: "PUT",
            async: false,
            url: 'http://localhost:8080/Taskzone/api/users/'+$scope.user.username+'/tasks/'+task.id,
            contentType: 'application/json',
            data: JSON.stringify(newData),
            success: function(editedTask) {
                for (var i = 0; i < $scope.tasks.length; i++) { 
                    if($scope.tasks[i].id == editedTask.id){
                        $scope.tasks[i] = editedTask;
                    }
                }
                $('#taskModalHistory'+editedTask.id).modal('hide');
                $('.modal-backdrop').remove();
                $("body").removeClass("modal-open");
                
                $( function() {
                    $( ".datepicker" ).datepicker({
                        dateFormat: 'M d, yy',
                    });
                });
            }
        });  
    };
    
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
                for (var i = 0; i < $scope.tasks.length; i++) { 
                    if($scope.tasks[i].id == editedTask.id){
                        $scope.tasks[i] = editedTask;
                    }
                }
                $('#taskDoneModalAssign'+editedTask.id).modal('hide');
                $('.modal-backdrop').remove();
                $("body").removeClass("modal-open");
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
.controller('LoginController', ['$scope', function($scope) {

    $scope.loginSubmit = function() {
        console.log("ok");
        var userLogin = $("#userNameLogin").val();
        var passwordLogin = $("#passwordLogin").val();
        UserService.username = userLogin;
        UserService.password = passwordLogin;
//        window.location.href = "index.html";
        console.log(sharedProperties.getProperty());
        sharedProperties.setProperty('second');
        console.log(sharedProperties.getProperty());
        window.location.href = "index.html";
    };

    
}])

//.factory('UserService', function() {
//    console.log("asdasd");
//  return {
//        username: '',
//        fullname: 'abc',
//        password: '',
//        isManager: false,
//  };
//})
// .service('sharedProperties', function () {
//        var property = 'First';
//
//        return {
//            getProperty: function () {
//                return property;
//            },
//            setProperty: function(value) {
//                property = value;
//            }
//        };
//    })

;
    
    
    
    
    