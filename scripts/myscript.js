
$("#loginButton").click(function(){
    $("#loginModal").modal("show");
});

$("#addUserButton").click(function(){
    $("#addUserModal").modal("show");
});

$("#addTaskButton").click(function(){
    $("#addTaskModal").modal("show");
});

$("#taskItem").click(function(){
    $("#taskModal").modal("show");
});

$( function() {
    $( ".datepicker" ).datepicker({
        dateFormat: 'M d, yy',
//        altField: '#thealtdate',
//        altFormat: 'yy-mm-dd'
    });
});




