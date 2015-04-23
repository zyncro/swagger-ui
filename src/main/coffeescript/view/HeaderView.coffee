class HeaderView extends Backbone.View
  events: {
    'click #show-pet-store-icon'    : 'showPetStore'
    'click #show-wordnik-dev-icon'  : 'showWordnikDev'
    'click #explore'                : 'showCustom'
    'click #user_login'             : 'doUserLogin'
    'keyup #input_baseUrl'          : 'showCustomOnKeyup'
    'keyup #input_apiKey'           : 'showCustomOnKeyup'
  }

  initialize: ->

  doUserLogin: (e) ->
    userName = $.trim($('#user_email').val())
    userPassword = $.trim($('#user_password').val())
    url = $('#input_baseUrl').val().replace('api-docs', 'oauth/token')
    data = {
      username: userName,
      password: userPassword,
      grant_type: 'password',
      client_id: 'zyncro-test',
      client_secret: 'zyncro123456',
      scope: 'trust'
    }

    if !userName || !userPassword
      return

    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: data
    }).done (response) ->
      if response.access_token
        $('#input_apiKey').val(response.access_token);
        $('#input_apiKey').change();
        true

  showPetStore: (e) ->
    @trigger(
      'update-swagger-ui'
      {url:"http://petstore.swagger.wordnik.com/api/api-docs"}
    )

  showWordnikDev: (e) ->
    @trigger(
      'update-swagger-ui'
      {url:"http://api.wordnik.com/v4/resources.json"}
    )

  showCustomOnKeyup: (e) ->
    @showCustom() if e.keyCode is 13

  showCustom: (e) ->
    e?.preventDefault()
    @trigger(
      'update-swagger-ui'
      {url: $('#input_baseUrl').val(), apiKey: $('#input_apiKey').val()}
    )

  update: (url, apiKey, trigger = false) ->
    $('#input_baseUrl').val url
    #$('#input_apiKey').val apiKey
    @trigger 'update-swagger-ui', {url:url} if trigger
