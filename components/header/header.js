window.app.registerComponent('header', function($) {
  return {
    init: function() {
      this.handleSocialButtons();
    },

    handleSocialButtons: function() {
      $('.socnet .soc_btn').tooltip({
        html: true,
        animation: false,
        trigger: 'click'
      });

      jQuery('body').click(function(event) {
        if (!$(event.target).hasClass('soc_btn'))
          $('.socnet .tooltip.bottom').remove();
      });

      $('.socnet .soc_btn').bind('mouseenter', function() {
        $('.socnet .soc_btn.showed').removeClass('showed').trigger('click');
        $(this).addClass('showed').trigger('click');
      }).bind('click', function() {
        if ($(this).hasClass('clicked'))
          $(this).removeClass('clicked');
        else
          $(this).addClass('clicked');
        $('.socnet .soc_btn.clicked').each(function() {
          if (!$(this).hasClass('showed'))
            $(this).trigger('click');
        });
      });
    }
  };
})
