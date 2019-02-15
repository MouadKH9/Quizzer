<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Quizzer</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
        <link href="{{asset('css/welcome.css')}}" rel="stylesheet" type="text/css">

    </head>
    <body>
        <nav class="navbar navbar-light">
            <a class="logo" href="#">
                <h3>Quizzer</h3>
            </a>
            <div class="top-right links">
                @auth
                    <a class="btn-welcome" href="{{ url('/home') }}">Show Quizzes</a>
                @else
                    <a class="btn-login" href="{{ route('login') }}">Login</a>
                    <a class="btn-welcome" href="{{ route('register') }}">Register</a>
                @endauth
            </div>
        </nav>

        <div class="container">
            <h1>Quizzer</h1>
            <h6>Ask the right questions.</h6>
        </div>
    </body>
</html>
