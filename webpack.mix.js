const mix = require('laravel-mix');


mix.js('resources/js/app.js', 'public/js')
   .js('resources/js/quiz.js','public/js')
   .js('resources/js/addQuiz.js','public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .sass('resources/sass/welcome.scss', 'public/css');

mix.disableNotifications();