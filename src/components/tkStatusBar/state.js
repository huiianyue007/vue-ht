/**
 * Created by AKer on 2016/12/20.
 */
import os from './util.js';

const Rxports = {
  _class: null,
  _color: null,
  _show: true,
  _space: true,
  _height: null,
  setClass: function(cls) {
    this._class = cls;
  },
  setColor: function(color) {
    this._color = color;
  },
  show: function() {
    this._show = true;
  },
  hide: function() {
    this._show = false;
  },
  reset: function() {
    this._color = this._class = null;
    this._show = this._space = true;
  },
  height: function() {
    if (this._height === null) {
      if (os.plus && window.plus.navigator.isImmersedStatusbar()) {
        this._height = window.plus.navigator.getStatusbarHeight();
      } else {
        this._height = 0;
      }
    }
    return this._height;
  },
  toggle: function() {
    this._show = !this._show;
  },
  isShow: function() {
    return this._show;
  },
  setSpace: function(bool) {
    this._space = bool;
  }
};

module.exports = Rxports;

