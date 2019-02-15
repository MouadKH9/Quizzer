<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model{

    public function ownedBy(){
        return $this->belongsTo('App\User','owner');
    }
    public function takenBy(){
        return $this->belongsToMany('App\User');
    }
    public function questions(){
        return $this->hasMany('App\Question');
    }
}
