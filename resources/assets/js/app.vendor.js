/**
 * Toggle loading state for button
 * Example: <button class="btn btn-primary">Button</button>
 */
function buttonLoading(btn, dark)
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

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
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
        errorsWrapper: "<span class='invalid-feedback'></span>",
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

});