<div class="card">
    <div class="card-body">
        <div class="form-group row">
            <label for="app_id" class="col-sm-2 col-form-label text-md-right">Application</label>
            <div class="col-sm-10">
                {!! Form::select('app_id',$apps, null,['id'=>'app_id','class'=>'select','required']) !!}
            </div>
        </div>
        <div class="form-group row">
            <label for="frequency" class="col-sm-2 col-form-label text-md-right">Location</label>
            <div class="col-sm-10">
                {!! Form::select('location',['local' => 'Local', 'cloud' => 'Cloud'], null,['title' => 'Select', 'id'=>'location','class'=>'select','required']) !!}
                <small class="form-text text-muted">If you select <strong>cloud</strong>, make sure you already configured it in your <code>.env</code> file</small>
            </div>
        </div>
        <h5 class="my-5 text-muted">Storage Location (local)</h5>
        <div class="form-group row">
            <label for="backup_path" class="col-sm-2 col-form-label text-md-right">Path</label>
            <div class="col-sm-10">
                {!! Form::text('backup_path',$backup->path ?? storage_path('dbbackup'),['id'=>'backup_path','class'=>'form-control']) !!}
                <small class="form-text text-muted">Backup folder. /var/www/html/backup/db/folder</small>
            </div>
        </div>
        <h5 class="my-5 text-muted">Cleanup</h5>

        <div class="form-group row">
            <label for="cleanup_all" class="col-sm-2 col-form-label text-md-right">Keep Files For</label>
            <div class="col-sm-10">
                {!! Form::text('keep',$backup->keep ?? config('kitchen.backup.keep'),['id'=>'keep','class'=>'form-control w-25','required','maxlength'=>2,'placeholder'=>'days']) !!}
                <small class="form-text text-muted">Default: {{config('kitchen.backup.keep')}} days</small>
            </div>
        </div>
        <div class="row">
            <div class="form-submit col-sm-10 ml-auto">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </div>
</div>

@push('scripts')
    <script type="text/javascript">
        $(function()
        {
            $("#backup_path").prop('disabled', $("#location").val() == 'local' ? false : true);

            $("#location").on('change', function(el)
            {
               var local = $(this).val() === 'local' ? true : false;

                $("#backup_path").prop('required', local);
                $("#backup_path").prop('disabled', local ? false : true);

                $('form.validate').parsley().reset();
            });

            $('form.form-backup').submit(function()
            {
                if ( $("#app_id").val() == '' || $("#app_id").val() == 'undefined') {
                    alert('Select Application');
                    return false;
                }

                if ( $("#frequency").val() == '' || $("#frequency").val() == 'undefined') {
                    alert('Select frequency');
                    return false;
                }
            });
        })
    </script>
@endpush