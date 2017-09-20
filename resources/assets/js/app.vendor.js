/**
 * Toggle loading state for button
 * Example: <button class="btn btn-primary">Button</button>
 */
function button_loading(btn, dark)
{
    dark = typeof dark !== 'undefined' ? dark : true;

    var darkClass = dark === true ? ' btn-loading-dark' : '';

    //must be a button
    if ( btn.is('button') === false )
    {
        return false;
    }

    if ( btn.hasClass('btn-loading') )
    {
        btn.html(btn.data('label')).data('label','');
        btn.removeClass('btn-loading' + darkClass);
        btn.prop('disabled', false);
    }
    else
    {
        btn.data('label', btn.html()).html('&nbsp;');
        btn.addClass('btn-loading'+ darkClass);
        btn.prop('disabled', true);
    }
}

function formValidate(elm)
{
    if (!$().parsley) {
        return;
    }

    if ( $(elm).length === 0 ) return;

    //validate
    $(elm).parsley({

        successClass: "is-valid",
        errorClass: "is-invalid",
        classHandler: function(el) {
            return el.$element.closest(".form-group");
        },
        errorsContainer: function (el) {
            return el.$element.closest(".form-group > div");
        },
        errorsWrapper: "<span class='invalid-feedback text-small'></span>",
        errorTemplate: "<span></span>"

    });


    window.Parsley.on('field:error', function() {
        this.$element.addClass('is-invalid');
    });

    window.Parsley.on('field:success', function() {
        this.$element.addClass('is-valid');
    });
}

/*
    READY UP
 */
$(function () {

    //form-validation
    formValidate('form.validate');

    //flash
    $('.content-wrapper .alert-flash').delay(1000).fadeOut(150);

    //delete links
    $('[data-toggle="delete"]').click(function (e) {
        var ask = confirm('Are you sure?');

        if (ask) {
            $(this).closest('td').find('form.delete').submit();
        }
        e.preventDefault();
    });

    //select
    $('.select').selectpicker({
        style: 'btn-outline-secondary',
        size: 4,
        showTick: true,
        iconBase: 'icon',
        tickIcon: 'ion-checkmark-round'
    });

    /*$('.select').each(function(i, e){
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
    });*/
});