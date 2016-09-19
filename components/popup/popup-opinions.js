window.app.registerComponent('popup-opinions', function($) {
  return {
    init: function() {
      this.handleFormInput();
      this.handleSubmit();
    },

    handleFormInput: function() {
      $('#dont-chk, #blagod-chk').on('change', function(event) {
        var byDetails = $(this).prop('checked');
        $(this).parent().find('.by-details').toggle(byDetails);
        $(this).parent().find('.by-passport').toggle(!byDetails);
      });
    },

    handleSubmit: function() {
      $('form').bind('submit', function(event) {
        var parameters = $(event.target).serialize(),
            errorMessage = 'Что-то пошло не так. Свяжитесь с нами по телефону или по почте.',
            successMessage = $(event.target).attr('id') == 'courierinfo'
              ? 'Спасибо! Ваша благодарность принята.'
              : 'Спасибо! Ваша жалоба принята.';

        $.get('/api.php', parameters, function(data) {
          $(event.target).parents('.modal-content').find('.close').trigger('click');
          alert(data == 'success' ? successMessage : errorMessage);
        })

        event.preventDefault();
      })
    }
  }
})
