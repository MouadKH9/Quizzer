@extends('layouts.app')

@section('content')
<?php $i = 1; ?>
<div class="container" style="margin-top:6%">
    <div class="quiz-container">
        <h1 class="text-center">{{$quiz->title}}</h1> 
        <div id="progress"><div></div></div>
        <input id="quizID" type="hidden" value="{{$quiz->id}}">
        @foreach ($quiz->questions as $question)
            <div class="row question justify-content-center" id="{{$i}}" data-id="{{$question->id}}">
                <h4 class="col-sm-12">{{$question->body}}</h4>
                <ul class="col-sm-12 list-group">
                    @foreach($question->answers as $answer)
                    <li class="list-group-item">
                        <input data-id="{{$answer->id}}" id="answer-{{$answer->id}}" type="checkbox">
                        <label for="answer-{{$answer->id}}">{{$answer->body}}</label>
                    </li>
                    @endforeach
                </ul>
            </div>
        <?php $i++; ?>
        @endforeach
        <div class="controls">
            <button class="btn-primary btn" id="prev" onclick="prevQuestion()" disabled>Previous</button>
            <button class="btn-primary btn" id="next" onclick="nextQuestion()">I don't know</button>
        </div>
    </div>
</div>
<div class="container" id="success">
    <div id="success-box">
        <div class="face">
            <div class="eye"></div>
            <div class="eye right"></div>
            <div class="mouth happy"></div>
        </div>
        <div class="shadow scale"></div>
        <div class="message">
            <h3 class="alert">Your score is <span id="score">0</span>% !</h3>
            <p>Thank you for taking this quiz.</p>
        </div>
        <a href="/home"><button class="button-box"><h1 class="green">continue</h1></button></a>
    </div>
</div>
<div id="error-box">
    <div class="face2">
      <div class="eye"></div>
      <div class="eye right"></div>
      <div class="mouth sad"></div>
    </div>
    <div class="shadow move"></div>
    <div class="message"><h1 class="alert">Error!</h1><p>oh no, something went wrong.</div>
    <a href=".">
        <button class="button-box"><h1 class="red">try again</h1></button>
    </a>
</div>
<script src="{{ asset('js/quiz.js') }}" defer></script>
@endsection
