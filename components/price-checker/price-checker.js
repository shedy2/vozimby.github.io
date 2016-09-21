window.app.registerComponent('price-checker', function($) {
  return {
    init: function() {
      $('.tip').tooltip({
        html:true,
        animation:false
      });

      $('.prettyCheckable').each(function(){
        $(this).prettyCheckable();
      });

      $('.js-form input').change(function() {
        if ($(this).val() == '')
          $(this).removeClass('filled');
        else
          $(this).addClass('filled');
      });

      $('input.digit-only').bind('keyup change', function() {
        if (/\D/g.test(this.value))
          this.value = this.value.replace(/\D/g, '');
      });

      $('.numeric').autoNumeric('init', {
        aSep: '.',
        aDec: ',',
        vMin: '0',
        vMax: '999999999999'
      });

      var calculatorRoot = $('#calculation').first();
      if (calculatorRoot.size() == 0) return;
      var calculatorMap = jQuery('#calculator-map-modal').first();

      var formatMoney = function(n, c, d, t) {
        var c = isNaN(c = Math.abs(c)) ? 2 : c,
          d = d == undefined ? "." : d,
          t = t == undefined ? "," : t,
          s = n < 0 ? "-" : "",
          i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
          j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
      };

      var formatBynCost = function(nm) {
        var byrValue = parseInt(('' + nm).replace(/[^0-9]/g, ''));
        var bynDv = 10000;
        return ('' + (byrValue / bynDv).toFixed(2)).replace('.', ',') + ' (' + formatMoney(nm, 0, '.', '.') + ') руб.';
      };

      var formatClcDays = function(s) {
        return s.replace(/([0-9]{2}[.][0-9]{2})[.0-9]{5}/g, '$1');
      };

      var isCalculatorIncomplate = function() {
        var ns = false;
        calculatorRoot.find('input[type="text"]:visible').each(function() {
          if ($(this).val() == '') ns = true;
        });
        calculatorRoot.find('select:visible').not('.dependent-sub').not('#clc-typeid').each(function() {
          if ($(this).val() == '') ns = true;
        });
        return ns;
      };

      var setupCalculatorResult = function(txt) {
        calculatorRoot.find('#clc-result').html('<div class="noresult">' + txt + '</div>');
      };

      var showAddressOnMap = function(bundle, address) {
        calculatorMap.find('.modal-title').text(address);
        var watchButton = bundle.find('.watch-on-map').first();
        watchButton.removeClass('filled');
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          'address': address,
          'region': 'by',
        }, function(results, status) {
          if (status != google.maps.GeocoderStatus.OK) return;
          watchButton.addClass('filled');
          watchButton.unbind('click').click(function() {
            if (!$(this).hasClass('filled')) return;
            calculatorMap.modal('show');
            calculatorMap.find('.close').unbind('click').click(function() {
              calculatorMap.modal('hide');
            });
            setTimeout(function() {
              var directionsDisplay = new google.maps.DirectionsRenderer();
              var directionsService = new google.maps.DirectionsService();
              var mapcenter = new google.maps.LatLng(53.900, 27.566666);
              var map = new google.maps.Map(document.getElementById('calculator-map-canvas'), {
                zoom: 10,
                center: mapcenter
              });
              directionsDisplay.setMap(map);
              map.setCenter(results[0].geometry.location);
              var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
              });
              directionsService.route({
                origin: mapcenter,
                destination: results[0].geometry.location,
                travelMode: google.maps.TravelMode.DRIVING
              }, function(result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                  directionsDisplay.setDirections(result);
                }
              });
            }, 200);
          });
        });
      };

      calculatorRoot.find('#clc-sender').change(function() {
        calculatorRoot.find('.control-group-ctselect option:first').prop('selected', true);
        calculatorRoot.find('.control-group-typeid select:first option:first').prop('selected', true);
        calculatorRoot.find('.control-group-typeid select:gt(0)').css('display', 'none');
        calculatorRoot.find('input[type="text"]').removeClass('filled').val('');
        calculatorRoot.find('input[type="checkbox"]').removeClass('filled').prop('checked', false);
        calculatorRoot.find('.prettycheckbox a.checked').removeClass('checked');
        var val = $(this).val();
        if (val == '0') {
          calculatorRoot.find('.control-group-typeid, .control-group-dimension, .control-group-cost, .control-group-locality, .control-group-additional').addClass('hidden');
          calculatorRoot.find('.control-group-cost').addClass('force-hidden');
        } else if (val == '1') {
          calculatorRoot.find('.control-group-ctselect, .control-group-dimension, .control-group-cost, .control-group-locality, .control-group-additional').addClass('hidden');
          calculatorRoot.find('.control-group-cost').removeClass('force-hidden');
        }
        calculatorRoot.find('.control-group-ctselect').removeClass('hidden');
      });

      calculatorRoot.find('#clc-calculation-type').change(function() {
        var val = $(this).val();
        if (val == '- выберите -') {
          $(this).parent().removeClass('filled');
          return;
        } else {
          $(this).parent().addClass('filled');
        }
        if (val == '2') {
          calculatorRoot.find('.control-group-typeid').addClass('hidden');
          calculatorRoot.find('.control-group-dimension').removeClass('hidden');
          calculatorRoot.find('.control-group-dimension input').keyup(function() {
            var showLoc = function() {
              var r = true;
              calculatorRoot.find('.control-group-dimension input').each(function() {
                if ($(this).val() == '') r = false;
              });
              return r;
            };
            if (showLoc()) {
              calculatorRoot.find('.control-group-locality').removeClass('hidden');
            }
          });
          calculatorRoot.find('.control-group-cost').addClass('force-hidden');
          calculatorRoot.find('.control-group-cost:visible').addClass('hidden');
        } else if (val == '1') {
          calculatorRoot.find('.control-group-typeid').removeClass('hidden');
          calculatorRoot.find('.control-group-dimension').addClass('hidden');
          calculatorRoot.find('.control-group-cost').removeClass('force-hidden');
        }
      });

      window.app.storage.get('rates', function(data) {
        var typeControl = calculatorRoot.find('#clc-typeid');
        typeControl.append(jQuery(data));
        typeControl.dependentSelects({
          placeholderOption: '- выберите -'
        });
        typeControl.parent().find('select').change(function() {
          var lastSelect = typeControl.parent().find('select:visible:last');
          var options = lastSelect.children('option');
          if (options.size() == 2) {
            var lastOption = options.last();
            if (!lastOption.prop('selected')) {
              lastOption.prop('selected', true).attr('selected', 'selected');
              lastSelect.trigger('change');
            }
          }
          var opt = typeControl.parent().find('select:visible option:selected:last');
          var val = opt.val();
          if (val == '- выберите -') {
            $(this).parent().removeClass('filled');
            return;
          } else {
            $(this).parent().addClass('filled');
          }
          var cast = opt.data('cast');
          if (cast == '1') {
            calculatorRoot.find('.control-group-dimension').removeClass('hidden');
          } else {
            calculatorRoot.find('.control-group-dimension').addClass('hidden');
          }
          if (calculatorRoot.find('.control-group-cost:not(.force-hidden)').size() > 0) {
            calculatorRoot.find('.control-group-cost:not(.force-hidden)').removeClass('hidden');
            calculatorRoot.find('.control-group-cost input').bind('keyup', function() {
              calculatorRoot.find('.control-group-locality').removeClass('hidden');
              calculatorRoot.find('.control-group-additional').removeClass('hidden');
            });
          } else {
            calculatorRoot.find('.control-group-locality').removeClass('hidden');
            calculatorRoot.find('.control-group-additional').removeClass('hidden');
          }
          calculatorRoot.find('.control-group:visible').removeClass('last');
          calculatorRoot.find('.control-group:visible:last').addClass('last');
        });
      });

      window.app.storage.get('location', function(data) {
        calculatorRoot.find('.clc-locality-input').typeahead({
          source: data,
          matcher: function(item) {
            var query = this.query.toLowerCase();
            var itemRaw = item;
            if (query.split(' ').length == 1)
              itemRaw = item.split(' ')[0];
            var rgx = new RegExp('.*' + query + '.*', 'i');
            return rgx.test(itemRaw);
          },
        }).bind('change blur', function() {
          var bundle = $(this).parents('.control-group-locality').first();
          if (data.indexOf($(this).val()) === -1) {
            $(this).val('');
            bundle.find('.watch-on-map').removeClass('filled');
          } else {
            calculatorRoot.find('.control-group-additional').removeClass('hidden');
            calculatorRoot.find('.control-group:visible').removeClass('last');
            calculatorRoot.find('.control-group:visible:last').addClass('last');
            var v = $(this).val();
            var address = '';
            if (parts = v.match(/(.+) \(([^,]+), ([^,]+)\)/)) {
              address = parts[1] + ', Беларусь';
            } else if (parts = v.match(/(.+) \(([^,]+)\)/)) {
              address = 'город ' + parts[1] + ', ' + parts[2] + ', Беларусь';
            }
            showAddressOnMap(bundle, address.replace('обл.', 'область'));
          }
          if ($(this).attr('name') == 'locality-from') {
            var fieldValue = $(this).val();
            var storePointControl = calculatorRoot.find('.controls-fromstore');
            if (fieldValue == 'Минск (Минский р-н, Минская обл.)') {
              storePointControl.removeClass('hidden');
            } else {
              storePointControl.addClass('hidden');
            }
          }
        });
      });

      calculatorRoot.find('input, select').bind('change keyup', function(e) {
        calculatorRoot.find('#clc-result').html('');
        calculatorRoot.find('.control-group:visible').removeClass('last');
        calculatorRoot.find('.control-group:visible:last').addClass('last');
      });

      calculatorRoot.bind('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (isCalculatorIncomplate()) {
          setupCalculatorResult('Заполните все поля');
          return;
        }

        setupCalculatorResult('Считаем ...');

        window.app.analytics.reachGoal('Kalculator');

        window.app.storage
        .apiPost('calculator', calculatorRoot.serialize())
        .done(function(resp){
          var keyBudget = 3;
          var keyStandart = 2;
          var keyExpress = 1;

          var keyMinimal = 'minimal';
          var keyCustom = 'custom';
          var clcResults = calculatorRoot.find('#clc-result').first();

          if (resp[keyCustom] && resp[keyCustom].enabled) {
            clcResults.html('<div class="exp clearfix">\
          <span class="custominfo">Требуется индивидуальный расчет - пожалуйста свяжитесь с нами 6666-565</span> \
          </div>');
            return;
          }

          if (resp[keyMinimal] && resp[keyMinimal].enabled) {
            clcResults.html('<div class="exp clearfix">\
          <span class="cost">от ' + formatBynCost(resp[keyMinimal].cost) + '</span>\
          <span class="mininfo">- узнать более 6666-565</span> \
          </div>');
            return;
          }

          var standartHtml = '';
          if (resp[keyStandart].enabled) {
            standartHtml = '<div class="std clearfix">\
          <span class="lbl">Стандарт</span>\
          <span class="cost">' + formatBynCost(resp[keyStandart].cost) + '</span>\
          <span class="dates">' + formatClcDays(resp[keyStandart].days) + '</span>\
          </div>';
          }

          clcResults.html('<div class="exp clearfix">\
          <span class="lbl">Экспресс</span>\
          <span class="cost">' + formatBynCost(resp[keyExpress].cost) + '</span>\
          <span class="dates">' + formatClcDays(resp[keyExpress].days) + '</span>\
          </div>' +
            standartHtml + '<div class="eco clearfix">\
          <span class="lbl">Эконом</span>\
          <span class="cost">' + formatBynCost(resp[keyBudget].cost) + '</span>\
          <span class="dates">' + formatClcDays(resp[keyBudget].days) + '</span>\
          </div>' + '<div class="inf"><span>Ближайшие дни доставки</span></div>');
          })
          .fail(function(){
            setupCalculatorResult('На данный момент калькулятор недоступен');
            return;
          });
      });
    }
  }
});
