window.app.registerComponent('storage', function($) {
  return {
    _rawdata: {},

    get: function(name, funct) {
      this.cache(name, funct);
      return this;
    },

    cache: function(name, funct) {
      var val = this.getCache(name);
      if (typeof val != 'undefined' && val !== null)
        funct(val);
      else
        this.api(name, funct);
      return this;
    },

    api: function(name, funct) {
      var q = {};
      q[name] = 1;
      that = this;

      jQuery.get('/api.php', q, function(resp) {
        that.setCache(name, resp);
        funct(resp);
      });
      return this;
    },

    supportsStorage: function() {
      return false;
      try {
        return 'localStorage' in window && window['localStorage'] !== null;
      } catch (e) {
        return false;
      }
    },

    getCachePrefix: function() {
      var d = new Date();
      return d.getFullYear() + d.getMonth() + d.getDate();
    },

    clearStorage: function() {
      if (this.supportsStorage()) {
        if (localStorage.length > 8) {
          localStorage.clear();
        }
      }
    },

    setCache: function(name, value) {
      this._rawdata[name] = value;
      if (this.supportsStorage()) {
        var prefix = this.getCachePrefix();
        localStorage.setItem(prefix, JSON.stringify(this._rawdata));
      }
    },

    getCache: function(name) {
      if (this.supportsStorage()) {
        var prefix = this.getCachePrefix();
        var raw = JSON.parse(localStorage.getItem(prefix));
        if (typeof raw == 'undefined' || raw === null)
          return null;
        else if (typeof raw[name] != 'undefined')
          return raw[name];
        else if (typeof this._rawdata[name] != 'undefined')
          return this._rawdata[name];
        else
          return null;
      } else if (typeof this._rawdata[name] != 'undefined')
        return this._rawdata[name];
      else
        return null;
    }
  };
});
