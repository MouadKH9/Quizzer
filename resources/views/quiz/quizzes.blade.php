@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header text-center">
                    <h5>Quizzes</h5>
                </div>
                <div class="card-body container-fluid">
                    <div class="row">
                    @foreach ($quizzes as $quiz)
                        <div class="col-md-4 text-center">
                            <a href="/quiz/{{$quiz->id}}">
                                <h3 class="{{in_array($quiz->id,$taken) ? 'taken' : ''}}">{{$quiz->title}}</h3>
                                <p class="text-muted">
                                    @if(in_array($quiz->id,$taken))
                                        You already took this quiz!
                                    @else
                                        {{$quiz->description}}
                                    @endif
                                </p>
                            </a>
                        </div>
                    @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
