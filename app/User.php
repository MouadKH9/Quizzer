<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function isMod(){
        return $this->role_id != 3;
    }
    public function isAdmin(){
        return $this->role_id == 1;
    }

    public function quiz(){
        return $this->belongsTo('App\Quiz');
    }

    public function taken(){
        return $this->belongsToMany('App\Quiz');
    }

    public function role(){
        return $this->hasOne('App\Role');
    }
}