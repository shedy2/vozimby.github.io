window.app.registerComponent('popup-callme', function($) {
  return {
    init: function() {
      var that = this;
      var iForm = $('form.callme');

      iForm.find('.phone').inputmask("phone");

      iForm.bind('submit', function(e) {
        e.preventDefault();
        window.app.storage
          .apiPost('callme', $(e.target).serialize())
          .done($.proxy(that.handleSuccess, that))
          .fail($.proxy(that.handleError, that));
      });
    },

    handleErrorMsg: function() {
      alert('Что-то пошло не так. Свяжитесь с нами по телефону или по почте.');
    },

    handleError: function(resp) {
      this.handleErrorMsg();
    },

    handleSuccess: function(result) {
      location.href = '/thank-you.html';
    },
  }
})
