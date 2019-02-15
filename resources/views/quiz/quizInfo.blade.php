@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card info">
    <div class="col-sm-6 text-center">
                            <h3>{{$quiz->title}}</h3>
                            <p style="font-size:1.3em">
                                {{$quiz->description}}
                            </p>
                        </div>
                        <div class="col-sm-6 text-left">
                            <ul class="list-group">
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Number of questions: 
                                    <span class="badge badge-primary badge-pill">{{$stats['numQuestions']}}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Takes: 
                                    <span class="badge badge-primary badge-pill">{{$stats['takes']}}</span>
                                </li>
                            </ul>
                        </div>
                        @if($taken == 1)
                            <div style="margin-top:20px;" class="col-sm-12 text-center">
                               <h3> Score: <span style="font-weight:bold">{{$score}}%</span></h3>
                            </div>
                        @else
                            <div style="margin-top:20px;" class="col-sm-12 text-center">
                                <a id="take" href="/quiz/take/{{$quiz->id}}">Take</a>
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
