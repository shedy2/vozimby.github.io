window.app.registerComponent('header', function($) {
  return {
    init: function() {
      $('#opinions-toggle').click(function() {
        window.app.popup.show('feedback')
      })
    }
  }
})
