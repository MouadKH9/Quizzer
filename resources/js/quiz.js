import $ from 'jquery';

var question = 1;
$(function(){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    showQuestion(question);
    $(".question ul li input").on('change',function(){
        let $this = $(this);
        if($this.prop("checked"))
            $this.parent().addClass("checked");
        else
            $this.parent().removeClass("checked");
        if ($("input").toArray().filter(el => $(el).prop("checked")).length > 0 && question != $(".question").toArray().length)
            $("#next").html("Next");
        else
            $("#next").html("I don't know");
    });
});

function showQuestion(id) {
    let $question = $("#"+id);
    $(".question").hide()
    $question.fadeIn();
    let numberQuestions = $(".question").toArray().length;
    $("#progress div").css({width: (id-1)/numberQuestions * 100 + "%"})
    console.log({width: (id-1)/numberQuestions * 100 + "%"})
}

function nextQuestion() {
    // Validate that at least one answer is checked
    let numberQuestions = $(".question").toArray().length;
    if(question < numberQuestions){
        showQuestion(++question);
        $("#prev").prop("disabled",false);
        if(question === numberQuestions)
            $("#next").html("Submit");
        else
            $("#next").html("I don't know");
    }
    else
        submit();
}

function prevQuestion() {
    if(question <= 1)
        return;
    showQuestion(--question);
    $("#next").html("Next");
    if(question === 1) 
        $("#prev").prop("disabled", true);
}

function getAnswers(){
    const results = [];
    let questionsDiv = $(".question").toArray();
    questionsDiv.forEach(el=>{
        let tmp = {};
        tmp['id'] = $(el).data('id');
        tmp['answers'] = [];
        $(el).find("input").toArray().filter(input=>input.checked).forEach(answer=>{
            tmp['answers'].push($(answer).data('id'));
        });
        results.push(tmp);
    });
    return results;
}

function showScore(score){
     $("#progress div").css({
         width: "100%"
     })
    $(".quiz-container").hide(500,function(){
        $("#score").html(score);
        $("#success-box").show(300);
    })
}

function showError(score) {

    $(".quiz-container").hide(500, function () {
        $("#error-box").show(500);
    })
}

function submit() {
    let data = getAnswers();
    $.ajax({
        type: "POST",
        url: "/results/" + $("#quizID").val(),
        data: { data },
        success: function (res, status) {
            if (status != "success")
                return showError();
            showScore(res);
            console.group("AJAX function");
            console.log("Data: ");
            console.log(data);
            console.log("Response: ");
            console.log(res);
            console.groupEnd("AJAX function");
        },
        error: function (msg) {
            console.group("AJAX ERROR");
            console.log(data);
            console.log(msg.responseText);
            console.groupEnd("AJAX ERROR");
            showError();
        }
    });
}

window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;