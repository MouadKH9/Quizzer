<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Auth::routes();

// Gets

Route::get('/home', 'QuizController@index');
Route::get('/quiz/{id}', 'QuizController@info');
Route::get('/quiz/getQuiz/{id}', 'QuizController@getQuiz');
Route::get('/quiz/take/{id}', 'QuizController@take');
Route::get('/quiz/add', 'QuizController@add')->middleware('checkMod');

Route::get('profile/my-quizzes', 'UserController@myQuizzes')->middleware('checkMod');
Route::get('partials/my-quizzes', 'UserController@myQuizzesPartial')->middleware('checkMod');

//Posts

Route::post('quiz/add',"QuizController@addQuiz")->middleware('checkMod');
Route::post('quiz/delete',"UserController@deleteQuiz")->middleware('checkMod');
Route::post('/results/{quizID}','QuizController@results');