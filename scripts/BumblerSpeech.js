(function() {
  var BumblerSpeech;

  BumblerSpeech = (function() {

    function BumblerSpeech(options) {
      var mergedOptions,
        _this = this;
      if (options == null) {
        options = {};
      }
      if (typeof options === "string") {
        this.player = document.querySelector(options);
        this.numberQueue = [];
        this.playing = false;
      } else {
        mergedOptions = $.extend({}, this.defaultOptions, options);
        this.player = document.querySelector(mergedOptions.player);
        this.numberQueue = mergedOptions.numbers;
        this.playing = false;
      }
      $(this).on('speechEnd', function() {
        return _this.delay(300, function() {
          var currentNumber;
          currentNumber = _this.numberQueue.shift();
          if (currentNumber === void 0 || null) {
            _this.playing = false;
            return;
          }
          return _this.playNumber(currentNumber);
        });
      });
    }

    BumblerSpeech.prototype.defaultOptions = {
      player: '#ma-speech',
      numbers: []
    };

    BumblerSpeech.prototype.delay = function(ms, func) {
      return setTimeout(func, ms);
    };

    BumblerSpeech.prototype.playPartial = function(partialIndex, rate) {
      var duration, partial,
        _this = this;
      if (rate == null) {
        rate = 1.0;
      }
      partial = this.AUDIO_MAP[partialIndex];
      this.player.currentTime = partial.start;
      this.player.play();
      duration = partial.duration / rate * 1000;
      return setTimeout(function() {
        return _this.player.pause();
      }, duration);
    };

    BumblerSpeech.prototype.playSequence = function(indexQueue, literal) {
      var audioEventHandler, queueIterate,
        _this = this;
      if (literal == null) {
        literal = false;
      }
      audioEventHandler = function() {
        _this.player.removeEventListener('pause', audioEventHandler);
        return queueIterate();
      };
      queueIterate = function() {
        var currentIndex, playbackRate;
        currentIndex = indexQueue.shift();
        playbackRate = 0.9;
        if (currentIndex === void 0 || null) {
          $(_this).trigger('speechEnd');
          return false;
        }
        if (indexQueue.length > 0) {
          playbackRate = currentIndex === "d10" ? 1.55 : 1.20;
        }
        if (literal) {
          playbackRate = 1;
        }
        _this.player.addEventListener('pause', audioEventHandler);
        return _this.playPartial(currentIndex, playbackRate);
      };
      return queueIterate();
    };

    BumblerSpeech.prototype.numberToSpeechQueue = function(number) {
      var digit1, digit10, queueArray;
      if (number === "thank") {
        return ["thank"];
      }
      if (number >= 100 || number < 1) {
        return false;
      }
      queueArray = [];
      digit1 = number % 10;
      digit10 = (number - digit1) / 10;
      if (digit10 > 0) {
        if (digit10 > 1) {
          queueArray.push("d" + digit10);
        }
        queueArray.push("d10");
      }
      if (digit1 > 0) {
        queueArray.push("d" + digit1);
      }
      return queueArray;
    };

    BumblerSpeech.prototype.playNumber = function(number) {
      var speechQueue;
      speechQueue = this.numberToSpeechQueue(number);
      return this.playSequence(speechQueue);
    };

    BumblerSpeech.prototype.play = function() {
      if (!this.playing) {
        $(this).trigger('speechEnd');
      }
      return this.playing = true;
    };

    BumblerSpeech.prototype.inputElement = '#word';

    BumblerSpeech.prototype.checkInput = function() {
      var numberToPlay;
      numberToPlay = $(this.inputElement).val();
      numberToPlay = this.chineseNumberToNumber(numberToPlay);
      numberToPlay = numberToPlay.match(/\d+/);
      if ((numberToPlay != null) && (0 < numberToPlay && numberToPlay < 100)) {
        return numberToPlay;
      } else {
        $(this.inputElement).val('').focus();
        return false;
      }
    };

    BumblerSpeech.prototype.chineseNumberToNumber = function(word) {
      var utf8code;
      utf8code = escape(word).replace(/%u/g, "").replace(/5341/ig, 10).replace(/4E5D/ig, 9).replace(/516B/ig, 8).replace(/4E03/ig, 7).replace(/516D/ig, 6).replace(/4E94/ig, 5).replace(/56DB/ig, 4).replace(/4E09/ig, 3).replace(/4E8C/ig, 2).replace(/4E00/ig, 1);
      return utf8code;
    };

    BumblerSpeech.prototype.digitplay = function(chineseWord) {
      var number, seq;
      number = this.chineseNumberToNumber(chineseWord);
      if (number) {
        seq = number.replace(/([d]\d+)/g, "$1,").split(",");
        seq = seq.splice(0, seq.length - 1);
        return this.playSequence(seq, true);
      }
    };

    BumblerSpeech.prototype.AUDIO_MAP = {
      d1: {
        start: 0.45,
        duration: 0.5
      },
      d2: {
        start: 1.43,
        duration: 0.5
      },
      d3: {
        start: 2.65,
        duration: 0.5
      },
      d4: {
        start: 3.55,
        duration: 0.5
      },
      d5: {
        start: 4.9,
        duration: 0.6
      },
      d6: {
        start: 5.9,
        duration: 0.6
      },
      d7: {
        start: 6.7,
        duration: 0.55
      },
      d8: {
        start: 7.75,
        duration: 0.5
      },
      d9: {
        start: 8.77,
        duration: 0.53
      },
      d10: {
        start: 9.52,
        duration: 0.53
      },
      thank: {
        start: 10.73,
        duration: 1.55
      }
    };

    return BumblerSpeech;

  })();

  window.BumblerSpeech = BumblerSpeech;

}).call(this);
