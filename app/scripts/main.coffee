require.config(
    paths:
        jquery         : '../components/jquery/jquery'
        underscore     : '../components/underscore/underscore'
        backbone       : '../components/backbone/backbone'
        bootstrapModal : '../components/bootstrap/js/bootstrap-modal'
        text           : '../components/requirejs-text/text'
        i18next        : '../components/i18next/release/i18next.amd.withJQuery-1.6.3.min'
        DrawChinese    : '../components/DrawChinese/DrawChinese'
        bumblerSpeech  : '../components/bumbler-to-speech/javascripts/application'
        raphael        : '../components/raphael/raphael'

    shim:
        underscore:
            exports: '_'
        backbone:
            deps: ['jquery', 'underscore']
            exports: 'Backbone'
        bootstrap:
            deps: ['jquery']
            exports: 'jquery'
        bootstrapModal:
            deps: ['jquery']
        bumblerSpeech:
            deps: ['jquery']
        i18next:
            deps: ['jquery']
        raphael:
            deps: ['jquery']
        DrawChinese:
            deps: ['jquery', 'raphael']
            exports: 'DrawChinese'
)

# define ['app', 'jquery'], (App, $) ->
require ['app', 'jquery'], (App, $) ->
    App.start()
