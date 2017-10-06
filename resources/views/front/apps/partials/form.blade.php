<div class="card">
    <div class="card-body">
        <div class="form-group row">
            <label for="domain" class="col-sm-2 col-form-label text-md-right">Domain</label>
            <div class="col-sm-10">
                {!! Form::text('domain',null,['id'=>'domain','class'=>'form-control','required']) !!}
                <small class="form-text text-muted">Domain name example: app.domain.com</small>
            </div>
        </div>
        <div class="form-group row">
            <label for="domain" class="col-sm-2 col-form-label text-md-right">Path</label>
            <div class="col-sm-10">
                {!! Form::text('path',null,['id'=>'path','class'=>'form-control','required']) !!}
                <small class="form-text text-muted">Full path: /var/www/html/app</small>
            </div>
        </div>
        <h5 class="my-5 text-muted">SSH Info (optional)</h5>

        <div class="form-group row">
            <label for="ssh_ip" class="col-sm-2 col-form-label text-md-right">Server IP</label>
            <div class="col-sm-10">
                {!! Form::text('ssh_ip',null,['id'=>'ssh_ip','class'=>'form-control']) !!}
            </div>
        </div>
        <div class="form-group row">
            <label for="ssh_user" class="col-sm-2 col-form-label text-md-right">Server User</label>
            <div class="col-sm-10">
                {!! Form::text('ssh_user',null,['id'=>'ssh_user','class'=>'form-control']) !!}
                <small class="form-text text-muted"></small>
            </div>
        </div>
        <div class="form-group row">
            <label for="ssh_key" class="col-sm-2 col-form-label text-md-right">SSH Private Key</label>
            <div class="col-sm-10">
                {!! Form::textarea('ssh_key',null,['id'=>'ssh_key','class'=>'form-control','rows'=>2]) !!}
                <small class="form-text text-muted"></small>
            </div>
        </div>

        <h5 class="my-5 text-muted">Database Settings (optional)</h5>
        <div class="form-group row">
            <label for="db_host" class="col-sm-2 col-form-label text-md-right">DB Host</label>
            <div class="col-sm-10">
                {!! Form::text('db_host',null,['id'=>'db_host','autocomplete'=>'off','class'=>'form-control','placeholder'=>'localhost']) !!}
                <small class="form-text text-muted">Database host</small>
            </div>
        </div>
        <div class="form-group row">
            <label for="db_username" class="col-sm-2 col-form-label text-md-right">DB Username</label>
            <div class="col-sm-10">
                {!! Form::text('db_username',null,['id'=>'db_username','autocomplete'=>'off','class'=>'form-control']) !!}
                <small class="form-text text-muted">Database username</small>
            </div>
        </div>
        <div class="form-group row">
            <label for="db_password" class="col-sm-2 col-form-label text-md-right">DB Password</label>
            <div class="col-sm-10">
                {!! Form::text('db_password',null,['id'=>'db_password','autocomplete'=>'off','class'=>'form-control']) !!}
                <small class="form-text text-muted">Database password</small>
            </div>
        </div>
        <div class="form-group row">
            <label for="db_name" class="col-sm-2 col-form-label text-md-right">DB Name</label>
            <div class="col-sm-10">
                {!! Form::text('db_name',null,['id'=>'db_name', 'autocomplete' => 'off', 'class'=>'form-control']) !!}
                <small class="form-text text-muted">Database name</small>
            </div>
        </div>
        <div class="row">
            <div class="form-submit col-sm-10 ml-auto">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </div>
</div>