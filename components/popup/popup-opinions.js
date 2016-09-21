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

    handleErrorMsg: function() {
      alert('Что-то пошло не так. Свяжитесь с нами по телефону или по почте.');
    },

    handleError: function(resp) {
      if (resp.responseJSON) {
        for (var first in resp.responseJSON) break;
        alert(resp.responseJSON[ first ][0]);
      } else {
        this.handleErrorMsg();
      }
    },

    handleSuccess: function(formId, result) {
      if (result && result=='success') {
        $('.modal-content').find('.close').trigger('click');
        alert(formId == 'courierinfo'
          ? 'Спасибо! Ваша благодарность принята.'
          : 'Спасибо! Ваша жалоба принята.');
      } else {
        this.handleErrorMsg();
      }
    },

    handleSubmit: function() {
      var that = this;
      $('form').bind('submit', function(event) {
        event.preventDefault();
        var formId = $(event.target).attr('id');
        window.app.storage
          .apiPost('review', $(event.target).serialize())
          .done($.proxy(that.handleSuccess, that, formId))
          .fail($.proxy(that.handleError, that));
      });
    }
  }
})
