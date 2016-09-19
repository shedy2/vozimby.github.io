window.app.registerComponent('hero', function($) {
  return {
    init: function() {
      // DEV ONLY
      return;
      this.animateClouds();
    },

    animateClouds: function() {
      setInterval(function() {
        var div = jQuery("#cloud_1");
        div.animate({
          left: '1000px'
        }, 95000);
        div.animate({
          left: '-100px'
        }, 110000);
      }, 3);

      setInterval(function() {
        var div = jQuery("#cloud_2");
        div.animate({
          left: '-100px'
        }, 55000);
        div.animate({
          left: '1000px'
        }, 110000);
      }, 3);

      setInterval(function() {
        var div = jQuery("#cloud_3");
        div.animate({
          left: '-100px'
        }, 95000);
        div.animate({
          left: '1000px'
        }, 110000);
      }, 3);

      setInterval(function() {
        var div = jQuery("#cloud_4");
        div.animate({
          left: '1000px'
        }, 95000);
        div.animate({
          left: '-100px'
        }, 110000);
      }, 3);

      setInterval(function() {
        var div = jQuery("#cloud_5");
        div.animate({
          left: '-100px'
        }, 85000);
        div.animate({
          left: '1000px'
        }, 110000);
      }, 3);

      setInterval(function() {
        var div = jQuery("#sun_clouds");
        div.animate({
          left: '16px'
        }, 8500);
        div.animate({
          left: '56px'
        }, 8500);
      }, 3);

      setInterval(function() {
        var div = jQuery("#cloudbg");
        div.animate({
          left: '468px'
        }, 8500);
        div.animate({
          left: '508px'
        }, 8500);
      }, 3);

      setInterval(function() {
        var div = jQuery("#sun");
        div.animate({
          borderSpacing: 30
        }, {
          step: function(now, fx) {
            jQuery(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
            jQuery(this).css('-moz-transform', 'rotate(' + now + 'deg)');
            jQuery(this).css('-ms-transform', 'rotate(' + now + 'deg)');
            jQuery(this).css('-o-transform', 'rotate(' + now + 'deg)');
            jQuery(this).css('transform', 'rotate(' + now + 'deg)');
          },
          duration: 7200
        }, 'linear');
        div.animate({
          borderSpacing: 0
        }, {
          step: function(now, fx) {
            jQuery(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
            jQuery(this).css('-moz-transform', 'rotate(' + now + 'deg)');
            jQuery(this).css('-ms-transform', 'rotate(' + now + 'deg)');
            jQuery(this).css('-o-transform', 'rotate(' + now + 'deg)');
            jQuery(this).css('transform', 'rotate(' + now + 'deg)');
          },
          duration: 7200
        }, 'linear');
      }, 0)
    }
  }
})
