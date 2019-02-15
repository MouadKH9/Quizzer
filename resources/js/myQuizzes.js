$(function(){
    refresh();
    $('.toast').toast({
        delay: 3000
    });
    $('body').confirmation({
        selector: '.pop',
        onConfirm: function () {
            remove($(this).parents("tr").data('id'));
        }
    });
});

function remove(id) {
    $.ajax({
        type: "POST",
        url: "/delete",
        data: {
            id
        },
        success: function (res, status) {
            if (status != "success")
                return 0;
            $(".toast").toast('show');
            refresh();
        },
        error: function (msg) {
            console.log(msg.responseText);
            // showError();
        }
    });
}

function refresh() {
    $("#quizzes").html("");
    $("#loading").fadeIn();
    $.get("/partials/my-quizzes",function(res){
        $("#loading").fadeOut(300,function(){
            $("#quizzes").html(res);
        });
    });
}