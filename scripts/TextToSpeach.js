(function() {
  var TextToSpeach;

  TextToSpeach = (function() {

    function TextToSpeach(options) {
      if (options == null) {
        options = {};
      }
    }

    TextToSpeach.prototype.gogoleSpeach = function(text) {
      this.appendAudioPlayer('https://translate.google.com/translate_tts?ie=UTF-8&q=' + encodeURIComponent(text) + '&tl=zh-TW');
      return document.querySelector('#text-to-speech').play();
    };

    TextToSpeach.prototype.gcinSpeach = function(text) {
      this.removeAudioPlayer();
      this.appendAudioPlayer('http://audreyt.github.io/gcin-voice-data/mp3/' + encodeURIComponent(text) + '/3.mp3');
      return document.querySelector('#text-to-speech').play();
    };

    TextToSpeach.prototype.appendAudioPlayer = function(url) {
      return $('body').append('<audio id="text-to-speech" preload="auto" controls><source src="' + url + '" type="audio/mp3" /></audio>');
    };

    TextToSpeach.prototype.removeAudioPlayer = function() {
      return $('#text-to-speech').remove();
    };

    return TextToSpeach;

  })();

  window.TextToSpeach = TextToSpeach;

}).call(this);
