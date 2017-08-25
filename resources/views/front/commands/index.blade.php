@extends('layouts.app')

@section('page-title')
    <h1>{{$title}} @permission('create-commands')<a href="{{route('commands.create')}}" class="btn btn-primary btn-rounded">Add New</a>@endpermission</h1>
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
                    @if ( !empty($command->application->ssh_ip) )
                        <small class="text-muted ">({{$command->application->ssh_ip}})</small>
                    @endif
                @endif
                </td>
                <td><button class="btn btn-secondary btn-sm btn-cmd" data-id="{{$command->id}}"><i class="mr-1 icon ion-flash"></i> Run Command</button></td>
                <td>
                    @permission('update-commands')
                        <a href="{{route('commands.edit',$command->id)}}"><i class="icon ion-edit text-warning mr-2"></i></a>
                    @endpermission

                    @permission('delete-commands')
                    <a href="#" data-toggle="delete" class="text-danger"><i class="icon ion-close-circled"></i></a>
                    <form class="delete" action="{{route('commands.destroy',$command->id)}}" method="POST" style="display: none;">
                        <input type="hidden" name="_method" value="DELETE">
                        {{ csrf_field() }}
                    </form>
                    @endpermission
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

@push('body')
    <div id="command-sidebar" class="closed">

        <div id="exec-body" class="cmd-text"></div>
        <div>
            <button class="btn btn-primary" onclick="toggleCommandSidebar()">Close</button>
        </div>
    </div>
@endpush

@push('scripts')
<script type="text/javascript">
function toggleCommandSidebar() {

    var btn = $('.btn.btn-loading');
    
    $("#command-sidebar .exec-body").html('');

    if ( $("#command-sidebar").hasClass('closed') ) {

        button_loading(btn);
        $('.btn-cmd').prop('disabled', true);

        $("#command-sidebar").removeClass('closed');
    } else {
        button_loading(btn);
        $('.btn-cmd').prop('disabled', false);

        $("#command-sidebar").addClass('closed');
    }
}
$(function () {

    $('.btn-cmd').click(function (e) {

        var btn = $(this);

        //e.preventDefault();

        var confirmed = confirm('Are you sure?');

        if (confirmed === true) {

            var cmd_id = $(this).data('id');
            if ( cmd_id != '') {

                toggleCommandSidebar();

                axios.get('/commands/' + cmd_id + '/recipe')
                    .then(function (response) {

                        $("#exec-body").append(response.data.data.recipe.replace(/\n/g, "<br>"));
                        $("#exec-body").append('<iframe src="/commands/'+cmd_id+'/exec"></iframe>');

                    }).catch(function (error) {
                        button_loading(btn);
                        $('.btn-cmd').prop('disabled', false);
                        console.log(error);
                    });


                /*$("#modalCommand #command-box").html('');

                //perform axios
                axios.get('/commands/' + $(this).data('id') + '/recipe')
                    .then(function (response) {

                        $("#modalCommand #command-box").append(response.data.data.recipe.replace(/\n/g, "<br>"));

                        //execute
                        axios.post('/commands/exec', {
                            id: response.data.data.id
                        },{timeout: 300000}).then(function (execResponse) {

                            //disable button
                            button_loading(btn);

                            //append response
                            $("#modalCommand #command-box").append(execResponse.data.data.replace(/\n/g, "<br>"));

                            //show modal
                            $('#modalCommand').modal('show');


                        }).catch(function (postError) {
                            console.log(postError);
                        });
                    })
                    .catch(function (error) {
                        button_loading(btn);
                        console.log(error);
                    });
*/
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
        iframe {
            display:block;
            width:100%;
            min-height: 80vh;
            border:0;
            font-family:"SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            background:#444;
            color:#fff;
            font-size:0.8rem;
        }

        .cmd-text {
            font-family:"SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            background:#444;
            color:#fff;
            font-size:0.8rem;
        }

        #command-box {

            background:#444;
            color:#fff;
            font-size:0.8rem;
            padding:2rem;
            height:250px;
            overflow-x:auto;
            font-family:"SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;

        }

        #command-sidebar {
            background:#444;
            color:#efefef;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            z-index: 1000;
            width:50%;
            transition:margin-right 300ms ease-in-out;
            padding:25px;
            box-shadow: -5px 0px 3px 0px rgba(0,0,0,.15);
            overflow-y:auto;
        }

        #command-sidebar.closed {
            margin-right: -50%;
        }

        body {
            overflow-x: hidden;
        }
    </style>
@endpush