import * as React from 'react';
import loadScript from 'load-script';

import eventNames from './eventNames';

let apiPromise = false;

function loadApi() {
  if (!apiPromise) {
    if (typeof window.DM === 'object' && typeof window.DM.player === 'function') {
      // A Dailymotion SDK is already loaded, so reuse that
      apiPromise = Promise.resolve(window.DM);
    } else {
      apiPromise = new Promise((resolve, reject) => {
        loadScript('https://api.dmcdn.net/all.js', (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(window.DM);
          }
        });
      });
    }
  }
  return apiPromise;
}

export default class Dailymotion extends React.Component {
  static propTypes = {
    /**
     * A string representing a video ID – of the form xID (e.g. xwr14q) for
     * public-accessible videos or kID (e.g. kABCD1234) for private-accessible
     * videos.
     */
    video: React.PropTypes.string,
    /**
     * DOM ID for the player element.
     */
    id: React.PropTypes.string,
    /**
     * CSS className for the player element.
     */
    className: React.PropTypes.string,
    /**
     * Width of the player element.
     */
    width: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
    /**
     * Height of the player element.
     */
    height: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),

    // Player parameters

    /**
     * Starts the playback of the video automatically after the player loads.
     */
    autoplay: React.PropTypes.bool,
    /**
     * Whether to display the player controls or not. This parameter only
     * removes the control bar, but keeps the startscreen and the endscreen
     * (useful on mobile devices where the video tag needs a direct user
     * interaction to start the playback).
     */
    controls: React.PropTypes.bool,
    /**
     * Whether to enable the end screen or not.
     */
    showEndScreen: React.PropTypes.bool,
    /**
     * Whether to mute the video or not.
     */
    mute: React.PropTypes.bool,
    /**
     * The domain of the page hosting the Dailymotion player. You might want to
     * specify origin for extra security.
     */
    origin: React.PropTypes.string,
    /**
     * Specifies the _suggested_ playback quality for the video.
     */
    quality: React.PropTypes.oneOf(['240', '380', '480', '720', '1080', '1440', '2160']),
    /**
     * Whether to display the sharing button or not.
     */
    sharing: React.PropTypes.bool,
    /**
     * Specifies the time (in seconds) from which the video should start
     * playing.
     */
    start: React.PropTypes.number,
    /**
     * Specifies the selected subtitles language.
     */
    subtitles: React.PropTypes.string,
    /**
     * Passes your syndication key to the player.
     */
    syndication: React.PropTypes.string,
    /**
     * Change the default highlight colour used in the controls (hex value).
     * See [the player customisation section](https://developer.dailymotion.com/player#player-customisation)
     * in the Dailymotion docs for
     * more on how this option is actually used.
     */
    uiHighlightColor: React.PropTypes.string,
    /**
     * Whether to display the Dailymotion logo or not.
     */
    uiShowLogo: React.PropTypes.bool,
    /**
     * Whether to show video information (title and owner) on the start screen.
     */
    uiShowStartScreenInfo: React.PropTypes.bool,
    /**
     * Choose the default base colour theme. See [the player customisation
     * section](https://developer.dailymotion.com/player#player-customisation)
     * in the Dailymotion docs for more on how this option is actually used.
     */
    theme: React.PropTypes.oneOf(['light', 'dark']),

    // Player properties (not parameters, can only be set using methods)

    /**
     * Sets the player's volume to the specified level, a number between 0 and
     * 1.
     */
    volume: React.PropTypes.number,

    // Events

