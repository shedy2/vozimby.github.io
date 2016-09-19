window.app.registerComponent('job-form', function($) {
  return {
    init: function() {
      $('.jobinfo:first').focus();
      $('form').bind('submit', this.handleSubmit);
    },

    handleSubmit: function(e) {
      e.preventDefault();
      e.stopPropagation();

      var data = $('form').serialize();
      $.get('/api.php', data, function(result) {
        if (result == 'success') {
          $('form').addClass('hidden');
          alert('Спасибо! Ваше резюме будет рассмотрено в ближайшее время.');
          location.href = '/';
        } else {
          alert('Что-то пошло не так. Свяжитесь с нами по телефону или по почте.');
        }
      });
    }
  };
});
