$.when($.ready).then(function() {
    $('.slider-photo').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
    });
});