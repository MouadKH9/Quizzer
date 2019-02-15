<?php

use Illuminate\Database\Seeder;

class QuestionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){
         for ($i=1; $i < 28; $i++) { 
            DB::table('Questions')->insert([
                'id'=>$i,
                'body' => "Question #$i",
                'quiz_id' => floor($i/3),
                'created_at' => now()
            ]);
        }
    }
}