    /**
     * Sent when the player reaches the end of an Ad media resource.
     */
    onAdEnd: React.PropTypes.func,
    /**
     * Sent when an Ad playback pauses.
     */
    onAdPause: React.PropTypes.func,
    /**
     * Sent when an Ad playback starts.
     */
    onAdPlay: React.PropTypes.func,
    /**
     * Sent when the player starts to play an Ad media resource.
     */
    onAdStart: React.PropTypes.func,
    /**
     * Sent on each Ad's time update.
     */
    onAdTimeUpdate: React.PropTypes.func,
    /**
     * Sent when the player is ready to accept API commands.
     */
    onApiReady: React.PropTypes.func,
    /**
     * Sent when the duration of the video become available or change during
     * playback.
     */
    onDurationChange: React.PropTypes.func,
    /**
     * Sent when playback has stopped at the end of the media resources set
     * (ads + content).
     */
    onEnd: React.PropTypes.func,
    /**
     * Sent when the player triggers an error.
     */
    onError: React.PropTypes.func,
    /**
     * Sent when the player enters or exits fullscreen.
     */
    onFullscreenChange: React.PropTypes.func,
    /**
     * Sent when video's metadata are available.
     */
    onLoadedMetadata: React.PropTypes.func,
    /**
     * Sent when playback pauses after the pause method returns.
     */
    onPause: React.PropTypes.func,
    /**
     * Sent when playback starts after the `play` method returns.
     */
    onPlay: React.PropTypes.func,
    /**
     * Sent when the content media resource playback has started.
     */
    onPlaying: React.PropTypes.func,
    /**
     * Sent when the browser is fetching the media data.
     */
    onProgress: React.PropTypes.func,
    /**
     * Sent when qualities are available – see `qualities` for accepted values.
     */
    onQualitiesAvailable: React.PropTypes.func,
    /**
     * Sent when the current quality changes.
     */
    onQualityChange: React.PropTypes.func,
    /**
     * Sent when the player has completed a seeking operation.
     */
    onSeeked: React.PropTypes.func,
    /**
     * Sent when the player is starting to seek to another position in the video.
     */
    onSeeking: React.PropTypes.func,
    /**
     * Sent when the current subtitle changes.
     */
    onSubtitleChange: React.PropTypes.func,
    /**
     * Sent when subtitles are available.
     */
    onSubtitlesAvailable: React.PropTypes.func,
    /**
     * Sent the first time the player attempts to start the playback, either
     * because of a user interaction, an autoplay parameter, or an API call
     * (e.g play(), load(), etc.).
     */
    onStart: React.PropTypes.func,
    /**
     * Sent when the playback position changes as part of normal playback or
     * because of some other condition.
     */
    onTimeUpdate: React.PropTypes.func,
    /**
     * Sent when the player starts to play the content media resource.
     */
    onVideoStart: React.PropTypes.func,
    /**
     * Sent when the player reaches the end of the content media resource.
     */
    onVideoEnd: React.PropTypes.func,
    /**
     * Sent when the player volume or mute state has changed.
     */
    onVolumeChange: React.PropTypes.func,
    /**
     * Sent when the player has to stop video playback for further buffering of
     * content.
     */
    onWaiting: React.PropTypes.func,
  };

  static defaultProps = {
    theme: 'dark',
  };

  componentDidMount() {
    this.createPlayer();
  }

  componentDidUpdate(prevProps) {
    const changes = Object.keys(this.props).filter(
      name => this.props[name] !== prevProps[name]
    );

    this.updateProps(changes);
  }

  /**
   * @private
   */
  getPlayerParameters() {
    return {
      autoplay: this.props.autoplay,
      controls: this.props.controls,
      'endscreen-enable': this.props.showEndScreen,
      id: this.props.id,
      mute: this.props.mute,
      origin: this.props.origin,
      quality: this.props.quality,
      'sharing-enable': this.props.sharing,
      start: this.props.start,
      'subtitles-default': this.props.subtitles,
      syndication: this.props.syndication,
      'ui-highlight': this.props.uiHighlightColor,
      'ui-logo': this.props.uiShowLogo,
      'ui-start-screen-info': this.props.uiShowStartScreenInfo,
      'ui-theme': this.props.theme,
    };
  }

  /**
   * @private
   */
  getInitialOptions() {
    return {
      video: this.props.video,
      width: this.props.width,
      height: this.props.height,
      params: this.getPlayerParameters(),
      events: {},
    };
  }

  /**
   * @private
   */
  updateProps(propNames) {
    this.player.then(player => {
      propNames.forEach(name => {
        const value = this.props[name];
        switch (name) {
          case 'muted':
            player.setMuted(value);
            break;
          case 'quality':
            player.setQuality(value);
            break;
          case 'subtitles':
            player.setSubtitle(value);
            break;
          case 'volume':
            player.setVolume(value);
            break;
          case 'id':
          case 'className':
          case 'width':
          case 'height':
            // The Dailymotion Player object is also the player iframe.
            player[name] = value; // eslint-disable-line no-param-reassign
            break;
          case 'video':
            player.load(value, this.getPlayerParameters());
            break;
          default:
            // Nothing
        }
      });
    });
  }

  /**
   * @private
   */
  createPlayer() {
    this.player = loadApi().then(DM =>
      new Promise(resolve => {
        const player = DM.player(this.container, this.getInitialOptions());
        player.addEventListener('apiready', () => {
          resolve(player);
        });

        Object.keys(eventNames).forEach(dmName => {
          const reactName = eventNames[dmName];
          player.addEventListener(dmName, event => {
            if (this.props[reactName]) {
              this.props[reactName](event);
            }
          });
        });
      })
    );

    if (typeof this.props.volume === 'number') {
      this.updateProps(['volume']);
    }
  }

  /**
   * @private
   */
  refContainer = container => {
    this.container = container;
  };

  render() {
    return React.createElement('div', {
      id: this.props.id,
      className: this.props.className,
      ref: this.refContainer,
    });
  }
}
