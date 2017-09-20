<div class="card">
    <div class="card-body">
        <div class="form-group row">
            <label for="app_id" class="col-sm-2 col-form-label text-right">Application</label>
            <div class="col-sm-10">
                {!! Form::select('app_id',$apps, null,['id'=>'app_id','class'=>'select','required']) !!}
            </div>
        </div>
        <div class="form-group row">
            <label for="frequency" class="col-sm-2 col-form-label text-right">Location</label>
            <div class="col-sm-10">
                {!! Form::select('location',['local' => 'Local', 'cloud' => 'Cloud'], null,['title' => 'Select', 'id'=>'location','class'=>'select','required']) !!}
                <small class="form-text text-muted">If you select <strong>cloud</strong>, make sure you already configured it in your <code>.env</code> file</small>
            </div>
        </div>
        <h5 class="my-5 text-muted">Storage Location (local)</h5>
        <div class="form-group row">
            <label for="backup_url" class="col-sm-2 col-form-label text-right">URL</label>
            <div class="col-sm-10">
                {!! Form::text('backup_url',null,['id'=>'backup_url','class'=>'form-control']) !!}
                <small class="form-text text-muted">Backup url. http://application/dbbackup/folder</small>
            </div>
        </div>
        <div class="form-group row">
            <label for="backup_path" class="col-sm-2 col-form-label text-right">Path</label>
            <div class="col-sm-10">
                {!! Form::text('backup_path',null,['id'=>'backup_path','class'=>'form-control']) !!}
                <small class="form-text text-muted">Backup folder. /var/www/html/backup/db/folder</small>
            </div>
        </div>
        <h5 class="my-5 text-muted">Cleanup</h5>

        <div class="form-group row">
            <label for="cleanup_all" class="col-sm-2 col-form-label text-right">All</label>
            <div class="col-sm-10">
                {!! Form::text('cleanup_all',null,['id'=>'cleanup_all','class'=>'form-control w-25','required','maxlength'=>2,'placeholder'=>config('kitchen.backup.clean.all')]) !!}
                <small class="form-text text-muted">The number of days for which backups must be kept. Default: {{config('kitchen.backup.clean.all')}}</small>
            </div>
        </div>
        <div class="form-group row">
            <label for="cleanup_daily" class="col-sm-2 col-form-label text-right">Daily</label>
            <div class="col-sm-10">
                {!! Form::text('cleanup_daily',null,['id'=>'cleanup_daily','class'=>'form-control w-25','required','maxlength'=>2,'placeholder'=>config('kitchen.backup.clean.daily')]) !!}
                <small class="form-text text-muted">The number of days for which daily backups must be kept. Default: {{config('kitchen.backup.clean.daily')}}</small>
            </div>
        </div>
        <div class="form-group row">
            <label for="cleanup_week" class="col-sm-2 col-form-label text-right">Weeks</label>
            <div class="col-sm-10">
                {!! Form::text('cleanup_week',null,['id'=>'cleanup_week','class'=>'form-control w-25','required','maxlength'=>2,'placeholder'=>config('kitchen.backup.clean.week')]) !!}
                <small class="form-text text-muted">The number of weeks for which one weekly backup must be kept. Default: {{config('kitchen.backup.clean.week')}}</small>
            </div>
        </div>
        <div class="form-group row">
            <label for="cleanup_month" class="col-sm-2 col-form-label text-right">Months</label>
            <div class="col-sm-10">
                {!! Form::text('cleanup_month',null,['id'=>'cleanup_month','class'=>'form-control w-25','required','maxlength'=>2,'placeholder'=>config('kitchen.backup.clean.month')]) !!}
                <small class="form-text text-muted">The number of months for which one monthly backup must be kept. Default: {{config('kitchen.backup.clean.month')}}</small>
            </div>
        </div>
        <div class="form-group row">
            <label for="cleanup_year" class="col-sm-2 col-form-label text-right">Year</label>
            <div class="col-sm-10">
                {!! Form::text('cleanup_year',null,['id'=>'cleanup_year','class'=>'form-control w-25','required','maxlength'=>2,'placeholder'=>config('kitchen.backup.clean.year')]) !!}
                <small class="form-text text-muted">The number of years for which one yearly backup must be kept. Default: {{config('kitchen.backup.clean.year')}}</small>
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
            $("#backup_url").prop('disabled', $("#location").val() == 'local' ? false : true);
            $("#backup_path").prop('disabled', $("#location").val() == 'local' ? false : true);

            $("#location").on('change', function(el)
            {
               var local = $(this).val() === 'local' ? true : false;

                $("#backup_url").prop('required', local);
                $("#backup_path").prop('required', local);
                $("#backup_url").prop('disabled', local ? false : true);
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