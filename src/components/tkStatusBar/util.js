/**
 * Created by Aker on 2016/12/23.
 */

const detect = function() {
  let ua = navigator.userAgent;
  let self = this;
  let os = {};
  let funcs = [
    function() { // wechat
      var wechat = ua.match(/(MicroMessenger)\/([\d\.]+)/i);

      if (wechat) { // wechat
        os.wechat = {
          version: wechat[2].replace(/_/g, '.')
        };
      }
      return false;
    },
    function() { // android
      var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);

      if (android) {
        os.android = true;
        os.version = android[2];

        os.isBadAndroid = !(/Chrome\/\d/).test(window.navigator.appVersion);
      }
      return os.android === true;
    },
    function() { // ios
      var iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);

      if (iphone) { // iphone
        os.ios = os.iphone = true;
        os.version = iphone[2].replace(/_/g, '.');
      } else {
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);

        if (ipad) { // ipad
          os.ios = os.ipad = true;
          os.version = ipad[2].replace(/_/g, '.');
        }
      }
      return os.ios === true;
    }
  ]

  ;[].every.call(funcs, function(func) {
    return !func.call(self);
  });
  // 单独判断plus
  let plus = ua.match(/Html5Plus/i);

  if (plus) {
    os.plus = true;
  }

  return os;
};

const os = detect();

module.exports = os;
