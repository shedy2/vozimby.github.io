window.app.registerComponent('popup', function($) {
  return {
    init: function() {
      $('.close, .modal-backdrop').click(window.app.popup.hide)
    },

    show: function(type) {
      $().each(function(index, element) {
        if ($(element).data('type') == type)
          $(element).show()
      })
    },

    hide: function() {
      console.log('hide')
      console.log($())
      $().hide()
    }
  }
})
