/**
 * Created by Aker on 2016/12/22.
 */
const parseColor = function(hexStr, transparent) {
  let rgbList = [];

  if (hexStr.length === 4 || hexStr.length === 7) {
    rgbList = hexStr.length === 4
      ? hexStr.substr(1).split('').map(function(s) {
        return 0x11 * parseInt(s, 16);
      })
      : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function(s) {
        return parseInt(s, 16);
      });
    rgbList.push(1);
  } else {
    let reg = new RegExp(/rgba?\((.*)\)/);
    let match = hexStr.match(reg);

    if (match) {
      rgbList = match[1].split(',');
      if (rgbList.length === 3) {
        rgbList.push(1);
      } else if (rgbList.length === 4) {
        let n = rgbList[3].split('.');

        if (n.length === 2) {
          rgbList[3] = '0.' + n[1];
        }
      }
    }
  }
  if (transparent) {
    rgbList[3] = 0;
  }
  return rgbList;
};

const gamma = 2.2;

const normalize = function(channel) {
  return Math.pow(channel / 255, gamma);
};

const gradientColors = function(start, end, percentage) {
  if (start === end) {
    return start;
  }
  let j;
  let so = [];

  let startColorList = start === 'transparent'
    ? parseColor(end, true)
    : parseColor(start);
  let endColorList = end === 'transparent'
    ? parseColor(start, true)
    : parseColor(end);
  let startOpacity = startColorList.pop();
  let endOpacity = endColorList.pop();

  startColorList = startColorList.map(normalize);
  endColorList = endColorList.map(normalize);

  for (j = 0; j < 3; j++) {
    so[j] = Math.round(Math.pow(startColorList[j] * (100 - percentage) / 100 + endColorList[j] * percentage / 100, 1 / gamma) * 255);
  }
  so[3] = ((endOpacity - startOpacity) / 100 * percentage + parseFloat(startOpacity)).toFixed(2);
  return 'rgba(' + so.join(',') + ')';
};

export default gradientColors;
