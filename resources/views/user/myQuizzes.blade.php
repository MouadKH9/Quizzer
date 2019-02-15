@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body container-fluid">
                    <div class="row justify-content-center questions">
                        <h3>My Quizzes</h3>
                        <div id="loading"><i class="fa fa-spinner fa-spin"></i></div>
                        <div id="quizzes"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div aria-live="polite" aria-atomic="true">
  <div class="toast" style="position: absolute; top: 70px; right: 10px;">
    <div class="toast-body">
      <i class="fa fa-exclamation-triangle text-danger"></i>
      <span id="msg">Quiz deleted successfully</span>
    </div>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap-confirmation2/dist/bootstrap-confirmation.min.js" defer></script>
<script src="{{ asset('js/myQuizzes.js') }}" defer></script>
@endsection
