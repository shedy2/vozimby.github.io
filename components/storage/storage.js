var API_ADDRESS = '//api.vozim.by/';

window.app.registerComponent('storage', function($) {
  return {
    _rawdata: {},

    get: function(query, funct, params) {
      if (typeof this._rawdata[ query ] != 'undefined') {
        return funct(this._rawdata[ query ]);
      }

      var that = this;
      this.apiGet(query, params).done(function(resp){
        that._rawdata[ query ] = resp;
        funct(resp);
      });

      return this;
    },

    apiGet: function(query, params) {
      return jQuery.get(API_ADDRESS + query, params);
    },

    apiPost: function(query, params) {
      return jQuery.post(API_ADDRESS + query, params);
    }
  };
});
