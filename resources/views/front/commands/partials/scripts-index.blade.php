@push('scripts')
    <script type="text/javascript">
        function toggleCommandSidebar() {

            var btn = $('.btn.btn-loading');

            $("#exec-body").html('');

            if ( $("#command-sidebar").hasClass('closed') ) {

                buttonLoading(btn);
                $('.btn-cmd').prop('disabled', true);

                $("#command-sidebar").removeClass('closed');
            } else {
                buttonLoading(btn);
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

                                $("#exec-body").append(escapeHtml(response.data.data.recipe).replace(/\n/g, "<br>"));
                                $("#exec-body").append('<iframe src="/commands/'+cmd_id+'/exec"></iframe>');

                            }).catch(function (error) {
                            buttonLoading(btn);
                            $('.btn-cmd').prop('disabled', false);
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
        iframe {
            display:block;
            width:100%;
            min-height: 80vh;
            border:0;
            font-family:"SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            background:#444;
            color:#fff;
            font-size:0.8rem;
            padding:0;
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