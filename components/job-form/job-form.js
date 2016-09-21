window.app.registerComponent('job-form', function($) {
  return {
    init: function() {
      $('.jobinfo:first').focus();
      $('form').bind('submit', $.proxy(this.handleSubmit, this));
    },

    handleError: function() {
      alert('Что-то пошло не так. Свяжитесь с нами по телефону или по почте.');
    },

    handleSuccess: function(result) {
      if (result && result == 'success') {
        // $('form').addClass('hidden');
        alert('Спасибо! Ваше резюме будет рассмотрено в ближайшее время.');
        location.href = '/';
      } else {
        this.handleError();
      }
    },

    handleSubmit: function(e) {
      e.preventDefault();
      e.stopPropagation();

      window.app.storage
        .apiPost('job', $('form').serialize())
        .done($.proxy(this.handleSuccess, this))
        .fail($.proxy(this.handleError, this));
    }
  };
});
