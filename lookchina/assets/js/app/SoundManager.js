define([
  'sound',
  'angular',
  'appmodule'
], function () {
  var SoundManager;
  return SoundManager = function () {
    function SoundManager() {
    }
    SoundManager.initialised = false;
    SoundManager.autoplay = true;
    SoundManager.currentSounds = [];
    SoundManager.player;
    SoundManager.soundManagerReady;
    SoundManager.isFinish;
    SoundManager.init = function (bgEqData, bgSoundOn, callback) {
      return soundManager.setup({
        url: document.URL + '/assets/swf',
        flashVersion: 9,
        debugMode: false,
        waitForWindowLoad: true,
        useConsole: true,
        onready: function () {
          SoundManager.soundManagerReady = true;
          if (callback) {
            return callback();
          }
        }
      });
    };
    SoundManager.playBgSound = function (bgSounds, bgSoundIndex, callback) {
      var player;
      if (SoundManager.soundManagerReady) {
        player = soundManager.createSound({
          id: bgSounds[bgSoundIndex].id,
          url: bgSounds[bgSoundIndex].url,
          autoPlay: true,
          autoLoad: true,
          stream: true,
          useWaveformData: false,
          useEQData: true,
          volume: 10,
          whileplaying: function () {
            return callback(this.eqData);
          },
          onfinish: function () {
            if (bgSoundIndex === bgSounds.length - 1) {
              bgSoundIndex = 0;
            } else {
              bgSoundIndex++;
            }
            return SoundManager.playBgSound(callback, bgSoundIndex, bgSounds);
          }
        });
        return player.play({
          autoPlay: true,
          autoLoad: true,
          stream: true,
          useWaveformData: false,
          useEQData: true
        });
      }
    };
    SoundManager.stopIntroAudio = function (introAudio) {
      var currentIntroAudio;
      currentIntroAudio = soundManager.getSoundById(introAudio.audioId);
      return soundManager.stop(introAudio.audioId);
    };
    SoundManager.playIntroAudio = function (introAudio, callback, onFinishCallback) {
      var player;
      if (SoundManager.soundManagerReady) {
        player = soundManager.createSound({
          id: introAudio.audioId,
          url: introAudio.audio,
          autoPlay: true,
          autoLoad: true,
          useWaveformData: false,
          useEQData: true,
          volume: 80,
          onfinish: onFinishCallback,
          whileplaying: function () {
            return callback(this.eqData);
          }
        });
        SoundManager.stopIntroAudio(introAudio);
        return player.play();
      }
    };
    return SoundManager;
  }();
});  //# sourceMappingURL=SoundManager.js.map
