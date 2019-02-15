@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header text-center">
                    <h5>Add a quiz</h5>
                </div>
                <div class="card-body container-fluid">
                    <div class="row justify-content-center text-center">
                        <div class="col-md-11 col-sm-12">
                            <h3>Informations</h3>
                            <div class="form-group">
                                <input type="text" class="form-control" id="name" placeholder="Name">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" id="desc" placeholder="Description">
                            </div>
                            <div id="questions">
                                <h3>Questions</h3>
                                <div class="question" data-id="1">
                                    <div class="input-group form-group">
                                        <input type="text" class="form-control value" placeholder="Question">
                                        <div class="input-group-append">
                                            <span class="input-group-text delete" onclick="removeQuestion(this)"><i class="fa fa-trash"></i></span>
                                        </div>
                                    </div>
                                    <div class="no-answer text-danger">Should have at least one correct answer!</div>
                                    <div class="row">
                                        <div class="col-md-6 answer" data-id="1">
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">
                                                    <input type="checkbox" class="answerCheck">
                                                    </div>
                                                </div>
                                                <input type="text" class="form-control answerVal" placeholder="Answer">
                                                <div class="input-group-append">
                                                    <span class="input-group-text delete" onclick="remove(this)"><i class="fa fa-trash"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 answer" data-id="2">
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">
                                                    <input type="checkbox" class="answerCheck">
                                                    </div>
                                                </div>
                                                <input type="text" class="form-control answerVal" placeholder="Answer">
                                                <div class="input-group-append">
                                                    <span class="input-group-text delete" onclick="remove(this)"><i class="fa fa-trash"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <a onclick="expand(this)"><h4><i class="fa fa-plus-circle"></i> Add</h4></a>
                                        </div>
                                    </div>
                                <hr>
                                </div>
                                
                                <div>
                                    <a onclick="expandQuestion(this)"><h3><i class="fa fa-plus-circle"></i> Add Question</h3></a>
                                </div>
                            </div>
                            <button onclick="tryToSubmit()" class="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{asset('js/addQuiz.js')}}" defer></script>
@endsection
