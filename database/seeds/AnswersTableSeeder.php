<?php

use Illuminate\Database\Seeder;

class AnswersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){
        for ($i=1; $i < 84; $i++) { 
            DB::table('Answers')->insert([
                'id'=>$i,
                'body' => "Answer #$i",
                'question_id' => floor($i/3),
                'is_correct'=>$i % 3 == 0 ? 1 : 0 ,
                'created_at' => now()
            ]);
        }
    }
}
