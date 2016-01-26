'use strict';

SwaggerUi.Views.HeaderView = Backbone.View.extend({
  events: {
    'click #show-pet-store-icon'    : 'showPetStore',
    'click #explore'                : 'showCustom',
    'click #user_login'             : 'doUserLogin',
    'keyup #input_baseUrl'          : 'showCustomOnKeyup',
    'keyup #input_apiKey'           : 'showCustomOnKeyup'
  },

  initialize: function(){},

  doUserLogin: function () {
    var data, url, userName, userPassword, userGrantType, userClientId, userClientSecret, userScope;
    userName = $.trim($('#user_email').val());
    userPassword = $.trim($('#user_password').val());
    userGrantType = $.trim($('#grant_type').val());
    userClientId = $.trim($('#client_id').val());
    userClientSecret = $.trim($('#client_secret').val());
    userScope = $.trim($('#scope').val());

    var a = document.createElement('a');
    a.href = $('#input_baseUrl').val();
    var path = '';
    if (a.pathname.split('/')[1] === 'zyncro') {
      path = '/zyncro';
    }
    url = a.protocol + '//' + a.hostname + path + '/oauth/token';

    data = {
      username: userName,
      password: userPassword,
      grant_type: userGrantType,
      client_id: userClientId,
      client_secret: userClientSecret,
      scope: userScope
    };

    return $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: data
    }).done(function (response) {
      if (response.access_token) {
        $('#input_apiKey').val(response.access_token);
        $('#input_apiKey').change();
        return true;
      }
    });
  },

  showPetStore: function(){
    this.trigger('update-swagger-ui', {
      url:'http://petstore.swagger.io/v2/swagger.json'
    });
  },

  showCustomOnKeyup: function(e){
    if (e.keyCode === 13) {
      this.showCustom();
    }
  },

  showCustom: function(e){
    if (e) {
      e.preventDefault();
    }

    this.trigger('update-swagger-ui', {
      url: $('#input_baseUrl').val(),
      apiKey: $('#input_apiKey').val()
    });
  },

  update: function(url, apiKey, trigger){
    if (trigger === undefined) {
      trigger = false;
    }

    $('#input_baseUrl').val(url);

    //$('#input_apiKey').val(apiKey);
    if (trigger) {
      this.trigger('update-swagger-ui', {url:url});
    }
  }
});
