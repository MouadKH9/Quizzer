<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Quiz;

class UserController extends Controller{
    public function myQuizzes(Request $request){
        return view('user/myQuizzes',Quiz::all());
    }
    public function myQuizzesPartial(Request $request){
        $quizzes = DB::table('quizzes')->where('owner',$request->user()->id)->orderBy('id','desc')->get();
        return view('partials/myQuizzes',['quizzes'=>$quizzes]);
    }
    public function deleteQuiz(Request $request){
        $id = $request->input('id');
        $quiz = Quiz::findOrFail($id);
        if($quiz->owner != $request->user()->id && !$request->user()->isAdmin()) return "Error";
        $quiz->delete();
        return "success";
    }
}
