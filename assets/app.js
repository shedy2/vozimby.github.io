$(document).ready(function(){
    $(".phone_mask").inputmask('+375 (99) 999-99-99', {
       
    });

    $('.to_form').on('click', function(){
        $('html, body').animate({
            scrollTop: $(".vz-china__form").offset().top
        }, 500);

        $('.vz-china__form').find('[name="phone"]').focus();
        return false;
    })
})