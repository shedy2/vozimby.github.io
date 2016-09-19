window.app.registerComponent('popup-opinions', function($) {
  return {
    init: function() {
      $('form').bind('submit', function(event) {
        var parameters = $(event.target).serialize(),
            errorMessage = 'Что-то пошло не так. Свяжитесь с нами по телефону или по почте.',
            successMessage = $(event.target).attr('id') == 'courierinfo'
              ? 'Спасибо! Ваша благодарность принята.'
              : 'Спасибо! Ваша жалоба принята.'

        $.get('/api.php', parameters, function(data) {
          $(event.target).parents('.modal-content').find('.close').trigger('click')
          alert(data == 'success' ? successMessage : errorMessage)
        })

        event.preventDefault()
      })
    }
  }
})
