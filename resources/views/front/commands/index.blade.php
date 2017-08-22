@extends('layouts.app')

@section('page-title')
    <h1>{{$title}} <a href="{{route('commands.create')}}" class="btn btn-primary btn-rounded">Add New</a></h1>
@endsection
@section('content')
    <table class="table table-hover">
        <thead>
            <tr>
                <th>Command</th>
                <th>Application</th>
                <th>Run</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
        @foreach ( $commands as $command )
            <tr>
                <td>{{$command->title}}</td>
                <td>
                @if ( isset($command->application))
                    {{ $command->application->domain OR '' }}
                    @if ( !empty($command->application->server_ip) )
                        <small class="text-muted ">({{$command->application->server_ip}})</small>
                    @endif
                @endif
                </td>
                <td><a href="#" class="btn btn-secondary btn-sm btn-cmd" data-id="{{$command->id}}"><i class="mr-1 icon ion-flash"></i> Run Command</a></td>
                <td>
                    <a href="{{route('commands.edit',$command->id)}}"><i class="icon ion-edit text-warning mr-2"></i></a>
                    <a href="#" data-toggle="delete" class="text-danger"><i class="icon ion-close-circled"></i></a>
                    <form class="delete" action="{{route('commands.destroy',$command->id)}}" method="POST" style="display: none;">
                        <input type="hidden" name="_method" value="DELETE">
                        {{ csrf_field() }}
                    </form>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>


    {!! $commands->links() !!}

    <div class="modal fade" id="modalCommand" tabindex="-1" role="dialog" aria-labelledby="modalCommandLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalCommandLabel">Run Command</h5>
                </div>
                <div class="modal-body">
                    <div id="command-box">

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

@endsection

@push('scripts')
<script type="text/javascript">
    $(function(){

       $('.btn-cmd').click(function(e)
       {

           e.preventDefault();

           var confirmed = confirm('Are you sure?');

           if (confirmed === true) {

               if ($(this).data('id') != '') {
                   $('#modalCommand').modal('show');
                   $("#modalCommand #command-box").html('');

                   //perform axios
                   axios.get('/commands/'+$(this).data('id')+'/recipe')
                   .then(function (response) {

                       $("#modalCommand #command-box").append(response.data.data.replace(/\n/g,"<br>"));

                       /*axios.post('/commands/exec', {
                           command: response.data.data
                       }).then(function (execResponse) {
                           $("#modalCommand #command-box").append(execResponse.data.data.replace(/\n/g,"<br>"));
                       }).catch(function (postError) {
                           console.log(postError);
                       });*/
                   })
                   .catch(function (error) {
                       console.log(error);
                   });

               } else {
                   console.log('Data ID is empty.')
               }
           }
       });
    });
</script>
@endpush

@push('styles')
    <style type="text/css">
        #command-box {

            background:#444;
            color:#fff;
            font-size:0.8rem;
            padding:2rem;
            height:250px;
            overflow-x:auto;
            font-family:"SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;

        }
    </style>
@endpush