window.error_block = {
    timer : null,
    show : function(trigger) {
        switch(trigger) {
            case 'empty':
                $('.form-block__info').html('Не заполнено одно из обязательных полей');
                break;
            case 'name':
                $('.form-block__info').html('Поле Имя содержит недопустимые символы');
                break;
            case 'email':
                $('.form-block__info').html('Поле Email содержит недопустимые символы');
                break;
        }
        $('.form-block__info').addClass('error');
    },
    hide : function(type) {
        error_block.timer = setTimeout(function(type) {
            $('.form-block__info').removeClass(type);
            $('.form-block__info').css({'display' : 'none'});
        }, 3000, type);
    }
}

$.when($.ready).then(function() {
    $('.slider-photo').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        responsive: [
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: false,
              }
            },
        ]
    });

    $('body').on('click', '[data-action="sendfb"]', function(e) {
        e.preventDefault();

        let checker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
        let name_check = /^[А-Яа-я\s]+$/;

        if ($('[name="name-persona"]').val() === '' || $('[name="email-persona"]').val() === '') {
            error_block.show('empty');
            $('.form-block__info').fadeIn(400, function() {
            	$('.form-block__info').css({'display' : 'inline-block'});
            });
            clearTimeout(error_block.timer);
            error_block.hide('error');
          
          	if ($('[name="name-persona"]').val() === '') {
                $('[name="name-persona"]').addClass('error');
            }
          
            if ($('[name="email-persona"]').val() === '') {
                $('[name="email-persona"]').addClass('error');
            }
          
            return;
        }

        if (!checker.test($('[name="email-persona"]').val())) {
            error_block.show('email');
            $('.form-block__info').fadeIn(400, function() {
            	$('.form-block__info').css({'display' : 'inline-block'});
            });
            clearTimeout(error_block.timer);
            error_block.hide('error');
            return;
        }

        if (!name_check.test($('[name="name-persona"]').val())) {
            error_block.show('name');
            $('.form-block__info').fadeIn(400, function() {
            	$('.form-block__info').css({'display' : 'inline-block'});
            });
            clearTimeout(error_block.timer);
            error_block.hide('error');
            return;
        }

        $.ajax({
            url: '//' + location.hostname + '/ajax.php',
            data: { 'name' : $('[name="name-persona"]').val(), 'email' : $('[name="email-persona"]').val() },
            dataType: 'json',
            type: 'POST',
            success: function(data) {
                if (data.status == 'ok') {
                    $('.form-block__info').html('Вы успешно подписаны на новости!');
                    $('.form-block__info').addClass('success');
                    $('.form-block__info').fadeIn(400, function() {
                        $('.form-block__info').css({'display' : 'inline-block'});
                    });
                  
                  	$('[name="name-persona"]').val('');
                    $('[name="email-persona"]').val('');
                    
                    clearTimeout(error_block.timer);
                    error_block.hide('success');
                  
                  	$('.form-block__button').css({'pointer-events' : 'none', 'opacity' : '0.2'});
                  	
                }
                if (data.status == 'error1') {
                    error_block.show('empty');
                    $('.form-block__info').fadeIn(400, function() {
                        $('.form-block__info').css({'display' : 'inline-block'});
                    });
                    clearTimeout(error_block.timer);
                    error_block.hide('error');
                }
                if (data.status == 'error2') {
                    error_block.show('email');
                    $('.form-block__info').fadeIn(400, function() {
                    	$('.form-block__info').css({'display' : 'inline-block'});
                    });
                    clearTimeout(error_block.timer);
                    error_block.hide('error');
                    $('[name="email-persona"]').addClass('error');
                }
            }
        });
    });

    $('body').on('click', '[data-action="scroll-top"]', function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
  
    $('body').on('focus', '.form-block__input-control', function() {
        $(this).removeClass('error');
    });
  
    $('body').on('click', '.header-menu__item', function() {
        for (let i = 0; i < $('.header-menu__item').length; i++) {
        	$($('.header-menu__item')[i]).removeClass('header-menu__item_selected');
        }
      	$(this).addClass('header-menu__item_selected');
    });

    $('body').on('click', '.menu-mobile', () => {
        if ($('.header-menu-mobile').hasClass('show')) {
            $('.header-menu-mobile').removeClass('show');
        } else {
            $('.header-menu-mobile').addClass('show');
        }
        
    });
});