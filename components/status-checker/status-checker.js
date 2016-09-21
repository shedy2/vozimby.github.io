window.app.registerComponent('status-checker', function($) {
  return {
    init: function() {
      $('#rstatus').bind('submit', this.handleSubmit);
    },

    handleSubmit: function(e) {
      e.preventDefault();
      e.stopPropagation();

      window.app.analytics.reachGoal('Otslejivanie');

      var series = $('#rst-series').val();
      var number = $('#rst-number').val();
      if (series == '' || number == '') {
        alert('Заполните все поля');
        return;
      }

      window.app.storage
      .apiPost('rstatus', {
        'series': series,
        'number': number
      })
      .done(function(data){
        var rControl = $('#rstatus-result');
        rControl.find('.rstatus-res').addClass('hidden');
        if (data.substr(0, 12) == 'Доставляется') {
          rControl.find('.delivery').removeClass('hidden');
        } else if (data.substr(0, 8) == 'Заказ на') {
          rControl.find('.process div').html(data);
          rControl.find('.process').removeClass('hidden');
        } else if (data == 'Доставлено') {
          rControl.find('.delivered').removeClass('hidden');
        } else if (data.substr(0, 8) == 'Доставка') {
          rControl.find('.planed div').html(data);
          rControl.find('.planed').removeClass('hidden');
        } else if (data == 'Возврат') {
          rControl.find('.return').removeClass('hidden');
        } else {
          alert(data);
        }
      })
      .fail(function(){
        alert('Проверка статуса заявки временно недоступна. Свяжитесь с нами по телефону или по почте.');
      });
    }
  };
});
