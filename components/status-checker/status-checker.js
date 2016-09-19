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

      $.get('/api.php', {
        'form': 'rstatus',
        'series': series,
        'number': number
      }, function(data) {
        $('#rstatus-result .rstatus-res').addClass('hidden');
        if (data.substr(0, 12) == 'Доставляется') {
          $('#rstatus-result .delivery').removeClass('hidden');
        }
        if (data.substr(0, 8) == 'Заказ на') {
          $('#rstatus-result .process div').html(data);
          $('#rstatus-result .process').removeClass('hidden');
        } else if (data == 'Доставлено') {
          $('#rstatus-result .delivered').removeClass('hidden');
        } else if (data.substr(0, 8) == 'Доставка') {
          $('#rstatus-result .planed div').html(data);
          $('#rstatus-result .planed').removeClass('hidden');
        } else if (data == 'Возврат') {
          $('#rstatus-result .return').removeClass('hidden');
        } else {
          alert(data);
        }
      });
    }
  };
});
