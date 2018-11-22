$(document).ready(function () {
//////////////slide//////////////////////////
    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    var slidesPerPage = 4; //globaly define number of elements per page
    var syncedSecondary = true;

    sync1.owlCarousel({
        items: 1,
        nav: true,
        dots: false,
        loop: true,
        responsiveRefreshRate: 200,
        navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
    }).on('changed.owl.carousel', syncPosition);

    sync2
        .on('initialized.owl.carousel', function () {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items: slidesPerPage,
            dots: false,
            nav: false,
            slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
            responsiveRefreshRate: 100
        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);
        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }
        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });
///////////////open mobile-menu///////////
    $('.header-menu').click(function () {
        $('.navbar-wrapper').slideToggle('slow');
        $('.header-menu__label').toggleClass('toggle');
    })
    $('.header-look').click(function () {
        $('.header-search').slideToggle('slow');
        $(this).toggleClass('show');

    })
    //////////////////////inputs///////////////
    $('.inputs-choose input:checked').parent().addClass('checked');
    $('.inputs-choose input').click(function () {
        if ($(this).attr('type') == 'radio') {
            $('.inputs-choose input[type="radio"]').parent().removeClass('checked');
        }
        if ($(this).is(':checked')) {
            $(this).parent().addClass('checked');
        } else {
            $(this).parent().removeClass('checked');
        }

    });
    ///////////////rating //////////////
    $('.rating input').change(function () {
        var $radio = $(this);
        $('.rating .selected').removeClass('selected');
        $radio.closest('label').addClass('selected');
        $('#result-stars').html($(this).val() + ' звезд');
    });
    //////////////rating-persent///////////
    var result = 0;
    $('.rating-persent').mousemove(function (e) {
        // положение элемента
        var pos = $(this).offset();
        var elem_left = pos.left;
        // положение курсора внутри элемента
        var Xinner = e.pageX - elem_left;
        $('.rating-persent--front').width(Xinner.toFixed(1));
        var res = 0;
        if (Xinner.toFixed(1) < 100) {
            res = Xinner.toFixed(1)
        } else {
            res = 100
        }
        $('#result-persent').html(res + '%');

    });

    ////////////////////footer/////////////////////
    $('.footer-title').click(function () {
        $(this).parent().find('.footer-list').slideToggle('slow');
        if ($(this).hasClass('active-link')) {
            $(this).removeClass('active-link')
        } else {
            $(this).addClass('active-link')
        }


    })


    // $(document).click(function (e) {
    //     var container = $(".header");
    //     if (container.has(e.target).length === 0){
    //         $('.navbar-wrapper').slideToggle('slow');
    //         $('.header-menu__label').toggleClass('toggle');
    //
    //     }
    // });

});


