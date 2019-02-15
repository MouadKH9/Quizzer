<?php

namespace App\Http\Middleware;

use Closure;

class CheckMod
{
    public function handle($request, Closure $next){
        if(!$request->user()->isMod()) return redirect('home');
        return $next($request);
    }
}
