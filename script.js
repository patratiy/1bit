$.when($.ready).then(function() {
    $('.slider-photo').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
    });

    $('body').on('click', '[data-sendfb]', (e) => {
        e.preventDefault();
        $.ajax({
            url: '//' + location.hostname + '/ajax.php',
            data: { 'name' : $('[name="name-persona"]').val(), 'email' : $('[name="email-persona"]').val() },
            dataType: 'json',
            type: 'POST',
            success: function(data) {
                if (data.st == 'ok') {

                }
                if (data.st == 'error') {

                }
            }
        });
    });

    $('body').on('click', '[data-scroll-top]', () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});