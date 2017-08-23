<div class="card">
    <div class="card-body">
        <div class="form-group row">
            <label for="app_id" class="col-sm-2 col-form-label text-right">Application</label>
            <div class="col-sm-10">
                {!! Form::select('app_id',$apps, null,['id'=>'app_id','class'=>'select','required']) !!}
            </div>
        </div>
        <div class="form-group row">
            <label for="frequency" class="col-sm-2 col-form-label text-right">Frequency</label>
            <div class="col-sm-10">
                {!! Form::select('frequency',$frequencies, null,['id'=>'frequency','class'=>'select','required']) !!}
            </div>
        </div>
        <h5 class="my-5 text-muted">Storage Location (local)</h5>
        <div class="form-group row">
            <label for="backup_url" class="col-sm-2 col-form-label text-right">URL</label>
            <div class="col-sm-10">
                {!! Form::text('backup_url',null,['id'=>'backup_url','class'=>'form-control','required']) !!}
                <small class="form-text text-muted">Backup url. http://application/dbbackup/folder</small>
            </div>
        </div>
        <div class="form-group row">
            <label for="backup_path" class="col-sm-2 col-form-label text-right">Path</label>
            <div class="col-sm-10">
                {!! Form::text('backup_path',null,['id'=>'backup_path','class'=>'form-control','required']) !!}
                <small class="form-text text-muted">Backup folder. /var/www/html/backup/db/folder</small>
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