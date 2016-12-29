window.app.registerComponent('popup-news', function($) {
  return {
    init: function() {
      if (!Cookies.get('n17')) {
        Cookies.set('n17', 1);
        jQuery('#news-modal').modal('show');
      }
    },
  }
});
