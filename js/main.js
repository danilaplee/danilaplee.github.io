if (!USER.IsAdmin) {
    var bdy = document.getElementsByTagName('body')[0];
    bdy.oncopy = bdy.onselectstart = function () {
        return false
    };
    bdy.unselectable = 'on';
}

function wo(url) {
    window.open(url, '_top');
}

Number.prototype.numberFormat = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

$.checkboxValidate = function (form) {
    $(form).submit(function () {
        $('input[type=checkbox][required]', $(form)).each(function () {
            if (!$(this).prop('checked')) {
                $('label.custom-error[for=' + $(this).attr('id') + ']').show();
            }
            else {
                $('label.custom-error[for=' + $(this).attr('id') + ']').hide();
            }
        });
    });
}

$.checkboxValid = function (form) {
    var valid = true;
    $('input[type=checkbox][required]', $(form)).each(function () {
        if (!$(this).prop('checked')) {
            $('label.custom-error[for=' + $(this).attr('id') + ']').show();
            valid = false;
        }
        else {
            $('label.custom-error[for=' + $(this).attr('id') + ']').hide();
        }
    });

    return valid;
}

function tooltipsterize() {
    $('[rel=tooltip],ins.help').each(function () {
        $(this).attr('title', '<a href="#" title="Закрыть" class="close" data-tooltipster-close>Закрыть</a>'
            + '<div class="inner">' + $(this).attr('title') + '</div>'
        );

        if ($(this).attr('data-tooltip-position')) {
            $(this).tooltipster({
                position: $(this).attr('data-tooltip-position'),
                interactive: true
            });
        }
        else {
            $(this).tooltipster({
                interactive: true
            });
        }
    });

    $(document).on('click', '[data-tooltipster-close]', function() {
        $('[rel=tooltip],ins.help').tooltipster('hide');
        return false;
    });
}

$(function () {
    $('.fancybox').fancybox();

    $(window).scroll(function () {
        if ($(window).scrollTop() > $(window).height() - 200) {
            $('.btn-up').show();
        }
        else {
            $('.btn-up').hide();
        }
    });

    $('.btn-up').hide();

    $('.btn-up').click(function () {
        $.scrollTo(0, 800);
        return false;
    });

    tooltipsterize();

    $('[data-form]').click(function () {
        var form = $('#' + $(this).attr('data-form'));
        var v = form.serialize();
        var isCustom = form.attr('data-custom');
        window.open(form.attr('data-url') + (!isCustom ? 'compare/' : '') + '?' + v, '_top');
        return false;
    });

    $('.james-prev').hide();

    $('.james-prev').click(function () {
        $('.james-next').show();

        var prev = $('.james-pages div:visible').prev();
        if (prev.length > 0) {
            $('.james-pages div:visible').hide();
            prev.show();

            prev = $('.james-pages div:visible').prev();
            if (prev.length == 0) {
                $(this).hide();
            }
        }

        return false;
    });

    $('.james-next').click(function () {
        $('.james-prev').show();

        var next = $('.james-pages div:visible').next();
        if (next.length > 0) {
            $('.james-pages div:visible').hide();
            next.show();

            next = $('.james-pages div:visible').next();
            if (next.length == 0) {
                $(this).hide();
            }
        }

        return false;
    });

    // Accordion
    $(document).on('click.accordion.data-api', '[data-accordion-header]', function () {
        var $t = $(this),
            $others = $t.parents('[data-accordion-group]').siblings(':visible').find('[data-accordion-body]'),
            $body = $t.parents('[data-accordion-group]').find('[data-accordion-body]');

        if ($body.is(':hidden')) {
            $body.slideDown('fast');
            $others.slideUp('fast');
        } else {
            $body.slideUp('fast');
        }

        return false;
    });

    $('[data-fake-header]').each(function () {
        var $t = $(this);
        $t.data('fake_ofs', $($t.data('fakeHeader')).parent().offset());
    });

    if ($('#kz').length > 0) {
        $.scrollTo($('#kz'), 800, { axis: 'y' });
    }

    //  blocks hover
    $('.tr.filter article').not('.break').hover(
        function () {
            var el = $(this).closest('.tr').next().find('article:eq(' + $(this).index() + ')');
            el.addClass('green-back');
        },
        function () {
            var el = $(this).closest('.tr').next().find('article:eq(' + $(this).index() + ')');
            el.removeClass('green-back');
        }
    );

    //  blocks click
    $('.tr.filter article').not('.break').click(
        function () {
            var el = $(this).closest('.tr').next().find('article:eq(' + $(this).index() + ') .btn');
            if (el.attr('href') == '#') {
                el.trigger('click');
            }
            else {
                window.open(el.attr('href'), '_top');
            }
        }
    );

    $('.tr.filter article select').click(
        function () {
            return false;
        }
    );

    $('.tr.controls article').not('.break').hover(
        function () {
            var el = $(this).closest('.tr').prev().find('article:eq(' + $(this).index() + ')');
            el.addClass('green-back');
        },
        function () {
            var el = $(this).closest('.tr').prev().find('article:eq(' + $(this).index() + ')');
            el.removeClass('green-back');
        }
    );

    $('#meetjames').click(function () {
        window.open('/james/', '_top');
    });

    //region Fixed Blocks
    $('[data-fixed-block]').each(function () {
        $(this).data('top', $(this).offset().top);
    });

    $(window).on('scroll.fixed-block.data-api', function () {
        var $t = $(this)
            , scroll = $(window).scrollTop()
            , $bot = $('[data-fixed-block-bottom]')
            , footop;

        var $to = $('.h-wrap .tabs');
        if ($to.length < 1) {
            $to = $('.h-wrap footer');
        }
        footop = $to.offset().top;

        $('[data-fixed-block]').each(function () {

            var $t2 = $(this)
                , top = $t2.data('top')
                , pos = $t2.data('fixedBlock');

            if (scroll > top) {
                $t2.css('width', $t2.width() + 'px');
                $t2.next().css('margin-top', ($t2.height() - 120) + 'px');
                $t2.addClass('fixed-block');
                $bot.addClass('fixed-block');
                if (!$('.cmp-filter-wrap').is('.uncollapsed')) {
                    $('.cmp-filter-wrap').addClass('collapsed');
                }
            } else {
                $t2.next().css('margin-top', 0);
                $t2.removeClass('fixed-block');
                $bot.removeClass('fixed-block');
                if ($('.cmp-filter-wrap').is('.collapsed')) {
                    $('.cmp-filter-wrap').removeClass('uncollapsed');
                }
                $('.cmp-filter-wrap').removeClass('collapsed');
            }

            if (scroll > (footop - $(window).height() - 25)) {
                $bot.removeClass('fixed-block');
            }
        });
    });
    //endregion

});

