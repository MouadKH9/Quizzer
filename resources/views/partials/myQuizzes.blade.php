<table class="table table-striped">
    <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Description</th>
        <th scope="col" class="text-center">Operations</th>
        </tr>
    </thead>
    <tbody>
    @foreach ( $quizzes as $quiz)
        <tr data-id="{{$quiz->id}}">
            <th scope="row">{{$quiz->id}}</th>
            <td>{{$quiz->title}}</td>
            <td>{{substr($quiz->description,0,35).".."}}</td>
            <td style="font-size:1.2em" class="text-center">
                <a class="text-info"><i class="fa fa-pencil"></i></a>
                <a data-toggle="confirmation" data-title="Open Google?" class="text-danger pop" ><i class="fa fa-trash"></i></a>
            </td>
        </tr>
    @endforeach
    </tbody>
</table>