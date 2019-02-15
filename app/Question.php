<?php

namespace App;

use App\Answer;
use Illuminate\Database\Eloquent\Model;  

class Question extends Model{

    public function numberCorrectAnswers($id){
        return count($this->answers()->where('is_correct','1')->get());
    }

    public function quiz(){
        return $this->belongsTo('App\Quiz');
    }
    public function answers(){
        return $this->hasMany('App\Answer');
    }
}
