export default class ClockControl {

    constructor() {
        this._onPlayListeners = [];
        this._onPauseListeners = [];
        this._onResetListeners = [];
        this._onSetElapsedListeners = [];
        this._onSetTargetListeners = [];
    }

    play() {
        this._onPlayListeners.forEach(l => l());
    }

    pause() {
        this._onPauseListeners.forEach(l => l());
    }

    reset() {
        this._onResetListeners.forEach(l => l());
    }

    setElapsed(ms) {
        this._onSetElapsedListeners.forEach(l => l(ms));
    }

    setTarget(ms) {
        this._onSetTargetListeners.forEach(l => l(ms));
    }

    onPlay(fn) {
        this._onPlayListeners.push(fn);
        return () => this._onPlayListeners.splice(this._onPlayListeners.indexOf(fn), 1);
    }

    onPause(fn) {
        this._onPauseListeners.push(fn);
        return () => this._onPauseListeners.splice(this._onPauseListeners.indexOf(fn), 1);
    }

    onReset(fn) {
        this._onResetListeners.push(fn);
        return () => this._onResetListeners.splice(this._onResetListeners.indexOf(fn), 1);
    }

    onSetElapsed(fn) {
        this._onSetElapsedListeners.push(fn);
        return () => this._onSetElapsedListeners.splice(this._onSetElapsedListeners.indexOf(fn), 1);
    }

    onSetTarget(fn) {
        this._onSetTargetListeners.push(fn);
        return () => this._onSetTargetListeners.splice(this._onSetTargetListeners.indexOf(fn), 1);
    }

}