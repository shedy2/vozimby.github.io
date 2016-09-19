window.app.registerComponent('analytics', function($) {
  return {
    init: function() {},

    reachGoal: function() {
      if (typeof document.yaCounter25294952 != 'undefined')
        document.yaCounter25294952.reachGoal(name);
    }
  }
})
