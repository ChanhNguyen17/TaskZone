$(document).ready(function() {
    $('#submitTaskForm').submit(function() {
        console.log('ok');
        $.ajax({
            url: 'http://localhost:8080/Taskzone/api/users',
            type: 'GET',
            async: false,
            contentType: 'application/xml',
            data: $('submitTaskForm').serialize(),
            success: function (response) {
                console.log("done");
            }
        });
    });
    
    $('#addUserForm').submit(function() {
        var data = {};
        data["fullName"] = $("#usernameNew").val();
        data["isManager"] = false;
        data["password"] = $("#passwordNew").val();
        data["userName"] = $("#usernameNew").val();
        $.ajax({
            type: "POST",
            async: false,
            url: 'http://localhost:8080/Taskzone/api/users/',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function() {
                console.log("works");
            }
        });
    }); 
    
    
});



