$(function () {
    $('.content-wrapper .alert-flash').delay(1000).fadeOut(150);

    $('[data-toggle="delete"]').click(function (e) {
        var ask = confirm('Are you sure?');

        if (ask) {
            $(this).closest('td').find('form.delete').submit();
        }
        e.preventDefault();
    });

    $('.select').each(function(i, e){
        if (!($(e).data('convert') == 'no')) {
            $(e).hide().removeClass('select');
            var current = $(e).find('option:selected').text() || 'Select';
            var val   =   $(e).find('option:selected').attr('value');
            var name  =   $(e).attr('name') || '';

            $(e).parent().append('<div class="btn-group" id="select-group-' + i + '" />');
            var select = $('#select-group-' + i);
            select.html('<a class="btn btn-outline-secondary dropdown-toggle' + $(e).attr('class') + '" data-toggle="dropdown">' + current + '</a></a><div class="dropdown-menu"></div><input type="hidden" value="' + val + '" name="' + name + '" id="' + $(e).attr('id') + '" class="' + $(e).attr('class') + '" />');
            $(e).find('option').each(function(o,q) {
                select.find('.dropdown-menu').append('<a class="dropdown-item" href="#" data-value="' + $(q).attr('value') + '">' + $(q).html() + '</a>');
            });
            select.find('.dropdown-menu a').click(function(e) {
                select.find('input[type=hidden]').val($(this).data('value')).change();
                select.find('.btn:eq(0)').html($(this).html());
                e.preventDefault();
            });
            $(e).remove();
        }
    });
})