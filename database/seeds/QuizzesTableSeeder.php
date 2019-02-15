<?php

use Illuminate\Database\Seeder;

class QuizzesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){
        for ($i=1; $i < 10; $i++) { 
            DB::table('Quizzes')->insert([
                'id'=>$i,
                'title' => "Quiz #$i",
                'description' => "This is a quiz for tesing purposes",
                'owner' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
