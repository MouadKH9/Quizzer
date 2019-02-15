$(function(){
    $("input[type='text']").focusout(function(){
        if($(this).val() != '') $(this).removeClass("is-invalid");
    });
    $("input[type='checkbox']").click(function () {
        if ($(this).is(":checked")) $(this).parents(".question").find(".no-answer").hide();
    });
});

function tryToSubmit() {
    if(!validate()) return;
    let data = getData();
    
    $.ajax({
        type: "POST",
        url: "/add",
        data: {
            data
        },
        success: function (res, status) {
            if (status != "success")
                return showError();
            showSuccess(res);
            console.log("Data: ");
            console.log(data);
            console.log("Response: ");
            console.log(res);
        },
        error: function (msg) {
            console.log(msg.responseText);
            showError();
        }
    });
}

function getData(){
    let results = [];
    $(".question").each((index,question)=>{
        let questionVal = $(question).find(".value").val();
        let answers = [];
        $(question).find(".answer").each((i,answer)=>{
            answers.push({
                answer: $(answer).find(".answerVal").val(),
                correct: $(answer).find(".answerCheck").is(":checked")
            })
        });
        results.push({question:questionVal,answers});
    });
    return {
        name: $("#name").val(),
        description: $("#desc").val(),
        questions: results
    };
}

function validate() {
    let texts =  $("input[type='text']").toArray();
    for (const text of texts) {
        if ($(text).val() == '') {
            $(text).addClass("is-invalid");
            return false;
        }
    }
    let questions = $(".question").toArray();
    for (const question of questions) {
        let okay = false;
        $(question).find("input[type='checkbox']").each((i, check) => {
            if ($(check).is(":checked")) {
                okay = true;
            };
        });
        if (!okay){
            $(question).find(".no-answer").show();
            return false;
        }
    }
    return true;
}

function expand(el){
    let previous = $(el).parent().prev();
    let lastID = $(previous).data('id');
    $(makeAnswerInput(lastID+1)).insertAfter(previous);
}

function makeAnswerInput(id){
    let str = `<div class="col-md-6 answer" data-id="${id}"> <div class="input-group mb-3"> <div class="input-group-prepend"> <div class="input-group-text"> <input type="checkbox" class="answerCheck"> </div></div><input type="text" class="form-control answerVal" placeholder="Answer"><div class="input-group-append"><span class="input-group-text delete" onclick="remove(this)"><i class="fa fa-trash"></i></span></div></div></div>`;
    return $(str);
}

function expandQuestion(el) {
    let previous = $(el).parent().prev();
    let lastID = $(previous).data('id');
    $(makeQuestionInput(lastID + 1)).insertAfter(previous);
}

function makeQuestionInput(id) {
    let str = `<div class="question" data-id="${id}"> <div class="form-group input-group"> <input type="text" class="form-control value" placeholder="Question"><div class="input-group-append"> <span class="input-group-text delete" onclick="removeQuestion(this)"><i class="fa fa-trash"></i></span> </div></div><div class="no-answer text-danger">Should have at least one correct answer!</div><div class="row"> <div class="col-md-6 answer" data-id="1"> <div class="input-group mb-3"> <div class="input-group-prepend"> <div class="input-group-text"> <input type="checkbox" class="answerCheck"> </div></div><input type="text" class="form-control answerVal" placeholder="Answer"><div class="input-group-append"><span class="input-group-text delete" onclick="remove(this)"><i class="fa fa-trash"></i></span></div></div></div><div class="col-md-6 answer" data-id="2"> <div class="input-group mb-3"> <div class="input-group-prepend"> <div class="input-group-text"> <input type="checkbox" class="answerCheck"> </div></div><input type="text" class="form-control answerVal" placeholder="Answer"><div class="input-group-append"><span class="input-group-text delete" onclick="remove(this)"><i class="fa fa-trash"></i></span></div></div></div><div class="col-md-6"> <a onclick="expand(this)"><h4><i class="fa fa-plus-circle"></i> Add</h4></a> </div></div><hr> </div>`;
    return $(str);
}

function showError(){
    console.log("ERROR");
}
function showSuccess(id){
    console.log("HALLELUJAH " + id);
}

function remove(el) {
    let numberAns = $(el).parents(".question").find(".answer").toArray().length;
    if (numberAns < 3) return;
    $(el).parents(".answer").remove();
}

function removeQuestion(el) {
    let numberQ = $(".question").toArray().length;
    if (numberQ < 2) return;
    $(el).parents(".question").remove();
}