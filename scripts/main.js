window.app = {
  registerComponent: function(aliases, factory) {
    aliases = [].concat(aliases)
    var name = aliases[0]

    var base = function(selector) {
      if (!selector) return $('.c-' + name)
      else return $('.c-' + name).find(selector)
    }
    $.extend(base, $)

    var component = factory(base)
    aliases.forEach(function(name) { window.app[name] = component })

    $(function() { component.init && component.init() })
  }
}
