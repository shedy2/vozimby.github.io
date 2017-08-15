// function isShowNewsModal()
// {
//   var a = new Date();
//   var b = new Date(2017, 6, 1);
//   var _MS_PER_DAY = 1000 * 60 * 60 * 24;
//
//   // Discard the time and time-zone information.
//   var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
//   var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
//   return Math.floor((utc2 - utc1) / _MS_PER_DAY) >= 0;
// };

window.app.registerComponent('popup-news', function($) {
  return {
    init: function() {
      if (!Cookies.get('q')) {
        jQuery('#news-modal').modal('show');
        Cookies.set('q', 1);
      }
    },
  }
});
