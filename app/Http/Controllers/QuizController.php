<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use App\Quiz;
use App\Question;
use App\Answer;


class QuizController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(){
        $taken = DB::select('select quiz_id from quiz_user where user_id = ?', [Auth::user()->id]);
        for ($i=0; $i < count($taken); $i++) { 
            $taken[$i] = $taken[$i]->quiz_id; 
        }
        return view('quiz/quizzes',['quizzes'=>Quiz::all(),'taken'=>$taken]);
    }
    public function info($id){
        $quiz = Quiz::with('questions')->where('id',$id)->first();
        $taken = Auth::user()->taken()->where('quiz_id',$id)->count();
        $score = 0;
        if($taken == 1)
            $score = DB::select('select score from quiz_user where quiz_id = ? AND user_id = ?', [$id,Auth::user()->id])[0]->score;
        $stats = [];
        $stats['numQuestions'] = count($quiz->questions);
        $stats['takes'] = DB::select('select count(user_id) as c from quiz_user where quiz_id = ?',[$id])[0]->c;
        return view('quiz/quizInfo',['quiz'=>$quiz,'taken'=>$taken,'score'=>$score,'stats'=>$stats]);
    }
    public function take($id){
        $quiz = Quiz::find($id);
        return view('quiz/quiz',['quiz'=>$quiz]);
    }
    public function getQuiz($id){
        $quiz = Quiz::find($id);
        foreach ($quiz->questions as $question) {
            foreach ($question->answers as $answer) {
                unset($answer->is_correct);
            }
        }
        return response()->json($quiz);
    }
    public function results(Request $request,$quizID){
        $data = $request->input('data');
        if(count($data) == 0) return 0;
        $score = 0;
        foreach ($data as $q) {
            $question = Question::findOrFail($q['id']);
            $numberCorrect = $question->numberCorrectAnswers($question->id);
            if(!array_key_exists('answers',$q) || $numberCorrect != count($q['answers']))
                continue;
            foreach ($q['answers'] as $answerID)
                if(Answer::find($answerID)->is_correct != 1) continue 2 ;
            $score++;
        }
        $score = (int) $score/count($data) * 100;
        DB::insert('insert into quiz_user (quiz_id, user_id, score) values (?, ?, ?)', [$quizID, Auth::user()->id,$score]);
        return (int) $score;
    }

    public function add(){
        $this->middleware('checkMod');
        return view('quiz/add');
    }

    function addQuiz(Request $request){
        $data = $request->input('data');
        $quizID = DB::table('quizzes')->insertGetId(['title'=>$data['name'],
                                                    'description'=>$data['description'],
                                                    'owner'=>Auth::user()->id]);
        foreach ($data['questions'] as $question) {
            $questionID = DB::table('questions')->insertGetId(['body'=>$question['question'],'quiz_id'=>$quizID]);
            foreach ($question['answers'] as $answer) {
                DB::table('answers')->insert(['body'=>$answer['answer'],'is_correct'=>$answer['correct'] == 'true' ? 1 : 0,'question_id'=>$questionID]);
            }
        }
        return var_export($data);
    }

}
