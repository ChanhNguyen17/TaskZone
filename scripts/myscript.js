
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

$(function() {
    $(".button").click(function() {
        $("#myform #valueFromMyButton").text($(this).val().trim());
        $("#myform input[type=text]").val('');
        $("#valueFromMyModal").val('');
        $("#myform").show(500);
    });
    $("#btnOK").click(function() {
        $("#valueFromMyModal").val($("#myform input[type=text]").val().trim());
        $("#myform").hide(400);
    });
});





