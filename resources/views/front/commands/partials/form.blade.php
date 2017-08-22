<div class="card">
    <div class="card-body">
        <div class="form-group row">
            <label for="app_id" class="col-sm-2 col-form-label text-right">Application</label>
            <div class="col-sm-10">
                {!! Form::select('app_id',$apps, null,['id'=>'app_id','class'=>'select','required']) !!}
            </div>
        </div>
        <div class="form-group row">
            <label for="title" class="col-sm-2 col-form-label text-right">Title</label>
            <div class="col-sm-10">
                {!! Form::text('title',null,['id'=>'title','class'=>'form-control','required']) !!}
                <small class="form-text text-muted">Command title</small>
            </div>
        </div>
        <div class="form-group row">
            <label for="recipe" class="col-sm-2 col-form-label text-right">Recipe</label>
            <div class="col-sm-10">
                {!! Form::textarea('recipe',null,['id'=>'recipe','class'=>'form-control','rows'=>6,'required']) !!}
                <small class="form-text text-muted">Command recipe / script</small>
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
            $('form.form-cmd').submit(function()
            {
               if ( $("#app_id").val() == '' || $("#app_id").val() == 'undefined') {
                   alert('Select Application');
                   return false;
               }
            });
        })
    </script>

@endpush