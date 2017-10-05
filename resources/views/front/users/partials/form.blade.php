<div class="card">
    <div class="card-body">

        <div class="form-group row">
            <label for="name" class="col-sm-2 col-form-label text-md-right">Name</label>
            <div class="col-sm-10">
                {!! Form::text('name',null,['id'=>'name', 'autocomplete' => 'off', 'class'=>'form-control']) !!}
                <small class="form-text text-muted"></small>
            </div>
        </div>
        <div class="form-group row">
            <label for="role" class="col-sm-2 col-form-label text-md-right">Role</label>
            <div class="col-sm-10">
                {!! Form::select('role',$roles, null,['id'=>'role','class'=>'select','required']) !!}
            </div>
        </div>

        <div class="row">
            <div class="form-submit col-sm-10 ml-auto">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </div>
</div>