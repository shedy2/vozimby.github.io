window.app.registerComponent('city-checker', function($) {
  return {
    init: function() {
      this.prepareData();
      $('#citychecker').bind('submit', this.handleSubmit);
    },

    prepareData: function() {
      document.availibleCities = [];
      document.availibleCitiesLabels = [];
      window.app.storage.get('schedule', function(data) {
        data.forEach(function(e) {
          document.availibleCities.push(e[0]);
          document.availibleCitiesLabels.push(e[1]);
        });

        $('#checkcityinp').typeahead({
          source: document.availibleCities
        });
      });
    },

    handleSubmit: function(event) {
      event.preventDefault();

      $('#citychecker-result').text('ищем ...');
      window.app.analytics.reachGoal('SpisokGorodov');

      var search = function(where, what) {
        var st = what.replace('.', '\\.').replace('(', '\\(').replace(')', '\\)');
        var expr = new RegExp(st + '.*', 'i');
        var result = -1;
        where.forEach(function(el, index) {
          if (expr.test(el))
            result = index;
        });
        return result;
      };

      var val = $('#checkcityinp').val();
      val = val.charAt(0).toUpperCase() + val.slice(1);
      var inar = search(document.availibleCities, val);
      if (inar == -1)
        $('#citychecker-result').html('Данного города нет в списке основных городов.<br/> Уточнить сроки и стоимость доставки Вы можете по тел. 6666-565');
      else
        $('#citychecker-result').text(document.availibleCitiesLabels[inar]);
    }
  };
});
