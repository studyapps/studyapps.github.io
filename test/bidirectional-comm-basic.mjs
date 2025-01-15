var pe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function qe(R) {
  return R && R.__esModule && Object.prototype.hasOwnProperty.call(R, "default") ? R.default : R;
}
const Xo = {
  /**
   * Boolean reporter with hexagonal shape
   */
  BOOLEAN: "Boolean",
  /**
   * A button (not an actual block) for some special action, like making a variable
   */
  BUTTON: "button",
  /**
   * Command block
   */
  COMMAND: "command",
  /**
   * Specialized command block which may or may not run a child branch
   * The thread continues with the next block whether or not a child branch ran.
   */
  CONDITIONAL: "conditional",
  /**
   * Specialized hat block with no implementation function
   * This stack only runs if the corresponding event is emitted by other code.
   */
  EVENT: "event",
  /**
   * Hat block which conditionally starts a block stack
   */
  HAT: "hat",
  /**
   * Specialized command block which may or may not run a child branch
   * If a child branch runs, the thread evaluates the loop block again.
   */
  LOOP: "loop",
  /**
   * General reporter with numeric or string value
   */
  REPORTER: "reporter"
};
var Yo = Xo;
const Z = /* @__PURE__ */ qe(Yo), qo = {
  /**
   * Numeric value with angle picker
   */
  ANGLE: "angle",
  /**
   * Boolean value with hexagonal placeholder
   */
  BOOLEAN: "Boolean",
  /**
   * Numeric value with color picker
   */
  COLOR: "color",
  /**
   * Numeric value with text field
   */
  NUMBER: "number",
  /**
   * String value with text field
   */
  STRING: "string",
  /**
   * String value with matrix field
   */
  MATRIX: "matrix",
  /**
   * MIDI note number with note picker (piano) field
   */
  NOTE: "note",
  /**
   * Inline image on block (as part of the label)
   */
  IMAGE: "image"
};
var Qo = qo;
const le = /* @__PURE__ */ qe(Qo);
let Ko = class Fe {
  /**
   * @typedef {object} RGBObject - An object representing a color in RGB format.
   * @property {number} r - the red component, in the range [0, 255].
   * @property {number} g - the green component, in the range [0, 255].
   * @property {number} b - the blue component, in the range [0, 255].
   */
  /**
   * @typedef {object} HSVObject - An object representing a color in HSV format.
   * @property {number} h - hue, in the range [0-359).
   * @property {number} s - saturation, in the range [0,1].
   * @property {number} v - value, in the range [0,1].
   */
  /** @type {RGBObject} */
  static get RGB_BLACK() {
    return { r: 0, g: 0, b: 0 };
  }
  /** @type {RGBObject} */
  static get RGB_WHITE() {
    return { r: 255, g: 255, b: 255 };
  }
  /**
   * Convert a Scratch decimal color to a hex string, #RRGGBB.
   * @param {number} decimal RGB color as a decimal.
   * @return {string} RGB color as #RRGGBB hex string.
   */
  static decimalToHex(c) {
    c < 0 && (c += 16777216);
    let h = Number(c).toString(16);
    return h = `#${"000000".substr(0, 6 - h.length)}${h}`, h;
  }
  /**
   * Convert a Scratch decimal color to an RGB color object.
   * @param {number} decimal RGB color as decimal.
   * @return {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
   */
  static decimalToRgb(c) {
    const h = c >> 24 & 255, p = c >> 16 & 255, b = c >> 8 & 255, C = c & 255;
    return { r: p, g: b, b: C, a: h > 0 ? h : 255 };
  }
  /**
   * Convert a hex color (e.g., F00, #03F, #0033FF) to an RGB color object.
   * CC-BY-SA Tim Down:
   * https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
   * @param {!string} hex Hex representation of the color.
   * @return {RGBObject} null on failure, or rgb: {r: red [0,255], g: green [0,255], b: blue [0,255]}.
   */
  static hexToRgb(c) {
    const h = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    c = c.replace(h, (b, C, O, P) => C + C + O + O + P + P);
    const p = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
    return p ? {
      r: parseInt(p[1], 16),
      g: parseInt(p[2], 16),
      b: parseInt(p[3], 16)
    } : null;
  }
  /**
   * Convert an RGB color object to a hex color.
   * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
   * @return {!string} Hex representation of the color.
   */
  static rgbToHex(c) {
    return Fe.decimalToHex(Fe.rgbToDecimal(c));
  }
  /**
   * Convert an RGB color object to a Scratch decimal color.
   * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
   * @return {!number} Number representing the color.
   */
  static rgbToDecimal(c) {
    return (c.r << 16) + (c.g << 8) + c.b;
  }
  /**
  * Convert a hex color (e.g., F00, #03F, #0033FF) to a decimal color number.
  * @param {!string} hex Hex representation of the color.
  * @return {!number} Number representing the color.
  */
  static hexToDecimal(c) {
    return Fe.rgbToDecimal(Fe.hexToRgb(c));
  }
  /**
   * Convert an HSV color to RGB format.
   * @param {HSVObject} hsv - {h: hue [0,360), s: saturation [0,1], v: value [0,1]}
   * @return {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
   */
  static hsvToRgb(c) {
    let h = c.h % 360;
    h < 0 && (h += 360);
    const p = Math.max(0, Math.min(c.s, 1)), b = Math.max(0, Math.min(c.v, 1)), C = Math.floor(h / 60), O = h / 60 - C, P = b * (1 - p), D = b * (1 - p * O), Q = b * (1 - p * (1 - O));
    let Y, ie, re;
    switch (C) {
      default:
      case 0:
        Y = b, ie = Q, re = P;
        break;
      case 1:
        Y = D, ie = b, re = P;
        break;
      case 2:
        Y = P, ie = b, re = Q;
        break;
      case 3:
        Y = P, ie = D, re = b;
        break;
      case 4:
        Y = Q, ie = P, re = b;
        break;
      case 5:
        Y = b, ie = P, re = D;
        break;
    }
    return {
      r: Math.floor(Y * 255),
      g: Math.floor(ie * 255),
      b: Math.floor(re * 255)
    };
  }
  /**
   * Convert an RGB color to HSV format.
   * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
   * @return {HSVObject} hsv - {h: hue [0,360), s: saturation [0,1], v: value [0,1]}
   */
  static rgbToHsv(c) {
    const h = c.r / 255, p = c.g / 255, b = c.b / 255, C = Math.min(Math.min(h, p), b), O = Math.max(Math.max(h, p), b);
    let P = 0, D = 0;
    if (C !== O) {
      const Q = h === C ? p - b : p === C ? b - h : h - p;
      P = ((h === C ? 3 : p === C ? 5 : 1) - Q / (O - C)) * 60 % 360, D = (O - C) / O;
    }
    return { h: P, s: D, v: O };
  }
  /**
   * Linear interpolation between rgb0 and rgb1.
   * @param {RGBObject} rgb0 - the color corresponding to fraction1 <= 0.
   * @param {RGBObject} rgb1 - the color corresponding to fraction1 >= 1.
   * @param {number} fraction1 - the interpolation parameter. If this is 0.5, for example, mix the two colors equally.
   * @return {RGBObject} the interpolated color.
   */
  static mixRgb(c, h, p) {
    if (p <= 0) return c;
    if (p >= 1) return h;
    const b = 1 - p;
    return {
      r: b * c.r + p * h.r,
      g: b * c.g + p * h.g,
      b: b * c.b + p * h.b
    };
  }
};
var $o = Ko;
const Hs = $o;
class ee {
  /**
   * Scratch cast to number.
   * Treats NaN as 0.
   * In Scratch 2.0, this is captured by `interp.numArg.`
   * @param {*} value Value to cast to number.
   * @return {number} The Scratch-casted number value.
   */
  static toNumber(c) {
    if (typeof c == "number")
      return Number.isNaN(c) ? 0 : c;
    const h = Number(c);
    return Number.isNaN(h) ? 0 : h;
  }
  /**
   * Scratch cast to boolean.
   * In Scratch 2.0, this is captured by `interp.boolArg.`
   * Treats some string values differently from JavaScript.
   * @param {*} value Value to cast to boolean.
   * @return {boolean} The Scratch-casted boolean value.
   */
  static toBoolean(c) {
    return typeof c == "boolean" ? c : typeof c == "string" ? !(c === "" || c === "0" || c.toLowerCase() === "false") : !!c;
  }
  /**
   * Scratch cast to string.
   * @param {*} value Value to cast to string.
   * @return {string} The Scratch-casted string value.
   */
  static toString(c) {
    return String(c);
  }
  /**
   * Cast any Scratch argument to an RGB color array to be used for the renderer.
   * @param {*} value Value to convert to RGB color array.
   * @return {Array.<number>} [r,g,b], values between 0-255.
   */
  static toRgbColorList(c) {
    const h = ee.toRgbColorObject(c);
    return [h.r, h.g, h.b];
  }
  /**
   * Cast any Scratch argument to an RGB color object to be used for the renderer.
   * @param {*} value Value to convert to RGB color object.
   * @return {RGBOject} [r,g,b], values between 0-255.
   */
  static toRgbColorObject(c) {
    let h;
    return typeof c == "string" && c.substring(0, 1) === "#" ? (h = Hs.hexToRgb(c), h || (h = { r: 0, g: 0, b: 0, a: 255 })) : h = Hs.decimalToRgb(ee.toNumber(c)), h;
  }
  /**
   * Determine if a Scratch argument is a white space string (or null / empty).
   * @param {*} val value to check.
   * @return {boolean} True if the argument is all white spaces or null / empty.
   */
  static isWhiteSpace(c) {
    return c === null || typeof c == "string" && c.trim().length === 0;
  }
  /**
   * Compare two values, using Scratch cast, case-insensitive string compare, etc.
   * In Scratch 2.0, this is captured by `interp.compare.`
   * @param {*} v1 First value to compare.
   * @param {*} v2 Second value to compare.
   * @returns {number} Negative number if v1 < v2; 0 if equal; positive otherwise.
   */
  static compare(c, h) {
    let p = Number(c), b = Number(h);
    if (p === 0 && ee.isWhiteSpace(c) ? p = NaN : b === 0 && ee.isWhiteSpace(h) && (b = NaN), isNaN(p) || isNaN(b)) {
      const C = String(c).toLowerCase(), O = String(h).toLowerCase();
      return C < O ? -1 : C > O ? 1 : 0;
    }
    return p === 1 / 0 && b === 1 / 0 || p === -1 / 0 && b === -1 / 0 ? 0 : p - b;
  }
  /**
   * Determine if a Scratch argument number represents a round integer.
   * @param {*} val Value to check.
   * @return {boolean} True if number looks like an integer.
   */
  static isInt(c) {
    return typeof c == "number" ? isNaN(c) ? !0 : c === parseInt(c, 10) : typeof c == "boolean" ? !0 : typeof c == "string" ? c.indexOf(".") < 0 : !1;
  }
  static get LIST_INVALID() {
    return "INVALID";
  }
  static get LIST_ALL() {
    return "ALL";
  }
  /**
   * Compute a 1-based index into a list, based on a Scratch argument.
   * Two special cases may be returned:
   * LIST_ALL: if the block is referring to all of the items in the list.
   * LIST_INVALID: if the index was invalid in any way.
   * @param {*} index Scratch arg, including 1-based numbers or special cases.
   * @param {number} length Length of the list.
   * @param {boolean} acceptAll Whether it should accept "all" or not.
   * @return {(number|string)} 1-based index for list, LIST_ALL, or LIST_INVALID.
   */
  static toListIndex(c, h, p) {
    if (typeof c != "number") {
      if (c === "all")
        return p ? ee.LIST_ALL : ee.LIST_INVALID;
      if (c === "last")
        return h > 0 ? h : ee.LIST_INVALID;
      if (c === "random" || c === "any")
        return h > 0 ? 1 + Math.floor(Math.random() * h) : ee.LIST_INVALID;
    }
    return c = Math.floor(ee.toNumber(c)), c < 1 || c > h ? ee.LIST_INVALID : c;
  }
}
var ea = ee;
const me = /* @__PURE__ */ qe(ea), ta = {}, na = {
  "bidirectionalComm.name": "双方向通信",
  "bidirectionalComm.system.notConnected": "接続してください",
  "bidirectionalComm.system.noLicense": "ライセンスがありません",
  "bidirectionalComm.system.noKeyword": "キーワードを入力してください",
  "bidirectionalComm.system.connected": "接続完了",
  "bidirectionalComm.system.reachedSendingLimit": "通信量が上限に達しました",
  "bidirectionalComm.system.enabledPacketCapture": "パケット解析中",
  "bidirectionalComm.block.connect": "キーワード[KEYWORD]で接続する",
  "bidirectionalComm.block.getLastSystemMessage": "システムメッセージ",
  "bidirectionalComm.block.getNumOfSentMessages": "送信数",
  "bidirectionalComm.block.disconnect": "切断する",
  "bidirectionalComm.block.sendMessage": "[MESSAGE]を送る",
  "bidirectionalComm.block.shift": "[MESSAGE]を[SHIFT]文字ずらした文字列",
  "bidirectionalComm.block.setChannel": "チャンネル名を[CHANNEL]にする",
  "bidirectionalComm.block.getChannel": "チャンネル名",
  "bidirectionalComm.block.setIpAddress": "IPアドレスを[IP_ADDRESS]にする",
  "bidirectionalComm.block.getIpAddress": "自分のIPアドレス",
  "bidirectionalComm.block.sendMessageToIpAddress": "[IP_ADDRESS]に[MESSAGE]を送る",
  "bidirectionalComm.block.enablePacketCapture": "パケットを解析する",
  "bidirectionalComm.block.whenSentMessage": "メッセージを送ったとき",
  "bidirectionalComm.block.getLastSentMessageText": "送信メッセージ",
  "bidirectionalComm.block.getLastSentMessageHeader": "送信パケットの[HEADER]",
  "bidirectionalComm.block.whenReceivedMessage": "メッセージを受け取ったとき",
  "bidirectionalComm.block.getLastReceivedMessageText": "受信メッセージ",
  "bidirectionalComm.block.getLastReceivedMessageHeader": "受信パケットの[HEADER]",
  "bidirectionalComm.defaultValue.sendMessage.message": "メッセージ",
  "bidirectionalComm.defaultValue.setChannel.channel": "グループ1",
  "bidirectionalComm.defaultValue.sendMessageToIpAddress.ipAddress": "IPアドレス",
  "bidirectionalComm.defaultValue.sendMessageToIpAddress.message": "メッセージ",
  "bidirectionalComm.menu.header.to": "送信先",
  "bidirectionalComm.menu.header.from": "送信元",
  "bidirectionalComm.menu.header.channel": "チャンネル名"
}, sa = {
  en: ta,
  ja: na,
  "ja-Hira": {
    "bidirectionalComm.name": "そうほうこうつうしん",
    "bidirectionalComm.system.notConnected": "せつぞくしてください",
    "bidirectionalComm.system.noLicense": "ライセンスがありません",
    "bidirectionalComm.system.noKeyword": "キーワードを入力してください",
    "bidirectionalComm.system.connected": "せつぞくかんりょう",
    "bidirectionalComm.system.reachedSendingLimit": "つうしんりょうがじょうげんにたっしました",
    "bidirectionalComm.system.enabledPacketCapture": "パケットかいせきちゅう",
    "bidirectionalComm.block.connect": "キーワード[KEYWORD]でせつぞくする",
    "bidirectionalComm.block.getLastSystemMessage": "システムメッセージ",
    "bidirectionalComm.block.getNumOfSentMessages": "そうしんすう",
    "bidirectionalComm.block.disconnect": "せつだんする",
    "bidirectionalComm.block.sendMessage": "[MESSAGE]をおくる",
    "bidirectionalComm.block.shift": "[MESSAGE]を[SHIFT]もじずらしたもじれつ",
    "bidirectionalComm.block.setChannel": "チャンネルめいを[CHANNEL]にする",
    "bidirectionalComm.block.getChannel": "チャンネルめい",
    "bidirectionalComm.block.setIpAddress": "IPアドレスを[IP_ADDRESS]にする",
    "bidirectionalComm.block.getIpAddress": "じぶんのIPアドレス",
    "bidirectionalComm.block.sendMessageToIpAddress": "[IP_ADDRESS]に[MESSAGE]をおくる",
    "bidirectionalComm.block.enablePacketCapture": "パケットをかいせきする",
    "bidirectionalComm.block.whenSentMessage": "メッセージをおくったとき",
    "bidirectionalComm.block.getLastSentMessageText": "そうしんメッセージ",
    "bidirectionalComm.block.getLastSentMessageHeader": "そうしんパケットの[HEADER]",
    "bidirectionalComm.block.whenReceivedMessage": "メッセージをうけとったとき",
    "bidirectionalComm.block.getLastReceivedMessageText": "じゅしんメッセージ",
    "bidirectionalComm.block.getLastReceivedMessageHeader": "じゅしんパケットの[HEADER]",
    "bidirectionalComm.defaultValue.sendMessage.message": "メッセージ",
    "bidirectionalComm.defaultValue.setChannel.channel": "グループ1",
    "bidirectionalComm.defaultValue.sendMessageToIpAddress.ipAddress": "IPアドレス",
    "bidirectionalComm.defaultValue.sendMessageToIpAddress.message": "メッセージ",
    "bidirectionalComm.menu.header.to": "そうしんさき",
    "bidirectionalComm.menu.header.from": "そうしんもと",
    "bidirectionalComm.menu.header.channel": "チャンネルめい"
  }
}, ia = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAC4jAAAuIwF4pT92AAAq3WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuYTZhNjM5NiwgMjAyNC8wMy8xMi0wNzo0ODoyMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6aWxsdXN0cmF0b3I9Imh0dHA6Ly9ucy5hZG9iZS5jb20vaWxsdXN0cmF0b3IvMS4wLyIgeG1sbnM6eG1wVFBnPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvdC9wZy8iIHhtbG5zOnN0RGltPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvRGltZW5zaW9ucyMiIHhtbG5zOnhtcEc9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9nLyIgeG1sbnM6cGRmPSJodHRwOi8vbnMuYWRvYmUuY29tL3BkZi8xLjMvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTA4LTIyVDE3OjU2OjI0KzA5OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0wOC0yMlQxNzo1NjoyNCswOTowMCIgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMDgtMjJUMTc6NTQ6NTArMTA6MDAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgSWxsdXN0cmF0b3IgMjguNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzRlYzhjN2UtMzM0NS1mOTRjLTg4YzctMDJiMzNmYzY5OGNjIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOmI4ZjRkODM1LWFmYWMtOTc0NC1iMzI3LWY2M2Y2ZGNhNWJhYSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ1dWlkOjVEMjA4OTI0OTNCRkRCMTE5MTRBODU5MEQzMTUwOEM4IiB4bXBNTTpSZW5kaXRpb25DbGFzcz0icHJvb2Y6cGRmIiBpbGx1c3RyYXRvcjpUeXBlPSJEb2N1bWVudCIgaWxsdXN0cmF0b3I6U3RhcnR1cFByb2ZpbGU9IlByaW50IiBpbGx1c3RyYXRvcjpDcmVhdG9yU3ViVG9vbD0iQUlSb2JpbiIgeG1wVFBnOkhhc1Zpc2libGVPdmVycHJpbnQ9IkZhbHNlIiB4bXBUUGc6SGFzVmlzaWJsZVRyYW5zcGFyZW5jeT0iRmFsc2UiIHhtcFRQZzpOUGFnZXM9IjEiIHBkZjpQcm9kdWNlcj0iQWRvYmUgUERGIGxpYnJhcnkgMTcuMDAiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiPiA8ZGM6dGl0bGU+IDxyZGY6QWx0PiA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPuWPjOaWueWQkeaAp+OCouOCpOOCs+ODszwvcmRmOmxpPiA8L3JkZjpBbHQ+IDwvZGM6dGl0bGU+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ1dWlkOjg1NDIwNmQzLTRhN2YtNDI2MS05ODc1LWUwNTMzNDQ3ZTU5ZCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpiOGY0ZDgzNS1hZmFjLTk3NDQtYjMyNy1mNjNmNmRjYTViYWEiIHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD0idXVpZDo1RDIwODkyNDkzQkZEQjExOTE0QTg1OTBEMzE1MDhDOCIgc3RSZWY6cmVuZGl0aW9uQ2xhc3M9InByb29mOnBkZiIvPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiNTQ5M2IwOC1lMDBiLWIwNDYtYWYyYS1hYTk1MjhhMjhlYTMiIHN0RXZ0OndoZW49IjIwMjQtMDgtMjJUMTc6NDA6NTUrMDk6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIElsbHVzdHJhdG9yIDI4LjYgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiOGY0ZDgzNS1hZmFjLTk3NDQtYjMyNy1mNjNmNmRjYTViYWEiIHN0RXZ0OndoZW49IjIwMjQtMDgtMjJUMTc6NTI6NDUrMDk6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIElsbHVzdHJhdG9yIDI4LjYgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vcGRmIHRvIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NGVjOGM3ZS0zMzQ1LWY5NGMtODhjNy0wMmIzM2ZjNjk4Y2MiIHN0RXZ0OndoZW49IjIwMjQtMDgtMjJUMTc6NTY6MjQrMDk6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNS4xMSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBUUGc6TWF4UGFnZVNpemUgc3REaW06dz0iODAuMDAwMDAwIiBzdERpbTpoPSI4MC4wMDAwMDAiIHN0RGltOnVuaXQ9IlBpeGVscyIvPiA8eG1wVFBnOlBsYXRlTmFtZXM+IDxyZGY6U2VxPiA8cmRmOmxpPkN5YW48L3JkZjpsaT4gPHJkZjpsaT5NYWdlbnRhPC9yZGY6bGk+IDxyZGY6bGk+WWVsbG93PC9yZGY6bGk+IDxyZGY6bGk+QmxhY2s8L3JkZjpsaT4gPC9yZGY6U2VxPiA8L3htcFRQZzpQbGF0ZU5hbWVzPiA8eG1wVFBnOlN3YXRjaEdyb3Vwcz4gPHJkZjpTZXE+IDxyZGY6bGk+IDxyZGY6RGVzY3JpcHRpb24geG1wRzpncm91cE5hbWU9IuWIneacn+ioreWumuOBruOCueOCpuOCqeODg+ODgeOCsOODq+ODvOODlyIgeG1wRzpncm91cFR5cGU9IjAiPiA8eG1wRzpDb2xvcmFudHM+IDxyZGY6U2VxPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0i44Ob44Ov44Kk44OIIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjU1IiB4bXBHOmdyZWVuPSIyNTUiIHhtcEc6Ymx1ZT0iMjU1Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSLjg5bjg6njg4Pjgq8iIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIzNSIgeG1wRzpncmVlbj0iMjQiIHhtcEc6Ymx1ZT0iMjEiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkNNWUsg44Os44OD44OJIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjMwIiB4bXBHOmdyZWVuPSIwIiB4bXBHOmJsdWU9IjE4Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDTVlLIOOCpOOCqOODreODvCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjI1NSIgeG1wRzpncmVlbj0iMjQxIiB4bXBHOmJsdWU9IjAiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkNNWUsg44Kw44Oq44O844OzIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMCIgeG1wRzpncmVlbj0iMTUzIiB4bXBHOmJsdWU9IjY4Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDTVlLIOOCt+OCouODsyIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjAiIHhtcEc6Z3JlZW49IjE2MCIgeG1wRzpibHVlPSIyMzMiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkNNWUsg44OW44Or44O8IiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjkiIHhtcEc6Z3JlZW49IjMyIiB4bXBHOmJsdWU9IjEzNiIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQ01ZSyDjg57jgrzjg7Pjgr8iIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyMjgiIHhtcEc6Z3JlZW49IjAiIHhtcEc6Ymx1ZT0iMTI3Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTE1IE09MTAwIFk9OTAgSz0xMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE5NSIgeG1wRzpncmVlbj0iMTMiIHhtcEc6Ymx1ZT0iMzUiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MCBNPTkwIFk9ODUgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjMyIiB4bXBHOmdyZWVuPSI1NiIgeG1wRzpibHVlPSI0MCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09ODAgWT05NSBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyMzQiIHhtcEc6Z3JlZW49Ijg1IiB4bXBHOmJsdWU9IjIwIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT01MCBZPTEwMCBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyNDMiIHhtcEc6Z3JlZW49IjE1MiIgeG1wRzpibHVlPSIwIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0zNSBZPTg1IEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjI0OCIgeG1wRzpncmVlbj0iMTgyIiB4bXBHOmJsdWU9IjQ1Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTUgTT0wIFk9OTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjUwIiB4bXBHOmdyZWVuPSIyMzgiIHhtcEc6Ymx1ZT0iMCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0yMCBNPTAgWT0xMDAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjE4IiB4bXBHOmdyZWVuPSIyMjQiIHhtcEc6Ymx1ZT0iMCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz01MCBNPTAgWT0xMDAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTQzIiB4bXBHOmdyZWVuPSIxOTUiIHhtcEc6Ymx1ZT0iMzEiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NzUgTT0wIFk9MTAwIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjM0IiB4bXBHOmdyZWVuPSIxNzIiIHhtcEc6Ymx1ZT0iNTYiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9ODUgTT0xMCBZPTEwMCBLPTEwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMCIgeG1wRzpncmVlbj0iMTQ1IiB4bXBHOmJsdWU9IjU4Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTkwIE09MzAgWT05NSBLPTMwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMCIgeG1wRzpncmVlbj0iMTA1IiB4bXBHOmJsdWU9IjUyIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTc1IE09MCBZPTc1IEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE5IiB4bXBHOmdyZWVuPSIxNzQiIHhtcEc6Ymx1ZT0iMTAzIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTgwIE09MTAgWT00NSBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIwIiB4bXBHOmdyZWVuPSIxNjIiIHhtcEc6Ymx1ZT0iMTU0Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTcwIE09MTUgWT0wIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjQ2IiB4bXBHOmdyZWVuPSIxNjciIHhtcEc6Ymx1ZT0iMjI0Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTg1IE09NTAgWT0wIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjMiIHhtcEc6Z3JlZW49IjExMCIgeG1wRzpibHVlPSIxODQiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MTAwIE09OTUgWT01IEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjIzIiB4bXBHOmdyZWVuPSI0MiIgeG1wRzpibHVlPSIxMzYiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MTAwIE09MTAwIFk9MjUgSz0yNSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjIzIiB4bXBHOmdyZWVuPSIyOCIgeG1wRzpibHVlPSI5NyIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz03NSBNPTEwMCBZPTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iOTYiIHhtcEc6Z3JlZW49IjI1IiB4bXBHOmJsdWU9IjEzNCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz01MCBNPTEwMCBZPTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTQ2IiB4bXBHOmdyZWVuPSI3IiB4bXBHOmJsdWU9IjEzMSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0zNSBNPTEwMCBZPTM1IEs9MTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIxNjQiIHhtcEc6Z3JlZW49IjExIiB4bXBHOmJsdWU9IjkzIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTEwIE09MTAwIFk9NTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjE1IiB4bXBHOmdyZWVuPSIwIiB4bXBHOmJsdWU9IjgxIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT05NSBZPTIwIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjIzMCIgeG1wRzpncmVlbj0iMjIiIHhtcEc6Ymx1ZT0iMTE1Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTI1IE09MjUgWT00MCBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyMDEiIHhtcEc6Z3JlZW49IjE4OCIgeG1wRzpibHVlPSIxNTYiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NDAgTT00NSBZPTUwIEs9NSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE2NCIgeG1wRzpncmVlbj0iMTM5IiB4bXBHOmJsdWU9IjEyMCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz01MCBNPTUwIFk9NjAgSz0yNSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjEyMiIgeG1wRzpncmVlbj0iMTA2IiB4bXBHOmJsdWU9Ijg2Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTU1IE09NjAgWT02NSBLPTQwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iOTYiIHhtcEc6Z3JlZW49Ijc2IiB4bXBHOmJsdWU9IjYzIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTI1IE09NDAgWT02NSBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyMDEiIHhtcEc6Z3JlZW49IjE2MCIgeG1wRzpibHVlPSI5OSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0zMCBNPTUwIFk9NzUgSz0xMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE3OCIgeG1wRzpncmVlbj0iMTMwIiB4bXBHOmJsdWU9IjcxIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTM1IE09NjAgWT04MCBLPTI1IiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTQ5IiB4bXBHOmdyZWVuPSI5NyIgeG1wRzpibHVlPSI1MiIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz00MCBNPTY1IFk9OTAgSz0zNSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjEyNyIgeG1wRzpncmVlbj0iNzkiIHhtcEc6Ymx1ZT0iMzMiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NDAgTT03MCBZPTEwMCBLPTUwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTA2IiB4bXBHOmdyZWVuPSI1NyIgeG1wRzpibHVlPSI2Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTUwIE09NzAgWT04MCBLPTcwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iNjQiIHhtcEc6Z3JlZW49IjM0IiB4bXBHOmJsdWU9IjE1Ii8+IDwvcmRmOlNlcT4gPC94bXBHOkNvbG9yYW50cz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOmxpPiA8cmRmOmxpPiA8cmRmOkRlc2NyaXB0aW9uIHhtcEc6Z3JvdXBOYW1lPSLjgrDjg6zjg7wiIHhtcEc6Z3JvdXBUeXBlPSIxIj4gPHhtcEc6Q29sb3JhbnRzPiA8cmRmOlNlcT4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MCBNPTAgWT0wIEs9MTAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMzUiIHhtcEc6Z3JlZW49IjI0IiB4bXBHOmJsdWU9IjIxIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTkwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iNjIiIHhtcEc6Z3JlZW49IjU4IiB4bXBHOmJsdWU9IjU3Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTgwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iODkiIHhtcEc6Z3JlZW49Ijg3IiB4bXBHOmJsdWU9Ijg3Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTcwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTE0IiB4bXBHOmdyZWVuPSIxMTMiIHhtcEc6Ymx1ZT0iMTEzIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTYwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTM3IiB4bXBHOmdyZWVuPSIxMzciIHhtcEc6Ymx1ZT0iMTM3Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTUwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTU5IiB4bXBHOmdyZWVuPSIxNjAiIHhtcEc6Ymx1ZT0iMTYwIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTQwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTgxIiB4bXBHOmdyZWVuPSIxODEiIHhtcEc6Ymx1ZT0iMTgyIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTMwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjAxIiB4bXBHOmdyZWVuPSIyMDIiIHhtcEc6Ymx1ZT0iMjAyIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTIwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjIwIiB4bXBHOmdyZWVuPSIyMjEiIHhtcEc6Ymx1ZT0iMjIxIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTEwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjM5IiB4bXBHOmdyZWVuPSIyMzkiIHhtcEc6Ymx1ZT0iMjM5Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTUiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyNDciIHhtcEc6Z3JlZW49IjI0OCIgeG1wRzpibHVlPSIyNDgiLz4gPC9yZGY6U2VxPiA8L3htcEc6Q29sb3JhbnRzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6bGk+IDxyZGY6bGk+IDxyZGY6RGVzY3JpcHRpb24geG1wRzpncm91cE5hbWU9Iui8neOBjSIgeG1wRzpncm91cFR5cGU9IjEiPiA8eG1wRzpDb2xvcmFudHM+IDxyZGY6U2VxPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MTAwIFk9MTAwIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjIzMCIgeG1wRzpncmVlbj0iMCIgeG1wRzpibHVlPSIxOCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09NzUgWT0xMDAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjM1IiB4bXBHOmdyZWVuPSI5NyIgeG1wRzpibHVlPSIwIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0xMCBZPTk1IEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjI1NSIgeG1wRzpncmVlbj0iMjI2IiB4bXBHOmJsdWU9IjAiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9ODUgTT0xMCBZPTEwMCBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIwIiB4bXBHOmdyZWVuPSIxNTQiIHhtcEc6Ymx1ZT0iNjIiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MTAwIE09OTAgWT0wIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjExIiB4bXBHOmdyZWVuPSI0OSIgeG1wRzpibHVlPSIxNDMiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NjAgTT05MCBZPTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTI2IiB4bXBHOmdyZWVuPSI0OSIgeG1wRzpibHVlPSIxNDIiLz4gPC9yZGY6U2VxPiA8L3htcEc6Q29sb3JhbnRzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6bGk+IDwvcmRmOlNlcT4gPC94bXBUUGc6U3dhdGNoR3JvdXBzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvQJgmIAAAZQSURBVHic7ZxvSBtnHMe/99xdkktWnINJqRSsa92Y62LipCrtitrN0KqlUHG0FBFkKKN1m8iQsZluMDfE/WlZ21cTKSsWC65qi65VcS90xWl0riDSWaG1FEtnRczlz+VuL6ZFXGw1d8nl4n3gXuSS5/l9+eRyd8/zJKEkSYJO6BC1A2gdXaBMdIEy0QXKRBcoF0mSnm5RTCWA19UOscxKZ1o5Al9lWXYYQJHaQVajFYHYtWuXiRDyC8MwTgCU2nmW0YzA4uJiXLt2jTKZTJ+azeZOAC+onQnQkEAAcDgccLlcTGJi4jscx40CeEXtTJoSCAA7d+7E8PAwm5eXl2QwGMYAvKtmHs0JBIAtW7agvb2drq2ttRBCuhiGqVEriyYFAgBFUXA6nbhy5QrFsmw9x3GtALhI59CswGWOHDmCoaEhOiEh4bDZbP4DwPZI1te8QABITU2Fy+Vis7KyUoxG4ziAtyNVOyYEAkB8fDy6u7uZkydPxhFCegkhH0SibswIBACaptHQ0ICLFy/SDMP8YDKZmgAYwlkzpgQuc+zYMQwMDNDx8fHHzWbz7wC2hqtWTAoEgPT0dIyOjrI2m223yWT6C0BGOOrErEAASEhIQF9fH1NWVvYSTdMDAEqVrsEE2VdhsVg+UrqQHLxeb0KobVmWxblz5yi73c5UVFT8xDBMhtfr/RCAoES2YAK37t27N8XhcCjRv2JkZmbKal9eXo7U1FRSWFj4Pk3TNrfbXQTgsexgQSZUnXV1dVKscv/+fclut/s4jnsI4E25zmL6HBiMxMREDAwMsMXFxS8zDDMEoFhOf5tOIAAYjUY0NzeTxsZGAyGkxWAwfIMQXWxKgcucOnUKN2/eJCaT6WOz2dwN4MWN9rGpBQJATk4OxsbGmB07duxfmqR9bSPtN71AAEhKSsKtW7fYgoKC7SzLugAUrLetLnAJi8WCy5cvk9OnT5sIIVcZhvkM61i80gWugKIo1NbWoqOjgxiNxs85jrsKwPKsNrrAIBw8eBAjIyPMtm3bHBzHuQAkr/VaXeAapKSkYGRkhM3NzU1eWrzKC/a6YEM5tLS0YHR0NJz5NAMhhJYk6QWKom5IklQN4LuVz1PSiu/EUBQFAI6lTSc4lyVJGlx+EEygznNY6Uw/B8pEFygTXaBMdIEy0QXKRBcoE12gTHSBMtEFymT1WDgLQIkaQTRC19L2lNUCBwFkUhTVyDAM5XA4QIh+kALA+Pg4pqamnmCVwLV+aJNnMBgWDh06JMzPz6uzgBtlVFVVSQCcq52tdXj1+Hw+a29v75TdbvdPTk4q/5bGCM/6fE7xPG978OBBl91uF65fvx6xUFrieSe4RZ7nD3u93i8KCwvF+vr6aP9NXcRZzxVCEgThS1EUD9fV1XlKSkrExcXFsAfTChu5xHb6/X5bZ2fnvT179vinp6fDlUlTbPQeZYLn+bS7d+/2W61Woa+vLyyhtEQoN3lP3G53vsfj+fbAgQPimTNnFA+lJUK9SxZ9Pt8noii+V11d7SstLRW9Xq+iwbSC3GFGqyAIGa2trY+ys7P9MzMzioTSEkHXhTfInzzPp05MTLRbrdaMjo4ONisrS1aH/f39cLlcCkRTjrXyKCEQAB673e79gUDg+3379lVeuHCBlJeXh9xZW1sbzp8/P8ey7COF8inFw//tkZT/04lSmqb9lZWVos/nC3ncGRcX97VSgZRmPWNhOTQHAoHspqamf3JycoTZ2dkwlIgewjVXNeTxeN5wuVzjaWlp/uHh4TCVUZ9wTvY9dLvdmXNzcz9nZ2cHLl26FMZS6hHu2VKfx+MpEwSh6sSJE4GamhoEAoEwl4wsEZluFkXxR1EUc8+ePTufn58vzM3NRaJsRIjkfP1vXq939+Dg4KTNZvPfvn07gqXDR6QXPO653e63Zmdnr2ZkZATa2toiXF551Fgx4nmeL/b7/bVHjx6VnE6npidpVVtyEwShQRRFR319/WJRUVFgYWFBrSiyUHvN8lefz2ft6emZTk9P99+5c0flOBtHbYEA8DfP82kzMzM3bDab0NXV9fwW0UQYxsKhQjEM4ySEiMnJyZoZC0eTwGWKWJblLRbLV2oHWYtoFwj893efx9UOsRYrnVFRJk5zRMNFRNPoAmWiC5SJLlAmukCZ/AsrL3VlOnnl4AAAAABJRU5ErkJggg==";
var zs = { exports: {} };
/*@license Copyright 2015-2022 Ably Real-time Ltd (ably.com)

Ably JavaScript Library v2.3.1
https://github.com/ably/ably-js

Released under the Apache Licence v2.0*/
(function(R, c) {
  (function(h, p) {
    R.exports = p();
  })(pe, () => {
    var h = {}, p = { exports: h }, b = Object.defineProperty, C = Object.defineProperties, O = Object.getOwnPropertyDescriptor, P = Object.getOwnPropertyDescriptors, D = Object.getOwnPropertyNames, Q = Object.getOwnPropertySymbols, Y = Object.prototype.hasOwnProperty, ie = Object.prototype.propertyIsEnumerable, re = (e, t, n) => t in e ? b(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, F = (e, t) => {
      for (var n in t || (t = {}))
        Y.call(t, n) && re(e, n, t[n]);
      if (Q)
        for (var n of Q(t))
          ie.call(t, n) && re(e, n, t[n]);
      return e;
    }, we = (e, t) => C(e, P(t)), ii = (e, t) => {
      var n = {};
      for (var s in e)
        Y.call(e, s) && t.indexOf(s) < 0 && (n[s] = e[s]);
      if (e != null && Q)
        for (var s of Q(e))
          t.indexOf(s) < 0 && ie.call(e, s) && (n[s] = e[s]);
      return n;
    }, rn = (e, t) => {
      for (var n in t)
        b(e, n, { get: t[n], enumerable: !0 });
    }, ri = (e, t, n, s) => {
      if (t && typeof t == "object" || typeof t == "function")
        for (let i of D(t))
          !Y.call(e, i) && i !== n && b(e, i, { get: () => t[i], enumerable: !(s = O(t, i)) || s.enumerable });
      return e;
    }, oi = (e) => ri(b({}, "__esModule", { value: !0 }), e), on = {};
    rn(on, {
      ErrorInfo: () => m,
      Realtime: () => Dt,
      Rest: () => kt,
      default: () => Jo,
      msgpack: () => Yt,
      protocolMessageFromDeserialized: () => Mr
    }), p.exports = oi(on);
    var y = class {
    }, an = typeof pe < "u" ? pe : typeof window < "u" ? window : self;
    function Qe(e, t) {
      return `${e}`.padStart(t ? 3 : 2, "0");
    }
    function ai(e) {
      return y.Config.logTimestamps ? function(t) {
        const n = /* @__PURE__ */ new Date();
        e(
          Qe(n.getHours()) + ":" + Qe(n.getMinutes()) + ":" + Qe(n.getSeconds()) + "." + Qe(n.getMilliseconds(), 1) + " " + t
        );
      } : function(t) {
        e(t);
      };
    }
    var ci = () => {
      var e;
      let t, n;
      return typeof ((e = an == null ? void 0 : an.console) == null ? void 0 : e.log) == "function" ? (t = function(...s) {
        console.log.apply(console, s);
      }, n = console.warn ? function(...s) {
        console.warn.apply(console, s);
      } : t) : t = n = function() {
      }, [t, n].map(ai);
    }, he = class Xe {
      constructor() {
        this.deprecated = (t, n) => {
          this.deprecationWarning(`${t} is deprecated and will be removed in a future version. ${n}`);
        }, this.shouldLog = (t) => t <= this.logLevel, this.setLog = (t, n) => {
          t !== void 0 && (this.logLevel = t), n !== void 0 && (this.logHandler = this.logErrorHandler = n);
        }, this.logLevel = Xe.defaultLogLevel, this.logHandler = Xe.defaultLogHandler, this.logErrorHandler = Xe.defaultLogErrorHandler;
      }
      static initLogHandlers() {
        const [t, n] = ci();
        this.defaultLogHandler = t, this.defaultLogErrorHandler = n, this.defaultLogger = new Xe();
      }
      /**
       * Calls to this method are never stripped by the `stripLogs` esbuild plugin. Use it for log statements that you wish to always be included in the modular variant of the SDK.
       */
      static logActionNoStrip(t, n, s, i) {
        t.logAction(n, s, i);
      }
      logAction(t, n, s) {
        this.shouldLog(t) && (t === 1 ? this.logErrorHandler : this.logHandler)("Ably: " + n + ": " + s, t);
      }
      renamedClientOption(t, n) {
        this.deprecationWarning(
          `The \`${t}\` client option has been renamed to \`${n}\`. Please update your code to use \`${n}\` instead. \`${t}\` will be removed in a future version.`
        );
      }
      renamedMethod(t, n, s) {
        this.deprecationWarning(
          `\`${t}\`’s \`${n}\` method has been renamed to \`${s}\`. Please update your code to use \`${s}\` instead. \`${n}\` will be removed in a future version.`
        );
      }
      deprecationWarning(t) {
        this.shouldLog(
          1
          /* Error */
        ) && this.logErrorHandler(
          `Ably: Deprecation warning - ${t}`,
          1
          /* Error */
        );
      }
    };
    he.defaultLogLevel = 1, he.LOG_NONE = 0, he.LOG_ERROR = 1, he.LOG_MAJOR = 2, he.LOG_MINOR = 3, he.LOG_MICRO = 4, he.logAction = (e, t, n, s) => {
      he.logActionNoStrip(e, t, n, s);
    };
    var li = he, o = li, ut = {};
    rn(ut, {
      Format: () => bn,
      allSame: () => yn,
      allToLowerCase: () => pt,
      allToUpperCase: () => On,
      arrChooseN: () => Tn,
      arrDeleteValue: () => gn,
      arrEquals: () => An,
      arrIntersect: () => dn,
      arrIntersectOb: () => fn,
      arrPopRandomElement: () => dt,
      arrSubtract: () => pi,
      arrWithoutValue: () => mi,
      cheapRandStr: () => gt,
      containsValue: () => gi,
      copy: () => Te,
      createMissingPluginError: () => et,
      dataSizeBytes: () => Rn,
      decodeBody: () => ne,
      encodeBody: () => oe,
      ensureArray: () => ln,
      forInOwnNonNullProperties: () => mn,
      getBackoffCoefficient: () => Cn,
      getGlobalObject: () => yt,
      getJitterCoefficient: () => vn,
      getRetryTime: () => mt,
      inherits: () => fi,
      inspectBody: () => In,
      inspectError: () => L,
      intersect: () => un,
      isEmpty: () => ui,
      isErrorInfoOrPartialErrorInfo: () => ft,
      isNil: () => te,
      isObject: () => Oe,
      keysArray: () => Be,
      matchDerivedChannel: () => Mn,
      mixin: () => k,
      parseQueryString: () => Ke,
      prototypicalClone: () => hn,
      randomString: () => wn,
      shallowClone: () => di,
      shallowEquals: () => Sn,
      throwMissingPluginError: () => K,
      toBase64: () => $e,
      toQueryString: () => Ne,
      valuesArray: () => pn,
      whenPromiseSettles: () => X,
      withTimeoutAsync: () => kn
    });
    function cn(e) {
      let t = "[" + e.constructor.name;
      return e.message && (t += ": " + e.message), e.statusCode && (t += "; statusCode=" + e.statusCode), e.code && (t += "; code=" + e.code), e.cause && (t += "; cause=" + L(e.cause)), e.href && !(e.message && e.message.indexOf("help.ably.io") > -1) && (t += "; see " + e.href + " "), t += "]", t;
    }
    var m = class $t extends Error {
      constructor(t, n, s, i) {
        super(t), typeof Object.setPrototypeOf < "u" && Object.setPrototypeOf(this, $t.prototype), this.code = n, this.statusCode = s, this.cause = i;
      }
      toString() {
        return cn(this);
      }
      static fromValues(t) {
        const { message: n, code: s, statusCode: i } = t;
        if (typeof n != "string" || typeof s != "number" || typeof i != "number")
          throw new Error("ErrorInfo.fromValues(): invalid values: " + y.Config.inspect(t));
        const r = Object.assign(new $t(n, s, i), t);
        return r.code && !r.href && (r.href = "https://help.ably.io/error/" + r.code), r;
      }
    }, z = class en extends Error {
      constructor(t, n, s, i) {
        super(t), typeof Object.setPrototypeOf < "u" && Object.setPrototypeOf(this, en.prototype), this.code = n, this.statusCode = s, this.cause = i;
      }
      toString() {
        return cn(this);
      }
      static fromValues(t) {
        const { message: n, code: s, statusCode: i } = t;
        if (typeof n != "string" || !te(s) && typeof s != "number" || !te(i) && typeof i != "number")
          throw new Error("PartialErrorInfo.fromValues(): invalid values: " + y.Config.inspect(t));
        const r = Object.assign(new en(n, s, i), t);
        return r.code && !r.href && (r.href = "https://help.ably.io/error/" + r.code), r;
      }
    };
    function hi(e) {
      return Math.floor(Math.random() * e.length);
    }
    function k(e, ...t) {
      for (let n = 0; n < t.length; n++) {
        const s = t[n];
        if (!s)
          break;
        for (const i in s)
          Object.prototype.hasOwnProperty.call(s, i) && (e[i] = s[i]);
      }
      return e;
    }
    function Te(e) {
      return k({}, e);
    }
    function ln(e) {
      return te(e) ? [] : Array.isArray(e) ? e : [e];
    }
    function Oe(e) {
      return Object.prototype.toString.call(e) == "[object Object]";
    }
    function ui(e) {
      for (const t in e)
        return !1;
      return !0;
    }
    function te(e) {
      return e == null;
    }
    function di(e) {
      const t = new Object();
      for (const n in e)
        t[n] = e[n];
      return t;
    }
    function hn(e, t) {
      class n {
      }
      n.prototype = e;
      const s = new n();
      return t && k(s, t), s;
    }
    var fi = function(e, t) {
      if (y.Config.inherits) {
        y.Config.inherits(e, t);
        return;
      }
      e.super_ = t, e.prototype = hn(t.prototype, { constructor: e });
    };
    function gi(e, t) {
      for (const n in e)
        if (e[n] == t)
          return !0;
      return !1;
    }
    function un(e, t) {
      return Array.isArray(t) ? dn(e, t) : fn(e, t);
    }
    function dn(e, t) {
      const n = [];
      for (let s = 0; s < e.length; s++) {
        const i = e[s];
        t.indexOf(i) != -1 && n.push(i);
      }
      return n;
    }
    function fn(e, t) {
      const n = [];
      for (let s = 0; s < e.length; s++) {
        const i = e[s];
        i in t && n.push(i);
      }
      return n;
    }
    function pi(e, t) {
      const n = [];
      for (let s = 0; s < e.length; s++) {
        const i = e[s];
        t.indexOf(i) == -1 && n.push(i);
      }
      return n;
    }
    function gn(e, t) {
      const n = e.indexOf(t), s = n != -1;
      return s && e.splice(n, 1), s;
    }
    function mi(e, t) {
      const n = e.slice();
      return gn(n, t), n;
    }
    function Be(e, t) {
      const n = [];
      for (const s in e)
        t && !Object.prototype.hasOwnProperty.call(e, s) || n.push(s);
      return n;
    }
    function pn(e, t) {
      const n = [];
      for (const s in e)
        t && !Object.prototype.hasOwnProperty.call(e, s) || n.push(e[s]);
      return n;
    }
    function mn(e, t) {
      for (const n in e)
        Object.prototype.hasOwnProperty.call(e, n) && e[n] && t(n);
    }
    function yn(e, t) {
      if (e.length === 0)
        return !0;
      const n = e[0][t];
      return e.every(function(s) {
        return s[t] === n;
      });
    }
    var bn = /* @__PURE__ */ ((e) => (e.msgpack = "msgpack", e.json = "json", e))(bn || {});
    function dt(e) {
      return e.splice(hi(e), 1)[0];
    }
    function Ne(e) {
      const t = [];
      if (e)
        for (const n in e)
          t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
      return t.length ? "?" + t.join("&") : "";
    }
    function Ke(e) {
      let t;
      const n = /([^?&=]+)=?([^&]*)/g, s = {};
      for (; t = n.exec(e); )
        s[decodeURIComponent(t[1])] = decodeURIComponent(t[2]);
      return s;
    }
    function ft(e) {
      return typeof e == "object" && e !== null && (e instanceof m || e instanceof z);
    }
    function L(e) {
      var t, n;
      return e instanceof Error || ((t = e == null ? void 0 : e.constructor) == null ? void 0 : t.name) === "ErrorInfo" || ((n = e == null ? void 0 : e.constructor) == null ? void 0 : n.name) === "PartialErrorInfo" ? e.toString() : y.Config.inspect(e);
    }
    function In(e) {
      return y.BufferUtils.isBuffer(e) ? e.toString() : typeof e == "string" ? e : y.Config.inspect(e);
    }
    function Rn(e) {
      if (y.BufferUtils.isBuffer(e))
        return y.BufferUtils.byteLength(e);
      if (typeof e == "string")
        return y.Config.stringByteSize(e);
      throw new Error("Expected input of Utils.dataSizeBytes to be a buffer or string, but was: " + typeof e);
    }
    function gt() {
      return String(Math.random()).substr(2);
    }
    var wn = async (e) => {
      const t = await y.Config.getRandomArrayBuffer(e);
      return y.BufferUtils.base64Encode(t);
    };
    function Tn(e, t) {
      const n = Math.min(t, e.length), s = e.slice(), i = [];
      for (let r = 0; r < n; r++)
        i.push(dt(s));
      return i;
    }
    function X(e, t) {
      e.then((n) => {
        t == null || t(null, n);
      }).catch((n) => {
        t == null || t(n);
      });
    }
    function ne(e, t, n) {
      return n == "msgpack" ? (t || K("MsgPack"), t.decode(e)) : JSON.parse(String(e));
    }
    function oe(e, t, n) {
      return n == "msgpack" ? (t || K("MsgPack"), t.encode(e, !0)) : JSON.stringify(e);
    }
    function pt(e) {
      return e.map(function(t) {
        return t && t.toLowerCase();
      });
    }
    function On(e) {
      return e.map(function(t) {
        return t && t.toUpperCase();
      });
    }
    function Cn(e) {
      return Math.min((e + 2) / 3, 2);
    }
    function vn() {
      return 1 - Math.random() * 0.2;
    }
    function mt(e, t) {
      return e * Cn(t) * vn();
    }
    function yt() {
      return typeof pe < "u" ? pe : typeof window < "u" ? window : self;
    }
    function Sn(e, t) {
      return Object.keys(e).every((n) => e[n] === t[n]) && Object.keys(t).every((n) => t[n] === e[n]);
    }
    function Mn(e) {
      const t = /^(\[([^?]*)(?:(.*))\])?(.+)$/, n = e.match(t);
      if (!n || !n.length || n.length < 5)
        throw new m("regex match failed", 400, 40010);
      if (n[2])
        throw new m(`cannot use a derived option with a ${n[2]} channel`, 400, 40010);
      return {
        qualifierParam: n[3] || "",
        channelName: n[4]
      };
    }
    function $e(e) {
      const t = y.BufferUtils, n = t.utf8Encode(e);
      return t.base64Encode(n);
    }
    function An(e, t) {
      return e.length === t.length && e.every(function(n, s) {
        return n === t[s];
      });
    }
    function et(e) {
      return new m(`${e} plugin not provided`, 40019, 400);
    }
    function K(e) {
      throw et(e);
    }
    async function kn(e, t = 5e3, n = "Timeout expired") {
      const s = new m(n, 5e4, 500);
      return Promise.race([e, new Promise((i, r) => setTimeout(() => r(s), t))]);
    }
    var En = "2.3.1", yi = "ably-js/" + En, j = {
      ENVIRONMENT: "",
      REST_HOST: "rest.ably.io",
      REALTIME_HOST: "realtime.ably.io",
      FALLBACK_HOSTS: [
        "A.ably-realtime.com",
        "B.ably-realtime.com",
        "C.ably-realtime.com",
        "D.ably-realtime.com",
        "E.ably-realtime.com"
      ],
      PORT: 80,
      TLS_PORT: 443,
      TIMEOUTS: {
        /* Documented as options params: */
        disconnectedRetryTimeout: 15e3,
        suspendedRetryTimeout: 3e4,
        /* Undocumented, but part of the api and can be used by customers: */
        httpRequestTimeout: 1e4,
        httpMaxRetryDuration: 15e3,
        channelRetryTimeout: 15e3,
        fallbackRetryTimeout: 6e5,
        /* For internal / test use only: */
        connectionStateTtl: 12e4,
        realtimeRequestTimeout: 1e4,
        recvTimeout: 9e4,
        webSocketConnectTimeout: 1e4,
        webSocketSlowTimeout: 4e3
      },
      httpMaxRetryCount: 3,
      maxMessageSize: 65536,
      version: En,
      protocolVersion: 3,
      agent: yi,
      getHost: Pn,
      getPort: bi,
      getHttpScheme: Ii,
      environmentFallbackHosts: _n,
      getFallbackHosts: Gn,
      getHosts: Ri,
      checkHost: Bn,
      objectifyOptions: Oi,
      normaliseOptions: Ci,
      defaultGetHeaders: vi,
      defaultPostHeaders: Si
    };
    function Pn(e, t, n) {
      return n ? t = t == e.restHost && e.realtimeHost || t || e.realtimeHost : t = t || e.restHost, t;
    }
    function bi(e, t) {
      return t || e.tls ? e.tlsPort : e.port;
    }
    function Ii(e) {
      return e.tls ? "https://" : "http://";
    }
    function _n(e) {
      return [
        e + "-a-fallback.ably-realtime.com",
        e + "-b-fallback.ably-realtime.com",
        e + "-c-fallback.ably-realtime.com",
        e + "-d-fallback.ably-realtime.com",
        e + "-e-fallback.ably-realtime.com"
      ];
    }
    function Gn(e) {
      const t = e.fallbackHosts, n = typeof e.httpMaxRetryCount < "u" ? e.httpMaxRetryCount : j.httpMaxRetryCount;
      return t ? Tn(t, n) : [];
    }
    function Ri(e, t) {
      const n = [e.restHost].concat(Gn(e));
      return t ? n.map((s) => Pn(e, s, !0)) : n;
    }
    function Bn(e) {
      if (typeof e != "string")
        throw new m("host must be a string; was a " + typeof e, 4e4, 400);
      if (!e.length)
        throw new m("host must not be zero-length", 4e4, 400);
    }
    function wi(e, t, n, s) {
      return e.realtimeHost ? e.realtimeHost : e.restHost ? (o.logAction(
        s,
        o.LOG_MINOR,
        "Defaults.normaliseOptions",
        'restHost is set to "' + e.restHost + '" but realtimeHost is not set, so setting realtimeHost to "' + e.restHost + '" too. If this is not what you want, please set realtimeHost explicitly.'
      ), e.restHost) : t ? j.REALTIME_HOST : n + "-" + j.REALTIME_HOST;
    }
    function Ti(e) {
      const t = {};
      for (const n in j.TIMEOUTS)
        t[n] = e[n] || j.TIMEOUTS[n];
      return t;
    }
    function bt(e) {
      let t = j.agent;
      if (e.agents)
        for (var n in e.agents)
          t += " " + n + "/" + e.agents[n];
      return t;
    }
    function Oi(e, t, n, s, i) {
      if (e === void 0) {
        const a = t ? `${n} must be initialized with either a client options object, an Ably API key, or an Ably Token` : `${n} must be initialized with a client options object`;
        throw o.logAction(s, o.LOG_ERROR, `${n}()`, a), new Error(a);
      }
      let r;
      if (typeof e == "string")
        if (e.indexOf(":") == -1) {
          if (!t) {
            const a = `${n} cannot be initialized with just an Ably Token; you must provide a client options object with a \`plugins\` property. (Set this Ably Token as the object’s \`token\` property.)`;
            throw o.logAction(s, o.LOG_ERROR, `${n}()`, a), new Error(a);
          }
          r = { token: e };
        } else {
          if (!t) {
            const a = `${n} cannot be initialized with just an Ably API key; you must provide a client options object with a \`plugins\` property. (Set this Ably API key as the object’s \`key\` property.)`;
            throw o.logAction(s, o.LOG_ERROR, `${n}()`, a), new Error(a);
          }
          r = { key: e };
        }
      else
        r = e;
      return i && (r = we(F({}, r), { plugins: F(F({}, i), r.plugins) })), r;
    }
    function Ci(e, t, n) {
      const s = n ?? o.defaultLogger;
      typeof e.recover == "function" && e.closeOnUnload === !0 && (o.logAction(
        s,
        o.LOG_ERROR,
        "Defaults.normaliseOptions",
        "closeOnUnload was true and a session recovery function was set - these are mutually exclusive, so unsetting the latter"
      ), e.recover = void 0), "closeOnUnload" in e || (e.closeOnUnload = !e.recover), "queueMessages" in e || (e.queueMessages = !0);
      const i = e.environment && String(e.environment).toLowerCase() || j.ENVIRONMENT, r = !i || i === "production";
      !e.fallbackHosts && !e.restHost && !e.realtimeHost && !e.port && !e.tlsPort && (e.fallbackHosts = r ? j.FALLBACK_HOSTS : _n(i));
      const a = e.restHost || (r ? j.REST_HOST : i + "-" + j.REST_HOST), l = wi(e, r, i, s);
      (e.fallbackHosts || []).concat(a, l).forEach(Bn), e.port = e.port || j.PORT, e.tlsPort = e.tlsPort || j.TLS_PORT, "tls" in e || (e.tls = !0);
      const d = Ti(e);
      t ? "useBinaryProtocol" in e ? e.useBinaryProtocol = y.Config.supportsBinary && e.useBinaryProtocol : e.useBinaryProtocol = y.Config.preferBinary : e.useBinaryProtocol = !1;
      const u = {};
      e.clientId && (u["X-Ably-ClientId"] = y.BufferUtils.base64Encode(y.BufferUtils.utf8Encode(e.clientId))), "idempotentRestPublishing" in e || (e.idempotentRestPublishing = !0);
      let f = null, g = e.connectivityCheckUrl;
      if (e.connectivityCheckUrl) {
        let [w, I] = e.connectivityCheckUrl.split("?");
        f = I ? Ke(I) : {}, w.indexOf("://") === -1 && (w = "https://" + w), g = w;
      }
      return we(F({}, e), {
        realtimeHost: l,
        restHost: a,
        maxMessageSize: e.maxMessageSize || j.maxMessageSize,
        timeouts: d,
        connectivityCheckParams: f,
        connectivityCheckUrl: g,
        headers: u
      });
    }
    function tt(e, t, n) {
      const s = n || {};
      if (s.cipher) {
        e || K("Crypto");
        const i = e.getCipher(s.cipher, t);
        s.cipher = i.cipherParams, s.channelCipher = i.cipher;
      } else "cipher" in s && (s.cipher = void 0, s.channelCipher = null);
      return s;
    }
    var Nn = {
      json: "application/json",
      xml: "application/xml",
      html: "text/html",
      msgpack: "application/x-msgpack",
      text: "text/plain"
    }, nt = {
      format: "json",
      protocolVersion: j.protocolVersion
    };
    function vi(e, {
      format: t = nt.format,
      protocolVersion: n = nt.protocolVersion
    } = {}) {
      return {
        accept: Nn[t],
        "X-Ably-Version": n.toString(),
        "Ably-Agent": bt(e)
      };
    }
    function Si(e, {
      format: t = nt.format,
      protocolVersion: n = nt.protocolVersion
    } = {}) {
      let s;
      return {
        accept: s = Nn[t],
        "content-type": s,
        "X-Ably-Version": n.toString(),
        "Ably-Agent": bt(e)
      };
    }
    var S = j;
    function Mi(e) {
      return Object.assign(j, e);
    }
    var Ai = class js {
      // Private constructor; use static Multicaster.create instead
      constructor(t, n) {
        this.logger = t, this.members = n || [];
      }
      call(t, n) {
        for (const s of this.members)
          if (s)
            try {
              s(t, n);
            } catch (i) {
              o.logAction(
                this.logger,
                o.LOG_ERROR,
                "Multicaster multiple callback handler",
                "Unexpected exception: " + i + "; stack = " + i.stack
              );
            }
      }
      push(...t) {
        this.members.push(...t);
      }
      createPromise() {
        return new Promise((t, n) => {
          this.push((s, i) => {
            s ? n(s) : t(i);
          });
        });
      }
      resolveAll(t) {
        this.call(null, t);
      }
      rejectAll(t) {
        this.call(t);
      }
      static create(t, n) {
        const s = new js(t, n);
        return Object.assign((i, r) => s.call(i, r), {
          push: (i) => s.push(i),
          createPromise: () => s.createPromise(),
          resolveAll: (i) => s.resolveAll(i),
          rejectAll: (i) => s.rejectAll(i)
        });
      }
    }, It = Ai, Ln = /* @__PURE__ */ ((e) => (e.Get = "get", e.Delete = "delete", e.Post = "post", e.Put = "put", e.Patch = "patch", e))(Ln || {}), H = Ln, Un = /* @__PURE__ */ ((e) => (e[e.Success = 200] = "Success", e[e.NoContent = 204] = "NoContent", e[e.BadRequest = 400] = "BadRequest", e[e.Unauthorized = 401] = "Unauthorized", e[e.Forbidden = 403] = "Forbidden", e[e.RequestTimeout = 408] = "RequestTimeout", e[e.InternalServerError = 500] = "InternalServerError", e))(Un || {});
    function ki(e) {
      return e >= 200 && e < 400;
    }
    var st = Un, Rt = Math.pow(2, 17);
    function Ei() {
      return ("000000" + Math.floor(Math.random() * 1e16)).slice(-16);
    }
    function Pi(e) {
      return !!e.connection;
    }
    function Hn(e) {
      return ft(e) ? (e.code || (e.statusCode === 403 ? e.code = 40300 : (e.code = 40170, e.statusCode = 401)), e) : new m(L(e), e.code || 40170, e.statusCode || 401);
    }
    var _i = (e, t) => {
      const n = y.BufferUtils, s = n.utf8Encode(e), i = n.utf8Encode(t), r = n.hmacSha256(s, i);
      return n.base64Encode(r);
    };
    function xn(e) {
      if (!e)
        return "";
      typeof e == "string" && (e = JSON.parse(e));
      const t = /* @__PURE__ */ Object.create(null), n = Be(e, !0);
      if (!n)
        return "";
      n.sort();
      for (let s = 0; s < n.length; s++)
        t[n[s]] = e[n[s]].sort();
      return JSON.stringify(t);
    }
    function Dn(e, t) {
      if (e.authCallback)
        o.logAction(t, o.LOG_MINOR, "Auth()", "using token auth with authCallback");
      else if (e.authUrl)
        o.logAction(t, o.LOG_MINOR, "Auth()", "using token auth with authUrl");
      else if (e.key)
        o.logAction(t, o.LOG_MINOR, "Auth()", "using token auth with client-side signing");
      else if (e.tokenDetails)
        o.logAction(t, o.LOG_MINOR, "Auth()", "using token auth with supplied token only");
      else {
        const n = "authOptions must include valid authentication parameters";
        throw o.logAction(t, o.LOG_ERROR, "Auth()", n), new Error(n);
      }
    }
    function Gi(e) {
      return "useTokenAuth" in e && !e.useTokenAuth;
    }
    function Wn(e) {
      return e.useTokenAuth || !Gi(e) && (e.authCallback || e.authUrl || e.token || e.tokenDetails);
    }
    function Bi(e) {
      return !e.key && !e.authCallback && !e.authUrl;
    }
    var Ni = 0;
    function Li() {
      return Ni++;
    }
    var Ui = class {
      constructor(e, t) {
        if (this.authOptions = {}, this.client = e, this.tokenParams = t.defaultTokenParams || {}, this.currentTokenRequestId = null, this.waitingForTokenRequest = null, Wn(t))
          Bi(t) && o.logAction(
            this.logger,
            o.LOG_ERROR,
            "Auth()",
            "Warning: library initialized with a token literal without any way to renew the token when it expires (no authUrl, authCallback, or key). See https://help.ably.io/error/40171 for help"
          ), this._saveTokenOptions(t.defaultTokenParams, t), Dn(this.authOptions, this.logger);
        else {
          if (!t.key) {
            const n = "No authentication options provided; need one of: key, authUrl, or authCallback (or for testing only, token or tokenDetails)";
            throw o.logAction(this.logger, o.LOG_ERROR, "Auth()", n), new m(n, 40160, 401);
          }
          o.logAction(this.logger, o.LOG_MINOR, "Auth()", "anonymous, using basic auth"), this._saveBasicOptions(t);
        }
      }
      get logger() {
        return this.client.logger;
      }
      async authorize(e, t) {
        if (t && t.key && this.authOptions.key !== t.key)
          throw new m("Unable to update auth options with incompatible key", 40102, 401);
        try {
          let n = await this._forceNewToken(e ?? null, t ?? null);
          return Pi(this.client) ? new Promise((s, i) => {
            this.client.connection.connectionManager.onAuthUpdated(
              n,
              (r, a) => r ? i(r) : s(a)
            );
          }) : n;
        } catch (n) {
          throw this.client.connection && n.statusCode === st.Forbidden && this.client.connection.connectionManager.actOnErrorFromAuthorize(n), n;
        }
      }
      /* For internal use, eg by connectionManager - useful when want to call back
       * as soon as we have the new token, rather than waiting for it to take
       * effect on the connection as #authorize does */
      async _forceNewToken(e, t) {
        this.tokenDetails = null, this._saveTokenOptions(e, t), Dn(this.authOptions, this.logger);
        try {
          return this._ensureValidAuthCredentials(!0);
        } finally {
          delete this.tokenParams.timestamp, delete this.authOptions.queryTime;
        }
      }
      async requestToken(e, t) {
        const n = t || this.authOptions, s = e || Te(this.tokenParams);
        let i, r = this.client;
        if (n.authCallback)
          o.logAction(this.logger, o.LOG_MINOR, "Auth.requestToken()", "using token auth with authCallback"), i = n.authCallback;
        else if (n.authUrl)
          o.logAction(this.logger, o.LOG_MINOR, "Auth.requestToken()", "using token auth with authUrl"), i = (l, d) => {
            const u = k(
              { accept: "application/json, text/plain" },
              n.authHeaders
            ), f = n.authMethod && n.authMethod.toLowerCase() === "post";
            let g;
            const w = n.authUrl.indexOf("?");
            w > -1 && (g = Ke(n.authUrl.slice(w)), n.authUrl = n.authUrl.slice(0, w), f || (n.authParams = k(
              g,
              n.authParams
            )));
            const I = k({}, n.authParams || {}, l), T = (v) => {
              var M, B;
              let N = (M = v.body) != null ? M : null, U = null;
              if (v.error)
                o.logAction(
                  this.logger,
                  o.LOG_MICRO,
                  "Auth.requestToken().tokenRequestCallback",
                  "Received Error: " + L(v.error)
                );
              else {
                const J = (B = v.headers["content-type"]) != null ? B : null;
                Array.isArray(J) ? U = J.join(", ") : U = J, o.logAction(
                  this.logger,
                  o.LOG_MICRO,
                  "Auth.requestToken().tokenRequestCallback",
                  "Received; content-type: " + U + "; body: " + In(N)
                );
              }
              if (v.error) {
                d(v.error, null);
                return;
              }
              if (v.unpacked) {
                d(null, N);
                return;
              }
              if (y.BufferUtils.isBuffer(N) && (N = N.toString()), !U) {
                d(new m("authUrl response is missing a content-type header", 40170, 401), null);
                return;
              }
              const A = U.indexOf("application/json") > -1, $ = U.indexOf("text/plain") > -1 || U.indexOf("application/jwt") > -1;
              if (!A && !$) {
                d(
                  new m(
                    "authUrl responded with unacceptable content-type " + U + ", should be either text/plain, application/jwt or application/json",
                    40170,
                    401
                  ),
                  null
                );
                return;
              }
              if (A) {
                if (N.length > Rt) {
                  d(new m("authUrl response exceeded max permitted length", 40170, 401), null);
                  return;
                }
                try {
                  N = JSON.parse(N);
                } catch (J) {
                  d(
                    new m(
                      "Unexpected error processing authURL response; err = " + J.message,
                      40170,
                      401
                    ),
                    null
                  );
                  return;
                }
              }
              d(null, N, U);
            };
            if (o.logAction(
              this.logger,
              o.LOG_MICRO,
              "Auth.requestToken().tokenRequestCallback",
              "Requesting token from " + n.authUrl + "; Params: " + JSON.stringify(I) + "; method: " + (f ? "POST" : "GET")
            ), f) {
              const v = u || {};
              v["content-type"] = "application/x-www-form-urlencoded";
              const M = Ne(I).slice(1);
              X(
                this.client.http.doUri(
                  H.Post,
                  n.authUrl,
                  v,
                  M,
                  g
                ),
                (B, N) => T(B || N)
              );
            } else
              X(
                this.client.http.doUri(H.Get, n.authUrl, u || {}, null, I),
                (v, M) => T(v || M)
              );
          };
        else if (n.key)
          o.logAction(
            this.logger,
            o.LOG_MINOR,
            "Auth.requestToken()",
            "using token auth with client-side signing"
          ), i = (l, d) => {
            X(
              this.createTokenRequest(l, n),
              (u, f) => d(u, f ?? null)
            );
          };
        else {
          const l = "Need a new token, but authOptions does not include any way to request one (no authUrl, authCallback, or key)";
          throw o.logAction(
            this.logger,
            o.LOG_ERROR,
            "Auth()",
            "library initialized with a token literal without any way to renew the token when it expires (no authUrl, authCallback, or key). See https://help.ably.io/error/40171 for help"
          ), new m(l, 40171, 403);
        }
        "capability" in s && (s.capability = xn(
          s.capability
        ));
        const a = (l, d) => {
          const u = l.keyName, f = "/keys/" + u + "/requestToken", g = function(I) {
            return r.baseUri(I) + f;
          }, w = S.defaultPostHeaders(this.client.options);
          n.requestHeaders && k(w, n.requestHeaders), o.logAction(
            this.logger,
            o.LOG_MICRO,
            "Auth.requestToken().requestToken",
            "Sending POST to " + f + "; Token params: " + JSON.stringify(l)
          ), X(
            this.client.http.do(H.Post, g, w, JSON.stringify(l), null),
            (I, T) => I ? d(I) : d(T.error, T.body, T.unpacked)
          );
        };
        return new Promise((l, d) => {
          let u = !1, f = this.client.options.timeouts.realtimeRequestTimeout, g = setTimeout(() => {
            u = !0;
            const w = "Token request callback timed out after " + f / 1e3 + " seconds";
            o.logAction(this.logger, o.LOG_ERROR, "Auth.requestToken()", w), d(new m(w, 40170, 401));
          }, f);
          i(s, (w, I, T) => {
            if (u)
              return;
            if (clearTimeout(g), w) {
              o.logAction(
                this.logger,
                o.LOG_ERROR,
                "Auth.requestToken()",
                "token request signing call returned error; err = " + L(w)
              ), d(Hn(w));
              return;
            }
            if (typeof I == "string") {
              I.length === 0 ? d(new m("Token string is empty", 40170, 401)) : I.length > Rt ? d(
                new m(
                  "Token string exceeded max permitted length (was " + I.length + " bytes)",
                  40170,
                  401
                )
              ) : I === "undefined" || I === "null" ? d(new m("Token string was literal null/undefined", 40170, 401)) : I[0] === "{" && !(T && T.indexOf("application/jwt") > -1) ? d(
                new m(
                  "Token was double-encoded; make sure you're not JSON-encoding an already encoded token request or details",
                  40170,
                  401
                )
              ) : l({ token: I });
              return;
            }
            if (typeof I != "object" || I === null) {
              const M = "Expected token request callback to call back with a token string or token request/details object, but got a " + typeof I;
              o.logAction(this.logger, o.LOG_ERROR, "Auth.requestToken()", M), d(new m(M, 40170, 401));
              return;
            }
            const v = JSON.stringify(I).length;
            if (v > Rt && !n.suppressMaxLengthCheck) {
              d(
                new m(
                  "Token request/details object exceeded max permitted stringified size (was " + v + " bytes)",
                  40170,
                  401
                )
              );
              return;
            }
            if ("issued" in I) {
              l(I);
              return;
            }
            if (!("keyName" in I)) {
              const M = "Expected token request callback to call back with a token string, token request object, or token details object";
              o.logAction(this.logger, o.LOG_ERROR, "Auth.requestToken()", M), d(new m(M, 40170, 401));
              return;
            }
            a(I, (M, B, N) => {
              if (M) {
                o.logAction(
                  this.logger,
                  o.LOG_ERROR,
                  "Auth.requestToken()",
                  "token request API call returned error; err = " + L(M)
                ), d(Hn(M));
                return;
              }
              N || (B = JSON.parse(B)), o.logAction(this.logger, o.LOG_MINOR, "Auth.getToken()", "token received"), l(B);
            });
          });
        });
      }
      /**
       * Create and sign a token request based on the given options.
       * NOTE this can only be used when the key value is available locally.
       * Otherwise, signed token requests must be obtained from the key
       * owner (either using the token request callback or url).
       *
       * @param authOptions
       * an object containing the request options:
       * - key:           the key to use. If not specified, a key passed in constructing
       *                  the Rest interface will be used
       *
       * - queryTime      (optional) boolean indicating that the ably system should be
       *                  queried for the current time when none is specified explicitly
       *
       * - requestHeaders (optional, unsupported, for testing only) extra headers to add to the
       *                  requestToken request
       *
       * @param tokenParams
       * an object containing the parameters for the requested token:
       * - ttl:       (optional) the requested life of the token in ms. If none is specified
       *                  a default of 1 hour is provided. The maximum lifetime is 24hours; any request
       *                  exceeding that lifetime will be rejected with an error.
       *
       * - capability:    (optional) the capability to associate with the access token.
       *                  If none is specified, a token will be requested with all of the
       *                  capabilities of the specified key.
       *
       * - clientId:      (optional) a client ID to associate with the token; if not
       *                  specified, a clientId passed in constructing the Rest interface will be used
       *
       * - timestamp:     (optional) the time in ms since the epoch. If none is specified,
       *                  the system will be queried for a time value to use.
       */
      async createTokenRequest(e, t) {
        t = t || this.authOptions, e = e || Te(this.tokenParams);
        const n = t.key;
        if (!n)
          throw new m("No key specified", 40101, 403);
        const s = n.split(":"), i = s[0], r = s[1];
        if (!r)
          throw new m("Invalid key specified", 40101, 403);
        if (e.clientId === "")
          throw new m("clientId can’t be an empty string", 40012, 400);
        "capability" in e && (e.capability = xn(e.capability));
        const a = k({ keyName: i }, e), l = e.clientId || "", d = e.ttl || "", u = e.capability || "";
        a.timestamp || (a.timestamp = await this.getTimestamp(t && t.queryTime));
        const f = a.nonce || (a.nonce = Ei()), g = a.timestamp, w = a.keyName + `
` + d + `
` + u + `
` + l + `
` + g + `
` + f + `
`;
        return a.mac = a.mac || _i(w, r), o.logAction(this.logger, o.LOG_MINOR, "Auth.getTokenRequest()", "generated signed request"), a;
      }
      /**
       * Get the auth query params to use for a websocket connection,
       * based on the current auth parameters
       */
      async getAuthParams() {
        if (this.method == "basic")
          return { key: this.key };
        {
          let e = await this._ensureValidAuthCredentials(!1);
          if (!e)
            throw new Error("Auth.getAuthParams(): _ensureValidAuthCredentials returned no error or tokenDetails");
          return { access_token: e.token };
        }
      }
      /**
       * Get the authorization header to use for a REST or comet request,
       * based on the current auth parameters
       */
      async getAuthHeaders() {
        if (this.method == "basic")
          return { authorization: "Basic " + this.basicKey };
        {
          const e = await this._ensureValidAuthCredentials(!1);
          if (!e)
            throw new Error("Auth.getAuthParams(): _ensureValidAuthCredentials returned no error or tokenDetails");
          return { authorization: "Bearer " + $e(e.token) };
        }
      }
      /**
       * Get the current time based on the local clock,
       * or if the option queryTime is true, return the server time.
       * The server time offset from the local time is stored so that
       * only one request to the server to get the time is ever needed
       */
      async getTimestamp(e) {
        return !this.isTimeOffsetSet() && (e || this.authOptions.queryTime) ? this.client.time() : this.getTimestampUsingOffset();
      }
      getTimestampUsingOffset() {
        return Date.now() + (this.client.serverTimeOffset || 0);
      }
      isTimeOffsetSet() {
        return this.client.serverTimeOffset !== null;
      }
      _saveBasicOptions(e) {
        this.method = "basic", this.key = e.key, this.basicKey = $e(e.key), this.authOptions = e || {}, "clientId" in e && this._userSetClientId(e.clientId);
      }
      _saveTokenOptions(e, t) {
        this.method = "token", e && (this.tokenParams = e), t && (t.token && (t.tokenDetails = typeof t.token == "string" ? { token: t.token } : t.token), t.tokenDetails && (this.tokenDetails = t.tokenDetails), "clientId" in t && this._userSetClientId(t.clientId), this.authOptions = t);
      }
      /* @param forceSupersede: force a new token request even if there's one in
       * progress, making all pending callbacks wait for the new one */
      async _ensureValidAuthCredentials(e) {
        const t = this.tokenDetails;
        if (t) {
          if (this._tokenClientIdMismatch(t.clientId))
            throw new m(
              "Mismatch between clientId in token (" + t.clientId + ") and current clientId (" + this.clientId + ")",
              40102,
              403
            );
          if (!this.isTimeOffsetSet() || !t.expires || t.expires >= this.getTimestampUsingOffset())
            return o.logAction(
              this.logger,
              o.LOG_MINOR,
              "Auth.getToken()",
              "using cached token; expires = " + t.expires
            ), t;
          o.logAction(this.logger, o.LOG_MINOR, "Auth.getToken()", "deleting expired token"), this.tokenDetails = null;
        }
        const n = (this.waitingForTokenRequest || (this.waitingForTokenRequest = It.create(this.logger))).createPromise();
        if (this.currentTokenRequestId !== null && !e)
          return n;
        const s = this.currentTokenRequestId = Li();
        let i, r = null;
        try {
          i = await this.requestToken(this.tokenParams, this.authOptions);
        } catch (l) {
          r = l;
        }
        if (this.currentTokenRequestId > s)
          return o.logAction(
            this.logger,
            o.LOG_MINOR,
            "Auth._ensureValidAuthCredentials()",
            "Discarding token request response; overtaken by newer one"
          ), n;
        this.currentTokenRequestId = null;
        const a = this.waitingForTokenRequest;
        return this.waitingForTokenRequest = null, r ? (a == null || a.rejectAll(r), n) : (a == null || a.resolveAll(this.tokenDetails = i), n);
      }
      /* User-set: check types, '*' is disallowed, throw any errors */
      _userSetClientId(e) {
        if (typeof e == "string" || e === null) {
          if (e === "*")
            throw new m(
              'Can’t use "*" as a clientId as that string is reserved. (To change the default token request behaviour to use a wildcard clientId, instantiate the library with {defaultTokenParams: {clientId: "*"}}), or if calling authorize(), pass it in as a tokenParam: authorize({clientId: "*"}, authOptions)',
              40012,
              400
            );
          {
            const t = this._uncheckedSetClientId(e);
            if (t)
              throw t;
          }
        } else throw new m("clientId must be either a string or null", 40012, 400);
      }
      /* Ably-set: no typechecking, '*' is allowed but not set on this.clientId), return errors to the caller */
      _uncheckedSetClientId(e) {
        if (this._tokenClientIdMismatch(e)) {
          const t = "Unexpected clientId mismatch: client has " + this.clientId + ", requested " + e, n = new m(t, 40102, 401);
          return o.logAction(this.logger, o.LOG_ERROR, "Auth._uncheckedSetClientId()", t), n;
        } else
          return this.clientId = this.tokenParams.clientId = e, null;
      }
      _tokenClientIdMismatch(e) {
        return !!(this.clientId && this.clientId !== "*" && e && e !== "*" && this.clientId !== e);
      }
      static isTokenErr(e) {
        return e.code && e.code >= 40140 && e.code < 40150;
      }
      revokeTokens(e, t) {
        return this.client.rest.revokeTokens(e, t);
      }
    }, ue = Ui;
    function wt(e) {
      const t = [];
      if (e)
        for (const n in e)
          t.push(n + "=" + e[n]);
      return t.join("&");
    }
    function Ce(e, t) {
      return e + (t ? "?" : "") + wt(t);
    }
    function Hi(e, t, n, s, i) {
      e.error ? o.logActionNoStrip(
        i,
        o.LOG_MICRO,
        "Http." + t + "()",
        "Received Error; " + Ce(n, s) + "; Error: " + L(e.error)
      ) : o.logActionNoStrip(
        i,
        o.LOG_MICRO,
        "Http." + t + "()",
        "Received; " + Ce(n, s) + "; Headers: " + wt(e.headers) + "; StatusCode: " + e.statusCode + "; Body" + (y.BufferUtils.isBuffer(e.body) ? " (Base64): " + y.BufferUtils.base64Encode(e.body) : ": " + e.body)
      );
    }
    function xi(e, t, n, s, i) {
      i.shouldLog(o.LOG_MICRO) && o.logActionNoStrip(
        i,
        o.LOG_MICRO,
        "Http." + e + "()",
        "Sending; " + Ce(t, s) + "; Body" + (y.BufferUtils.isBuffer(n) ? " (Base64): " + y.BufferUtils.base64Encode(n) : ": " + n)
      );
    }
    var Tt = class {
      constructor(e) {
        this.client = e, this.platformHttp = new y.Http(e), this.checkConnectivity = this.platformHttp.checkConnectivity ? () => this.platformHttp.checkConnectivity() : void 0;
      }
      get logger() {
        var e, t;
        return (t = (e = this.client) == null ? void 0 : e.logger) != null ? t : o.defaultLogger;
      }
      get supportsAuthHeaders() {
        return this.platformHttp.supportsAuthHeaders;
      }
      get supportsLinkHeaders() {
        return this.platformHttp.supportsLinkHeaders;
      }
      _getHosts(e) {
        const t = e.connection, n = t && t.connectionManager.host;
        return n ? [n].concat(S.getFallbackHosts(e.options)) : S.getHosts(e.options);
      }
      /**
       * This method will not throw any errors; rather, it will communicate any error by populating the {@link RequestResult.error} property of the returned {@link RequestResult}.
       */
      async do(e, t, n, s, i) {
        try {
          const r = this.client;
          if (!r)
            return { error: new m("http.do called without client", 5e4, 500) };
          const a = typeof t == "function" ? t : function(g) {
            return r.baseUri(g) + t;
          }, l = r._currentFallback;
          if (l)
            if (l.validUntil > Date.now()) {
              const g = await this.doUri(e, a(l.host), n, s, i);
              return g.error && this.platformHttp.shouldFallback(g.error) ? (r._currentFallback = null, this.do(e, t, n, s, i)) : g;
            } else
              r._currentFallback = null;
          const d = this._getHosts(r);
          if (d.length === 1)
            return this.doUri(e, a(d[0]), n, s, i);
          let u = null;
          const f = async (g, w) => {
            const I = g.shift();
            u = u ?? /* @__PURE__ */ new Date();
            const T = await this.doUri(e, a(I), n, s, i);
            return T.error && this.platformHttp.shouldFallback(T.error) && g.length ? Date.now() - u.getTime() > r.options.timeouts.httpMaxRetryDuration ? {
              error: new m(
                `Timeout for trying fallback hosts retries. Total elapsed time exceeded the ${r.options.timeouts.httpMaxRetryDuration}ms limit`,
                50003,
                500
              )
            } : f(g, !0) : (w && (r._currentFallback = {
              host: I,
              validUntil: Date.now() + r.options.timeouts.fallbackRetryTimeout
            }), T);
          };
          return f(d);
        } catch (r) {
          return { error: new m(`Unexpected error in Http.do: ${L(r)}`, 500, 5e4) };
        }
      }
      /**
       * This method will not throw any errors; rather, it will communicate any error by populating the {@link RequestResult.error} property of the returned {@link RequestResult}.
       */
      async doUri(e, t, n, s, i) {
        try {
          xi(e, t, s, i, this.logger);
          const r = await this.platformHttp.doUri(e, t, n, s, i);
          return this.logger.shouldLog(o.LOG_MICRO) && Hi(r, e, t, i, this.logger), r;
        } catch (r) {
          return { error: new m(`Unexpected error in Http.doUri: ${L(r)}`, 500, 5e4) };
        }
      }
    }, Zn = class {
      constructor(e) {
        this.Platform = y, this.ErrorInfo = m, this.Logger = o, this.Defaults = S, this.Utils = ut;
        var t, n, s, i, r, a, l, d;
        this._additionalHTTPRequestImplementations = (t = e.plugins) != null ? t : null, this.logger = new o(), this.logger.setLog(e.logLevel, e.logHandler), o.logAction(
          this.logger,
          o.LOG_MICRO,
          "BaseClient()",
          "initialized with clientOptions " + y.Config.inspect(e)
        ), this._MsgPack = (s = (n = e.plugins) == null ? void 0 : n.MsgPack) != null ? s : null;
        const u = this.options = S.normaliseOptions(e, this._MsgPack, this.logger);
        if (u.key) {
          const f = u.key.match(/^([^:\s]+):([^:.\s]+)$/);
          if (!f) {
            const g = "invalid key parameter";
            throw o.logAction(this.logger, o.LOG_ERROR, "BaseClient()", g), new m(g, 40400, 404);
          }
          u.keyName = f[1], u.keySecret = f[2];
        }
        if ("clientId" in u)
          if (typeof u.clientId == "string" || u.clientId === null) {
            if (u.clientId === "*")
              throw new m(
                'Can’t use "*" as a clientId as that string is reserved. (To change the default token request behaviour to use a wildcard clientId, use {defaultTokenParams: {clientId: "*"}})',
                40012,
                400
              );
          } else throw new m("clientId must be either a string or null", 40012, 400);
        o.logAction(this.logger, o.LOG_MINOR, "BaseClient()", "started; version = " + S.version), this._currentFallback = null, this.serverTimeOffset = null, this.http = new Tt(this), this.auth = new ue(this, u), this._rest = (i = e.plugins) != null && i.Rest ? new e.plugins.Rest(this) : null, this._Crypto = (a = (r = e.plugins) == null ? void 0 : r.Crypto) != null ? a : null, this.__FilteredSubscriptions = (d = (l = e.plugins) == null ? void 0 : l.MessageInteractions) != null ? d : null;
      }
      get rest() {
        return this._rest || K("Rest"), this._rest;
      }
      get _FilteredSubscriptions() {
        return this.__FilteredSubscriptions || K("MessageInteractions"), this.__FilteredSubscriptions;
      }
      get channels() {
        return this.rest.channels;
      }
      get push() {
        return this.rest.push;
      }
      get device() {
        var e;
        return (!((e = this.options.plugins) != null && e.Push) || !this.push.LocalDevice) && K("Push"), this._device || (this._device = this.push.LocalDevice.load(this)), this._device;
      }
      baseUri(e) {
        return S.getHttpScheme(this.options) + e + ":" + S.getPort(this.options, !1);
      }
      async stats(e) {
        return this.rest.stats(e);
      }
      async time(e) {
        return this.rest.time(e);
      }
      async request(e, t, n, s, i, r) {
        return this.rest.request(e, t, n, s, i, r);
      }
      batchPublish(e) {
        return this.rest.batchPublish(e);
      }
      batchPresence(e) {
        return this.rest.batchPresence(e);
      }
      setLog(e) {
        this.logger.setLog(e.level, e.handler);
      }
    };
    Zn.Platform = y;
    var zn = Zn, Di = class Pe {
      toJSON() {
        var t, n, s;
        return {
          id: this.id,
          deviceSecret: this.deviceSecret,
          platform: this.platform,
          formFactor: this.formFactor,
          clientId: this.clientId,
          metadata: this.metadata,
          deviceIdentityToken: this.deviceIdentityToken,
          push: {
            recipient: (t = this.push) == null ? void 0 : t.recipient,
            state: (n = this.push) == null ? void 0 : n.state,
            error: (s = this.push) == null ? void 0 : s.error
          }
        };
      }
      toString() {
        var t, n, s, i;
        let r = "[DeviceDetails";
        return this.id && (r += "; id=" + this.id), this.platform && (r += "; platform=" + this.platform), this.formFactor && (r += "; formFactor=" + this.formFactor), this.clientId && (r += "; clientId=" + this.clientId), this.metadata && (r += "; metadata=" + this.metadata), this.deviceIdentityToken && (r += "; deviceIdentityToken=" + JSON.stringify(this.deviceIdentityToken)), (t = this.push) != null && t.recipient && (r += "; push.recipient=" + JSON.stringify(this.push.recipient)), (n = this.push) != null && n.state && (r += "; push.state=" + this.push.state), (s = this.push) != null && s.error && (r += "; push.error=" + JSON.stringify(this.push.error)), (i = this.push) != null && i.metadata && (r += "; push.metadata=" + this.push.metadata), r += "]", r;
      }
      static toRequestBody(t, n, s) {
        return oe(t, n, s);
      }
      static fromResponseBody(t, n, s) {
        return s && (t = ne(t, n, s)), Array.isArray(t) ? Pe.fromValuesArray(t) : Pe.fromValues(t);
      }
      static fromValues(t) {
        return t.error = t.error && m.fromValues(t.error), Object.assign(new Pe(), t);
      }
      static fromLocalDevice(t) {
        return Object.assign(new Pe(), t);
      }
      static fromValuesArray(t) {
        const n = t.length, s = new Array(n);
        for (let i = 0; i < n; i++)
          s[i] = Pe.fromValues(t[i]);
        return s;
      }
    }, ve = Di;
    async function jn(e, t, n, s) {
      if (e.http.supportsAuthHeaders) {
        const i = await e.auth.getAuthHeaders();
        return s(k(i, t), n);
      } else {
        const i = await e.auth.getAuthParams();
        return s(t, k(i, n));
      }
    }
    function Wi(e, t, n) {
      if (e.err && !e.body)
        return { err: e.err };
      if (e.statusCode === st.NoContent)
        return we(F({}, e), { body: [], unpacked: !0 });
      let s = e.body;
      if (!e.unpacked)
        try {
          s = ne(s, t, n);
        } catch (l) {
          return ft(l) ? { err: l } : { err: new z(L(l), null) };
        }
      if (!s)
        return { err: new z("unenvelope(): Response body is missing", null) };
      const { statusCode: i, response: r, headers: a } = s;
      if (i === void 0)
        return we(F({}, e), { body: s, unpacked: !0 });
      if (i < 200 || i >= 300) {
        let l = r && r.error || e.err;
        return l || (l = new Error("Error in unenveloping " + s), l.statusCode = i), { err: l, body: r, headers: a, unpacked: !0, statusCode: i };
      }
      return { err: e.err, body: r, headers: a, unpacked: !0, statusCode: i };
    }
    function Zi(e, t, n, s, i) {
      e.err ? o.logAction(
        i,
        o.LOG_MICRO,
        "Resource." + t + "()",
        "Received Error; " + Ce(n, s) + "; Error: " + L(e.err)
      ) : o.logAction(
        i,
        o.LOG_MICRO,
        "Resource." + t + "()",
        "Received; " + Ce(n, s) + "; Headers: " + wt(e.headers) + "; StatusCode: " + e.statusCode + "; Body: " + (y.BufferUtils.isBuffer(e.body) ? " (Base64): " + y.BufferUtils.base64Encode(e.body) : ": " + y.Config.inspect(e.body))
      );
    }
    var zi = class _e {
      static async get(t, n, s, i, r, a) {
        return _e.do(H.Get, t, n, null, s, i, r, a ?? !1);
      }
      static async delete(t, n, s, i, r, a) {
        return _e.do(H.Delete, t, n, null, s, i, r, a);
      }
      static async post(t, n, s, i, r, a, l) {
        return _e.do(H.Post, t, n, s, i, r, a, l);
      }
      static async patch(t, n, s, i, r, a, l) {
        return _e.do(H.Patch, t, n, s, i, r, a, l);
      }
      static async put(t, n, s, i, r, a, l) {
        return _e.do(H.Put, t, n, s, i, r, a, l);
      }
      static async do(t, n, s, i, r, a, l, d) {
        l && ((a = a || {}).envelope = l);
        const u = n.logger;
        async function f(w, I) {
          var T;
          if (u.shouldLog(o.LOG_MICRO)) {
            let M = i;
            if (((T = w["content-type"]) == null ? void 0 : T.indexOf("msgpack")) > 0)
              try {
                n._MsgPack || K("MsgPack"), M = n._MsgPack.decode(i);
              } catch (B) {
                o.logAction(
                  u,
                  o.LOG_MICRO,
                  "Resource." + t + "()",
                  "Sending MsgPack Decoding Error: " + L(B)
                );
              }
            o.logAction(
              u,
              o.LOG_MICRO,
              "Resource." + t + "()",
              "Sending; " + Ce(s, I) + "; Body: " + M
            );
          }
          const v = await n.http.do(t, s, w, i, I);
          return v.error && ue.isTokenErr(v.error) ? (await n.auth.authorize(null, null), jn(n, w, I, f)) : {
            err: v.error,
            body: v.body,
            headers: v.headers,
            unpacked: v.unpacked,
            statusCode: v.statusCode
          };
        }
        let g = await jn(n, r, a, f);
        if (l && (g = Wi(g, n._MsgPack, l)), u.shouldLog(o.LOG_MICRO) && Zi(g, t, s, a, u), d) {
          if (g.err)
            throw g.err;
          {
            const w = F({}, g);
            return delete w.err, w;
          }
        }
        return g;
      }
    }, W = zi;
    function ji(e) {
      const t = e.match(/^\.\/(\w+)\?(.*)$/);
      return t && t[2] && Ke(t[2]);
    }
    function Vi(e) {
      typeof e == "string" && (e = e.split(","));
      const t = {};
      for (let n = 0; n < e.length; n++) {
        const s = e[n].match(/^\s*<(.+)>;\s*rel="(\w+)"$/);
        if (s) {
          const i = ji(s[1]);
          i && (t[s[2]] = i);
        }
      }
      return t;
    }
    function Ji(e, t, n) {
      return !(n && (t || typeof e.code == "number"));
    }
    var Fi = class {
      constructor(e, t, n, s, i, r) {
        this.client = e, this.path = t, this.headers = n, this.envelope = s ?? null, this.bodyHandler = i, this.useHttpPaginatedResponse = r || !1;
      }
      get logger() {
        return this.client.logger;
      }
      async get(e) {
        const t = await W.get(this.client, this.path, this.headers, e, this.envelope, !1);
        return this.handlePage(t);
      }
      async delete(e) {
        const t = await W.delete(this.client, this.path, this.headers, e, this.envelope, !1);
        return this.handlePage(t);
      }
      async post(e, t) {
        const n = await W.post(this.client, this.path, t, this.headers, e, this.envelope, !1);
        return this.handlePage(n);
      }
      async put(e, t) {
        const n = await W.put(this.client, this.path, t, this.headers, e, this.envelope, !1);
        return this.handlePage(n);
      }
      async patch(e, t) {
        const n = await W.patch(this.client, this.path, t, this.headers, e, this.envelope, !1);
        return this.handlePage(n);
      }
      async handlePage(e) {
        if (e.err && Ji(e.err, e.body, this.useHttpPaginatedResponse))
          throw o.logAction(
            this.logger,
            o.LOG_ERROR,
            "PaginatedResource.handlePage()",
            "Unexpected error getting resource: err = " + L(e.err)
          ), e.err;
        let t, n, s;
        try {
          t = e.statusCode == st.NoContent ? [] : await this.bodyHandler(e.body, e.headers || {}, e.unpacked);
        } catch (i) {
          throw e.err || i;
        }
        return e.headers && (n = e.headers.Link || e.headers.link) && (s = Vi(n)), this.useHttpPaginatedResponse ? new Xi(
          this,
          t,
          e.headers || {},
          e.statusCode,
          s,
          e.err
        ) : new Vn(this, t, s);
      }
    }, Vn = class {
      constructor(e, t, n) {
        this.resource = e, this.items = t;
        const s = this;
        n && ("first" in n && (this.first = async function() {
          return s.get(n.first);
        }), "current" in n && (this.current = async function() {
          return s.get(n.current);
        }), this.next = async function() {
          return "next" in n ? s.get(n.next) : null;
        }, this.hasNext = function() {
          return "next" in n;
        }, this.isLast = () => {
          var i;
          return !((i = this.hasNext) != null && i.call(this));
        });
      }
      /* We assume that only the initial request can be a POST, and that accessing
       * the rest of a multipage set of results can always be done with GET */
      async get(e) {
        const t = this.resource, n = await W.get(t.client, t.path, t.headers, e, t.envelope, !1);
        return t.handlePage(n);
      }
    }, Xi = class extends Vn {
      constructor(e, t, n, s, i, r) {
        super(e, t, i), this.statusCode = s, this.success = s < 300 && s >= 200, this.headers = n, this.errorCode = r && r.code, this.errorMessage = r && r.message;
      }
      toJSON() {
        return {
          items: this.items,
          statusCode: this.statusCode,
          success: this.success,
          headers: this.headers,
          errorCode: this.errorCode,
          errorMessage: this.errorMessage
        };
      }
    }, ye = Fi, Jn = class Ye {
      /**
       * Overload toJSON() to intercept JSON.stringify()
       * @return {*}
       */
      toJSON() {
        return {
          channel: this.channel,
          deviceId: this.deviceId,
          clientId: this.clientId
        };
      }
      toString() {
        let t = "[PushChannelSubscription";
        return this.channel && (t += "; channel=" + this.channel), this.deviceId && (t += "; deviceId=" + this.deviceId), this.clientId && (t += "; clientId=" + this.clientId), t += "]", t;
      }
      static fromResponseBody(t, n, s) {
        return s && (t = ne(t, n, s)), Array.isArray(t) ? Ye.fromValuesArray(t) : Ye.fromValues(t);
      }
      static fromValues(t) {
        return Object.assign(new Ye(), t);
      }
      static fromValuesArray(t) {
        const n = t.length, s = new Array(n);
        for (let i = 0; i < n; i++)
          s[i] = Ye.fromValues(t[i]);
        return s;
      }
    };
    Jn.toRequestBody = oe;
    var Yi = Jn, Ot = Yi, qi = class {
      constructor(e) {
        var t;
        this.client = e, this.admin = new Qi(e), y.Config.push && ((t = e.options.plugins) != null && t.Push) && (this.stateMachine = new e.options.plugins.Push.ActivationStateMachine(e), this.LocalDevice = e.options.plugins.Push.localDeviceFactory(ve));
      }
      async activate(e, t) {
        await new Promise((n, s) => {
          var i;
          if (!((i = this.client.options.plugins) != null && i.Push)) {
            s(et("Push"));
            return;
          }
          if (!this.stateMachine) {
            s(new m("This platform is not supported as a target of push notifications", 4e4, 400));
            return;
          }
          if (this.stateMachine.activatedCallback) {
            s(new m("Activation already in progress", 4e4, 400));
            return;
          }
          this.stateMachine.activatedCallback = (r) => {
            if (r) {
              s(r);
              return;
            }
            n();
          }, this.stateMachine.updateFailedCallback = t, this.stateMachine.handleEvent(
            new this.client.options.plugins.Push.CalledActivate(this.stateMachine, e)
          );
        });
      }
      async deactivate(e) {
        await new Promise((t, n) => {
          var s;
          if (!((s = this.client.options.plugins) != null && s.Push)) {
            n(et("Push"));
            return;
          }
          if (!this.stateMachine) {
            n(new m("This platform is not supported as a target of push notifications", 4e4, 400));
            return;
          }
          if (this.stateMachine.deactivatedCallback) {
            n(new m("Deactivation already in progress", 4e4, 400));
            return;
          }
          this.stateMachine.deactivatedCallback = (i) => {
            if (i) {
              n(i);
              return;
            }
            t();
          }, this.stateMachine.handleEvent(
            new this.client.options.plugins.Push.CalledDeactivate(this.stateMachine, e)
          );
        });
      }
    }, Qi = class {
      constructor(e) {
        this.client = e, this.deviceRegistrations = new Ki(e), this.channelSubscriptions = new $i(e);
      }
      async publish(e, t) {
        const n = this.client, s = n.options.useBinaryProtocol ? "msgpack" : "json", i = S.defaultPostHeaders(n.options, { format: s }), r = {}, a = k({ recipient: e }, t);
        k(i, n.options.headers), n.options.pushFullWait && k(r, { fullWait: "true" });
        const l = oe(a, n._MsgPack, s);
        await W.post(n, "/push/publish", l, i, r, null, !0);
      }
    }, Ki = class {
      constructor(e) {
        this.client = e;
      }
      async save(e) {
        const t = this.client, n = ve.fromValues(e), s = t.options.useBinaryProtocol ? "msgpack" : "json", i = S.defaultPostHeaders(t.options, { format: s }), r = {};
        k(i, t.options.headers), t.options.pushFullWait && k(r, { fullWait: "true" });
        const a = oe(n, t._MsgPack, s), l = await W.put(
          t,
          "/push/deviceRegistrations/" + encodeURIComponent(e.id),
          a,
          i,
          r,
          null,
          !0
        );
        return ve.fromResponseBody(
          l.body,
          t._MsgPack,
          l.unpacked ? void 0 : s
        );
      }
      async get(e) {
        const t = this.client, n = t.options.useBinaryProtocol ? "msgpack" : "json", s = S.defaultGetHeaders(t.options, { format: n }), i = e.id || e;
        if (typeof i != "string" || !i.length)
          throw new m(
            "First argument to DeviceRegistrations#get must be a deviceId string or DeviceDetails",
            4e4,
            400
          );
        k(s, t.options.headers);
        const r = await W.get(
          t,
          "/push/deviceRegistrations/" + encodeURIComponent(i),
          s,
          {},
          null,
          !0
        );
        return ve.fromResponseBody(
          r.body,
          t._MsgPack,
          r.unpacked ? void 0 : n
        );
      }
      async list(e) {
        const t = this.client, n = t.options.useBinaryProtocol ? "msgpack" : "json", s = this.client.http.supportsLinkHeaders ? void 0 : n, i = S.defaultGetHeaders(t.options, { format: n });
        return k(i, t.options.headers), new ye(t, "/push/deviceRegistrations", i, s, async function(r, a, l) {
          return ve.fromResponseBody(
            r,
            t._MsgPack,
            l ? void 0 : n
          );
        }).get(e);
      }
      async remove(e) {
        const t = this.client, n = t.options.useBinaryProtocol ? "msgpack" : "json", s = S.defaultGetHeaders(t.options, { format: n }), i = {}, r = e.id || e;
        if (typeof r != "string" || !r.length)
          throw new m(
            "First argument to DeviceRegistrations#remove must be a deviceId string or DeviceDetails",
            4e4,
            400
          );
        k(s, t.options.headers), t.options.pushFullWait && k(i, { fullWait: "true" }), await W.delete(
          t,
          "/push/deviceRegistrations/" + encodeURIComponent(r),
          s,
          i,
          null,
          !0
        );
      }
      async removeWhere(e) {
        const t = this.client, n = t.options.useBinaryProtocol ? "msgpack" : "json", s = S.defaultGetHeaders(t.options, { format: n });
        k(s, t.options.headers), t.options.pushFullWait && k(e, { fullWait: "true" }), await W.delete(t, "/push/deviceRegistrations", s, e, null, !0);
      }
    }, $i = class Vs {
      constructor(t) {
        this.remove = Vs.prototype.removeWhere, this.client = t;
      }
      async save(t) {
        const n = this.client, s = Ot.fromValues(t), i = n.options.useBinaryProtocol ? "msgpack" : "json", r = S.defaultPostHeaders(n.options, { format: i }), a = {};
        k(r, n.options.headers), n.options.pushFullWait && k(a, { fullWait: "true" });
        const l = oe(s, n._MsgPack, i), d = await W.post(
          n,
          "/push/channelSubscriptions",
          l,
          r,
          a,
          null,
          !0
        );
        return Ot.fromResponseBody(
          d.body,
          n._MsgPack,
          d.unpacked ? void 0 : i
        );
      }
      async list(t) {
        const n = this.client, s = n.options.useBinaryProtocol ? "msgpack" : "json", i = this.client.http.supportsLinkHeaders ? void 0 : s, r = S.defaultGetHeaders(n.options, { format: s });
        return k(r, n.options.headers), new ye(n, "/push/channelSubscriptions", r, i, async function(a, l, d) {
          return Ot.fromResponseBody(
            a,
            n._MsgPack,
            d ? void 0 : s
          );
        }).get(t);
      }
      async removeWhere(t) {
        const n = this.client, s = n.options.useBinaryProtocol ? "msgpack" : "json", i = S.defaultGetHeaders(n.options, { format: s });
        k(i, n.options.headers), n.options.pushFullWait && k(t, { fullWait: "true" }), await W.delete(n, "/push/channelSubscriptions", i, t, null, !0);
      }
      async listChannels(t) {
        const n = this.client, s = n.options.useBinaryProtocol ? "msgpack" : "json", i = this.client.http.supportsLinkHeaders ? void 0 : s, r = S.defaultGetHeaders(n.options, { format: s });
        return k(r, n.options.headers), n.options.pushFullWait && k(t, { fullWait: "true" }), new ye(n, "/push/channels", r, i, async function(a, l, d) {
          const u = !d && s ? ne(a, n._MsgPack, s) : a;
          for (let f = 0; f < u.length; f++)
            u[f] = String(u[f]);
          return u;
        }).get(t);
      }
    }, er = qi;
    function tr(e) {
      return !e || !e.channelOptions ? {
        channelOptions: e,
        plugins: {},
        baseEncodedPreviousPayload: void 0
      } : e;
    }
    function nr(e, t, n) {
      if (n && n.cipher) {
        e || K("Crypto");
        const s = e.getCipher(n.cipher, t);
        return {
          cipher: s.cipherParams,
          channelCipher: s.cipher
        };
      }
      return n ?? {};
    }
    function sr(e) {
      let t = 0;
      return e.name && (t += e.name.length), e.clientId && (t += e.clientId.length), e.extras && (t += JSON.stringify(e.extras).length), e.data && (t += Rn(e.data)), t;
    }
    async function Fn(e, t, n, s) {
      const i = be(n), r = nr(t, e, s ?? null);
      try {
        await Le(i, r);
      } catch (a) {
        o.logAction(e, o.LOG_ERROR, "Message.fromEncoded()", a.toString());
      }
      return i;
    }
    async function ir(e, t, n, s) {
      return Promise.all(
        n.map(function(i) {
          return Fn(e, t, i, s);
        })
      );
    }
    async function rr(e, t) {
      let n = e.data, s = e.encoding, i = t.channelCipher;
      s = s ? s + "/" : "", y.BufferUtils.isBuffer(n) || (n = y.BufferUtils.utf8Encode(String(n)), s = s + "utf-8/");
      const r = await i.encrypt(n);
      return e.data = r, e.encoding = s + "cipher+" + i.algorithm, e;
    }
    async function Ct(e, t) {
      const n = e.data;
      if (!(typeof n == "string" || y.BufferUtils.isBuffer(n) || n === null || n === void 0))
        if (Oe(n) || Array.isArray(n))
          e.data = JSON.stringify(n), e.encoding = e.encoding ? e.encoding + "/json" : "json";
        else
          throw new m("Data type is unsupported", 40013, 400);
      return t != null && t.cipher ? rr(e, t) : e;
    }
    async function Xn(e, t) {
      return Promise.all(e.map((n) => Ct(n, t)));
    }
    var or = oe;
    async function Le(e, t) {
      const n = tr(t);
      let s = e.data;
      const i = e.encoding;
      if (i) {
        const r = i.split("/");
        let a, l = r.length, d = e.data, u = "";
        try {
          for (; (a = l) > 0; ) {
            const f = r[--l].match(/([-\w]+)(\+([\w-]+))?/);
            if (!f)
              break;
            switch (u = f[1], u) {
              case "base64":
                d = y.BufferUtils.base64Decode(String(d)), a == r.length && (s = d);
                continue;
              case "utf-8":
                d = y.BufferUtils.utf8Decode(d);
                continue;
              case "json":
                d = JSON.parse(d);
                continue;
              case "cipher":
                if (n.channelOptions != null && n.channelOptions.cipher && n.channelOptions.channelCipher) {
                  const g = f[3], w = n.channelOptions.channelCipher;
                  if (g != w.algorithm)
                    throw new Error("Unable to decrypt message with given cipher; incompatible cipher params");
                  d = await w.decrypt(d);
                  continue;
                } else
                  throw new Error("Unable to decrypt message; not an encrypted channel");
              case "vcdiff":
                if (!n.plugins || !n.plugins.vcdiff)
                  throw new m("Missing Vcdiff decoder (https://github.com/ably-forks/vcdiff-decoder)", 40019, 400);
                if (typeof Uint8Array > "u")
                  throw new m(
                    "Delta decoding not supported on this browser (need ArrayBuffer & Uint8Array)",
                    40020,
                    400
                  );
                try {
                  let g = n.baseEncodedPreviousPayload;
                  typeof g == "string" && (g = y.BufferUtils.utf8Encode(g));
                  const w = y.BufferUtils.toBuffer(g);
                  d = y.BufferUtils.toBuffer(d), d = y.BufferUtils.arrayBufferViewToBuffer(n.plugins.vcdiff.decode(d, w)), s = d;
                } catch (g) {
                  throw new m("Vcdiff delta decode failed with " + g, 40018, 400);
                }
                continue;
              default:
                throw new Error("Unknown encoding");
            }
          }
        } catch (f) {
          const g = f;
          throw new m(
            "Error processing the " + u + " encoding, decoder returned ‘" + g.message + "’",
            g.code || 40013,
            400
          );
        } finally {
          e.encoding = a <= 0 ? null : r.slice(0, a).join("/"), e.data = d;
        }
      }
      n.baseEncodedPreviousPayload = s;
    }
    async function ar(e, t, n, s, i) {
      i && (e = ne(e, s, i));
      for (let r = 0; r < e.length; r++) {
        const a = e[r] = be(e[r]);
        try {
          await Le(a, t);
        } catch (l) {
          o.logAction(n, o.LOG_ERROR, "Message.fromResponseBody()", l.toString());
        }
      }
      return e;
    }
    function be(e) {
      return Object.assign(new Yn(), e);
    }
    function vt(e) {
      const t = e.length, n = new Array(t);
      for (let s = 0; s < t; s++)
        n[s] = be(e[s]);
      return n;
    }
    function St(e) {
      let t, n = 0;
      for (let s = 0; s < e.length; s++)
        t = e[s], n += t.size || (t.size = sr(t));
      return n;
    }
    var Yn = class {
      /**
       * Overload toJSON() to intercept JSON.stringify()
       * @return {*}
       */
      toJSON() {
        let e = this.encoding, t = this.data;
        return t && y.BufferUtils.isBuffer(t) && (arguments.length > 0 ? (e = e ? e + "/base64" : "base64", t = y.BufferUtils.base64Encode(t)) : t = y.BufferUtils.toBuffer(t)), {
          name: this.name,
          id: this.id,
          clientId: this.clientId,
          connectionId: this.connectionId,
          connectionKey: this.connectionKey,
          extras: this.extras,
          encoding: e,
          data: t
        };
      }
      toString() {
        let e = "[Message";
        return this.name && (e += "; name=" + this.name), this.id && (e += "; id=" + this.id), this.timestamp && (e += "; timestamp=" + this.timestamp), this.clientId && (e += "; clientId=" + this.clientId), this.connectionId && (e += "; connectionId=" + this.connectionId), this.encoding && (e += "; encoding=" + this.encoding), this.extras && (e += "; extras =" + JSON.stringify(this.extras)), this.data && (typeof this.data == "string" ? e += "; data=" + this.data : y.BufferUtils.isBuffer(this.data) ? e += "; data (buffer)=" + y.BufferUtils.base64Encode(this.data) : e += "; data (json)=" + JSON.stringify(this.data)), this.extras && (e += "; extras=" + JSON.stringify(this.extras)), e += "]", e;
      }
    }, qn = Yn, Qn = ["absent", "present", "enter", "leave", "update"];
    function cr(e) {
      return Qn.indexOf(e);
    }
    async function Kn(e, t, n) {
      const s = se(t, !0);
      try {
        await Mt(s, n ?? {});
      } catch (i) {
        o.logAction(e, o.LOG_ERROR, "PresenceMessage.fromEncoded()", i.toString());
      }
      return s;
    }
    async function lr(e, t, n) {
      return Promise.all(
        t.map(function(s) {
          return Kn(e, s, n);
        })
      );
    }
    function se(e, t) {
      return t && (e.action = Qn[e.action]), Object.assign(new At(), e);
    }
    var Mt = Le;
    async function $n(e, t, n, s, i) {
      const r = [];
      i && (e = ne(e, s, i));
      for (let a = 0; a < e.length; a++) {
        const l = r[a] = se(e[a], !0);
        try {
          await Mt(l, t);
        } catch (d) {
          o.logAction(n, o.LOG_ERROR, "PresenceMessage.fromResponseBody()", d.toString());
        }
      }
      return r;
    }
    function es(e) {
      const t = e.length, n = new Array(t);
      for (let s = 0; s < t; s++)
        n[s] = se(e[s]);
      return n;
    }
    function ts(e) {
      return e instanceof At ? e : se({
        data: e
      });
    }
    var At = class {
      /* Returns whether this presenceMessage is synthesized, i.e. was not actually
       * sent by the connection (usually means a leave event sent 15s after a
       * disconnection). This is useful because synthesized messages cannot be
       * compared for newness by id lexicographically - RTP2b1
       */
      isSynthesized() {
        return !this.id || !this.connectionId ? !0 : this.id.substring(this.connectionId.length, 0) !== this.connectionId;
      }
      /* RTP2b2 */
      parseId() {
        if (!this.id)
          throw new Error("parseId(): Presence message does not contain an id");
        const e = this.id.split(":");
        return {
          connectionId: e[0],
          msgSerial: parseInt(e[1], 10),
          index: parseInt(e[2], 10)
        };
      }
      /**
       * Overload toJSON() to intercept JSON.stringify()
       * @return {*}
       */
      toJSON() {
        let e = this.data, t = this.encoding;
        return e && y.BufferUtils.isBuffer(e) && (arguments.length > 0 ? (t = t ? t + "/base64" : "base64", e = y.BufferUtils.base64Encode(e)) : e = y.BufferUtils.toBuffer(e)), {
          id: this.id,
          clientId: this.clientId,
          /* Convert presence action back to an int for sending to Ably */
          action: cr(this.action),
          data: e,
          encoding: t,
          extras: this.extras
        };
      }
      toString() {
        let e = "[PresenceMessage";
        return e += "; action=" + this.action, this.id && (e += "; id=" + this.id), this.timestamp && (e += "; timestamp=" + this.timestamp), this.clientId && (e += "; clientId=" + this.clientId), this.connectionId && (e += "; connectionId=" + this.connectionId), this.encoding && (e += "; encoding=" + this.encoding), this.data && (typeof this.data == "string" ? e += "; data=" + this.data : y.BufferUtils.isBuffer(this.data) ? e += "; data (buffer)=" + y.BufferUtils.base64Encode(this.data) : e += "; data (json)=" + JSON.stringify(this.data)), this.extras && (e += "; extras=" + JSON.stringify(this.extras)), e += "]", e;
      }
    }, hr = At, ur = class {
      constructor(e) {
        this.channel = e;
      }
      get logger() {
        return this.channel.logger;
      }
      async get(e) {
        o.logAction(this.logger, o.LOG_MICRO, "RestPresence.get()", "channel = " + this.channel.name);
        const t = this.channel.client, n = t.options.useBinaryProtocol ? "msgpack" : "json", s = this.channel.client.http.supportsLinkHeaders ? void 0 : n, i = S.defaultGetHeaders(t.options, { format: n });
        k(i, t.options.headers);
        const r = this.channel.channelOptions;
        return new ye(
          t,
          this.channel.client.rest.presenceMixin.basePath(this),
          i,
          s,
          async (a, l, d) => await $n(
            a,
            r,
            this.logger,
            t._MsgPack,
            d ? void 0 : n
          )
        ).get(e);
      }
      async history(e) {
        return o.logAction(this.logger, o.LOG_MICRO, "RestPresence.history()", "channel = " + this.channel.name), this.channel.client.rest.presenceMixin.history(this, e);
      }
    }, dr = ur, fr = 9;
    function gr(e) {
      return e.every(function(t) {
        return !t.id;
      });
    }
    var pr = class {
      constructor(e, t, n) {
        var s, i;
        o.logAction(e.logger, o.LOG_MINOR, "RestChannel()", "started; name = " + t), this.name = t, this.client = e, this.presence = new dr(this), this.channelOptions = tt((s = e._Crypto) != null ? s : null, this.logger, n), (i = e.options.plugins) != null && i.Push && (this._push = new e.options.plugins.Push.PushChannel(this));
      }
      get push() {
        return this._push || K("Push"), this._push;
      }
      get logger() {
        return this.client.logger;
      }
      setOptions(e) {
        var t;
        this.channelOptions = tt((t = this.client._Crypto) != null ? t : null, this.logger, e);
      }
      async history(e) {
        return o.logAction(this.logger, o.LOG_MICRO, "RestChannel.history()", "channel = " + this.name), this.client.rest.channelMixin.history(this, e);
      }
      async publish(...e) {
        const t = e[0], n = e[1];
        let s, i;
        if (typeof t == "string" || t === null)
          s = [be({ name: t, data: n })], i = e[2];
        else if (Oe(t))
          s = [be(t)], i = e[1];
        else if (Array.isArray(t))
          s = vt(t), i = e[1];
        else
          throw new m(
            "The single-argument form of publish() expects a message object or an array of message objects",
            40013,
            400
          );
        i || (i = {});
        const r = this.client, a = r.options, l = a.useBinaryProtocol ? "msgpack" : "json", d = r.options.idempotentRestPublishing, u = S.defaultPostHeaders(r.options, { format: l });
        if (k(u, a.headers), d && gr(s)) {
          const w = await wn(fr);
          s.forEach(function(I, T) {
            I.id = w + ":" + T.toString();
          });
        }
        await Xn(s, this.channelOptions);
        const f = St(s), g = a.maxMessageSize;
        if (f > g)
          throw new m(
            "Maximum size of messages that can be published at once exceeded ( was " + f + " bytes; limit is " + g + " bytes)",
            40009,
            400
          );
        await this._publish(or(s, r._MsgPack, l), u, i);
      }
      async _publish(e, t, n) {
        await W.post(
          this.client,
          this.client.rest.channelMixin.basePath(this) + "/messages",
          e,
          t,
          n,
          null,
          !0
        );
      }
      async status() {
        return this.client.rest.channelMixin.status(this);
      }
    }, mr = pr, yr = class Js {
      constructor(t) {
        this.entries = t && t.entries || void 0, this.schema = t && t.schema || void 0, this.appId = t && t.appId || void 0, this.inProgress = t && t.inProgress || void 0, this.unit = t && t.unit || void 0, this.intervalId = t && t.intervalId || void 0;
      }
      static fromValues(t) {
        return new Js(t);
      }
    }, br = yr, ns = class {
      static basePath(e) {
        return "/channels/" + encodeURIComponent(e.name);
      }
      static history(e, t) {
        const n = e.client, s = n.options.useBinaryProtocol ? "msgpack" : "json", i = e.client.http.supportsLinkHeaders ? void 0 : s, r = S.defaultGetHeaders(n.options, { format: s });
        k(r, n.options.headers);
        const a = e.channelOptions;
        return new ye(n, this.basePath(e) + "/messages", r, i, async function(l, d, u) {
          return await ar(
            l,
            a,
            e.logger,
            n._MsgPack,
            u ? void 0 : s
          );
        }).get(t);
      }
      static async status(e) {
        const t = e.client.options.useBinaryProtocol ? "msgpack" : "json", n = S.defaultPostHeaders(e.client.options, { format: t });
        return (await W.get(
          e.client,
          this.basePath(e),
          n,
          {},
          t,
          !0
        )).body;
      }
    }, Ir = class {
      static basePath(e) {
        return ns.basePath(e.channel) + "/presence";
      }
      static async history(e, t) {
        const n = e.channel.client, s = n.options.useBinaryProtocol ? "msgpack" : "json", i = e.channel.client.http.supportsLinkHeaders ? void 0 : s, r = S.defaultGetHeaders(n.options, { format: s });
        k(r, n.options.headers);
        const a = e.channel.channelOptions;
        return new ye(n, this.basePath(e) + "/history", r, i, async function(l, d, u) {
          return await $n(
            l,
            a,
            e.logger,
            n._MsgPack,
            u ? void 0 : s
          );
        }).get(t);
      }
    }, ss = class {
      constructor(e) {
        this.channelMixin = ns, this.presenceMixin = Ir, this.Resource = W, this.DeviceDetails = ve, this.client = e, this.channels = new Rr(this.client), this.push = new er(this.client);
      }
      async stats(e) {
        const t = S.defaultGetHeaders(this.client.options), n = this.client.options.useBinaryProtocol ? "msgpack" : "json", s = this.client.http.supportsLinkHeaders ? void 0 : n;
        return k(t, this.client.options.headers), new ye(this.client, "/stats", t, s, function(i, r, a) {
          const l = a ? i : JSON.parse(i);
          for (let d = 0; d < l.length; d++)
            l[d] = br.fromValues(l[d]);
          return l;
        }).get(e);
      }
      async time(e) {
        const t = S.defaultGetHeaders(this.client.options);
        this.client.options.headers && k(t, this.client.options.headers);
        const n = (l) => this.client.baseUri(l) + "/time";
        let { error: s, body: i, unpacked: r } = await this.client.http.do(
          H.Get,
          n,
          t,
          null,
          e
        );
        if (s)
          throw s;
        r || (i = JSON.parse(i));
        const a = i[0];
        if (!a)
          throw new m("Internal error (unexpected result type from GET /time)", 5e4, 500);
        return this.client.serverTimeOffset = a - Date.now(), a;
      }
      async request(e, t, n, s, i, r) {
        var a;
        const [l, d, u] = this.client.options.useBinaryProtocol ? (this.client._MsgPack || K("MsgPack"), [
          this.client._MsgPack.encode,
          this.client._MsgPack.decode,
          "msgpack"
          /* msgpack */
        ]) : [
          JSON.stringify,
          JSON.parse,
          "json"
          /* json */
        ], f = this.client.http.supportsLinkHeaders ? void 0 : u;
        s = s || {};
        const g = e.toLowerCase(), w = g == "get" ? S.defaultGetHeaders(this.client.options, { format: u, protocolVersion: n }) : S.defaultPostHeaders(this.client.options, { format: u, protocolVersion: n });
        typeof i != "string" && (i = (a = l(i)) != null ? a : null), k(w, this.client.options.headers), r && k(w, r);
        const I = new ye(
          this.client,
          t,
          w,
          f,
          async function(T, v, M) {
            return ln(M ? T : d(T));
          },
          /* useHttpPaginatedResponse: */
          !0
        );
        if (!y.Http.methods.includes(g))
          throw new m("Unsupported method " + g, 40500, 405);
        return y.Http.methodsWithBody.includes(g) ? I[g](s, i) : I[g](s);
      }
      async batchPublish(e) {
        let t, n;
        Array.isArray(e) ? (t = e, n = !1) : (t = [e], n = !0);
        const s = this.client.options.useBinaryProtocol ? "msgpack" : "json", i = S.defaultPostHeaders(this.client.options, { format: s });
        this.client.options.headers && k(i, this.client.options.headers);
        const r = oe(t, this.client._MsgPack, s), a = await W.post(this.client, "/messages", r, i, {}, null, !0), l = a.unpacked ? a.body : ne(a.body, this.client._MsgPack, s);
        return n ? l[0] : l;
      }
      async batchPresence(e) {
        const t = this.client.options.useBinaryProtocol ? "msgpack" : "json", n = S.defaultPostHeaders(this.client.options, { format: t });
        this.client.options.headers && k(n, this.client.options.headers);
        const s = e.join(","), i = await W.get(this.client, "/presence", n, { channels: s }, null, !0);
        return i.unpacked ? i.body : ne(i.body, this.client._MsgPack, t);
      }
      async revokeTokens(e, t) {
        if (Wn(this.client.options))
          throw new m("Cannot revoke tokens when using token auth", 40162, 401);
        const n = this.client.options.keyName;
        let s = t ?? {};
        const i = F({
          targets: e.map((u) => `${u.type}:${u.value}`)
        }, s), r = this.client.options.useBinaryProtocol ? "msgpack" : "json", a = S.defaultPostHeaders(this.client.options, { format: r });
        this.client.options.headers && k(a, this.client.options.headers);
        const l = oe(i, this.client._MsgPack, r), d = await W.post(
          this.client,
          `/keys/${n}/revokeTokens`,
          l,
          a,
          {},
          null,
          !0
        );
        return d.unpacked ? d.body : ne(d.body, this.client._MsgPack, r);
      }
    }, Rr = class {
      constructor(e) {
        this.client = e, this.all = /* @__PURE__ */ Object.create(null);
      }
      get(e, t) {
        e = String(e);
        let n = this.all[e];
        return n ? t && n.setOptions(t) : this.all[e] = n = new mr(this.client, e, t), n;
      }
      /* Included to support certain niche use-cases; most users should ignore this.
       * Please do not use this unless you know what you're doing */
      release(e) {
        delete this.all[String(e)];
      }
    }, wr = class extends zn {
      /*
       * The public typings declare that this only accepts an object, but since we want to emit a good error message in the case where a non-TypeScript user does one of these things:
       *
       * 1. passes a string (which is quite likely if they’re e.g. migrating from the default variant to the modular variant)
       * 2. passes no argument at all
       *
       * tell the compiler that these cases are possible so that it forces us to handle them.
       */
      constructor(e) {
        super(S.objectifyOptions(e, !1, "BaseRest", o.defaultLogger, { Rest: ss }));
      }
    }, is = { Rest: ss }, rs = class extends qn {
      static async fromEncoded(e, t) {
        return Fn(o.defaultLogger, y.Crypto, e, t);
      }
      static async fromEncodedArray(e, t) {
        return ir(o.defaultLogger, y.Crypto, e, t);
      }
      // Used by tests
      static fromValues(e) {
        return Object.assign(new qn(), e);
      }
      // Used by tests
      static async encode(e, t) {
        return Ct(e, t);
      }
      // Used by tests
      static async decode(e, t) {
        return Le(e, t);
      }
    }, os = class extends hr {
      static async fromEncoded(e, t) {
        return Kn(o.defaultLogger, e, t);
      }
      static async fromEncodedArray(e, t) {
        return lr(o.defaultLogger, e, t);
      }
      static fromValues(e, t) {
        return se(e, t);
      }
    }, Se = class at extends wr {
      // The public typings declare that this requires an argument to be passed, but since we want to emit a good error message in the case where a non-TypeScript user does not pass an argument, tell the compiler that this is possible so that it forces us to handle it.
      constructor(t) {
        var n, s;
        if (!at._MsgPack)
          throw new Error("Expected DefaultRest._MsgPack to have been set");
        super(
          S.objectifyOptions(t, !0, "Rest", o.defaultLogger, we(F({}, is), {
            Crypto: (n = at.Crypto) != null ? n : void 0,
            MsgPack: (s = at._MsgPack) != null ? s : void 0
          }))
        );
      }
      static get Crypto() {
        if (this._Crypto === null)
          throw new Error("Encryption not enabled; use ably.encryption.js instead");
        return this._Crypto;
      }
      static set Crypto(t) {
        this._Crypto = t;
      }
    };
    Se._Crypto = null, Se.Message = rs, Se.PresenceMessage = os, Se._MsgPack = null, Se._Http = Tt;
    var kt = Se;
    function Tr(e, t, n, s) {
      try {
        n.apply(t, s);
      } catch (i) {
        o.logAction(
          e,
          o.LOG_ERROR,
          "EventEmitter.emit()",
          "Unexpected listener exception: " + i + "; stack = " + (i && i.stack)
        );
      }
    }
    function Et(e, t, n) {
      let s, i, r;
      for (let a = 0; a < e.length; a++)
        if (s = e[a], n && (s = s[n]), Array.isArray(s)) {
          for (; (i = s.indexOf(t)) !== -1; )
            s.splice(i, 1);
          n && s.length === 0 && delete e[a][n];
        } else if (Oe(s))
          for (r in s)
            Object.prototype.hasOwnProperty.call(s, r) && Array.isArray(s[r]) && Et([s], t, r);
    }
    var Or = class {
      constructor(e) {
        this.logger = e, this.any = [], this.events = /* @__PURE__ */ Object.create(null), this.anyOnce = [], this.eventsOnce = /* @__PURE__ */ Object.create(null);
      }
      on(...e) {
        if (e.length === 1) {
          const t = e[0];
          if (typeof t == "function")
            this.any.push(t);
          else
            throw new Error("EventListener.on(): Invalid arguments: " + y.Config.inspect(e));
        }
        if (e.length === 2) {
          const [t, n] = e;
          if (typeof n != "function")
            throw new Error("EventListener.on(): Invalid arguments: " + y.Config.inspect(e));
          if (te(t))
            this.any.push(n);
          else if (Array.isArray(t))
            t.forEach((s) => {
              this.on(s, n);
            });
          else {
            if (typeof t != "string")
              throw new Error("EventListener.on(): Invalid arguments: " + y.Config.inspect(e));
            (this.events[t] || (this.events[t] = [])).push(n);
          }
        }
      }
      off(...e) {
        if (e.length == 0 || te(e[0]) && te(e[1])) {
          this.any = [], this.events = /* @__PURE__ */ Object.create(null), this.anyOnce = [], this.eventsOnce = /* @__PURE__ */ Object.create(null);
          return;
        }
        const [t, n] = e;
        let s = null, i = null;
        if (e.length === 1 || !n)
          typeof t == "function" ? s = t : i = t;
        else {
          if (typeof n != "function")
            throw new Error("EventEmitter.off(): invalid arguments:" + y.Config.inspect(e));
          [i, s] = [t, n];
        }
        if (s && te(i)) {
          Et([this.any, this.events, this.anyOnce, this.eventsOnce], s);
          return;
        }
        if (Array.isArray(i)) {
          i.forEach((r) => {
            this.off(r, s);
          });
          return;
        }
        if (typeof i != "string")
          throw new Error("EventEmitter.off(): invalid arguments:" + y.Config.inspect(e));
        s ? Et([this.events, this.eventsOnce], s, i) : (delete this.events[i], delete this.eventsOnce[i]);
      }
      /**
       * Get the array of listeners for a given event; excludes once events
       * @param event (optional) the name of the event, or none for 'any'
       * @return array of events, or null if none
       */
      listeners(e) {
        if (e) {
          const t = this.events[e] || [];
          return this.eventsOnce[e] && Array.prototype.push.apply(t, this.eventsOnce[e]), t.length ? t : null;
        }
        return this.any.length ? this.any : null;
      }
      /**
       * Emit an event
       * @param event the event name
       * @param args the arguments to pass to the listener
       */
      emit(e, ...t) {
        const n = { event: e }, s = [];
        this.anyOnce.length && (Array.prototype.push.apply(s, this.anyOnce), this.anyOnce = []), this.any.length && Array.prototype.push.apply(s, this.any);
        const i = this.eventsOnce[e];
        i && (Array.prototype.push.apply(s, i), delete this.eventsOnce[e]);
        const r = this.events[e];
        r && Array.prototype.push.apply(s, r), s.forEach((a) => {
          Tr(this.logger, n, a, t);
        });
      }
      once(...e) {
        const t = e.length;
        if (t === 0 || t === 1 && typeof e[0] != "function") {
          const i = e[0];
          return new Promise((r) => {
            this.once(i, r);
          });
        }
        const [n, s] = e;
        if (e.length === 1 && typeof n == "function")
          this.anyOnce.push(n);
        else if (te(n)) {
          if (typeof s != "function")
            throw new Error("EventEmitter.once(): Invalid arguments:" + y.Config.inspect(e));
          this.anyOnce.push(s);
        } else if (Array.isArray(n)) {
          const i = this, r = function() {
            const a = Array.prototype.slice.call(arguments);
            if (n.forEach(function(l) {
              i.off(l, r);
            }), typeof s != "function")
              throw new Error("EventEmitter.once(): Invalid arguments:" + y.Config.inspect(e));
            s.apply(this, a);
          };
          n.forEach(function(a) {
            i.on(a, r);
          });
        } else {
          if (typeof n != "string")
            throw new Error("EventEmitter.once(): Invalid arguments:" + y.Config.inspect(e));
          const i = this.eventsOnce[n] || (this.eventsOnce[n] = []);
          if (s) {
            if (typeof s != "function")
              throw new Error("EventEmitter.once(): Invalid arguments:" + y.Config.inspect(e));
            i.push(s);
          }
        }
      }
      /**
       * Listen for a single occurrence of a state event and fire immediately if currentState matches targetState
       * @param targetState the name of the state event to listen to
       * @param currentState the name of the current state of this object
       */
      async whenState(e, t) {
        if (typeof e != "string" || typeof t != "string")
          throw new Error("whenState requires a valid state String argument");
        return e === t ? null : this.once(e);
      }
    }, V = Or, E = {
      HEARTBEAT: 0,
      ACK: 1,
      NACK: 2,
      CONNECT: 3,
      CONNECTED: 4,
      DISCONNECT: 5,
      DISCONNECTED: 6,
      CLOSE: 7,
      CLOSED: 8,
      ERROR: 9,
      ATTACH: 10,
      ATTACHED: 11,
      DETACH: 12,
      DETACHED: 13,
      PRESENCE: 14,
      MESSAGE: 15,
      SYNC: 16,
      AUTH: 17,
      ACTIVATE: 18
    }, as = [];
    Object.keys(E).forEach(function(e) {
      as[E[e]] = e;
    });
    var de = {
      /* Channel attach state flags */
      HAS_PRESENCE: 1,
      HAS_BACKLOG: 2,
      RESUMED: 4,
      TRANSIENT: 16,
      ATTACH_RESUME: 32,
      /* Channel mode flags */
      PRESENCE: 65536,
      PUBLISH: 1 << 17,
      SUBSCRIBE: 1 << 18,
      PRESENCE_SUBSCRIBE: 1 << 19
    }, Cr = Object.keys(de);
    de.MODE_ALL = de.PRESENCE | de.PUBLISH | de.SUBSCRIBE | de.PRESENCE_SUBSCRIBE;
    function cs(e) {
      const t = [];
      if (e)
        for (let n = 0; n < e.length; n++)
          t.push(e[n].toString());
      return "[ " + t.join(", ") + " ]";
    }
    var ls = ["PRESENCE", "PUBLISH", "SUBSCRIBE", "PRESENCE_SUBSCRIBE"], vr = oe;
    function Sr(e, t, n, s) {
      const i = ne(e, t, s);
      return Pt(i, n);
    }
    function Pt(e, t) {
      const n = e.error;
      n && (e.error = m.fromValues(n));
      const s = e.messages;
      if (s)
        for (let r = 0; r < s.length; r++)
          s[r] = be(s[r]);
      const i = t ? e.presence : void 0;
      if (t && i && t)
        for (let r = 0; r < i.length; r++)
          i[r] = t.presenceMessageFromValues(i[r], !0);
      return Object.assign(new Gt(), we(F({}, e), { presence: i }));
    }
    function Mr(e) {
      return Pt(e, { presenceMessageFromValues: se, presenceMessagesFromValuesArray: es });
    }
    function ae(e) {
      return Object.assign(new Gt(), e);
    }
    function _t(e, t) {
      let n = "[ProtocolMessage";
      e.action !== void 0 && (n += "; action=" + as[e.action] || e.action);
      const s = ["id", "channel", "channelSerial", "connectionId", "count", "msgSerial", "timestamp"];
      let i;
      for (let r = 0; r < s.length; r++)
        i = s[r], e[i] !== void 0 && (n += "; " + i + "=" + e[i]);
      if (e.messages && (n += "; messages=" + cs(vt(e.messages))), e.presence && t && (n += "; presence=" + cs(t.presenceMessagesFromValuesArray(e.presence))), e.error && (n += "; error=" + m.fromValues(e.error).toString()), e.auth && e.auth.accessToken && (n += "; token=" + e.auth.accessToken), e.flags && (n += "; flags=" + Cr.filter(e.hasFlag).join(",")), e.params) {
        let r = "";
        mn(e.params, function(a) {
          r.length > 0 && (r += "; "), r += a + "=" + e.params[a];
        }), r.length > 0 && (n += "; params=[" + r + "]");
      }
      return n += "]", n;
    }
    var Gt = class {
      constructor() {
        this.hasFlag = (e) => (this.flags & de[e]) > 0;
      }
      setFlag(e) {
        return this.flags = this.flags | de[e];
      }
      getMode() {
        return this.flags && this.flags & de.MODE_ALL;
      }
      encodeModesToFlags(e) {
        e.forEach((t) => this.setFlag(t));
      }
      decodeModesFromFlags() {
        const e = [];
        return ls.forEach((t) => {
          this.hasFlag(t) && e.push(t);
        }), e.length > 0 ? e : void 0;
      }
    }, hs = Gt, Ar = class extends V {
      constructor(e) {
        super(e), this.messages = [];
      }
      count() {
        return this.messages.length;
      }
      push(e) {
        this.messages.push(e);
      }
      shift() {
        return this.messages.shift();
      }
      last() {
        return this.messages[this.messages.length - 1];
      }
      copyAll() {
        return this.messages.slice();
      }
      append(e) {
        this.messages.push.apply(this.messages, e);
      }
      prepend(e) {
        this.messages.unshift.apply(this.messages, e);
      }
      completeMessages(e, t, n) {
        o.logAction(
          this.logger,
          o.LOG_MICRO,
          "MessageQueue.completeMessages()",
          "serial = " + e + "; count = " + t
        ), n = n || null;
        const s = this.messages;
        if (s.length === 0)
          throw new Error("MessageQueue.completeMessages(): completeMessages called on any empty MessageQueue");
        const i = s[0];
        if (i) {
          const r = i.message.msgSerial, a = e + t;
          if (a > r) {
            const l = s.splice(0, a - r);
            for (const d of l)
              d.callback(n);
          }
          s.length == 0 && this.emit("idle");
        }
      }
      completeAllMessages(e) {
        this.completeMessages(0, Number.MAX_SAFE_INTEGER || Number.MAX_VALUE, e);
      }
      resetSendAttempted() {
        for (let e of this.messages)
          e.sendAttempted = !1;
      }
      clear() {
        o.logAction(
          this.logger,
          o.LOG_MICRO,
          "MessageQueue.clear()",
          "clearing " + this.messages.length + " messages"
        ), this.messages = [], this.emit("idle");
      }
    }, us = Ar, ds = class {
      constructor(e, t) {
        this.message = e, this.callback = t, this.merged = !1;
        const n = e.action;
        this.sendAttempted = !1, this.ackRequired = n == E.MESSAGE || n == E.PRESENCE;
      }
    }, kr = class extends V {
      constructor(e) {
        super(e.logger), this.transport = e, this.messageQueue = new us(this.logger), e.on("ack", (t, n) => {
          this.onAck(t, n);
        }), e.on("nack", (t, n, s) => {
          this.onNack(t, n, s);
        });
      }
      onAck(e, t) {
        o.logAction(this.logger, o.LOG_MICRO, "Protocol.onAck()", "serial = " + e + "; count = " + t), this.messageQueue.completeMessages(e, t);
      }
      onNack(e, t, n) {
        o.logAction(
          this.logger,
          o.LOG_ERROR,
          "Protocol.onNack()",
          "serial = " + e + "; count = " + t + "; err = " + L(n)
        ), n || (n = new m("Unable to send message; channel not responding", 50001, 500)), this.messageQueue.completeMessages(e, t, n);
      }
      onceIdle(e) {
        const t = this.messageQueue;
        if (t.count() === 0) {
          e();
          return;
        }
        t.once("idle", e);
      }
      send(e) {
        e.ackRequired && this.messageQueue.push(e), this.logger.shouldLog(o.LOG_MICRO) && o.logActionNoStrip(
          this.logger,
          o.LOG_MICRO,
          "Protocol.send()",
          "sending msg; " + _t(e.message, this.transport.connectionManager.realtime._RealtimePresence)
        ), e.sendAttempted = !0, this.transport.send(e.message);
      }
      getTransport() {
        return this.transport;
      }
      getPendingMessages() {
        return this.messageQueue.copyAll();
      }
      clearPendingMessages() {
        return this.messageQueue.clear();
      }
      finish() {
        const e = this.transport;
        this.onceIdle(function() {
          e.disconnect();
        });
      }
    }, Er = kr, Pr = class {
      constructor(e, t, n, s) {
        this.previous = e, this.current = t, n && (this.retryIn = n), s && (this.reason = s);
      }
    }, it = Pr, Ie = {
      DISCONNECTED: 80003,
      SUSPENDED: 80002,
      FAILED: 8e4,
      CLOSING: 80017,
      CLOSED: 80017,
      UNKNOWN_CONNECTION_ERR: 50002,
      UNKNOWN_CHANNEL_ERR: 50001
    }, _r = {
      disconnected: () => m.fromValues({
        statusCode: 400,
        code: Ie.DISCONNECTED,
        message: "Connection to server temporarily unavailable"
      }),
      suspended: () => m.fromValues({
        statusCode: 400,
        code: Ie.SUSPENDED,
        message: "Connection to server unavailable"
      }),
      failed: () => m.fromValues({
        statusCode: 400,
        code: Ie.FAILED,
        message: "Connection failed or disconnected by server"
      }),
      closing: () => m.fromValues({
        statusCode: 400,
        code: Ie.CLOSING,
        message: "Connection closing"
      }),
      closed: () => m.fromValues({
        statusCode: 400,
        code: Ie.CLOSED,
        message: "Connection closed"
      }),
      unknownConnectionErr: () => m.fromValues({
        statusCode: 500,
        code: Ie.UNKNOWN_CONNECTION_ERR,
        message: "Internal connection error"
      }),
      unknownChannelErr: () => m.fromValues({
        statusCode: 500,
        code: Ie.UNKNOWN_CONNECTION_ERR,
        message: "Internal channel error"
      })
    };
    function Gr(e) {
      return !e.statusCode || !e.code || e.statusCode >= 500 ? !0 : Object.values(Ie).includes(e.code);
    }
    var Re = _r, Br = ae({ action: E.CLOSE }), Nr = ae({ action: E.DISCONNECT }), Lr = class extends V {
      constructor(e, t, n, s) {
        super(e.logger), s && (n.format = void 0, n.heartbeats = !0), this.connectionManager = e, this.auth = t, this.params = n, this.timeouts = n.options.timeouts, this.format = n.format, this.isConnected = !1, this.isFinished = !1, this.isDisposed = !1, this.maxIdleInterval = null, this.idleTimer = null, this.lastActivity = null;
      }
      connect() {
      }
      close() {
        this.isConnected && this.requestClose(), this.finish("closed", Re.closed());
      }
      disconnect(e) {
        this.isConnected && this.requestDisconnect(), this.finish("disconnected", e || Re.disconnected());
      }
      fail(e) {
        this.isConnected && this.requestDisconnect(), this.finish("failed", e || Re.failed());
      }
      finish(e, t) {
        var n;
        this.isFinished || (this.isFinished = !0, this.isConnected = !1, this.maxIdleInterval = null, clearTimeout((n = this.idleTimer) != null ? n : void 0), this.idleTimer = null, this.emit(e, t), this.dispose());
      }
      onProtocolMessage(e) {
        switch (this.logger.shouldLog(o.LOG_MICRO) && o.logActionNoStrip(
          this.logger,
          o.LOG_MICRO,
          "Transport.onProtocolMessage()",
          "received on " + this.shortName + ": " + _t(e, this.connectionManager.realtime._RealtimePresence) + "; connectionId = " + this.connectionManager.connectionId
        ), this.onActivity(), e.action) {
          case E.HEARTBEAT:
            o.logActionNoStrip(
              this.logger,
              o.LOG_MICRO,
              "Transport.onProtocolMessage()",
              this.shortName + " heartbeat; connectionId = " + this.connectionManager.connectionId
            ), this.emit("heartbeat", e.id);
            break;
          case E.CONNECTED:
            this.onConnect(e), this.emit("connected", e.error, e.connectionId, e.connectionDetails, e);
            break;
          case E.CLOSED:
            this.onClose(e);
            break;
          case E.DISCONNECTED:
            this.onDisconnect(e);
            break;
          case E.ACK:
            this.emit("ack", e.msgSerial, e.count);
            break;
          case E.NACK:
            this.emit("nack", e.msgSerial, e.count, e.error);
            break;
          case E.SYNC:
            this.connectionManager.onChannelMessage(e, this);
            break;
          case E.ACTIVATE:
            break;
          case E.AUTH:
            X(this.auth.authorize(), (t) => {
              t && o.logAction(
                this.logger,
                o.LOG_ERROR,
                "Transport.onProtocolMessage()",
                "Ably requested re-authentication, but unable to obtain a new token: " + L(t)
              );
            });
            break;
          case E.ERROR:
            if (o.logAction(
              this.logger,
              o.LOG_MINOR,
              "Transport.onProtocolMessage()",
              "received error action; connectionId = " + this.connectionManager.connectionId + "; err = " + y.Config.inspect(e.error) + (e.channel ? ", channel: " + e.channel : "")
            ), e.channel === void 0) {
              this.onFatalError(e);
              break;
            }
            this.connectionManager.onChannelMessage(e, this);
            break;
          default:
            this.connectionManager.onChannelMessage(e, this);
        }
      }
      onConnect(e) {
        if (this.isConnected = !0, !e.connectionDetails)
          throw new Error("Transport.onConnect(): Connect message recieved without connectionDetails");
        const t = e.connectionDetails.maxIdleInterval;
        t && (this.maxIdleInterval = t + this.timeouts.realtimeRequestTimeout, this.onActivity());
      }
      onDisconnect(e) {
        const t = e && e.error;
        o.logAction(this.logger, o.LOG_MINOR, "Transport.onDisconnect()", "err = " + L(t)), this.finish("disconnected", t);
      }
      onFatalError(e) {
        const t = e && e.error;
        o.logAction(this.logger, o.LOG_MINOR, "Transport.onFatalError()", "err = " + L(t)), this.finish("failed", t);
      }
      onClose(e) {
        const t = e && e.error;
        o.logAction(this.logger, o.LOG_MINOR, "Transport.onClose()", "err = " + L(t)), this.finish("closed", t);
      }
      requestClose() {
        o.logAction(this.logger, o.LOG_MINOR, "Transport.requestClose()", ""), this.send(Br);
      }
      requestDisconnect() {
        o.logAction(this.logger, o.LOG_MINOR, "Transport.requestDisconnect()", ""), this.send(Nr);
      }
      ping(e) {
        const t = { action: E.HEARTBEAT };
        e && (t.id = e), this.send(ae(t));
      }
      dispose() {
        o.logAction(this.logger, o.LOG_MINOR, "Transport.dispose()", ""), this.isDisposed = !0, this.off();
      }
      onActivity() {
        this.maxIdleInterval && (this.lastActivity = this.connectionManager.lastActivity = Date.now(), this.setIdleTimer(this.maxIdleInterval + 100));
      }
      setIdleTimer(e) {
        this.idleTimer || (this.idleTimer = setTimeout(() => {
          this.onIdleTimerExpire();
        }, e));
      }
      onIdleTimerExpire() {
        if (!this.lastActivity || !this.maxIdleInterval)
          throw new Error("Transport.onIdleTimerExpire(): lastActivity/maxIdleInterval not set");
        this.idleTimer = null;
        const e = Date.now() - this.lastActivity, t = this.maxIdleInterval - e;
        if (t <= 0) {
          const n = "No activity seen from realtime in " + e + "ms; assuming connection has dropped";
          o.logAction(this.logger, o.LOG_ERROR, "Transport.onIdleTimerExpire()", n), this.disconnect(new m(n, 80003, 408));
        } else
          this.setIdleTimer(t + 100);
      }
      static tryConnect(e, t, n, s, i) {
        const r = new e(t, n, s);
        let a;
        const l = function(u) {
          clearTimeout(a), i({ event: this.event, error: u });
        }, d = t.options.timeouts.realtimeRequestTimeout;
        return a = setTimeout(() => {
          r.off(["preconnect", "disconnected", "failed"]), r.dispose(), l.call(
            { event: "disconnected" },
            new m("Timeout waiting for transport to indicate itself viable", 5e4, 500)
          );
        }, d), r.on(["failed", "disconnected"], l), r.on("preconnect", function() {
          o.logAction(
            t.logger,
            o.LOG_MINOR,
            "Transport.tryConnect()",
            "viable transport " + r
          ), clearTimeout(a), r.off(["failed", "disconnected"], l), i(null, r);
        }), r.connect(), r;
      }
      static isAvailable() {
        throw new m("isAvailable not implemented for transport", 5e4, 500);
      }
    }, Me = Lr, q;
    ((e) => {
      e.WebSocket = "web_socket", e.Comet = "comet", e.XhrPolling = "xhr_polling";
    })(q || (q = {}));
    var Ur = typeof pe < "u" ? pe : typeof window < "u" ? window : self, Bt = () => {
      var e;
      return typeof y.WebStorage < "u" && ((e = y.WebStorage) == null ? void 0 : e.localSupported);
    }, Ue = () => {
      var e;
      return typeof y.WebStorage < "u" && ((e = y.WebStorage) == null ? void 0 : e.sessionSupported);
    }, fs = function() {
    }, Nt = "ably-transport-preference";
    function Hr(e, t, n) {
      let s;
      if (e.channel !== t.channel || (s = e.action) !== E.PRESENCE && s !== E.MESSAGE || s !== t.action)
        return !1;
      const i = s === E.PRESENCE ? "presence" : "messages", r = e[i].concat(t[i]);
      return St(r) > n || !yn(r, "clientId") || !r.every(function(l) {
        return !l.id;
      }) ? !1 : (e[i] = r, !0);
    }
    function Lt(e) {
      try {
        return JSON.parse(e);
      } catch {
        return null;
      }
    }
    var xr = class {
      constructor(e, t, n, s) {
        this.options = e, this.host = t, this.mode = n, this.connectionKey = s, this.format = e.useBinaryProtocol ? "msgpack" : "json";
      }
      getConnectParams(e) {
        const t = e ? Te(e) : {}, n = this.options;
        switch (this.mode) {
          case "resume":
            t.resume = this.connectionKey;
            break;
          case "recover": {
            const s = Lt(n.recover);
            s && (t.recover = s.connectionKey);
            break;
          }
        }
        return n.clientId !== void 0 && (t.clientId = n.clientId), n.echoMessages === !1 && (t.echo = "false"), this.format !== void 0 && (t.format = this.format), this.stream !== void 0 && (t.stream = this.stream), this.heartbeats !== void 0 && (t.heartbeats = this.heartbeats), t.v = S.protocolVersion, t.agent = bt(this.options), n.transportParams !== void 0 && k(t, n.transportParams), t;
      }
      toString() {
        let e = "[mode=" + this.mode;
        return this.host && (e += ",host=" + this.host), this.connectionKey && (e += ",connectionKey=" + this.connectionKey), this.format && (e += ",format=" + this.format), e += "]", e;
      }
    }, Dr = class Fs extends V {
      constructor(t, n) {
        super(t.logger), this.supportedTransports = {}, this.disconnectedRetryCount = 0, this.pendingChannelMessagesState = { isProcessing: !1, queue: [] }, this.realtime = t, this.initTransports(), this.options = n;
        const s = n.timeouts, i = s.webSocketConnectTimeout + s.realtimeRequestTimeout;
        if (this.states = {
          initialized: {
            state: "initialized",
            terminal: !1,
            queueEvents: !0,
            sendEvents: !1,
            failState: "disconnected"
          },
          connecting: {
            state: "connecting",
            terminal: !1,
            queueEvents: !0,
            sendEvents: !1,
            retryDelay: i,
            failState: "disconnected"
          },
          connected: {
            state: "connected",
            terminal: !1,
            queueEvents: !1,
            sendEvents: !0,
            failState: "disconnected"
          },
          disconnected: {
            state: "disconnected",
            terminal: !1,
            queueEvents: !0,
            sendEvents: !1,
            retryDelay: s.disconnectedRetryTimeout,
            failState: "disconnected"
          },
          suspended: {
            state: "suspended",
            terminal: !1,
            queueEvents: !1,
            sendEvents: !1,
            retryDelay: s.suspendedRetryTimeout,
            failState: "suspended"
          },
          closing: {
            state: "closing",
            terminal: !1,
            queueEvents: !1,
            sendEvents: !1,
            retryDelay: s.realtimeRequestTimeout,
            failState: "closed"
          },
          closed: { state: "closed", terminal: !0, queueEvents: !1, sendEvents: !1, failState: "closed" },
          failed: { state: "failed", terminal: !0, queueEvents: !1, sendEvents: !1, failState: "failed" }
        }, this.state = this.states.initialized, this.errorReason = null, this.queuedMessages = new us(this.logger), this.msgSerial = 0, this.connectionDetails = void 0, this.connectionId = void 0, this.connectionKey = void 0, this.connectionStateTtl = s.connectionStateTtl, this.maxIdleInterval = null, this.transports = un(n.transports || S.defaultTransports, this.supportedTransports), this.transportPreference = null, this.transports.includes(q.WebSocket) && (this.webSocketTransportAvailable = !0), this.transports.includes(q.XhrPolling) ? this.baseTransport = q.XhrPolling : this.transports.includes(q.Comet) && (this.baseTransport = q.Comet), this.httpHosts = S.getHosts(n), this.wsHosts = S.getHosts(n, !0), this.activeProtocol = null, this.host = null, this.lastAutoReconnectAttempt = null, this.lastActivity = null, this.forceFallbackHost = !1, this.connectCounter = 0, this.wsCheckResult = null, this.webSocketSlowTimer = null, this.webSocketGiveUpTimer = null, this.abandonedWebSocket = !1, o.logAction(this.logger, o.LOG_MINOR, "Realtime.ConnectionManager()", "started"), o.logAction(
          this.logger,
          o.LOG_MICRO,
          "Realtime.ConnectionManager()",
          "requested transports = [" + (n.transports || S.defaultTransports) + "]"
        ), o.logAction(
          this.logger,
          o.LOG_MICRO,
          "Realtime.ConnectionManager()",
          "available transports = [" + this.transports + "]"
        ), o.logAction(
          this.logger,
          o.LOG_MICRO,
          "Realtime.ConnectionManager()",
          "http hosts = [" + this.httpHosts + "]"
        ), !this.transports.length) {
          const a = "no requested transports available";
          throw o.logAction(this.logger, o.LOG_ERROR, "realtime.ConnectionManager()", a), new Error(a);
        }
        const r = y.Config.addEventListener;
        r && (Ue() && typeof n.recover == "function" && r("beforeunload", this.persistConnection.bind(this)), n.closeOnUnload === !0 && r("beforeunload", () => {
          o.logAction(
            this.logger,
            o.LOG_MAJOR,
            "Realtime.ConnectionManager()",
            "beforeunload event has triggered the connection to close as closeOnUnload is true"
          ), this.requestState({ state: "closing" });
        }), r("online", () => {
          var a;
          this.state == this.states.disconnected || this.state == this.states.suspended ? (o.logAction(
            this.logger,
            o.LOG_MINOR,
            "ConnectionManager caught browser ‘online’ event",
            "reattempting connection"
          ), this.requestState({ state: "connecting" })) : this.state == this.states.connecting && ((a = this.pendingTransport) == null || a.off(), this.disconnectAllTransports(), this.startConnect());
        }), r("offline", () => {
          this.state == this.states.connected && (o.logAction(
            this.logger,
            o.LOG_MINOR,
            "ConnectionManager caught browser ‘offline’ event",
            "disconnecting active transport"
          ), this.disconnectAllTransports());
        }));
      }
      /*********************
       * transport management
       *********************/
      // Used by tests
      static supportedTransports(t) {
        const n = { supportedTransports: {} };
        return this.initTransports(t, n), n.supportedTransports;
      }
      static initTransports(t, n) {
        const s = F(F({}, y.Transports.bundledImplementations), t);
        [q.WebSocket, ...y.Transports.order].forEach((i) => {
          const r = s[i];
          r && r.isAvailable() && (n.supportedTransports[i] = r);
        });
      }
      initTransports() {
        Fs.initTransports(this.realtime._additionalTransportImplementations, this);
      }
      createTransportParams(t, n) {
        return new xr(this.options, t, n, this.connectionKey);
      }
      getTransportParams(t) {
        ((s) => {
          if (this.connectionKey) {
            s("resume");
            return;
          }
          if (typeof this.options.recover == "string") {
            s("recover");
            return;
          }
          const i = this.options.recover, r = this.getSessionRecoverData(), a = this.sessionRecoveryName();
          if (r && typeof i == "function") {
            o.logAction(
              this.logger,
              o.LOG_MINOR,
              "ConnectionManager.getTransportParams()",
              "Calling clientOptions-provided recover function with last session data (recovery scope: " + a + ")"
            ), i(r, (l) => {
              l ? (this.options.recover = r.recoveryKey, s("recover")) : s("clean");
            });
            return;
          }
          s("clean");
        })((s) => {
          const i = this.createTransportParams(null, s);
          if (s === "recover") {
            o.logAction(
              this.logger,
              o.LOG_MINOR,
              "ConnectionManager.getTransportParams()",
              "Transport recovery mode = recover; recoveryKey = " + this.options.recover
            );
            const r = Lt(this.options.recover);
            r && (this.msgSerial = r.msgSerial);
          } else
            o.logAction(
              this.logger,
              o.LOG_MINOR,
              "ConnectionManager.getTransportParams()",
              "Transport params = " + i.toString()
            );
          t(i);
        });
      }
      /**
       * Attempt to connect using a given transport
       * @param transportParams
       * @param candidate, the transport to try
       * @param callback
       */
      tryATransport(t, n, s) {
        o.logAction(this.logger, o.LOG_MICRO, "ConnectionManager.tryATransport()", "trying " + n), this.proposedTransport = Me.tryConnect(
          this.supportedTransports[n],
          this,
          this.realtime.auth,
          t,
          (i, r) => {
            const a = this.state;
            if (a == this.states.closing || a == this.states.closed || a == this.states.failed) {
              r && (o.logAction(
                this.logger,
                o.LOG_MINOR,
                "ConnectionManager.tryATransport()",
                "connection " + a.state + " while we were attempting the transport; closing " + r
              ), r.close()), s(!0);
              return;
            }
            if (i) {
              o.logAction(
                this.logger,
                o.LOG_MINOR,
                "ConnectionManager.tryATransport()",
                "transport " + n + " " + i.event + ", err: " + i.error.toString()
              ), ue.isTokenErr(i.error) && !(this.errorReason && ue.isTokenErr(this.errorReason)) ? (this.errorReason = i.error, X(this.realtime.auth._forceNewToken(null, null), (l) => {
                if (l) {
                  this.actOnErrorFromAuthorize(l);
                  return;
                }
                this.tryATransport(t, n, s);
              })) : i.event === "failed" ? (this.notifyState({ state: "failed", error: i.error }), s(!0)) : i.event === "disconnected" && (Gr(i.error) ? s(!1) : (this.notifyState({ state: this.states.connecting.failState, error: i.error }), s(!0)));
              return;
            }
            o.logAction(
              this.logger,
              o.LOG_MICRO,
              "ConnectionManager.tryATransport()",
              "viable transport " + n + "; setting pending"
            ), this.setTransportPending(r, t), s(null, r);
          }
        );
      }
      /**
       * Called when a transport is indicated to be viable, and the ConnectionManager
       * expects to activate this transport as soon as it is connected.
       * @param transport
       * @param transportParams
       */
      setTransportPending(t, n) {
        const s = n.mode;
        o.logAction(
          this.logger,
          o.LOG_MINOR,
          "ConnectionManager.setTransportPending()",
          "transport = " + t + "; mode = " + s
        ), this.pendingTransport = t, this.cancelWebSocketSlowTimer(), this.cancelWebSocketGiveUpTimer(), t.once("connected", (r, a, l) => {
          this.activateTransport(r, t, a, l), s === "recover" && this.options.recover && (delete this.options.recover, this.unpersistConnection());
        });
        const i = this;
        t.on(["disconnected", "closed", "failed"], function(r) {
          i.deactivateTransport(t, this.event, r);
        }), this.emit("transport.pending", t);
      }
      /**
       * Called when a transport is connected, and the connectionmanager decides that
       * it will now be the active transport. Returns whether or not it activated
       * the transport (if the connection is closing/closed it will choose not to).
       * @param transport the transport instance
       * @param connectionId the id of the new active connection
       * @param connectionDetails the details of the new active connection
       */
      activateTransport(t, n, s, i) {
        o.logAction(
          this.logger,
          o.LOG_MINOR,
          "ConnectionManager.activateTransport()",
          "transport = " + n
        ), t && o.logAction(this.logger, o.LOG_ERROR, "ConnectionManager.activateTransport()", "error = " + t), s && o.logAction(
          this.logger,
          o.LOG_MICRO,
          "ConnectionManager.activateTransport()",
          "connectionId =  " + s
        ), i && o.logAction(
          this.logger,
          o.LOG_MICRO,
          "ConnectionManager.activateTransport()",
          "connectionDetails =  " + JSON.stringify(i)
        ), this.persistTransportPreference(n);
        const r = this.state, a = this.states.connected.state;
        if (o.logAction(
          this.logger,
          o.LOG_MINOR,
          "ConnectionManager.activateTransport()",
          "current state = " + r.state
        ), r.state == this.states.closing.state || r.state == this.states.closed.state || r.state == this.states.failed.state)
          return o.logAction(
            this.logger,
            o.LOG_MINOR,
            "ConnectionManager.activateTransport()",
            "Disconnecting transport and abandoning"
          ), n.disconnect(), !1;
        if (delete this.pendingTransport, !n.isConnected)
          return o.logAction(
            this.logger,
            o.LOG_MINOR,
            "ConnectionManager.activateTransport()",
            "Declining to activate transport " + n + " since it appears to no longer be connected"
          ), !1;
        const l = this.activeProtocol;
        this.activeProtocol = new Er(n), this.host = n.params.host;
        const d = i.connectionKey;
        if (d && this.connectionKey != d && this.setConnection(s, i, !!t), this.onConnectionDetailsUpdate(i, n), y.Config.nextTick(() => {
          n.on(
            "connected",
            (u, f, g) => {
              this.onConnectionDetailsUpdate(g, n), this.emit("update", new it(a, a, null, u));
            }
          );
        }), r.state === this.states.connected.state ? t && (this.errorReason = this.realtime.connection.errorReason = t, this.emit("update", new it(a, a, null, t))) : (this.notifyState({ state: "connected", error: t }), this.errorReason = this.realtime.connection.errorReason = t || null), this.emit("transport.active", n), l)
          if (l.messageQueue.count() > 0 && o.logAction(
            this.logger,
            o.LOG_ERROR,
            "ConnectionManager.activateTransport()",
            "Previous active protocol (for transport " + l.transport.shortName + ", new one is " + n.shortName + ") finishing with " + l.messageQueue.count() + " messages still pending"
          ), l.transport === n) {
            const u = "Assumption violated: activating a transport that was also the transport for the previous active protocol; transport = " + n.shortName + "; stack = " + new Error().stack;
            o.logAction(this.logger, o.LOG_ERROR, "ConnectionManager.activateTransport()", u);
          } else
            l.finish();
        return !0;
      }
      /**
       * Called when a transport is no longer the active transport. This can occur
       * in any transport connection state.
       * @param transport
       */
      deactivateTransport(t, n, s) {
        const i = this.activeProtocol, r = i && i.getTransport() === t, a = t === this.pendingTransport, l = this.noTransportsScheduledForActivation();
        if (o.logAction(
          this.logger,
          o.LOG_MINOR,
          "ConnectionManager.deactivateTransport()",
          "transport = " + t
        ), o.logAction(
          this.logger,
          o.LOG_MINOR,
          "ConnectionManager.deactivateTransport()",
          "state = " + n + (r ? "; was active" : a ? "; was pending" : "") + (l ? "" : "; another transport is scheduled for activation")
        ), s && s.message && o.logAction(
          this.logger,
          o.LOG_MICRO,
          "ConnectionManager.deactivateTransport()",
          "reason =  " + s.message
        ), r && (o.logAction(
          this.logger,
          o.LOG_MICRO,
          "ConnectionManager.deactivateTransport()",
          "Getting, clearing, and requeuing " + this.activeProtocol.messageQueue.count() + " pending messages"
        ), this.queuePendingMessages(i.getPendingMessages()), i.clearPendingMessages(), this.activeProtocol = this.host = null), this.emit("transport.inactive", t), r && l || r && n === "failed" || n === "closed" || i === null && a) {
          if (n === "disconnected" && s && s.statusCode > 500 && this.httpHosts.length > 1) {
            this.unpersistTransportPreference(), this.forceFallbackHost = !0, this.notifyState({ state: n, error: s, retryImmediately: !0 });
            return;
          }
          const d = n === "failed" && ue.isTokenErr(s) ? "disconnected" : n;
          this.notifyState({ state: d, error: s });
          return;
        }
      }
      /* Helper that returns true if there are no transports which are pending,
       * have been connected, and are just waiting for onceNoPending to fire before
       * being activated */
      noTransportsScheduledForActivation() {
        return !this.pendingTransport || !this.pendingTransport.isConnected;
      }
      setConnection(t, n, s) {
        const i = this.connectionId;
        (i && i !== t || !i && s) && (o.logAction(this.logger, o.LOG_MINOR, "ConnectionManager.setConnection()", "Resetting msgSerial"), this.msgSerial = 0, this.queuedMessages.resetSendAttempted()), this.connectionId !== t && o.logAction(
          this.logger,
          o.LOG_MINOR,
          "ConnectionManager.setConnection()",
          "New connectionId; reattaching any attached channels"
        ), this.realtime.connection.id = this.connectionId = t, this.realtime.connection.key = this.connectionKey = n.connectionKey;
      }
      clearConnection() {
        this.realtime.connection.id = this.connectionId = void 0, this.realtime.connection.key = this.connectionKey = void 0, this.msgSerial = 0, this.unpersistConnection();
      }
      createRecoveryKey() {
        return this.connectionKey ? JSON.stringify({
          connectionKey: this.connectionKey,
          msgSerial: this.msgSerial,
          channelSerials: this.realtime.channels.channelSerials()
        }) : null;
      }
      checkConnectionStateFreshness() {
        if (!this.lastActivity || !this.connectionId)
          return;
        const t = Date.now() - this.lastActivity;
        t > this.connectionStateTtl + this.maxIdleInterval && (o.logAction(
          this.logger,
          o.LOG_MINOR,
          "ConnectionManager.checkConnectionStateFreshness()",
          "Last known activity from realtime was " + t + "ms ago; discarding connection state"
        ), this.clearConnection(), this.states.connecting.failState = "suspended");
      }
      /**
       * Called when the connectionmanager wants to persist transport
       * state for later recovery. Only applicable in the browser context.
       */
      persistConnection() {
        if (Ue()) {
          const t = this.createRecoveryKey();
          t && this.setSessionRecoverData({
            recoveryKey: t,
            disconnectedAt: Date.now(),
            location: Ur.location,
            clientId: this.realtime.auth.clientId
          });
        }
      }
      /**
       * Called when the connectionmanager wants to persist transport
       * state for later recovery. Only applicable in the browser context.
       */
      unpersistConnection() {
        this.clearSessionRecoverData();
      }
      /*********************
       * state management
       *********************/
      getError() {
        if (this.errorReason) {
          const t = z.fromValues(this.errorReason);
          return t.cause = this.errorReason, t;
        }
        return this.getStateError();
      }
      getStateError() {
        var t, n;
        return (n = (t = Re)[this.state.state]) == null ? void 0 : n.call(t);
      }
      activeState() {
        return this.state.queueEvents || this.state.sendEvents;
      }
      enactStateChange(t) {
        const n = "Connection state", s = t.current + (t.reason ? "; reason: " + t.reason : "");
        t.current === "failed" ? o.logAction(this.logger, o.LOG_ERROR, n, s) : o.logAction(this.logger, o.LOG_MAJOR, n, s), o.logAction(
          this.logger,
          o.LOG_MINOR,
          "ConnectionManager.enactStateChange",
          "setting new state: " + t.current + "; reason = " + (t.reason && t.reason.message)
        );
        const i = this.state = this.states[t.current];
        t.reason && (this.errorReason = t.reason, this.realtime.connection.errorReason = t.reason), (i.terminal || i.state === "suspended") && this.clearConnection(), this.emit("connectionstate", t);
      }
      /****************************************
       * ConnectionManager connection lifecycle
       ****************************************/
      startTransitionTimer(t) {
        o.logAction(
          this.logger,
          o.LOG_MINOR,
          "ConnectionManager.startTransitionTimer()",
          "transitionState: " + t.state
        ), this.transitionTimer && (o.logAction(
          this.logger,
          o.LOG_MINOR,
          "ConnectionManager.startTransitionTimer()",
          "clearing already-running timer"
        ), clearTimeout(this.transitionTimer)), this.transitionTimer = setTimeout(() => {
          this.transitionTimer && (this.transitionTimer = null, o.logAction(
            this.logger,
            o.LOG_MINOR,
            "ConnectionManager " + t.state + " timer expired",
            "requesting new state: " + t.failState
          ), this.notifyState({ state: t.failState }));
        }, t.retryDelay);
      }
      cancelTransitionTimer() {
        o.logAction(this.logger, o.LOG_MINOR, "ConnectionManager.cancelTransitionTimer()", ""), this.transitionTimer && (clearTimeout(this.transitionTimer), this.transitionTimer = null);
      }
      startSuspendTimer() {
        this.suspendTimer || (this.suspendTimer = setTimeout(() => {
          this.suspendTimer && (this.suspendTimer = null, o.logAction(
            this.logger,
            o.LOG_MINOR,
            "ConnectionManager suspend timer expired",
            "requesting new state: suspended"
          ), this.states.connecting.failState = "suspended", this.notifyState({ state: "suspended" }));
        }, this.connectionStateTtl));
      }
      checkSuspendTimer(t) {
        t !== "disconnected" && t !== "suspended" && t !== "connecting" && this.cancelSuspendTimer();
      }
      cancelSuspendTimer() {
        this.states.connecting.failState = "disconnected", this.suspendTimer && (clearTimeout(this.suspendTimer), this.suspendTimer = null);
      }
      startRetryTimer(t) {
        this.retryTimer = setTimeout(() => {
          o.logAction(this.logger, o.LOG_MINOR, "ConnectionManager retry timer expired", "retrying"), this.retryTimer = null, this.requestState({ state: "connecting" });
        }, t);
      }
      cancelRetryTimer() {
        this.retryTimer && (clearTimeout(this.retryTimer), this.retryTimer = null);
      }
      startWebSocketSlowTimer() {
        this.webSocketSlowTimer = setTimeout(() => {
          o.logAction(
            this.logger,
            o.LOG_MINOR,
            "ConnectionManager WebSocket slow timer",
            "checking connectivity"
          ), this.wsCheckResult === null && this.checkWsConnectivity().then(() => {
            o.logAction(
              this.logger,
              o.LOG_MINOR,
              "ConnectionManager WebSocket slow timer",
              "ws connectivity check succeeded"
            ), this.wsCheckResult = !0;
          }).catch(() => {
            o.logAction(
              this.logger,
              o.LOG_MAJOR,
              "ConnectionManager WebSocket slow timer",
              "ws connectivity check failed"
            ), this.wsCheckResult = !1;
          }), this.realtime.http.checkConnectivity && X(this.realtime.http.checkConnectivity(), (t, n) => {
            t || !n ? (o.logAction(
              this.logger,
              o.LOG_MAJOR,
              "ConnectionManager WebSocket slow timer",
              "http connectivity check failed"
            ), this.cancelWebSocketGiveUpTimer(), this.notifyState({
              state: "disconnected",
              error: new m("Unable to connect (network unreachable)", 80003, 404)
            })) : o.logAction(
              this.logger,
              o.LOG_MINOR,
              "ConnectionManager WebSocket slow timer",
              "http connectivity check succeeded"
            );
          });
        }, this.options.timeouts.webSocketSlowTimeout);
      }
      cancelWebSocketSlowTimer() {
        this.webSocketSlowTimer && (clearTimeout(this.webSocketSlowTimer), this.webSocketSlowTimer = null);
      }
      startWebSocketGiveUpTimer(t) {
        this.webSocketGiveUpTimer = setTimeout(() => {
          var n, s;
          this.wsCheckResult || (o.logAction(
            this.logger,
            o.LOG_MINOR,
            "ConnectionManager WebSocket give up timer",
            "websocket connection took more than 10s; " + (this.baseTransport ? "trying base transport" : "")
          ), this.baseTransport ? (this.abandonedWebSocket = !0, (n = this.proposedTransport) == null || n.dispose(), (s = this.pendingTransport) == null || s.dispose(), this.connectBase(t, ++this.connectCounter)) : o.logAction(
            this.logger,
            o.LOG_MAJOR,
            "ConnectionManager WebSocket give up timer",
            "websocket connectivity appears to be unavailable but no other transports to try"
          ));
        }, this.options.timeouts.webSocketConnectTimeout);
      }
      cancelWebSocketGiveUpTimer() {
        this.webSocketGiveUpTimer && (clearTimeout(this.webSocketGiveUpTimer), this.webSocketGiveUpTimer = null);
      }
      notifyState(t) {
        var n, s;
        const i = t.state, r = i === "disconnected" && (this.state === this.states.connected || t.retryImmediately || this.state === this.states.connecting && t.error && ue.isTokenErr(t.error) && !(this.errorReason && ue.isTokenErr(this.errorReason)));
        if (o.logAction(
          this.logger,
          o.LOG_MINOR,
          "ConnectionManager.notifyState()",
          "new state: " + i + (r ? "; will retry connection immediately" : "")
        ), i == this.state.state || (this.cancelTransitionTimer(), this.cancelRetryTimer(), this.cancelWebSocketSlowTimer(), this.cancelWebSocketGiveUpTimer(), this.checkSuspendTimer(t.state), (i === "suspended" || i === "connected") && (this.disconnectedRetryCount = 0), this.state.terminal))
          return;
        const a = this.states[t.state];
        let l = a.retryDelay;
        a.state === "disconnected" && (this.disconnectedRetryCount++, l = mt(a.retryDelay, this.disconnectedRetryCount));
        const d = new it(
          this.state.state,
          a.state,
          l,
          t.error || ((s = (n = Re)[a.state]) == null ? void 0 : s.call(n))
        );
        if (r) {
          const u = () => {
            this.state === this.states.disconnected && (this.lastAutoReconnectAttempt = Date.now(), this.requestState({ state: "connecting" }));
          }, f = this.lastAutoReconnectAttempt && Date.now() - this.lastAutoReconnectAttempt + 1;
          f && f < 1e3 ? (o.logAction(
            this.logger,
            o.LOG_MICRO,
            "ConnectionManager.notifyState()",
            "Last reconnect attempt was only " + f + "ms ago, waiting another " + (1e3 - f) + "ms before trying again"
          ), setTimeout(u, 1e3 - f)) : y.Config.nextTick(u);
        } else (i === "disconnected" || i === "suspended") && this.startRetryTimer(l);
        (i === "disconnected" && !r || i === "suspended" || a.terminal) && y.Config.nextTick(() => {
          this.disconnectAllTransports();
        }), i == "connected" && !this.activeProtocol && o.logAction(
          this.logger,
          o.LOG_ERROR,
          "ConnectionManager.notifyState()",
          "Broken invariant: attempted to go into connected state, but there is no active protocol"
        ), this.enactStateChange(d), this.state.sendEvents ? this.sendQueuedMessages() : this.state.queueEvents || (this.realtime.channels.propogateConnectionInterruption(i, d.reason), this.failQueuedMessages(d.reason));
      }
      requestState(t) {
        var n, s;
        const i = t.state;
        if (o.logAction(
          this.logger,
          o.LOG_MINOR,
          "ConnectionManager.requestState()",
          "requested state: " + i + "; current state: " + this.state.state
        ), i == this.state.state || (this.cancelWebSocketSlowTimer(), this.cancelWebSocketGiveUpTimer(), this.cancelTransitionTimer(), this.cancelRetryTimer(), this.checkSuspendTimer(i), i == "connecting" && this.state.state == "connected") || i == "closing" && this.state.state == "closed")
          return;
        const r = this.states[i], a = new it(
          this.state.state,
          r.state,
          null,
          t.error || ((s = (n = Re)[r.state]) == null ? void 0 : s.call(n))
        );
        this.enactStateChange(a), i == "connecting" && y.Config.nextTick(() => {
          this.startConnect();
        }), i == "closing" && this.closeImpl();
      }
      startConnect() {
        if (this.state !== this.states.connecting) {
          o.logAction(
            this.logger,
            o.LOG_MINOR,
            "ConnectionManager.startConnect()",
            "Must be in connecting state to connect, but was " + this.state.state
          );
          return;
        }
        const t = this.realtime.auth, n = ++this.connectCounter, s = () => {
          this.checkConnectionStateFreshness(), this.getTransportParams((i) => {
            if (i.mode === "recover" && i.options.recover) {
              const r = Lt(i.options.recover);
              r && this.realtime.channels.recoverChannels(r.channelSerials);
            }
            n === this.connectCounter && this.connectImpl(i, n);
          });
        };
        if (o.logAction(this.logger, o.LOG_MINOR, "ConnectionManager.startConnect()", "starting connection"), this.startSuspendTimer(), this.startTransitionTimer(this.states.connecting), t.method === "basic")
          s();
        else {
          const i = (r) => {
            n === this.connectCounter && (r ? this.actOnErrorFromAuthorize(r) : s());
          };
          this.errorReason && ue.isTokenErr(this.errorReason) ? X(t._forceNewToken(null, null), i) : X(t._ensureValidAuthCredentials(!1), i);
        }
      }
      /*
       * there are, at most, two transports available with which a connection may
       * be attempted: web_socket and/or a base transport (xhr_polling in browsers,
       * comet in nodejs). web_socket is always preferred, and the base transport is
       * only used in case web_socket connectivity appears to be unavailable.
       *
       * connectImpl begins the transport selection process by checking which transports
       * are available, and if there is a cached preference. It then defers to the
       * transport-specific connect methods: connectWs and connectBase.
       *
       * It is also responsible for invalidating the cache in the case that a base
       * transport preference is stored but web socket connectivity is now available.
       *
       * handling of the case where we need to failover from web_socket to the base
       * transport is implemented in the connectWs method.
       */
      connectImpl(t, n) {
        const s = this.state.state;
        if (s !== this.states.connecting.state) {
          o.logAction(
            this.logger,
            o.LOG_MINOR,
            "ConnectionManager.connectImpl()",
            "Must be in connecting state to connect, but was " + s
          );
          return;
        }
        const i = this.getTransportPreference();
        i && i === this.baseTransport && this.webSocketTransportAvailable && this.checkWsConnectivity().then(() => {
          this.wsCheckResult = !0, this.abandonedWebSocket = !1, this.unpersistTransportPreference(), this.state === this.states.connecting && (o.logAction(
            this.logger,
            o.LOG_MINOR,
            "ConnectionManager.connectImpl():",
            "web socket connectivity available, cancelling connection attempt with " + this.baseTransport
          ), this.disconnectAllTransports(), this.connectWs(t, ++this.connectCounter));
        }).catch(fs), i && i === this.baseTransport || this.baseTransport && !this.webSocketTransportAvailable ? this.connectBase(t, n) : this.connectWs(t, n);
      }
      /*
       * connectWs starts two timers to monitor the success of a web_socket connection attempt:
       * - webSocketSlowTimer: if this timer fires before the connection succeeds,
       *   cm will simultaneously check websocket and http/xhr connectivity. if the http
       *   connectivity check fails, we give up the connection sequence entirely and
       *   transition to disconnected. if the websocket connectivity check fails then
       *   we assume no ws connectivity and failover to base transport. in the case that
       *   the checks succeed, we continue with websocket and wait for it to try fallback hosts
       *   and, if unsuccessful, ultimately transition to disconnected.
       * - webSocketGiveUpTimer: if this timer fires, and the preceding websocket
       *   connectivity check is still pending then we assume that there is an issue
       *   with the transport and fallback to base transport.
       */
      connectWs(t, n) {
        o.logAction(this.logger, o.LOG_MICRO, "ConnectionManager.connectWs()"), this.startWebSocketSlowTimer(), this.startWebSocketGiveUpTimer(t), this.tryTransportWithFallbacks("web_socket", t, !0, n, () => this.wsCheckResult !== !1 && !this.abandonedWebSocket);
      }
      connectBase(t, n) {
        o.logAction(this.logger, o.LOG_MICRO, "ConnectionManager.connectBase()"), this.baseTransport ? this.tryTransportWithFallbacks(this.baseTransport, t, !1, n, () => !0) : this.notifyState({
          state: "disconnected",
          error: new m("No transports left to try", 8e4, 404)
        });
      }
      tryTransportWithFallbacks(t, n, s, i, r) {
        o.logAction(
          this.logger,
          o.LOG_MICRO,
          "ConnectionManager.tryTransportWithFallbacks()",
          t
        );
        const a = (g) => {
          this.notifyState({ state: this.states.connecting.failState, error: g });
        }, l = s ? this.wsHosts.slice() : this.httpHosts.slice(), d = (g, w) => {
          if (i === this.connectCounter) {
            if (!r()) {
              w && w.dispose();
              return;
            }
            !w && !g && f();
          }
        }, u = l.shift();
        if (!u) {
          a(new m("Unable to connect (no available host)", 80003, 404));
          return;
        }
        n.host = u;
        const f = () => {
          if (!l.length) {
            a(new m("Unable to connect (and no more fallback hosts to try)", 80003, 404));
            return;
          }
          if (!this.realtime.http.checkConnectivity) {
            a(new z("Internal error: Http.checkConnectivity not set", null, 500));
            return;
          }
          X(
            this.realtime.http.checkConnectivity(),
            (g, w) => {
              if (i === this.connectCounter && r()) {
                if (g) {
                  a(g);
                  return;
                }
                if (!w) {
                  a(new m("Unable to connect (network unreachable)", 80003, 404));
                  return;
                }
                n.host = dt(l), this.tryATransport(n, t, d);
              }
            }
          );
        };
        if (this.forceFallbackHost && l.length) {
          this.forceFallbackHost = !1, f();
          return;
        }
        this.tryATransport(n, t, d);
      }
      closeImpl() {
        o.logAction(this.logger, o.LOG_MINOR, "ConnectionManager.closeImpl()", "closing connection"), this.cancelSuspendTimer(), this.startTransitionTimer(this.states.closing), this.pendingTransport && (o.logAction(
          this.logger,
          o.LOG_MICRO,
          "ConnectionManager.closeImpl()",
          "Closing pending transport: " + this.pendingTransport
        ), this.pendingTransport.close()), this.activeProtocol && (o.logAction(
          this.logger,
          o.LOG_MICRO,
          "ConnectionManager.closeImpl()",
          "Closing active transport: " + this.activeProtocol.getTransport()
        ), this.activeProtocol.getTransport().close()), this.notifyState({ state: "closed" });
      }
      onAuthUpdated(t, n) {
        var s;
        switch (this.state.state) {
          case "connected": {
            o.logAction(
              this.logger,
              o.LOG_MICRO,
              "ConnectionManager.onAuthUpdated()",
              "Sending AUTH message on active transport"
            );
            const i = (s = this.activeProtocol) == null ? void 0 : s.getTransport();
            i && i.onAuthUpdated && i.onAuthUpdated(t);
            const r = ae({
              action: E.AUTH,
              auth: {
                accessToken: t.token
              }
            });
            this.send(r);
            const a = () => {
              this.off(l), n(null, t);
            }, l = (d) => {
              d.current === "failed" && (this.off(a), this.off(l), n(d.reason || this.getStateError()));
            };
            this.once("connectiondetails", a), this.on("connectionstate", l);
            break;
          }
          case "connecting":
            o.logAction(
              this.logger,
              o.LOG_MICRO,
              "ConnectionManager.onAuthUpdated()",
              "Aborting current connection attempts in order to start again with the new auth details"
            ), this.disconnectAllTransports();
          default: {
            o.logAction(
              this.logger,
              o.LOG_MICRO,
              "ConnectionManager.onAuthUpdated()",
              "Connection state is " + this.state.state + "; waiting until either connected or failed"
            );
            const i = (r) => {
              switch (r.current) {
                case "connected":
                  this.off(i), n(null, t);
                  break;
                case "failed":
                case "closed":
                case "suspended":
                  this.off(i), n(r.reason || this.getStateError());
                  break;
              }
            };
            this.on("connectionstate", i), this.state.state === "connecting" ? this.startConnect() : this.requestState({ state: "connecting" });
          }
        }
      }
      disconnectAllTransports() {
        o.logAction(
          this.logger,
          o.LOG_MINOR,
          "ConnectionManager.disconnectAllTransports()",
          "Disconnecting all transports"
        ), this.connectCounter++, this.pendingTransport && (o.logAction(
          this.logger,
          o.LOG_MICRO,
          "ConnectionManager.disconnectAllTransports()",
          "Disconnecting pending transport: " + this.pendingTransport
        ), this.pendingTransport.disconnect()), delete this.pendingTransport, this.proposedTransport && (o.logAction(
          this.logger,
          o.LOG_MICRO,
          "ConnectionManager.disconnectAllTransports()",
          "Disconnecting proposed transport: " + this.pendingTransport
        ), this.proposedTransport.disconnect()), delete this.pendingTransport, this.activeProtocol && (o.logAction(
          this.logger,
          o.LOG_MICRO,
          "ConnectionManager.disconnectAllTransports()",
          "Disconnecting active transport: " + this.activeProtocol.getTransport()
        ), this.activeProtocol.getTransport().disconnect());
      }
      /******************
       * event queueing
       ******************/
      send(t, n, s) {
        s = s || fs;
        const i = this.state;
        if (i.sendEvents) {
          o.logAction(this.logger, o.LOG_MICRO, "ConnectionManager.send()", "sending event"), this.sendImpl(new ds(t, s));
          return;
        }
        if (!(n && i.queueEvents)) {
          const a = "rejecting event, queueEvent was " + n + ", state was " + i.state;
          o.logAction(this.logger, o.LOG_MICRO, "ConnectionManager.send()", a), s(this.errorReason || new m(a, 9e4, 400));
          return;
        }
        this.logger.shouldLog(o.LOG_MICRO) && o.logAction(
          this.logger,
          o.LOG_MICRO,
          "ConnectionManager.send()",
          "queueing msg; " + _t(t, this.realtime._RealtimePresence)
        ), this.queue(t, s);
      }
      sendImpl(t) {
        const n = t.message;
        t.ackRequired && !t.sendAttempted && (n.msgSerial = this.msgSerial++);
        try {
          this.activeProtocol.send(t);
        } catch (s) {
          o.logAction(
            this.logger,
            o.LOG_ERROR,
            "ConnectionManager.sendImpl()",
            "Unexpected exception in transport.send(): " + s.stack
          );
        }
      }
      queue(t, n) {
        o.logAction(this.logger, o.LOG_MICRO, "ConnectionManager.queue()", "queueing event");
        const s = this.queuedMessages.last(), i = this.options.maxMessageSize;
        s && !s.sendAttempted && Hr(s.message, t, i) ? (s.merged || (s.callback = It.create(this.logger, [s.callback]), s.merged = !0), s.callback.push(n)) : this.queuedMessages.push(new ds(t, n));
      }
      sendQueuedMessages() {
        o.logAction(
          this.logger,
          o.LOG_MICRO,
          "ConnectionManager.sendQueuedMessages()",
          "sending " + this.queuedMessages.count() + " queued messages"
        );
        let t;
        for (; t = this.queuedMessages.shift(); )
          this.sendImpl(t);
      }
      queuePendingMessages(t) {
        t && t.length && (o.logAction(
          this.logger,
          o.LOG_MICRO,
          "ConnectionManager.queuePendingMessages()",
          "queueing " + t.length + " pending messages"
        ), this.queuedMessages.prepend(t));
      }
      failQueuedMessages(t) {
        const n = this.queuedMessages.count();
        n > 0 && (o.logAction(
          this.logger,
          o.LOG_ERROR,
          "ConnectionManager.failQueuedMessages()",
          "failing " + n + " queued messages, err = " + L(t)
        ), this.queuedMessages.completeAllMessages(t));
      }
      onChannelMessage(t, n) {
        this.pendingChannelMessagesState.queue.push({ message: t, transport: n }), this.pendingChannelMessagesState.isProcessing || this.processNextPendingChannelMessage();
      }
      processNextPendingChannelMessage() {
        if (this.pendingChannelMessagesState.queue.length > 0) {
          this.pendingChannelMessagesState.isProcessing = !0;
          const t = this.pendingChannelMessagesState.queue.shift();
          this.processChannelMessage(t.message).catch((n) => {
            o.logAction(
              this.logger,
              o.LOG_ERROR,
              "ConnectionManager.processNextPendingChannelMessage() received error ",
              n
            );
          }).finally(() => {
            this.pendingChannelMessagesState.isProcessing = !1, this.processNextPendingChannelMessage();
          });
        }
      }
      async processChannelMessage(t) {
        await this.realtime.channels.processChannelMessage(t);
      }
      async ping() {
        var t;
        if (this.state.state !== "connected")
          throw new m("Unable to ping service; not connected", 4e4, 400);
        const n = (t = this.activeProtocol) == null ? void 0 : t.getTransport();
        if (!n)
          throw this.getStateError();
        o.logAction(this.logger, o.LOG_MINOR, "ConnectionManager.ping()", "transport = " + n);
        const s = Date.now(), i = gt();
        return kn(
          new Promise((r) => {
            const a = (l) => {
              l === i && (n.off("heartbeat", a), r(Date.now() - s));
            };
            n.on("heartbeat", a), n.ping(i);
          }),
          this.options.timeouts.realtimeRequestTimeout,
          "Timeout waiting for heartbeat response"
        );
      }
      abort(t) {
        this.activeProtocol.getTransport().fail(t);
      }
      getTransportPreference() {
        var t, n;
        return this.transportPreference || Bt() && ((n = (t = y.WebStorage) == null ? void 0 : t.get) == null ? void 0 : n.call(t, Nt));
      }
      persistTransportPreference(t) {
        var n, s;
        this.transportPreference = t.shortName, Bt() && ((s = (n = y.WebStorage) == null ? void 0 : n.set) == null || s.call(n, Nt, t.shortName));
      }
      unpersistTransportPreference() {
        var t, n;
        this.transportPreference = null, Bt() && ((n = (t = y.WebStorage) == null ? void 0 : t.remove) == null || n.call(t, Nt));
      }
      /* This method is only used during connection attempts, so implements RSA4c1, RSA4c2,
       * and RSA4d. It is generally not invoked for serverside-triggered reauths or manual
       * reauths, so RSA4c3 does not apply, except (per per RSA4d1) in the case that the auth
       * server returns 403. */
      actOnErrorFromAuthorize(t) {
        if (t.code === 40171)
          this.notifyState({ state: "failed", error: t });
        else if (t.code === 40102)
          this.notifyState({ state: "failed", error: t });
        else if (t.statusCode === st.Forbidden) {
          const n = "Client configured authentication provider returned 403; failing the connection";
          o.logAction(this.logger, o.LOG_ERROR, "ConnectionManager.actOnErrorFromAuthorize()", n), this.notifyState({ state: "failed", error: new m(n, 80019, 403, t) });
        } else {
          const n = "Client configured authentication provider request failed";
          o.logAction(this.logger, o.LOG_MINOR, "ConnectionManager.actOnErrorFromAuthorize", n), this.notifyState({ state: this.state.failState, error: new m(n, 80019, 401, t) });
        }
      }
      onConnectionDetailsUpdate(t, n) {
        if (!t)
          return;
        this.connectionDetails = t, t.maxMessageSize && (this.options.maxMessageSize = t.maxMessageSize);
        const s = t.clientId;
        if (s) {
          const r = this.realtime.auth._uncheckedSetClientId(s);
          if (r) {
            o.logAction(this.logger, o.LOG_ERROR, "ConnectionManager.onConnectionDetailsUpdate()", r.message), n.fail(r);
            return;
          }
        }
        const i = t.connectionStateTtl;
        i && (this.connectionStateTtl = i), this.maxIdleInterval = t.maxIdleInterval, this.emit("connectiondetails", t);
      }
      checkWsConnectivity() {
        const t = new y.Config.WebSocket(S.wsConnectivityUrl);
        return new Promise((n, s) => {
          let i = !1;
          t.onopen = () => {
            i || (i = !0, n(), t.close());
          }, t.onclose = t.onerror = () => {
            i || (i = !0, s());
          };
        });
      }
      sessionRecoveryName() {
        return this.options.recoveryKeyStorageName || "ably-connection-recovery";
      }
      getSessionRecoverData() {
        var t, n;
        return Ue() && ((n = (t = y.WebStorage) == null ? void 0 : t.getSession) == null ? void 0 : n.call(t, this.sessionRecoveryName()));
      }
      setSessionRecoverData(t) {
        var n, s;
        return Ue() && ((s = (n = y.WebStorage) == null ? void 0 : n.setSession) == null ? void 0 : s.call(n, this.sessionRecoveryName(), t));
      }
      clearSessionRecoverData() {
        var t, n;
        return Ue() && ((n = (t = y.WebStorage) == null ? void 0 : t.removeSession) == null ? void 0 : n.call(t, this.sessionRecoveryName()));
      }
    }, gs = Dr, Wr = class extends V {
      constructor(e, t) {
        super(e.logger), this.whenState = (n) => V.prototype.whenState.call(this, n, this.state), this.ably = e, this.connectionManager = new gs(e, t), this.state = this.connectionManager.state.state, this.key = void 0, this.id = void 0, this.errorReason = null, this.connectionManager.on("connectionstate", (n) => {
          const s = this.state = n.current;
          y.Config.nextTick(() => {
            this.emit(s, n);
          });
        }), this.connectionManager.on("update", (n) => {
          y.Config.nextTick(() => {
            this.emit("update", n);
          });
        });
      }
      connect() {
        o.logAction(this.logger, o.LOG_MINOR, "Connection.connect()", ""), this.connectionManager.requestState({ state: "connecting" });
      }
      async ping() {
        return o.logAction(this.logger, o.LOG_MINOR, "Connection.ping()", ""), this.connectionManager.ping();
      }
      close() {
        o.logAction(this.logger, o.LOG_MINOR, "Connection.close()", "connectionKey = " + this.key), this.connectionManager.requestState({ state: "closing" });
      }
      get recoveryKey() {
        return this.logger.deprecationWarning(
          "The `Connection.recoveryKey` attribute has been replaced by the `Connection.createRecoveryKey()` method. Replace your usage of `recoveryKey` with the return value of `createRecoveryKey()`. `recoveryKey` will be removed in a future version."
        ), this.createRecoveryKey();
      }
      createRecoveryKey() {
        return this.connectionManager.createRecoveryKey();
      }
    }, Zr = Wr, zr = class {
      constructor(e, t, n, s, i) {
        this.previous = e, this.current = t, t === "attached" && (this.resumed = n, this.hasBacklog = s), i && (this.reason = i);
      }
    }, Ut = zr, ps = function() {
    };
    function jr(e) {
      if (e && "params" in e && !Oe(e.params))
        return new m("options.params must be an object", 4e4, 400);
      if (e && "modes" in e) {
        if (!Array.isArray(e.modes))
          return new m("options.modes must be an array", 4e4, 400);
        for (let t = 0; t < e.modes.length; t++) {
          const n = e.modes[t];
          if (!n || typeof n != "string" || !ls.includes(String.prototype.toUpperCase.call(n)))
            return new m("Invalid channel mode: " + n, 4e4, 400);
        }
      }
    }
    var Vr = class tn extends V {
      constructor(t, n, s) {
        var i, r;
        super(t.logger), this.retryCount = 0, this.history = async function(a) {
          o.logAction(this.logger, o.LOG_MICRO, "RealtimeChannel.history()", "channel = " + this.name);
          const l = this.client.rest.channelMixin;
          if (a && a.untilAttach) {
            if (this.state !== "attached")
              throw new m("option untilAttach requires the channel to be attached", 4e4, 400);
            if (!this.properties.attachSerial)
              throw new m(
                "untilAttach was specified and channel is attached, but attachSerial is not defined",
                4e4,
                400
              );
            delete a.untilAttach, a.from_serial = this.properties.attachSerial;
          }
          return l.history(this, a);
        }, this.whenState = (a) => V.prototype.whenState.call(this, a, this.state), o.logAction(this.logger, o.LOG_MINOR, "RealtimeChannel()", "started; name = " + n), this.name = n, this.channelOptions = tt((i = t._Crypto) != null ? i : null, this.logger, s), this.client = t, this._presence = t._RealtimePresence ? new t._RealtimePresence.RealtimePresence(this) : null, this.connectionManager = t.connection.connectionManager, this.state = "initialized", this.subscriptions = new V(this.logger), this.syncChannelSerial = void 0, this.properties = {
          attachSerial: void 0,
          channelSerial: void 0
        }, this.setOptions(s), this.errorReason = null, this._requestedFlags = null, this._mode = null, this._attachResume = !1, this._decodingContext = {
          channelOptions: this.channelOptions,
          plugins: t.options.plugins || {},
          baseEncodedPreviousPayload: void 0
        }, this._lastPayload = {
          messageId: null,
          protocolMessageChannelSerial: null,
          decodeFailureRecoveryInProgress: null
        }, this._allChannelChanges = new V(this.logger), (r = t.options.plugins) != null && r.Push && (this._push = new t.options.plugins.Push.PushChannel(this));
      }
      get presence() {
        return this._presence || K("RealtimePresence"), this._presence;
      }
      get push() {
        return this._push || K("Push"), this._push;
      }
      invalidStateError() {
        return new m(
          "Channel operation failed as channel state is " + this.state,
          90001,
          400,
          this.errorReason || void 0
        );
      }
      static processListenerArgs(t) {
        return t = Array.prototype.slice.call(t), typeof t[0] == "function" && t.unshift(null), t;
      }
      async setOptions(t) {
        var n;
        const s = this.channelOptions, i = jr(t);
        if (i)
          throw i;
        if (this.channelOptions = tt((n = this.client._Crypto) != null ? n : null, this.logger, t), this._decodingContext && (this._decodingContext.channelOptions = this.channelOptions), this._shouldReattachToSetOptions(t, s))
          return this.attachImpl(), new Promise((r, a) => {
            this._allChannelChanges.once(
              ["attached", "update", "detached", "failed"],
              function(l) {
                switch (this.event) {
                  case "update":
                  case "attached":
                    r();
                    break;
                  default:
                    a(l.reason);
                }
              }
            );
          });
      }
      _shouldReattachToSetOptions(t, n) {
        if (!(this.state === "attached" || this.state === "attaching"))
          return !1;
        if (t != null && t.params) {
          const s = ms(t.params), i = ms(n.params);
          if (Object.keys(s).length !== Object.keys(i).length || !Sn(i, s))
            return !0;
        }
        return !!(t != null && t.modes && (!n.modes || !An(t.modes, n.modes)));
      }
      async publish(...t) {
        let n = t[0], s = t.length;
        if (!this.connectionManager.activeState())
          throw this.connectionManager.getError();
        if (s == 1)
          if (Oe(n))
            n = [be(n)];
          else if (Array.isArray(n))
            n = vt(n);
          else
            throw new m(
              "The single-argument form of publish() expects a message object or an array of message objects",
              40013,
              400
            );
        else
          n = [be({ name: t[0], data: t[1] })];
        const i = this.client.options.maxMessageSize;
        await Xn(n, this.channelOptions);
        const r = St(n);
        if (r > i)
          throw new m(
            "Maximum size of messages that can be published at once exceeded ( was " + r + " bytes; limit is " + i + " bytes)",
            40009,
            400
          );
        return new Promise((a, l) => {
          this._publish(n, (d) => d ? l(d) : a());
        });
      }
      _publish(t, n) {
        o.logAction(this.logger, o.LOG_MICRO, "RealtimeChannel.publish()", "message count = " + t.length);
        const s = this.state;
        switch (s) {
          case "failed":
          case "suspended":
            n(m.fromValues(this.invalidStateError()));
            break;
          default: {
            o.logAction(
              this.logger,
              o.LOG_MICRO,
              "RealtimeChannel.publish()",
              "sending message; channel state is " + s
            );
            const i = new hs();
            i.action = E.MESSAGE, i.channel = this.name, i.messages = t, this.sendMessage(i, n);
            break;
          }
        }
      }
      onEvent(t) {
        o.logAction(this.logger, o.LOG_MICRO, "RealtimeChannel.onEvent()", "received message");
        const n = this.subscriptions;
        for (let s = 0; s < t.length; s++) {
          const i = t[s];
          n.emit(i.name, i);
        }
      }
      async attach() {
        return this.state === "attached" ? null : new Promise((t, n) => {
          this._attach(!1, null, (s, i) => s ? n(s) : t(i));
        });
      }
      _attach(t, n, s) {
        s || (s = (r) => {
          r && o.logAction(
            this.logger,
            o.LOG_ERROR,
            "RealtimeChannel._attach()",
            "Channel attach failed: " + r.toString()
          );
        });
        const i = this.connectionManager;
        if (!i.activeState()) {
          s(i.getError());
          return;
        }
        (this.state !== "attaching" || t) && this.requestState("attaching", n), this.once(function(r) {
          switch (this.event) {
            case "attached":
              s == null || s(null, r);
              break;
            case "detached":
            case "suspended":
            case "failed":
              s == null || s(
                r.reason || i.getError() || new m("Unable to attach; reason unknown; state = " + this.event, 9e4, 500)
              );
              break;
            case "detaching":
              s == null || s(new m("Attach request superseded by a subsequent detach request", 9e4, 409));
              break;
          }
        });
      }
      attachImpl() {
        o.logAction(this.logger, o.LOG_MICRO, "RealtimeChannel.attachImpl()", "sending ATTACH message");
        const t = ae({
          action: E.ATTACH,
          channel: this.name,
          params: this.channelOptions.params,
          // RTL4c1: Includes the channel serial to resume from a previous message
          // or attachment.
          channelSerial: this.properties.channelSerial
        });
        this._requestedFlags ? t.encodeModesToFlags(this._requestedFlags) : this.channelOptions.modes && t.encodeModesToFlags(On(this.channelOptions.modes)), this._attachResume && t.setFlag("ATTACH_RESUME"), this._lastPayload.decodeFailureRecoveryInProgress && (t.channelSerial = this._lastPayload.protocolMessageChannelSerial), this.sendMessage(t, ps);
      }
      async detach() {
        const t = this.connectionManager;
        if (!t.activeState())
          throw t.getError();
        switch (this.state) {
          case "suspended":
            this.notifyState("detached");
            return;
          case "detached":
            return;
          case "failed":
            throw new m("Unable to detach; channel state = failed", 90001, 400);
          default:
            this.requestState("detaching");
          case "detaching":
            return new Promise((n, s) => {
              this.once(function(i) {
                switch (this.event) {
                  case "detached":
                    n();
                    break;
                  case "attached":
                  case "suspended":
                  case "failed":
                    s(
                      i.reason || t.getError() || new m("Unable to detach; reason unknown; state = " + this.event, 9e4, 500)
                    );
                    break;
                  case "attaching":
                    s(new m("Detach request superseded by a subsequent attach request", 9e4, 409));
                    break;
                }
              });
            });
        }
      }
      detachImpl(t) {
        o.logAction(this.logger, o.LOG_MICRO, "RealtimeChannel.detach()", "sending DETACH message");
        const n = ae({ action: E.DETACH, channel: this.name });
        this.sendMessage(n, t || ps);
      }
      async subscribe(...t) {
        const [n, s] = tn.processListenerArgs(t);
        if (this.state === "failed")
          throw m.fromValues(this.invalidStateError());
        return n && typeof n == "object" && !Array.isArray(n) ? this.client._FilteredSubscriptions.subscribeFilter(this, n, s) : this.subscriptions.on(n, s), this.attach();
      }
      unsubscribe(...t) {
        var n;
        const [s, i] = tn.processListenerArgs(t);
        if (typeof s == "object" && !i || (n = this.filteredSubscriptions) != null && n.has(i)) {
          this.client._FilteredSubscriptions.getAndDeleteFilteredSubscriptions(this, s, i).forEach((r) => this.subscriptions.off(r));
          return;
        }
        this.subscriptions.off(s, i);
      }
      sync() {
        switch (this.state) {
          case "initialized":
          case "detaching":
          case "detached":
            throw new z("Unable to sync to channel; not attached", 4e4);
        }
        const t = this.connectionManager;
        if (!t.activeState())
          throw t.getError();
        const n = ae({ action: E.SYNC, channel: this.name });
        this.syncChannelSerial && (n.channelSerial = this.syncChannelSerial), t.send(n);
      }
      sendMessage(t, n) {
        this.connectionManager.send(t, this.client.options.queueMessages, n);
      }
      sendPresence(t, n) {
        const s = ae({
          action: E.PRESENCE,
          channel: this.name,
          presence: Array.isArray(t) ? this.client._RealtimePresence.presenceMessagesFromValuesArray(t) : [this.client._RealtimePresence.presenceMessageFromValues(t)]
        });
        this.sendMessage(s, n);
      }
      // Access to this method is synchronised by ConnectionManager#processChannelMessage, in order to synchronise access to the state stored in _decodingContext.
      async processMessage(t) {
        (t.action === E.ATTACHED || t.action === E.MESSAGE || t.action === E.PRESENCE) && this.setChannelSerial(t.channelSerial);
        let n, s = !1;
        switch (t.action) {
          case E.ATTACHED: {
            this.properties.attachSerial = t.channelSerial, this._mode = t.getMode(), this.params = t.params || {};
            const i = t.decodeModesFromFlags();
            this.modes = i && pt(i) || void 0;
            const r = t.hasFlag("RESUMED"), a = t.hasFlag("HAS_PRESENCE"), l = t.hasFlag("HAS_BACKLOG");
            if (this.state === "attached") {
              r || this._presence && this._presence.onAttached(a);
              const d = new Ut(this.state, this.state, r, l, t.error);
              this._allChannelChanges.emit("update", d), (!r || this.channelOptions.updateOnAttached) && this.emit("update", d);
            } else this.state === "detaching" ? this.checkPendingState() : this.notifyState("attached", t.error, r, a, l);
            break;
          }
          case E.DETACHED: {
            const i = t.error ? m.fromValues(t.error) : new m("Channel detached", 90001, 404);
            this.state === "detaching" ? this.notifyState("detached", i) : this.state === "attaching" ? this.notifyState("suspended", i) : (this.state === "attached" || this.state === "suspended") && this.requestState("attaching", i);
            break;
          }
          case E.SYNC:
            if (s = !0, n = this.syncChannelSerial = t.channelSerial, !t.presence)
              break;
          case E.PRESENCE: {
            const i = t.presence;
            if (!i)
              break;
            const { id: r, connectionId: a, timestamp: l } = t, d = this.channelOptions;
            let u;
            for (let f = 0; f < i.length; f++)
              try {
                u = i[f], await Mt(u, d), u.connectionId || (u.connectionId = a), u.timestamp || (u.timestamp = l), u.id || (u.id = r + ":" + f);
              } catch (g) {
                o.logAction(
                  this.logger,
                  o.LOG_ERROR,
                  "RealtimeChannel.processMessage()",
                  g.toString()
                );
              }
            this._presence && this._presence.setPresence(i, s, n);
            break;
          }
          case E.MESSAGE: {
            if (this.state !== "attached") {
              o.logAction(
                this.logger,
                o.LOG_MAJOR,
                "RealtimeChannel.processMessage()",
                'Message "' + t.id + '" skipped as this channel "' + this.name + '" state is not "attached" (state is "' + this.state + '").'
              );
              return;
            }
            const i = t.messages, r = i[0], a = i[i.length - 1], l = t.id, d = t.connectionId, u = t.timestamp;
            if (r.extras && r.extras.delta && r.extras.delta.from !== this._lastPayload.messageId) {
              const f = 'Delta message decode failure - previous message not available for message "' + t.id + '" on this channel "' + this.name + '".';
              o.logAction(this.logger, o.LOG_ERROR, "RealtimeChannel.processMessage()", f), this._startDecodeFailureRecovery(new m(f, 40018, 400));
              break;
            }
            for (let f = 0; f < i.length; f++) {
              const g = i[f];
              try {
                await Le(g, this._decodingContext);
              } catch (w) {
                switch (o.logAction(
                  this.logger,
                  o.LOG_ERROR,
                  "RealtimeChannel.processMessage()",
                  w.toString()
                ), w.code) {
                  case 40018:
                    this._startDecodeFailureRecovery(w);
                    return;
                  case 40019:
                  case 40021:
                    this.notifyState("failed", w);
                    return;
                }
              }
              g.connectionId || (g.connectionId = d), g.timestamp || (g.timestamp = u), g.id || (g.id = l + ":" + f);
            }
            this._lastPayload.messageId = a.id, this._lastPayload.protocolMessageChannelSerial = t.channelSerial, this.onEvent(i);
            break;
          }
          case E.ERROR: {
            const i = t.error;
            i && i.code == 80016 ? this.checkPendingState() : this.notifyState("failed", m.fromValues(i));
            break;
          }
          default:
            o.logAction(
              this.logger,
              o.LOG_ERROR,
              "RealtimeChannel.processMessage()",
              "Fatal protocol error: unrecognised action (" + t.action + ")"
            ), this.connectionManager.abort(Re.unknownChannelErr());
        }
      }
      _startDecodeFailureRecovery(t) {
        this._lastPayload.decodeFailureRecoveryInProgress || (o.logAction(
          this.logger,
          o.LOG_MAJOR,
          "RealtimeChannel.processMessage()",
          "Starting decode failure recovery process."
        ), this._lastPayload.decodeFailureRecoveryInProgress = !0, this._attach(!0, t, () => {
          this._lastPayload.decodeFailureRecoveryInProgress = !1;
        }));
      }
      onAttached() {
        o.logAction(
          this.logger,
          o.LOG_MINOR,
          "RealtimeChannel.onAttached",
          "activating channel; name = " + this.name
        );
      }
      notifyState(t, n, s, i, r) {
        if (o.logAction(
          this.logger,
          o.LOG_MICRO,
          "RealtimeChannel.notifyState",
          "name = " + this.name + ", current state = " + this.state + ", notifying state " + t
        ), this.clearStateTimer(), ["detached", "suspended", "failed"].includes(t) && (this.properties.channelSerial = null), t === this.state)
          return;
        this._presence && this._presence.actOnChannelState(t, i, n), t === "suspended" && this.connectionManager.state.sendEvents ? this.startRetryTimer() : this.cancelRetryTimer(), n && (this.errorReason = n);
        const a = new Ut(this.state, t, s, r, n), l = 'Channel state for channel "' + this.name + '"', d = t + (n ? "; reason: " + n : "");
        t === "failed" ? o.logAction(this.logger, o.LOG_ERROR, l, d) : o.logAction(this.logger, o.LOG_MAJOR, l, d), t !== "attaching" && t !== "suspended" && (this.retryCount = 0), t === "attached" && this.onAttached(), t === "attached" ? this._attachResume = !0 : (t === "detaching" || t === "failed") && (this._attachResume = !1), this.state = t, this._allChannelChanges.emit(t, a), this.emit(t, a);
      }
      requestState(t, n) {
        o.logAction(
          this.logger,
          o.LOG_MINOR,
          "RealtimeChannel.requestState",
          "name = " + this.name + ", state = " + t
        ), this.notifyState(t, n), this.checkPendingState();
      }
      checkPendingState() {
        if (!this.connectionManager.state.sendEvents) {
          o.logAction(
            this.logger,
            o.LOG_MINOR,
            "RealtimeChannel.checkPendingState",
            "sendEvents is false; state is " + this.connectionManager.state.state
          );
          return;
        }
        switch (o.logAction(
          this.logger,
          o.LOG_MINOR,
          "RealtimeChannel.checkPendingState",
          "name = " + this.name + ", state = " + this.state
        ), this.state) {
          case "attaching":
            this.startStateTimerIfNotRunning(), this.attachImpl();
            break;
          case "detaching":
            this.startStateTimerIfNotRunning(), this.detachImpl();
            break;
          case "attached":
            this.sync();
            break;
        }
      }
      timeoutPendingState() {
        switch (this.state) {
          case "attaching": {
            const t = new m("Channel attach timed out", 90007, 408);
            this.notifyState("suspended", t);
            break;
          }
          case "detaching": {
            const t = new m("Channel detach timed out", 90007, 408);
            this.notifyState("attached", t);
            break;
          }
          default:
            this.checkPendingState();
            break;
        }
      }
      startStateTimerIfNotRunning() {
        this.stateTimer || (this.stateTimer = setTimeout(() => {
          o.logAction(this.logger, o.LOG_MINOR, "RealtimeChannel.startStateTimerIfNotRunning", "timer expired"), this.stateTimer = null, this.timeoutPendingState();
        }, this.client.options.timeouts.realtimeRequestTimeout));
      }
      clearStateTimer() {
        const t = this.stateTimer;
        t && (clearTimeout(t), this.stateTimer = null);
      }
      startRetryTimer() {
        if (this.retryTimer)
          return;
        this.retryCount++;
        const t = mt(this.client.options.timeouts.channelRetryTimeout, this.retryCount);
        this.retryTimer = setTimeout(() => {
          this.state === "suspended" && this.connectionManager.state.sendEvents && (this.retryTimer = null, o.logAction(
            this.logger,
            o.LOG_MINOR,
            "RealtimeChannel retry timer expired",
            "attempting a new attach"
          ), this.requestState("attaching"));
        }, t);
      }
      cancelRetryTimer() {
        this.retryTimer && (clearTimeout(this.retryTimer), this.retryTimer = null);
      }
      /* @returns null (if can safely be released) | ErrorInfo (if cannot) */
      getReleaseErr() {
        const t = this.state;
        return t === "initialized" || t === "detached" || t === "failed" ? null : new m(
          "Can only release a channel in a state where there is no possibility of further updates from the server being received (initialized, detached, or failed); was " + t,
          90001,
          400
        );
      }
      setChannelSerial(t) {
        o.logAction(
          this.logger,
          o.LOG_MICRO,
          "RealtimeChannel.setChannelSerial()",
          "Updating channel serial; serial = " + t + "; previous = " + this.properties.channelSerial
        ), t && (this.properties.channelSerial = t);
      }
      async status() {
        return this.client.rest.channelMixin.status(this);
      }
    };
    function ms(e) {
      return ii(e || {}, ["agent"]);
    }
    var Ht = Vr, ys = class Xs extends zn {
      /*
       * The public typings declare that this only accepts an object, but since we want to emit a good error message in the case where a non-TypeScript user does one of these things:
       *
       * 1. passes a string (which is quite likely if they’re e.g. migrating from the default variant to the modular variant)
       * 2. passes no argument at all
       *
       * tell the compiler that these cases are possible so that it forces us to handle them.
       */
      constructor(t) {
        var n, s;
        if (super(S.objectifyOptions(t, !1, "BaseRealtime", o.defaultLogger)), o.logAction(this.logger, o.LOG_MINOR, "Realtime()", ""), typeof EdgeRuntime == "string")
          throw new m(
            `Ably.Realtime instance cannot be used in Vercel Edge runtime. If you are running Vercel Edge functions, please replace your "new Ably.Realtime()" with "new Ably.Rest()" and use Ably Rest API instead of the Realtime API. If you are server-rendering your application in the Vercel Edge runtime, please use the condition "if (typeof EdgeRuntime === 'string')" to prevent instantiating Ably.Realtime instance during SSR in the Vercel Edge runtime.`,
            4e4,
            400
          );
        this._additionalTransportImplementations = Xs.transportImplementationsFromPlugins(this.options.plugins), this._RealtimePresence = (s = (n = this.options.plugins) == null ? void 0 : n.RealtimePresence) != null ? s : null, this.connection = new Zr(this, this.options), this._channels = new Fr(this), this.options.autoConnect !== !1 && this.connect();
      }
      static transportImplementationsFromPlugins(t) {
        const n = {};
        return t != null && t.WebSocketTransport && (n[q.WebSocket] = t.WebSocketTransport), t != null && t.XHRPolling && (n[q.XhrPolling] = t.XHRPolling), n;
      }
      get channels() {
        return this._channels;
      }
      connect() {
        o.logAction(this.logger, o.LOG_MINOR, "Realtime.connect()", ""), this.connection.connect();
      }
      close() {
        o.logAction(this.logger, o.LOG_MINOR, "Realtime.close()", ""), this.connection.close();
      }
    };
    ys.EventEmitter = V;
    var Jr = ys, Fr = class extends V {
      constructor(e) {
        super(e.logger), this.realtime = e, this.all = /* @__PURE__ */ Object.create(null), e.connection.connectionManager.on("transport.active", () => {
          this.onTransportActive();
        });
      }
      channelSerials() {
        let e = {};
        for (const t of Be(this.all, !0)) {
          const n = this.all[t];
          n.properties.channelSerial && (e[t] = n.properties.channelSerial);
        }
        return e;
      }
      // recoverChannels gets the given channels and sets their channel serials.
      recoverChannels(e) {
        for (const t of Be(e, !0)) {
          const n = this.get(t);
          n.properties.channelSerial = e[t];
        }
      }
      // Access to this method is synchronised by ConnectionManager#processChannelMessage.
      async processChannelMessage(e) {
        const t = e.channel;
        if (t === void 0) {
          o.logAction(
            this.logger,
            o.LOG_ERROR,
            "Channels.processChannelMessage()",
            "received event unspecified channel, action = " + e.action
          );
          return;
        }
        const n = this.all[t];
        if (!n) {
          o.logAction(
            this.logger,
            o.LOG_ERROR,
            "Channels.processChannelMessage()",
            "received event for non-existent channel: " + t
          );
          return;
        }
        await n.processMessage(e);
      }
      /* called when a transport becomes connected; reattempt attach/detach
       * for channels that are attaching or detaching. */
      onTransportActive() {
        for (const e in this.all) {
          const t = this.all[e];
          t.state === "attaching" || t.state === "detaching" ? t.checkPendingState() : t.state === "suspended" ? t._attach(!1, null) : t.state === "attached" && t.requestState("attaching");
        }
      }
      /* Connection interruptions (ie when the connection will no longer queue
       * events) imply connection state changes for any channel which is either
       * attached, pending, or will attempt to become attached in the future */
      propogateConnectionInterruption(e, t) {
        const n = {
          closing: "detached",
          closed: "detached",
          failed: "failed",
          suspended: "suspended"
        }, s = ["attaching", "attached", "detaching", "suspended"], i = n[e];
        for (const r in this.all) {
          const a = this.all[r];
          s.includes(a.state) && a.notifyState(i, t);
        }
      }
      get(e, t) {
        e = String(e);
        let n = this.all[e];
        if (!n)
          n = this.all[e] = new Ht(this.realtime, e, t);
        else if (t) {
          if (n._shouldReattachToSetOptions(t, n.channelOptions))
            throw new m(
              "Channels.get() cannot be used to set channel options that would cause the channel to reattach. Please, use RealtimeChannel.setOptions() instead.",
              4e4,
              400
            );
          n.setOptions(t);
        }
        return n;
      }
      getDerived(e, t, n) {
        if (t.filter) {
          const s = $e(t.filter), i = Mn(e);
          e = `[filter=${s}${i.qualifierParam}]${i.channelName}`;
        }
        return this.get(e, n);
      }
      /* Included to support certain niche use-cases; most users should ignore this.
       * Please do not use this unless you know what you're doing */
      release(e) {
        e = String(e);
        const t = this.all[e];
        if (!t)
          return;
        const n = t.getReleaseErr();
        if (n)
          throw n;
        delete this.all[e];
      }
    }, Xr = Jr;
    function Yr(e) {
      return e.channel.client.auth.clientId;
    }
    function xt(e) {
      const t = e.channel.client, n = t.auth.clientId;
      return (!n || n === "*") && t.connection.state === "connected";
    }
    function qr(e, t, n) {
      switch (e.state) {
        case "attached":
        case "suspended":
          n();
          break;
        case "initialized":
        case "detached":
        case "detaching":
        case "attaching":
          X(e.attach(), function(s) {
            s ? t(s) : n();
          });
          break;
        default:
          t(m.fromValues(e.invalidStateError()));
      }
    }
    function bs(e, t) {
      if (e.isSynthesized() || t.isSynthesized())
        return e.timestamp >= t.timestamp;
      const n = e.parseId(), s = t.parseId();
      return n.msgSerial === s.msgSerial ? n.index > s.index : n.msgSerial > s.msgSerial;
    }
    var Qr = class extends V {
      constructor(e) {
        super(e.logger), this.channel = e, this.syncComplete = !1, this.members = new Is(this, (t) => t.clientId + ":" + t.connectionId), this._myMembers = new Is(this, (t) => t.clientId), this.subscriptions = new V(this.logger), this.pendingPresence = [];
      }
      async enter(e) {
        if (xt(this))
          throw new m("clientId must be specified to enter a presence channel", 40012, 400);
        return this._enterOrUpdateClient(void 0, void 0, e, "enter");
      }
      async update(e) {
        if (xt(this))
          throw new m("clientId must be specified to update presence data", 40012, 400);
        return this._enterOrUpdateClient(void 0, void 0, e, "update");
      }
      async enterClient(e, t) {
        return this._enterOrUpdateClient(void 0, e, t, "enter");
      }
      async updateClient(e, t) {
        return this._enterOrUpdateClient(void 0, e, t, "update");
      }
      async _enterOrUpdateClient(e, t, n, s) {
        const i = this.channel;
        if (!i.connectionManager.activeState())
          throw i.connectionManager.getError();
        o.logAction(
          this.logger,
          o.LOG_MICRO,
          "RealtimePresence." + s + "Client()",
          "channel = " + i.name + ", id = " + e + ", client = " + (t || "(implicit) " + Yr(this))
        );
        const r = ts(n);
        switch (r.action = s, e && (r.id = e), t && (r.clientId = t), await Ct(r, i.channelOptions), i.state) {
          case "attached":
            return new Promise((a, l) => {
              i.sendPresence(r, (d) => d ? l(d) : a());
            });
          case "initialized":
          case "detached":
            i.attach();
          case "attaching":
            return new Promise((a, l) => {
              this.pendingPresence.push({
                presence: r,
                callback: (d) => d ? l(d) : a()
              });
            });
          default: {
            const a = new z(
              "Unable to " + s + " presence channel while in " + i.state + " state",
              90001
            );
            throw a.code = 90001, a;
          }
        }
      }
      async leave(e) {
        if (xt(this))
          throw new m("clientId must have been specified to enter or leave a presence channel", 40012, 400);
        return this.leaveClient(void 0, e);
      }
      async leaveClient(e, t) {
        const n = this.channel;
        if (!n.connectionManager.activeState())
          throw n.connectionManager.getError();
        o.logAction(
          this.logger,
          o.LOG_MICRO,
          "RealtimePresence.leaveClient()",
          "leaving; channel = " + this.channel.name + ", client = " + e
        );
        const s = ts(t);
        return s.action = "leave", e && (s.clientId = e), new Promise((i, r) => {
          switch (n.state) {
            case "attached":
              n.sendPresence(s, (a) => a ? r(a) : i());
              break;
            case "attaching":
              this.pendingPresence.push({
                presence: s,
                callback: (a) => a ? r(a) : i()
              });
              break;
            case "initialized":
            case "failed": {
              const a = new z("Unable to leave presence channel (incompatible state)", 90001);
              r(a);
              break;
            }
            default:
              r(n.invalidStateError());
          }
        });
      }
      async get(e) {
        const t = !e || ("waitForSync" in e ? e.waitForSync : !0);
        return new Promise((n, s) => {
          function i(r) {
            n(e ? r.list(e) : r.values());
          }
          if (this.channel.state === "suspended") {
            t ? s(
              m.fromValues({
                statusCode: 400,
                code: 91005,
                message: "Presence state is out of sync due to channel being in the SUSPENDED state"
              })
            ) : i(this.members);
            return;
          }
          qr(
            this.channel,
            (r) => s(r),
            () => {
              const r = this.members;
              t ? r.waitSync(function() {
                i(r);
              }) : i(r);
            }
          );
        });
      }
      async history(e) {
        o.logAction(this.logger, o.LOG_MICRO, "RealtimePresence.history()", "channel = " + this.name);
        const t = this.channel.client.rest.presenceMixin;
        if (e && e.untilAttach)
          if (this.channel.state === "attached")
            delete e.untilAttach, e.from_serial = this.channel.properties.attachSerial;
          else
            throw new m(
              "option untilAttach requires the channel to be attached, was: " + this.channel.state,
              4e4,
              400
            );
        return t.history(this, e);
      }
      setPresence(e, t, n) {
        o.logAction(
          this.logger,
          o.LOG_MICRO,
          "RealtimePresence.setPresence()",
          "received presence for " + e.length + " participants; syncChannelSerial = " + n
        );
        let s, i;
        const r = this.members, a = this._myMembers, l = [], d = this.channel.connectionManager.connectionId;
        t && (this.members.startSync(), n && (i = n.match(/^[\w-]+:(.*)$/)) && (s = i[1]));
        for (let u = 0; u < e.length; u++) {
          const f = se(e[u]);
          switch (f.action) {
            case "leave":
              r.remove(f) && l.push(f), f.connectionId === d && !f.isSynthesized() && a.remove(f);
              break;
            case "enter":
            case "present":
            case "update":
              r.put(f) && l.push(f), f.connectionId === d && a.put(f);
              break;
          }
        }
        t && !s && (r.endSync(), this.channel.syncChannelSerial = null);
        for (let u = 0; u < l.length; u++) {
          const f = l[u];
          this.subscriptions.emit(f.action, f);
        }
      }
      onAttached(e) {
        o.logAction(
          this.logger,
          o.LOG_MINOR,
          "RealtimePresence.onAttached()",
          "channel = " + this.channel.name + ", hasPresence = " + e
        ), e ? this.members.startSync() : (this._synthesizeLeaves(this.members.values()), this.members.clear()), this._ensureMyMembersPresent();
        const t = this.pendingPresence, n = t.length;
        if (n) {
          this.pendingPresence = [];
          const s = [], i = It.create(this.logger);
          o.logAction(
            this.logger,
            o.LOG_MICRO,
            "RealtimePresence.onAttached",
            "sending " + n + " queued presence messages"
          );
          for (let r = 0; r < n; r++) {
            const a = t[r];
            s.push(a.presence), i.push(a.callback);
          }
          this.channel.sendPresence(s, i);
        }
      }
      actOnChannelState(e, t, n) {
        switch (e) {
          case "attached":
            this.onAttached(t);
            break;
          case "detached":
          case "failed":
            this._clearMyMembers(), this.members.clear();
          case "suspended":
            this.failPendingPresence(n);
            break;
        }
      }
      failPendingPresence(e) {
        if (this.pendingPresence.length) {
          o.logAction(
            this.logger,
            o.LOG_MINOR,
            "RealtimeChannel.failPendingPresence",
            "channel; name = " + this.channel.name + ", err = " + L(e)
          );
          for (let t = 0; t < this.pendingPresence.length; t++)
            try {
              this.pendingPresence[t].callback(e);
            } catch {
            }
          this.pendingPresence = [];
        }
      }
      _clearMyMembers() {
        this._myMembers.clear();
      }
      _ensureMyMembersPresent() {
        const e = this._myMembers, t = (n) => {
          if (n) {
            const s = "Presence auto-re-enter failed: " + n.toString(), i = new m(s, 91004, 400);
            o.logAction(this.logger, o.LOG_ERROR, "RealtimePresence._ensureMyMembersPresent()", s);
            const r = new Ut(this.channel.state, this.channel.state, !0, !1, i);
            this.channel.emit("update", r);
          }
        };
        for (const n in e.map) {
          const s = e.map[n];
          o.logAction(
            this.logger,
            o.LOG_MICRO,
            "RealtimePresence._ensureMyMembersPresent()",
            'Auto-reentering clientId "' + s.clientId + '" into the presence set'
          ), X(this._enterOrUpdateClient(s.id, s.clientId, s.data, "enter"), t);
        }
      }
      _synthesizeLeaves(e) {
        const t = this.subscriptions;
        e.forEach(function(n) {
          const s = se({
            action: "leave",
            connectionId: n.connectionId,
            clientId: n.clientId,
            data: n.data,
            encoding: n.encoding,
            timestamp: Date.now()
          });
          t.emit("leave", s);
        });
      }
      async subscribe(...e) {
        const t = Ht.processListenerArgs(e), n = t[0], s = t[1], i = this.channel;
        if (i.state === "failed")
          throw m.fromValues(i.invalidStateError());
        this.subscriptions.on(n, s), await i.attach();
      }
      unsubscribe(...e) {
        const t = Ht.processListenerArgs(e), n = t[0], s = t[1];
        this.subscriptions.off(n, s);
      }
    }, Is = class extends V {
      constructor(e, t) {
        super(e.logger), this.presence = e, this.map = /* @__PURE__ */ Object.create(null), this.syncInProgress = !1, this.residualMembers = null, this.memberKey = t;
      }
      get(e) {
        return this.map[e];
      }
      getClient(e) {
        const t = this.map, n = [];
        for (const s in t) {
          const i = t[s];
          i.clientId == e && i.action != "absent" && n.push(i);
        }
        return n;
      }
      list(e) {
        const t = this.map, n = e && e.clientId, s = e && e.connectionId, i = [];
        for (const r in t) {
          const a = t[r];
          a.action !== "absent" && (n && n != a.clientId || s && s != a.connectionId || i.push(a));
        }
        return i;
      }
      put(e) {
        (e.action === "enter" || e.action === "update") && (e = se(e), e.action = "present");
        const t = this.map, n = this.memberKey(e);
        this.residualMembers && delete this.residualMembers[n];
        const s = t[n];
        return s && !bs(e, s) ? !1 : (t[n] = e, !0);
      }
      values() {
        const e = this.map, t = [];
        for (const n in e) {
          const s = e[n];
          s.action != "absent" && t.push(s);
        }
        return t;
      }
      remove(e) {
        const t = this.map, n = this.memberKey(e), s = t[n];
        return s && !bs(e, s) ? !1 : (this.syncInProgress ? (e = se(e), e.action = "absent", t[n] = e) : delete t[n], !0);
      }
      startSync() {
        const e = this.map, t = this.syncInProgress;
        o.logAction(
          this.logger,
          o.LOG_MINOR,
          "PresenceMap.startSync()",
          "channel = " + this.presence.channel.name + "; syncInProgress = " + t
        ), this.syncInProgress || (this.residualMembers = Te(e), this.setInProgress(!0));
      }
      endSync() {
        const e = this.map, t = this.syncInProgress;
        if (o.logAction(
          this.logger,
          o.LOG_MINOR,
          "PresenceMap.endSync()",
          "channel = " + this.presence.channel.name + "; syncInProgress = " + t
        ), t) {
          for (const n in e)
            e[n].action === "absent" && delete e[n];
          this.presence._synthesizeLeaves(pn(this.residualMembers));
          for (const n in this.residualMembers)
            delete e[n];
          this.residualMembers = null, this.setInProgress(!1);
        }
        this.emit("sync");
      }
      waitSync(e) {
        const t = this.syncInProgress;
        if (o.logAction(
          this.logger,
          o.LOG_MINOR,
          "PresenceMap.waitSync()",
          "channel = " + this.presence.channel.name + "; syncInProgress = " + t
        ), !t) {
          e();
          return;
        }
        this.once("sync", e);
      }
      clear() {
        this.map = {}, this.setInProgress(!1), this.residualMembers = null;
      }
      setInProgress(e) {
        o.logAction(this.logger, o.LOG_MICRO, "PresenceMap.setInProgress()", "inProgress = " + e), this.syncInProgress = e, this.presence.syncComplete = !e;
      }
    }, Kr = Qr, $r = q.WebSocket;
    function eo(e) {
      return !!e.on;
    }
    var to = class extends Me {
      constructor(e, t, n) {
        super(e, t, n), this.shortName = $r, n.heartbeats = y.Config.useProtocolHeartbeats, this.wsHost = n.host;
      }
      static isAvailable() {
        return !!y.Config.WebSocket;
      }
      createWebSocket(e, t) {
        return this.uri = e + Ne(t), new y.Config.WebSocket(this.uri);
      }
      toString() {
        return "WebSocketTransport; uri=" + this.uri;
      }
      connect() {
        o.logAction(this.logger, o.LOG_MINOR, "WebSocketTransport.connect()", "starting"), Me.prototype.connect.call(this);
        const e = this, t = this.params, n = t.options, i = (n.tls ? "wss://" : "ws://") + this.wsHost + ":" + S.getPort(n) + "/";
        o.logAction(this.logger, o.LOG_MINOR, "WebSocketTransport.connect()", "uri: " + i), X(
          this.auth.getAuthParams(),
          function(r, a) {
            if (e.isDisposed)
              return;
            let l = "";
            for (const u in a)
              l += " " + u + ": " + a[u] + ";";
            if (o.logAction(
              e.logger,
              o.LOG_MINOR,
              "WebSocketTransport.connect()",
              "authParams:" + l + " err: " + r
            ), r) {
              e.disconnect(r);
              return;
            }
            const d = t.getConnectParams(a);
            try {
              const u = e.wsConnection = e.createWebSocket(i, d);
              u.binaryType = y.Config.binaryType, u.onopen = function() {
                e.onWsOpen();
              }, u.onclose = function(f) {
                e.onWsClose(f);
              }, u.onmessage = function(f) {
                e.onWsData(f.data);
              }, u.onerror = function(f) {
                e.onWsError(f);
              }, eo(u) && u.on("ping", function() {
                e.onActivity();
              });
            } catch (u) {
              o.logAction(
                e.logger,
                o.LOG_ERROR,
                "WebSocketTransport.connect()",
                "Unexpected exception creating websocket: err = " + (u.stack || u.message)
              ), e.disconnect(u);
            }
          }
        );
      }
      send(e) {
        const t = this.wsConnection;
        if (!t) {
          o.logAction(this.logger, o.LOG_ERROR, "WebSocketTransport.send()", "No socket connection");
          return;
        }
        try {
          t.send(
            vr(e, this.connectionManager.realtime._MsgPack, this.params.format)
          );
        } catch (n) {
          const s = "Exception from ws connection when trying to send: " + L(n);
          o.logAction(this.logger, o.LOG_ERROR, "WebSocketTransport.send()", s), this.finish("disconnected", new m(s, 5e4, 500));
        }
      }
      onWsData(e) {
        o.logAction(
          this.logger,
          o.LOG_MICRO,
          "WebSocketTransport.onWsData()",
          "data received; length = " + e.length + "; type = " + typeof e
        );
        try {
          this.onProtocolMessage(
            Sr(
              e,
              this.connectionManager.realtime._MsgPack,
              this.connectionManager.realtime._RealtimePresence,
              this.format
            )
          );
        } catch (t) {
          o.logAction(
            this.logger,
            o.LOG_ERROR,
            "WebSocketTransport.onWsData()",
            "Unexpected exception handing channel message: " + t.stack
          );
        }
      }
      onWsOpen() {
        o.logAction(this.logger, o.LOG_MINOR, "WebSocketTransport.onWsOpen()", "opened WebSocket"), this.emit("preconnect");
      }
      onWsClose(e) {
        let t, n;
        if (typeof e == "object" ? (n = e.code, t = e.wasClean || n === 1e3) : (n = e, t = n == 1e3), delete this.wsConnection, t) {
          o.logAction(this.logger, o.LOG_MINOR, "WebSocketTransport.onWsClose()", "Cleanly closed WebSocket");
          const s = new m("Websocket closed", 80003, 400);
          this.finish("disconnected", s);
        } else {
          const s = "Unclean disconnection of WebSocket ; code = " + n, i = new m(s, 80003, 400);
          o.logAction(this.logger, o.LOG_MINOR, "WebSocketTransport.onWsClose()", s), this.finish("disconnected", i);
        }
        this.emit("disposed");
      }
      onWsError(e) {
        o.logAction(
          this.logger,
          o.LOG_MINOR,
          "WebSocketTransport.onError()",
          "Error from WebSocket: " + e.message
        ), y.Config.nextTick(() => {
          this.disconnect(Error(e.message));
        });
      }
      dispose() {
        o.logAction(this.logger, o.LOG_MINOR, "WebSocketTransport.dispose()", ""), this.isDisposed = !0;
        const e = this.wsConnection;
        e && (e.onmessage = function() {
        }, delete this.wsConnection, y.Config.nextTick(() => {
          if (o.logAction(this.logger, o.LOG_MICRO, "WebSocketTransport.dispose()", "closing websocket"), !e)
            throw new Error("WebSocketTransport.dispose(): wsConnection is not defined");
          e.close();
        }));
      }
    }, Rs = to, no = class {
      static subscribeFilter(e, t, n) {
        const s = (i) => {
          var r, a, l, d, u, f;
          const g = {
            name: i.name,
            refTimeserial: (a = (r = i.extras) == null ? void 0 : r.ref) == null ? void 0 : a.timeserial,
            refType: (d = (l = i.extras) == null ? void 0 : l.ref) == null ? void 0 : d.type,
            isRef: !!((f = (u = i.extras) == null ? void 0 : u.ref) != null && f.timeserial),
            clientId: i.clientId
          };
          Object.entries(t).find(
            ([w, I]) => I !== void 0 ? g[w] !== I : !1
          ) || n(i);
        };
        this.addFilteredSubscription(e, t, n, s), e.subscriptions.on(s);
      }
      // Adds a new filtered subscription
      static addFilteredSubscription(e, t, n, s) {
        var i;
        if (e.filteredSubscriptions || (e.filteredSubscriptions = /* @__PURE__ */ new Map()), e.filteredSubscriptions.has(n)) {
          const r = e.filteredSubscriptions.get(n);
          r.set(t, ((i = r == null ? void 0 : r.get(t)) == null ? void 0 : i.concat(s)) || [s]);
        } else
          e.filteredSubscriptions.set(
            n,
            /* @__PURE__ */ new Map([[t, [s]]])
          );
      }
      static getAndDeleteFilteredSubscriptions(e, t, n) {
        if (!e.filteredSubscriptions)
          return [];
        if (!n && t)
          return Array.from(e.filteredSubscriptions.entries()).map(([r, a]) => {
            var l;
            let d = a.get(t);
            return a.delete(t), a.size === 0 && ((l = e.filteredSubscriptions) == null || l.delete(r)), d;
          }).reduce(
            (r, a) => a ? r.concat(...a) : r,
            []
          );
        if (!n || !e.filteredSubscriptions.has(n))
          return [];
        const s = e.filteredSubscriptions.get(n);
        if (!t) {
          const r = Array.from(s.values()).reduce((a, l) => a.concat(...l), []);
          return e.filteredSubscriptions.delete(n), r;
        }
        let i = s.get(t);
        return s.delete(t), i || [];
      }
    }, fe = class nn extends Xr {
      // The public typings declare that this requires an argument to be passed, but since we want to emit a good error message in the case where a non-TypeScript user does not pass an argument, tell the compiler that this is possible so that it forces us to handle it.
      constructor(t) {
        var n;
        const s = nn._MsgPack;
        if (!s)
          throw new Error("Expected DefaultRealtime._MsgPack to have been set");
        super(
          S.objectifyOptions(t, !0, "Realtime", o.defaultLogger, we(F({}, is), {
            Crypto: (n = nn.Crypto) != null ? n : void 0,
            MsgPack: s,
            RealtimePresence: {
              RealtimePresence: Kr,
              presenceMessageFromValues: se,
              presenceMessagesFromValuesArray: es
            },
            WebSocketTransport: Rs,
            MessageInteractions: no
          }))
        );
      }
      static get Crypto() {
        if (this._Crypto === null)
          throw new Error("Encryption not enabled; use ably.encryption.js instead");
        return this._Crypto;
      }
      static set Crypto(t) {
        this._Crypto = t;
      }
    };
    fe.Utils = ut, fe.ConnectionManager = gs, fe.ProtocolMessage = hs, fe._Crypto = null, fe.Message = rs, fe.PresenceMessage = os, fe._MsgPack = null, fe._Http = Tt;
    var Dt = fe, Wt = Uint8Array, He = Uint32Array, Zt = Math.pow, ws = new He(8), Ts = [], xe = new He(64);
    function Os(e) {
      return (e - (e | 0)) * Zt(2, 32) | 0;
    }
    for (var De = 2, We = 0; We < 64; ) {
      for (zt = !0, rt = 2; rt <= De / 2; rt++)
        De % rt === 0 && (zt = !1);
      zt && (We < 8 && (ws[We] = Os(Zt(De, 1 / 2))), Ts[We] = Os(Zt(De, 1 / 3)), We++), De++;
    }
    var zt, rt, so = !!new Wt(new He([1]).buffer)[0];
    function jt(e) {
      return so ? (
        // byte 1 -> byte 4
        e >>> 24 | // byte 2 -> byte 3
        (e >>> 16 & 255) << 8 | // byte 3 -> byte 2
        (e & 65280) << 8 | // byte 4 -> byte 1
        e << 24
      ) : e;
    }
    function ce(e, t) {
      return e >>> t | e << 32 - t;
    }
    function Vt(e) {
      var t = ws.slice(), n = e.length, s = n * 8, i = 512 - (s + 64) % 512 - 1 + s + 65, r = new Wt(i / 8), a = new He(r.buffer);
      r.set(e, 0), r[n] = 128, a[a.length - 1] = jt(s);
      for (var l, d = 0; d < i / 32; d += 16) {
        var u = t.slice();
        for (l = 0; l < 64; l++) {
          var f;
          if (l < 16)
            f = jt(a[d + l]);
          else {
            var g = xe[l - 15], w = xe[l - 2];
            f = xe[l - 7] + xe[l - 16] + (ce(g, 7) ^ ce(g, 18) ^ g >>> 3) + (ce(w, 17) ^ ce(w, 19) ^ w >>> 10);
          }
          xe[l] = f |= 0;
          for (var I = (ce(u[4], 6) ^ ce(u[4], 11) ^ ce(u[4], 25)) + (u[4] & u[5] ^ ~u[4] & u[6]) + u[7] + f + Ts[l], T = (ce(u[0], 2) ^ ce(u[0], 13) ^ ce(u[0], 22)) + (u[0] & u[1] ^ u[2] & (u[0] ^ u[1])), v = 7; v > 0; v--)
            u[v] = u[v - 1];
          u[0] = I + T | 0, u[4] = u[4] + I | 0;
        }
        for (l = 0; l < 8; l++)
          t[l] = t[l] + u[l] | 0;
      }
      return new Wt(
        new He(
          t.map(function(M) {
            return jt(M);
          })
        ).buffer
      );
    }
    function io(e, t) {
      if (e.length > 64 && (e = Vt(e)), e.length < 64) {
        const l = new Uint8Array(64);
        l.set(e, 0), e = l;
      }
      for (var n = new Uint8Array(64), s = new Uint8Array(64), i = 0; i < 64; i++)
        n[i] = 54 ^ e[i], s[i] = 92 ^ e[i];
      var r = new Uint8Array(t.length + 64);
      r.set(n, 0), r.set(t, 64);
      var a = new Uint8Array(96);
      return a.set(s, 0), a.set(Vt(r), 64), Vt(a);
    }
    var ro = class {
      constructor() {
        this.base64CharSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", this.hexCharSet = "0123456789abcdef";
      }
      // https://gist.githubusercontent.com/jonleighton/958841/raw/f200e30dfe95212c0165ccf1ae000ca51e9de803/gistfile1.js
      uint8ViewToBase64(e) {
        let t = "";
        const n = this.base64CharSet, s = e.byteLength, i = s % 3, r = s - i;
        let a, l, d, u, f;
        for (let g = 0; g < r; g = g + 3)
          f = e[g] << 16 | e[g + 1] << 8 | e[g + 2], a = (f & 16515072) >> 18, l = (f & 258048) >> 12, d = (f & 4032) >> 6, u = f & 63, t += n[a] + n[l] + n[d] + n[u];
        return i == 1 ? (f = e[r], a = (f & 252) >> 2, l = (f & 3) << 4, t += n[a] + n[l] + "==") : i == 2 && (f = e[r] << 8 | e[r + 1], a = (f & 64512) >> 10, l = (f & 1008) >> 4, d = (f & 15) << 2, t += n[a] + n[l] + n[d] + "="), t;
      }
      base64ToArrayBuffer(e) {
        const t = atob == null ? void 0 : atob(e), n = t.length, s = new Uint8Array(n);
        for (let i = 0; i < n; i++) {
          const r = t.charCodeAt(i);
          s[i] = r;
        }
        return this.toArrayBuffer(s);
      }
      isBuffer(e) {
        return e instanceof ArrayBuffer || ArrayBuffer.isView(e);
      }
      toBuffer(e) {
        if (!ArrayBuffer)
          throw new Error("Can't convert to Buffer: browser does not support the necessary types");
        if (e instanceof ArrayBuffer)
          return new Uint8Array(e);
        if (ArrayBuffer.isView(e))
          return new Uint8Array(this.toArrayBuffer(e));
        throw new Error("BufferUtils.toBuffer expected an ArrayBuffer or a view onto one");
      }
      toArrayBuffer(e) {
        if (!ArrayBuffer)
          throw new Error("Can't convert to ArrayBuffer: browser does not support the necessary types");
        if (e instanceof ArrayBuffer)
          return e;
        if (ArrayBuffer.isView(e))
          return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
        throw new Error("BufferUtils.toArrayBuffer expected an ArrayBuffer or a view onto one");
      }
      base64Encode(e) {
        return this.uint8ViewToBase64(this.toBuffer(e));
      }
      base64Decode(e) {
        if (ArrayBuffer && y.Config.atob)
          return this.base64ToArrayBuffer(e);
        throw new Error("Expected ArrayBuffer to exist and Platform.Config.atob to be configured");
      }
      hexEncode(e) {
        return this.toBuffer(e).reduce((n, s) => n + s.toString(16).padStart(2, "0"), "");
      }
      hexDecode(e) {
        if (e.length % 2 !== 0)
          throw new Error("Can't create a byte array from a hex string of odd length");
        const t = new Uint8Array(e.length / 2);
        for (let n = 0; n < t.length; n++)
          t[n] = parseInt(e.slice(2 * n, 2 * (n + 1)), 16);
        return this.toArrayBuffer(t);
      }
      utf8Encode(e) {
        if (y.Config.TextEncoder) {
          const t = new y.Config.TextEncoder().encode(e);
          return this.toArrayBuffer(t);
        } else
          throw new Error("Expected TextEncoder to be configured");
      }
      /* For utf8 decoding we apply slightly stricter input validation than to
       * hexEncode/base64Encode/etc: in those we accept anything that Buffer.from
       * can take (in particular allowing strings, which are just interpreted as
       * binary); here we ensure that the input is actually a buffer since trying
       * to utf8-decode a string to another string is almost certainly a mistake */
      utf8Decode(e) {
        if (!this.isBuffer(e))
          throw new Error("Expected input of utf8decode to be an arraybuffer or typed array");
        if (TextDecoder)
          return new TextDecoder().decode(e);
        throw new Error("Expected TextDecoder to be configured");
      }
      areBuffersEqual(e, t) {
        if (!e || !t)
          return !1;
        const n = this.toArrayBuffer(e), s = this.toArrayBuffer(t);
        if (n.byteLength != s.byteLength)
          return !1;
        const i = new Uint8Array(n), r = new Uint8Array(s);
        for (var a = 0; a < i.length; a++)
          if (i[a] != r[a])
            return !1;
        return !0;
      }
      byteLength(e) {
        return e instanceof ArrayBuffer || ArrayBuffer.isView(e) ? e.byteLength : -1;
      }
      arrayBufferViewToBuffer(e) {
        return this.toArrayBuffer(e);
      }
      hmacSha256(e, t) {
        const n = io(this.toBuffer(t), this.toBuffer(e));
        return this.toArrayBuffer(n);
      }
    }, Cs = new ro(), oo = function(e, t) {
      var n = "aes", s = 256, i = "cbc", r = 16;
      function a(w) {
        if (w.algorithm === "aes" && w.mode === "cbc") {
          if (w.keyLength === 128 || w.keyLength === 256)
            return;
          throw new Error(
            "Unsupported key length " + w.keyLength + " for aes-cbc encryption. Encryption key must be 128 or 256 bits (16 or 32 ASCII characters)"
          );
        }
      }
      function l(w) {
        return w.replace("_", "/").replace("-", "+");
      }
      function d(w) {
        return w instanceof u;
      }
      class u {
        constructor(I, T, v, M) {
          this.algorithm = I, this.keyLength = T, this.mode = v, this.key = M;
        }
      }
      class f {
        /**
         * Obtain a complete CipherParams instance from the provided params, filling
         * in any not provided with default values, calculating a keyLength from
         * the supplied key, and validating the result.
         * @param params an object containing at a minimum a `key` key with value the
         * key, as either a binary or a base64-encoded string.
         * May optionally also contain: algorithm (defaults to AES),
         * mode (defaults to 'cbc')
         */
        static getDefaultParams(I) {
          var T;
          if (!I.key)
            throw new Error("Crypto.getDefaultParams: a key is required");
          typeof I.key == "string" ? T = t.toArrayBuffer(t.base64Decode(l(I.key))) : I.key instanceof ArrayBuffer ? T = I.key : T = t.toArrayBuffer(I.key);
          var v = I.algorithm || n, M = T.byteLength * 8, B = I.mode || i, N = new u(v, M, B, T);
          if (I.keyLength && I.keyLength !== N.keyLength)
            throw new Error(
              "Crypto.getDefaultParams: a keyLength of " + I.keyLength + " was specified, but the key actually has length " + N.keyLength
            );
          return a(N), N;
        }
        /**
         * Generate a random encryption key from the supplied keylength (or the
         * default keyLength if none supplied) as an ArrayBuffer
         * @param keyLength (optional) the required keyLength in bits
         */
        static async generateRandomKey(I) {
          try {
            return e.getRandomArrayBuffer((I || s) / 8);
          } catch (T) {
            throw new m("Failed to generate random key: " + T.message, 400, 5e4, T);
          }
        }
        /**
         * Internal; get a ChannelCipher instance based on the given cipherParams
         * @param params either a CipherParams instance or some subset of its
         * fields that includes a key
         */
        static getCipher(I, T) {
          var v, M = d(I) ? I : this.getDefaultParams(I);
          return {
            cipherParams: M,
            cipher: new g(M, (v = I.iv) != null ? v : null, T)
          };
        }
      }
      f.CipherParams = u;
      class g {
        constructor(I, T, v) {
          if (this.logger = v, !crypto.subtle)
            throw isSecureContext ? new Error(
              "Crypto operations are not possible since the browser’s SubtleCrypto class is unavailable (reason unknown)."
            ) : new Error(
              "Crypto operations are is not possible since the current environment is a non-secure context and hence the browser’s SubtleCrypto class is not available."
            );
          this.algorithm = I.algorithm + "-" + String(I.keyLength) + "-" + I.mode, this.webCryptoAlgorithm = I.algorithm + "-" + I.mode, this.key = t.toArrayBuffer(I.key), this.iv = T ? t.toArrayBuffer(T) : null;
        }
        concat(I, T) {
          const v = new ArrayBuffer(I.byteLength + T.byteLength), M = new DataView(v), B = new DataView(t.toArrayBuffer(I));
          for (let U = 0; U < B.byteLength; U++)
            M.setInt8(U, B.getInt8(U));
          const N = new DataView(t.toArrayBuffer(T));
          for (let U = 0; U < N.byteLength; U++)
            M.setInt8(B.byteLength + U, N.getInt8(U));
          return v;
        }
        async encrypt(I) {
          o.logAction(this.logger, o.LOG_MICRO, "CBCCipher.encrypt()", "");
          const T = await this.getIv(), v = await crypto.subtle.importKey("raw", this.key, this.webCryptoAlgorithm, !1, ["encrypt"]), M = await crypto.subtle.encrypt({ name: this.webCryptoAlgorithm, iv: T }, v, I);
          return this.concat(T, M);
        }
        async decrypt(I) {
          o.logAction(this.logger, o.LOG_MICRO, "CBCCipher.decrypt()", "");
          const T = t.toArrayBuffer(I), v = T.slice(0, r), M = T.slice(r), B = await crypto.subtle.importKey("raw", this.key, this.webCryptoAlgorithm, !1, ["decrypt"]);
          return crypto.subtle.decrypt({ name: this.webCryptoAlgorithm, iv: v }, B, M);
        }
        async getIv() {
          if (this.iv) {
            var I = this.iv;
            return this.iv = null, I;
          }
          const T = await e.getRandomArrayBuffer(r);
          return t.toArrayBuffer(T);
        }
      }
      return f;
    }, vs = /* @__PURE__ */ ((e) => (e[e.REQ_SEND = 0] = "REQ_SEND", e[e.REQ_RECV = 1] = "REQ_RECV", e[e.REQ_RECV_POLL = 2] = "REQ_RECV_POLL", e[e.REQ_RECV_STREAM = 3] = "REQ_RECV_STREAM", e))(vs || {}), ge = vs;
    function Ss() {
      return new m(
        "No HTTP request plugin provided. Provide at least one of the FetchRequest or XHRRequest plugins.",
        400,
        4e4
      );
    }
    var Ze, Ms = (Ze = class {
      constructor(e) {
        this.checksInProgress = null, this.checkConnectivity = void 0, this.supportsAuthHeaders = !1, this.supportsLinkHeaders = !1;
        var t;
        this.client = e ?? null;
        const n = (e == null ? void 0 : e.options.connectivityCheckUrl) || S.connectivityCheckUrl, s = (t = e == null ? void 0 : e.options.connectivityCheckParams) != null ? t : null, i = !(e != null && e.options.connectivityCheckUrl), r = F(F({}, Ms.bundledRequestImplementations), e == null ? void 0 : e._additionalHTTPRequestImplementations), a = r.XHRRequest, l = r.FetchRequest, d = !!(a || l);
        if (!d)
          throw Ss();
        y.Config.xhrSupported && a ? (this.supportsAuthHeaders = !0, this.Request = async function(u, f, g, w, I) {
          return new Promise((T) => {
            var v;
            const M = a.createRequest(
              f,
              g,
              w,
              I,
              ge.REQ_SEND,
              (v = e && e.options.timeouts) != null ? v : null,
              this.logger,
              u
            );
            M.once(
              "complete",
              (B, N, U, A, $) => T({ error: B, body: N, headers: U, unpacked: A, statusCode: $ })
            ), M.exec();
          });
        }, e != null && e.options.disableConnectivityCheck ? this.checkConnectivity = async function() {
          return !0;
        } : this.checkConnectivity = async function() {
          var u;
          o.logAction(
            this.logger,
            o.LOG_MICRO,
            "(XHRRequest)Http.checkConnectivity()",
            "Sending; " + n
          );
          const f = await this.doUri(
            H.Get,
            n,
            null,
            null,
            s
          );
          let g = !1;
          return i ? g = !f.error && ((u = f.body) == null ? void 0 : u.replace(/\n/, "")) == "yes" : g = !f.error && ki(f.statusCode), o.logAction(this.logger, o.LOG_MICRO, "(XHRRequest)Http.checkConnectivity()", "Result: " + g), g;
        }) : y.Config.fetchSupported && l ? (this.supportsAuthHeaders = !0, this.Request = async (u, f, g, w, I) => l(u, e ?? null, f, g, w, I), this.checkConnectivity = async function() {
          var u;
          o.logAction(
            this.logger,
            o.LOG_MICRO,
            "(Fetch)Http.checkConnectivity()",
            "Sending; " + n
          );
          const f = await this.doUri(H.Get, n, null, null, null), g = !f.error && ((u = f.body) == null ? void 0 : u.replace(/\n/, "")) == "yes";
          return o.logAction(this.logger, o.LOG_MICRO, "(Fetch)Http.checkConnectivity()", "Result: " + g), g;
        }) : this.Request = async () => ({ error: d ? new z("no supported HTTP transports available", null, 400) : Ss() });
      }
      get logger() {
        var e, t;
        return (t = (e = this.client) == null ? void 0 : e.logger) != null ? t : o.defaultLogger;
      }
      async doUri(e, t, n, s, i) {
        return this.Request ? this.Request(e, t, n, i, s) : { error: new z("Request invoked before assigned to", null, 500) };
      }
      shouldFallback(e) {
        const t = e.statusCode;
        return t === 408 && !e.code || t === 400 && !e.code || t >= 500 && t <= 504;
      }
    }, Ze.methods = [H.Get, H.Delete, H.Post, H.Put, H.Patch], Ze.methodsWithoutBody = [H.Get, H.Delete], Ze.methodsWithBody = [H.Post, H.Put, H.Patch], Ze), As = Ms, Ae = "ablyjs-storage-test", ke = typeof pe < "u" ? pe : typeof window < "u" ? window : self, ao = class {
      constructor() {
        try {
          ke.sessionStorage.setItem(Ae, Ae), ke.sessionStorage.removeItem(Ae), this.sessionSupported = !0;
        } catch {
          this.sessionSupported = !1;
        }
        try {
          ke.localStorage.setItem(Ae, Ae), ke.localStorage.removeItem(Ae), this.localSupported = !0;
        } catch {
          this.localSupported = !1;
        }
      }
      get(e) {
        return this._get(e, !1);
      }
      getSession(e) {
        return this._get(e, !0);
      }
      remove(e) {
        return this._remove(e, !1);
      }
      removeSession(e) {
        return this._remove(e, !0);
      }
      set(e, t, n) {
        return this._set(e, t, n, !1);
      }
      setSession(e, t, n) {
        return this._set(e, t, n, !0);
      }
      _set(e, t, n, s) {
        const i = { value: t };
        return n && (i.expires = Date.now() + n), this.storageInterface(s).setItem(e, JSON.stringify(i));
      }
      _get(e, t) {
        if (t && !this.sessionSupported)
          throw new Error("Session Storage not supported");
        if (!t && !this.localSupported)
          throw new Error("Local Storage not supported");
        const n = this.storageInterface(t).getItem(e);
        if (!n)
          return null;
        const s = JSON.parse(n);
        return s.expires && s.expires < Date.now() ? (this.storageInterface(t).removeItem(e), null) : s.value;
      }
      _remove(e, t) {
        return this.storageInterface(t).removeItem(e);
      }
      storageInterface(e) {
        return e ? ke.sessionStorage : ke.localStorage;
      }
    }, ks = new ao(), x = yt(), co = typeof EdgeRuntime == "string";
    typeof Window > "u" && typeof WorkerGlobalScope > "u" && !co && console.log(
      "Warning: this distribution of Ably is intended for browsers. On nodejs, please use the 'ably' package on npm"
    );
    function lo() {
      const e = x.location;
      return !x.WebSocket || !e || !e.origin || e.origin.indexOf("http") > -1;
    }
    function ho() {
      return typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope;
    }
    var uo = x.navigator && x.navigator.userAgent.toString(), fo = x.location && x.location.href, go = {
      agent: "browser",
      logTimestamps: !0,
      userAgent: uo,
      currentUrl: fo,
      binaryType: "arraybuffer",
      WebSocket: x.WebSocket,
      fetchSupported: !!x.fetch,
      xhrSupported: x.XMLHttpRequest && "withCredentials" in new XMLHttpRequest(),
      allowComet: lo(),
      useProtocolHeartbeats: !0,
      supportsBinary: !!x.TextDecoder,
      /* Per Paddy (https://ably-real-time.slack.com/archives/CURL4U2FP/p1705674537763479) web intentionally prefers JSON to MessagePack:
       *
       * > browsers' support for binary types in general was historically poor, and JSON transport performance is significantly better in a browser than msgpack. In modern browsers then binary is supported consistently, but I'd still expect that JSON encode/decode performance is dramatically better than msgpack in a browser.
       */
      preferBinary: !1,
      ArrayBuffer: x.ArrayBuffer,
      atob: x.atob,
      nextTick: typeof x.setImmediate < "u" ? x.setImmediate.bind(x) : function(e) {
        setTimeout(e, 0);
      },
      addEventListener: x.addEventListener,
      inspect: JSON.stringify,
      stringByteSize: function(e) {
        return x.TextDecoder && new x.TextEncoder().encode(e).length || e.length;
      },
      TextEncoder: x.TextEncoder,
      TextDecoder: x.TextDecoder,
      getRandomArrayBuffer: async function(e) {
        const t = new Uint8Array(e);
        return x.crypto.getRandomValues(t), t.buffer;
      },
      isWebworker: ho(),
      push: {
        platform: "browser",
        formFactor: "desktop",
        storage: ks
      }
    }, Es = go;
    function po(e) {
      const t = [80015, 80017, 80030];
      return e.code ? ue.isTokenErr(e) ? !1 : t.includes(e.code) ? !0 : e.code >= 4e4 && e.code < 5e4 : !1;
    }
    function Jt(e) {
      return po(e) ? [ae({ action: E.ERROR, error: e })] : [ae({ action: E.DISCONNECTED, error: e })];
    }
    var mo = class extends Me {
      constructor(e, t, n) {
        super(
          e,
          t,
          n,
          /* binary not supported for comet so force JSON protocol */
          !0
        ), this.onAuthUpdated = (s) => {
          this.authParams = { access_token: s.token };
        }, this.stream = "stream" in n ? n.stream : !0, this.sendRequest = null, this.recvRequest = null, this.pendingCallback = null, this.pendingItems = null;
      }
      connect() {
        o.logAction(this.logger, o.LOG_MINOR, "CometTransport.connect()", "starting"), Me.prototype.connect.call(this);
        const e = this.params, t = e.options, n = S.getHost(t, e.host), s = S.getPort(t), i = t.tls ? "https://" : "http://";
        this.baseUri = i + n + ":" + s + "/comet/";
        const r = this.baseUri + "connect";
        o.logAction(this.logger, o.LOG_MINOR, "CometTransport.connect()", "uri: " + r), X(this.auth.getAuthParams(), (a, l) => {
          if (a) {
            this.disconnect(a);
            return;
          }
          if (this.isDisposed)
            return;
          this.authParams = l;
          const d = this.params.getConnectParams(l);
          "stream" in d && (this.stream = d.stream), o.logAction(
            this.logger,
            o.LOG_MINOR,
            "CometTransport.connect()",
            "connectParams:" + Ne(d)
          );
          let u = !1;
          const f = this.recvRequest = this.createRequest(
            r,
            null,
            d,
            null,
            this.stream ? ge.REQ_RECV_STREAM : ge.REQ_RECV
          );
          f.on("data", (g) => {
            this.recvRequest && (u || (u = !0, this.emit("preconnect")), this.onData(g));
          }), f.on("complete", (g) => {
            if (this.recvRequest || (g = g || new m("Request cancelled", 80003, 400)), this.recvRequest = null, !u && !g && (u = !0, this.emit("preconnect")), this.onActivity(), g) {
              g.code ? this.onData(Jt(g)) : this.disconnect(g);
              return;
            }
            y.Config.nextTick(() => {
              this.recv();
            });
          }), f.exec();
        });
      }
      requestClose() {
        o.logAction(this.logger, o.LOG_MINOR, "CometTransport.requestClose()"), this._requestCloseOrDisconnect(!0);
      }
      requestDisconnect() {
        o.logAction(this.logger, o.LOG_MINOR, "CometTransport.requestDisconnect()"), this._requestCloseOrDisconnect(!1);
      }
      _requestCloseOrDisconnect(e) {
        const t = e ? this.closeUri : this.disconnectUri;
        if (t) {
          const n = this.createRequest(t, null, this.authParams, null, ge.REQ_SEND);
          n.on("complete", (s) => {
            s && (o.logAction(
              this.logger,
              o.LOG_ERROR,
              "CometTransport.request" + (e ? "Close()" : "Disconnect()"),
              "request returned err = " + L(s)
            ), this.finish("disconnected", s));
          }), n.exec();
        }
      }
      dispose() {
        o.logAction(this.logger, o.LOG_MINOR, "CometTransport.dispose()", ""), this.isDisposed || (this.isDisposed = !0, this.recvRequest && (o.logAction(this.logger, o.LOG_MINOR, "CometTransport.dispose()", "aborting recv request"), this.recvRequest.abort(), this.recvRequest = null), this.finish("disconnected", Re.disconnected()), y.Config.nextTick(() => {
          this.emit("disposed");
        }));
      }
      onConnect(e) {
        var t;
        if (this.isDisposed)
          return;
        const n = (t = e.connectionDetails) == null ? void 0 : t.connectionKey;
        Me.prototype.onConnect.call(this, e);
        const s = this.baseUri + n;
        o.logAction(this.logger, o.LOG_MICRO, "CometTransport.onConnect()", "baseUri = " + s), this.sendUri = s + "/send", this.recvUri = s + "/recv", this.closeUri = s + "/close", this.disconnectUri = s + "/disconnect";
      }
      send(e) {
        if (this.sendRequest) {
          this.pendingItems = this.pendingItems || [], this.pendingItems.push(e);
          return;
        }
        const t = this.pendingItems || [];
        t.push(e), this.pendingItems = null, this.sendItems(t);
      }
      sendAnyPending() {
        const e = this.pendingItems;
        e && (this.pendingItems = null, this.sendItems(e));
      }
      sendItems(e) {
        const t = this.sendRequest = this.createRequest(
          this.sendUri,
          null,
          this.authParams,
          this.encodeRequest(e),
          ge.REQ_SEND
        );
        t.on("complete", (n, s) => {
          if (n && o.logAction(
            this.logger,
            o.LOG_ERROR,
            "CometTransport.sendItems()",
            "on complete: err = " + L(n)
          ), this.sendRequest = null, n) {
            n.code ? this.onData(Jt(n)) : this.disconnect(n);
            return;
          }
          s && this.onData(s), this.pendingItems && y.Config.nextTick(() => {
            this.sendRequest || this.sendAnyPending();
          });
        }), t.exec();
      }
      recv() {
        if (this.recvRequest || !this.isConnected)
          return;
        const e = this.recvRequest = this.createRequest(
          this.recvUri,
          null,
          this.authParams,
          null,
          this.stream ? ge.REQ_RECV_STREAM : ge.REQ_RECV_POLL
        );
        e.on("data", (t) => {
          this.onData(t);
        }), e.on("complete", (t) => {
          if (this.recvRequest = null, this.onActivity(), t) {
            t.code ? this.onData(Jt(t)) : this.disconnect(t);
            return;
          }
          y.Config.nextTick(() => {
            this.recv();
          });
        }), e.exec();
      }
      onData(e) {
        try {
          const t = this.decodeResponse(e);
          if (t && t.length)
            for (let n = 0; n < t.length; n++)
              this.onProtocolMessage(
                Pt(t[n], this.connectionManager.realtime._RealtimePresence)
              );
        } catch (t) {
          o.logAction(
            this.logger,
            o.LOG_ERROR,
            "CometTransport.onData()",
            "Unexpected exception handing channel event: " + t.stack
          );
        }
      }
      encodeRequest(e) {
        return JSON.stringify(e);
      }
      decodeResponse(e) {
        return typeof e == "string" ? JSON.parse(e) : e;
      }
    }, yo = mo;
    function bo(e, t) {
      return pt(Be(t)).includes("x-ably-errorcode");
    }
    function Io(e, t) {
      if (bo(e, t))
        return e.error && m.fromValues(e.error);
    }
    var Ro = function() {
    }, wo = 0, Ps = {};
    function To(e, t) {
      return e.getResponseHeader && e.getResponseHeader(t);
    }
    function Oo(e) {
      return e.getResponseHeader && (e.getResponseHeader("transfer-encoding") || !e.getResponseHeader("content-length"));
    }
    function Co(e) {
      const t = e.getAllResponseHeaders().trim().split(`\r
`), n = {};
      for (let s = 0; s < t.length; s++) {
        const i = t[s].split(":").map((r) => r.trim());
        n[i[0].toLowerCase()] = i[1];
      }
      return n;
    }
    var vo = class Ys extends V {
      constructor(t, n, s, i, r, a, l, d) {
        super(l), s = s || {}, s.rnd = gt(), this.uri = t + Ne(s), this.headers = n || {}, this.body = i, this.method = d ? d.toUpperCase() : te(i) ? "GET" : "POST", this.requestMode = r, this.timeouts = a, this.timedOut = !1, this.requestComplete = !1, this.id = String(++wo), Ps[this.id] = this;
      }
      static createRequest(t, n, s, i, r, a, l, d) {
        const u = a || S.TIMEOUTS;
        return new Ys(
          t,
          n,
          Te(s),
          i,
          r,
          u,
          l,
          d
        );
      }
      complete(t, n, s, i, r) {
        this.requestComplete || (this.requestComplete = !0, !t && n && this.emit("data", n), this.emit("complete", t, n, s, i, r), this.dispose());
      }
      abort() {
        this.dispose();
      }
      exec() {
        let t = this.headers;
        const n = this.requestMode == ge.REQ_SEND ? this.timeouts.httpRequestTimeout : this.timeouts.recvTimeout, s = this.timer = setTimeout(() => {
          this.timedOut = !0, r.abort();
        }, n), i = this.method, r = this.xhr = new XMLHttpRequest(), a = t.accept;
        let l = this.body, d = "text";
        a ? a.indexOf("application/x-msgpack") === 0 && (d = "arraybuffer") : t.accept = "application/json", l && (t["content-type"] || (t["content-type"] = "application/json")).indexOf("application/json") > -1 && typeof l != "string" && (l = JSON.stringify(l)), r.open(i, this.uri, !0), r.responseType = d, "authorization" in t && (r.withCredentials = !0);
        for (const A in t)
          r.setRequestHeader(A, t[A]);
        const u = (A, $, J, Je) => {
          var Ee;
          let qt = $ + " (event type: " + A.type + ")";
          (Ee = this == null ? void 0 : this.xhr) != null && Ee.statusText && (qt += ", current statusText is " + this.xhr.statusText), o.logAction(this.logger, o.LOG_ERROR, "Request.on" + A.type + "()", qt), this.complete(new z(qt, J, Je));
        };
        r.onerror = function(A) {
          u(A, "XHR error occurred", null, 400);
        }, r.onabort = (A) => {
          this.timedOut ? u(A, "Request aborted due to request timeout expiring", null, 408) : u(A, "Request cancelled", null, 400);
        }, r.ontimeout = function(A) {
          u(A, "Request timed out", null, 408);
        };
        let f, g, w, I = 0, T = !1;
        const v = () => {
          if (clearTimeout(s), w = g < 400, g == 204) {
            this.complete(null, null, null, null, g);
            return;
          }
          f = this.requestMode == ge.REQ_RECV_STREAM && w && Oo(r);
        }, M = () => {
          let A;
          try {
            const J = To(r, "content-type");
            if (J ? J.indexOf("application/json") >= 0 : r.responseType == "text") {
              const Ee = r.responseType === "arraybuffer" ? y.BufferUtils.utf8Decode(r.response) : String(r.responseText);
              Ee.length ? A = JSON.parse(Ee) : A = Ee, T = !0;
            } else
              A = r.response;
            A.response !== void 0 ? (g = A.statusCode, w = g < 400, t = A.headers, A = A.response) : t = Co(r);
          } catch (J) {
            this.complete(new z("Malformed response body from server: " + J.message, null, 400));
            return;
          }
          if (w || Array.isArray(A)) {
            this.complete(null, A, t, T, g);
            return;
          }
          let $ = Io(A, t);
          $ || ($ = new z(
            "Error response received from server: " + g + " body was: " + y.Config.inspect(A),
            null,
            g
          )), this.complete($, A, t, T, g);
        };
        function B() {
          const A = r.responseText, $ = A.length - 1;
          let J, Je;
          for (; I < $ && (J = A.indexOf(`
`, I)) > -1; )
            Je = A.slice(I, J), I = J + 1, N(Je);
        }
        const N = (A) => {
          try {
            A = JSON.parse(A);
          } catch ($) {
            this.complete(new z("Malformed response body from server: " + $.message, null, 400));
            return;
          }
          this.emit("data", A);
        }, U = () => {
          B(), this.streamComplete = !0, y.Config.nextTick(() => {
            this.complete();
          });
        };
        r.onreadystatechange = function() {
          const A = r.readyState;
          A < 3 || r.status !== 0 && (g === void 0 && (g = r.status, v()), A == 3 && f ? B() : A == 4 && (f ? U() : M()));
        }, r.send(l);
      }
      dispose() {
        const t = this.xhr;
        if (t) {
          t.onreadystatechange = t.onerror = t.onabort = t.ontimeout = Ro, this.xhr = null;
          const n = this.timer;
          n && (clearTimeout(n), this.timer = null), this.requestComplete || t.abort();
        }
        delete Ps[this.id];
      }
    }, _s = vo, Gs = q.XhrPolling, So = class extends yo {
      constructor(e, t, n) {
        super(e, t, n), this.shortName = Gs, n.stream = !1, this.shortName = Gs;
      }
      static isAvailable() {
        return !!(y.Config.xhrSupported && y.Config.allowComet);
      }
      toString() {
        return "XHRPollingTransport; uri=" + this.baseUri + "; isConnected=" + this.isConnected;
      }
      createRequest(e, t, n, s, i) {
        return _s.createRequest(e, t, n, s, i, this.timeouts, this.logger);
      }
    }, Mo = So, Ao = ["xhr_polling"], ko = {
      order: Ao,
      bundledImplementations: {
        web_socket: Rs,
        xhr_polling: Mo
      }
    }, Eo = ko, Po = {
      connectivityCheckUrl: "https://internet-up.ably-realtime.com/is-the-internet-up.txt",
      wsConnectivityUrl: "wss://ws-up.ably-realtime.com",
      /* Order matters here: the base transport is the leftmost one in the
       * intersection of baseTransportOrder and the transports clientOption that's
       * supported. */
      defaultTransports: [q.XhrPolling, q.WebSocket]
    }, _o = Po;
    function Go(e) {
      if (e === void 0)
        return "undefined";
      let t, n;
      if (e instanceof ArrayBuffer ? (n = "ArrayBuffer", t = new DataView(e)) : e instanceof DataView && (n = "DataView", t = e), !t)
        return JSON.stringify(e);
      const s = [];
      for (let i = 0; i < e.byteLength; i++) {
        if (i > 20) {
          s.push("...");
          break;
        }
        let r = t.getUint8(i).toString(16);
        r.length === 1 && (r = "0" + r), s.push(r);
      }
      return "<" + n + " " + s.join(" ") + ">";
    }
    function ze(e, t, n) {
      for (let s = 0, i = n.length; s < i; s++) {
        const r = n.charCodeAt(s);
        if (r < 128) {
          e.setUint8(t++, r >>> 0 & 127 | 0);
          continue;
        }
        if (r < 2048) {
          e.setUint8(t++, r >>> 6 & 31 | 192), e.setUint8(t++, r >>> 0 & 63 | 128);
          continue;
        }
        if (r < 65536) {
          e.setUint8(t++, r >>> 12 & 15 | 224), e.setUint8(t++, r >>> 6 & 63 | 128), e.setUint8(t++, r >>> 0 & 63 | 128);
          continue;
        }
        if (r < 1114112) {
          e.setUint8(t++, r >>> 18 & 7 | 240), e.setUint8(t++, r >>> 12 & 63 | 128), e.setUint8(t++, r >>> 6 & 63 | 128), e.setUint8(t++, r >>> 0 & 63 | 128);
          continue;
        }
        throw new Error("bad codepoint " + r);
      }
    }
    function Bs(e, t, n) {
      let s = "";
      for (let i = t, r = t + n; i < r; i++) {
        const a = e.getUint8(i);
        if (!(a & 128)) {
          s += String.fromCharCode(a);
          continue;
        }
        if ((a & 224) === 192) {
          s += String.fromCharCode((a & 15) << 6 | e.getUint8(++i) & 63);
          continue;
        }
        if ((a & 240) === 224) {
          s += String.fromCharCode(
            (a & 15) << 12 | (e.getUint8(++i) & 63) << 6 | (e.getUint8(++i) & 63) << 0
          );
          continue;
        }
        if ((a & 248) === 240) {
          s += String.fromCharCode(
            (a & 7) << 18 | (e.getUint8(++i) & 63) << 12 | (e.getUint8(++i) & 63) << 6 | (e.getUint8(++i) & 63) << 0
          );
          continue;
        }
        throw new Error("Invalid byte " + a.toString(16));
      }
      return s;
    }
    function Ft(e) {
      let t = 0;
      for (let n = 0, s = e.length; n < s; n++) {
        const i = e.charCodeAt(n);
        if (i < 128) {
          t += 1;
          continue;
        }
        if (i < 2048) {
          t += 2;
          continue;
        }
        if (i < 65536) {
          t += 3;
          continue;
        }
        if (i < 1114112) {
          t += 4;
          continue;
        }
        throw new Error("bad codepoint " + i);
      }
      return t;
    }
    function Bo(e, t) {
      const n = Ve(e, t);
      if (n === 0)
        return;
      const s = new ArrayBuffer(n), i = new DataView(s);
      return je(e, i, 0, t), s;
    }
    var Xt = 65536 * 65536, Ns = 1 / Xt;
    function No(e, t) {
      return t = t || 0, e.getInt32(t) * Xt + e.getUint32(t + 4);
    }
    function Lo(e, t) {
      return t = t || 0, e.getUint32(t) * Xt + e.getUint32(t + 4);
    }
    function Uo(e, t, n) {
      n < 9223372036854776e3 ? (e.setInt32(t, Math.floor(n * Ns)), e.setInt32(t + 4, n & -1)) : (e.setUint32(t, 2147483647), e.setUint32(t + 4, 2147483647));
    }
    function Ho(e, t, n) {
      n < 18446744073709552e3 ? (e.setUint32(t, Math.floor(n * Ns)), e.setInt32(t + 4, n & -1)) : (e.setUint32(t, 4294967295), e.setUint32(t + 4, 4294967295));
    }
    var xo = class {
      constructor(e, t) {
        this.map = (n) => {
          const s = {};
          for (let i = 0; i < n; i++) {
            const r = this.parse();
            s[r] = this.parse();
          }
          return s;
        }, this.bin = (n) => {
          const s = new ArrayBuffer(n);
          return new Uint8Array(s).set(new Uint8Array(this.view.buffer, this.offset, n), 0), this.offset += n, s;
        }, this.buf = this.bin, this.str = (n) => {
          const s = Bs(this.view, this.offset, n);
          return this.offset += n, s;
        }, this.array = (n) => {
          const s = new Array(n);
          for (let i = 0; i < n; i++)
            s[i] = this.parse();
          return s;
        }, this.ext = (n) => (this.offset += n, {
          type: this.view.getInt8(this.offset),
          data: this.buf(n)
        }), this.parse = () => {
          const n = this.view.getUint8(this.offset);
          let s, i;
          if (!(n & 128))
            return this.offset++, n;
          if ((n & 240) === 128)
            return i = n & 15, this.offset++, this.map(i);
          if ((n & 240) === 144)
            return i = n & 15, this.offset++, this.array(i);
          if ((n & 224) === 160)
            return i = n & 31, this.offset++, this.str(i);
          if ((n & 224) === 224)
            return s = this.view.getInt8(this.offset), this.offset++, s;
          switch (n) {
            case 192:
              return this.offset++, null;
            case 193:
              this.offset++;
              return;
            case 194:
              return this.offset++, !1;
            case 195:
              return this.offset++, !0;
            case 196:
              return i = this.view.getUint8(this.offset + 1), this.offset += 2, this.bin(i);
            case 197:
              return i = this.view.getUint16(this.offset + 1), this.offset += 3, this.bin(i);
            case 198:
              return i = this.view.getUint32(this.offset + 1), this.offset += 5, this.bin(i);
            case 199:
              return i = this.view.getUint8(this.offset + 1), this.offset += 2, this.ext(i);
            case 200:
              return i = this.view.getUint16(this.offset + 1), this.offset += 3, this.ext(i);
            case 201:
              return i = this.view.getUint32(this.offset + 1), this.offset += 5, this.ext(i);
            case 202:
              return s = this.view.getFloat32(this.offset + 1), this.offset += 5, s;
            case 203:
              return s = this.view.getFloat64(this.offset + 1), this.offset += 9, s;
            case 204:
              return s = this.view.getUint8(this.offset + 1), this.offset += 2, s;
            case 205:
              return s = this.view.getUint16(this.offset + 1), this.offset += 3, s;
            case 206:
              return s = this.view.getUint32(this.offset + 1), this.offset += 5, s;
            case 207:
              return s = Lo(this.view, this.offset + 1), this.offset += 9, s;
            case 208:
              return s = this.view.getInt8(this.offset + 1), this.offset += 2, s;
            case 209:
              return s = this.view.getInt16(this.offset + 1), this.offset += 3, s;
            case 210:
              return s = this.view.getInt32(this.offset + 1), this.offset += 5, s;
            case 211:
              return s = No(this.view, this.offset + 1), this.offset += 9, s;
            case 212:
              return i = 1, this.offset++, this.ext(i);
            case 213:
              return i = 2, this.offset++, this.ext(i);
            case 214:
              return i = 4, this.offset++, this.ext(i);
            case 215:
              return i = 8, this.offset++, this.ext(i);
            case 216:
              return i = 16, this.offset++, this.ext(i);
            case 217:
              return i = this.view.getUint8(this.offset + 1), this.offset += 2, this.str(i);
            case 218:
              return i = this.view.getUint16(this.offset + 1), this.offset += 3, this.str(i);
            case 219:
              return i = this.view.getUint32(this.offset + 1), this.offset += 5, this.str(i);
            case 220:
              return i = this.view.getUint16(this.offset + 1), this.offset += 3, this.array(i);
            case 221:
              return i = this.view.getUint32(this.offset + 1), this.offset += 5, this.array(i);
            case 222:
              return i = this.view.getUint16(this.offset + 1), this.offset += 3, this.map(i);
            case 223:
              return i = this.view.getUint32(this.offset + 1), this.offset += 5, this.map(i);
          }
          throw new Error("Unknown type 0x" + n.toString(16));
        }, this.offset = t || 0, this.view = e;
      }
    };
    function Do(e) {
      const t = new DataView(e), n = new xo(t), s = n.parse();
      if (n.offset !== e.byteLength)
        throw new Error(e.byteLength - n.offset + " trailing bytes");
      return s;
    }
    function Ls(e, t) {
      return Object.keys(e).filter(function(n) {
        const s = e[n], i = typeof s;
        return (!t || s != null) && (i !== "function" || !!s.toJSON);
      });
    }
    function je(e, t, n, s) {
      const i = typeof e;
      if (typeof e == "string") {
        const r = Ft(e);
        if (r < 32)
          return t.setUint8(n, r | 160), ze(t, n + 1, e), 1 + r;
        if (r < 256)
          return t.setUint8(n, 217), t.setUint8(n + 1, r), ze(t, n + 2, e), 2 + r;
        if (r < 65536)
          return t.setUint8(n, 218), t.setUint16(n + 1, r), ze(t, n + 3, e), 3 + r;
        if (r < 4294967296)
          return t.setUint8(n, 219), t.setUint32(n + 1, r), ze(t, n + 5, e), 5 + r;
      }
      if (ArrayBuffer.isView && ArrayBuffer.isView(e) && (e = e.buffer), e instanceof ArrayBuffer) {
        const r = e.byteLength;
        if (r < 256)
          return t.setUint8(n, 196), t.setUint8(n + 1, r), new Uint8Array(t.buffer).set(new Uint8Array(e), n + 2), 2 + r;
        if (r < 65536)
          return t.setUint8(n, 197), t.setUint16(n + 1, r), new Uint8Array(t.buffer).set(new Uint8Array(e), n + 3), 3 + r;
        if (r < 4294967296)
          return t.setUint8(n, 198), t.setUint32(n + 1, r), new Uint8Array(t.buffer).set(new Uint8Array(e), n + 5), 5 + r;
      }
      if (typeof e == "number") {
        if (Math.floor(e) !== e)
          return t.setUint8(n, 203), t.setFloat64(n + 1, e), 9;
        if (e >= 0) {
          if (e < 128)
            return t.setUint8(n, e), 1;
          if (e < 256)
            return t.setUint8(n, 204), t.setUint8(n + 1, e), 2;
          if (e < 65536)
            return t.setUint8(n, 205), t.setUint16(n + 1, e), 3;
          if (e < 4294967296)
            return t.setUint8(n, 206), t.setUint32(n + 1, e), 5;
          if (e < 18446744073709552e3)
            return t.setUint8(n, 207), Ho(t, n + 1, e), 9;
          throw new Error("Number too big 0x" + e.toString(16));
        }
        if (e >= -32)
          return t.setInt8(n, e), 1;
        if (e >= -128)
          return t.setUint8(n, 208), t.setInt8(n + 1, e), 2;
        if (e >= -32768)
          return t.setUint8(n, 209), t.setInt16(n + 1, e), 3;
        if (e >= -2147483648)
          return t.setUint8(n, 210), t.setInt32(n + 1, e), 5;
        if (e >= -9223372036854776e3)
          return t.setUint8(n, 211), Uo(t, n + 1, e), 9;
        throw new Error("Number too small -0x" + (-e).toString(16).substr(1));
      }
      if (i === "undefined")
        return s ? 0 : (t.setUint8(n, 212), t.setUint8(n + 1, 0), t.setUint8(n + 2, 0), 3);
      if (e === null)
        return s ? 0 : (t.setUint8(n, 192), 1);
      if (i === "boolean")
        return t.setUint8(n, e ? 195 : 194), 1;
      if (typeof e.toJSON == "function")
        return je(e.toJSON(), t, n, s);
      if (i === "object") {
        let r, a = 0, l;
        const d = Array.isArray(e);
        if (d ? r = e.length : (l = Ls(e, s), r = l.length), r < 16 ? (t.setUint8(n, r | (d ? 144 : 128)), a = 1) : r < 65536 ? (t.setUint8(n, d ? 220 : 222), t.setUint16(n + 1, r), a = 3) : r < 4294967296 && (t.setUint8(n, d ? 221 : 223), t.setUint32(n + 1, r), a = 5), d)
          for (let u = 0; u < r; u++)
            a += je(e[u], t, n + a, s);
        else if (l)
          for (let u = 0; u < r; u++) {
            const f = l[u];
            a += je(f, t, n + a), a += je(e[f], t, n + a, s);
          }
        return a;
      }
      if (i === "function")
        return 0;
      throw new Error("Unknown type " + i);
    }
    function Ve(e, t) {
      const n = typeof e;
      if (n === "string") {
        const s = Ft(e);
        if (s < 32)
          return 1 + s;
        if (s < 256)
          return 2 + s;
        if (s < 65536)
          return 3 + s;
        if (s < 4294967296)
          return 5 + s;
      }
      if (ArrayBuffer.isView && ArrayBuffer.isView(e) && (e = e.buffer), e instanceof ArrayBuffer) {
        const s = e.byteLength;
        if (s < 256)
          return 2 + s;
        if (s < 65536)
          return 3 + s;
        if (s < 4294967296)
          return 5 + s;
      }
      if (typeof e == "number") {
        if (Math.floor(e) !== e)
          return 9;
        if (e >= 0) {
          if (e < 128)
            return 1;
          if (e < 256)
            return 2;
          if (e < 65536)
            return 3;
          if (e < 4294967296)
            return 5;
          if (e < 18446744073709552e3)
            return 9;
          throw new Error("Number too big 0x" + e.toString(16));
        }
        if (e >= -32)
          return 1;
        if (e >= -128)
          return 2;
        if (e >= -32768)
          return 3;
        if (e >= -2147483648)
          return 5;
        if (e >= -9223372036854776e3)
          return 9;
        throw new Error("Number too small -0x" + e.toString(16).substr(1));
      }
      if (n === "boolean")
        return 1;
      if (e === null)
        return t ? 0 : 1;
      if (e === void 0)
        return t ? 0 : 3;
      if (typeof e.toJSON == "function")
        return Ve(e.toJSON(), t);
      if (n === "object") {
        let s, i = 0;
        if (Array.isArray(e)) {
          s = e.length;
          for (let r = 0; r < s; r++)
            i += Ve(e[r], t);
        } else {
          const r = Ls(e, t);
          s = r.length;
          for (let a = 0; a < s; a++) {
            const l = r[a];
            i += Ve(l) + Ve(e[l], t);
          }
        }
        if (s < 16)
          return 1 + i;
        if (s < 65536)
          return 3 + i;
        if (s < 4294967296)
          return 5 + i;
        throw new Error("Array or object too long 0x" + s.toString(16));
      }
      if (n === "function")
        return 0;
      throw new Error("Unknown type " + n);
    }
    var Yt = {
      encode: Bo,
      decode: Do,
      inspect: Go,
      utf8Write: ze,
      utf8Read: Bs,
      utf8ByteCount: Ft
    };
    function Wo(e, t) {
      return !!t.get("x-ably-errorcode");
    }
    function Zo(e, t) {
      if (Wo(e, t))
        return e.error && m.fromValues(e.error);
    }
    function zo(e) {
      const t = {};
      return e.forEach((n, s) => {
        t[s] = n;
      }), t;
    }
    async function jo(e, t, n, s, i, r) {
      const a = new Headers(s || {}), l = e ? e.toUpperCase() : te(r) ? "GET" : "POST", d = new AbortController();
      let u;
      const f = new Promise((I) => {
        u = setTimeout(
          () => {
            d.abort(), I({ error: new z("Request timed out", null, 408) });
          },
          t ? t.options.timeouts.httpRequestTimeout : S.TIMEOUTS.httpRequestTimeout
        );
      }), g = {
        method: l,
        headers: a,
        body: r,
        signal: d.signal
      };
      y.Config.isWebworker || (g.credentials = a.has("authorization") ? "include" : "same-origin");
      const w = (async () => {
        try {
          const I = await yt().fetch(n + "?" + new URLSearchParams(i || {}), g);
          if (clearTimeout(u), I.status == 204)
            return { error: null, statusCode: I.status };
          const T = I.headers.get("Content-Type");
          let v;
          T && T.indexOf("application/x-msgpack") > -1 ? v = await I.arrayBuffer() : T && T.indexOf("application/json") > -1 ? v = await I.json() : v = await I.text();
          const M = !!T && T.indexOf("application/x-msgpack") === -1, B = zo(I.headers);
          return I.ok ? { error: null, body: v, headers: B, unpacked: M, statusCode: I.status } : { error: Zo(v, I.headers) || new z(
            "Error response received from server: " + I.status + " body was: " + y.Config.inspect(v),
            null,
            I.status
          ), body: v, headers: B, unpacked: M, statusCode: I.status };
        } catch (I) {
          return clearTimeout(u), { error: I };
        }
      })();
      return Promise.race([f, w]);
    }
    var Vo = {
      XHRRequest: _s,
      FetchRequest: jo
    }, Us = oo(Es, Cs);
    y.Crypto = Us, y.BufferUtils = Cs, y.Http = As, y.Config = Es, y.Transports = Eo, y.WebStorage = ks;
    for (const e of [kt, Dt])
      e.Crypto = Us, e._MsgPack = Yt;
    As.bundledRequestImplementations = Vo, o.initLogHandlers(), y.Defaults = Mi(_o), y.Config.agent && (y.Defaults.agent += " " + y.Config.agent);
    var Jo = {
      ErrorInfo: m,
      Rest: kt,
      Realtime: Dt,
      msgpack: Yt
    };
    if (typeof p.exports == "object" && typeof h == "object") {
      var Fo = (e, t, n, s) => {
        if (t && typeof t == "object" || typeof t == "function")
          for (let i of Object.getOwnPropertyNames(t))
            !Object.prototype.hasOwnProperty.call(e, i) && i !== n && Object.defineProperty(e, i, {
              get: () => t[i],
              enumerable: !(s = Object.getOwnPropertyDescriptor(t, i)) || s.enumerable
            });
        return e;
      };
      p.exports = Fo(p.exports, h);
    }
    return p.exports;
  });
})(zs);
var ra = zs.exports;
const Qt = /* @__PURE__ */ qe(ra);
var sn = { exports: {} }, Ge = typeof Reflect == "object" ? Reflect : null, xs = Ge && typeof Ge.apply == "function" ? Ge.apply : function(c, h, p) {
  return Function.prototype.apply.call(c, h, p);
}, ct;
Ge && typeof Ge.ownKeys == "function" ? ct = Ge.ownKeys : Object.getOwnPropertySymbols ? ct = function(c) {
  return Object.getOwnPropertyNames(c).concat(Object.getOwnPropertySymbols(c));
} : ct = function(c) {
  return Object.getOwnPropertyNames(c);
};
function oa(R) {
  console && console.warn && console.warn(R);
}
var qs = Number.isNaN || function(c) {
  return c !== c;
};
function G() {
  G.init.call(this);
}
sn.exports = G;
sn.exports.once = ha;
G.EventEmitter = G;
G.prototype._events = void 0;
G.prototype._eventsCount = 0;
G.prototype._maxListeners = void 0;
var Ds = 10;
function ht(R) {
  if (typeof R != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof R);
}
Object.defineProperty(G, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return Ds;
  },
  set: function(R) {
    if (typeof R != "number" || R < 0 || qs(R))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + R + ".");
    Ds = R;
  }
});
G.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
G.prototype.setMaxListeners = function(c) {
  if (typeof c != "number" || c < 0 || qs(c))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + c + ".");
  return this._maxListeners = c, this;
};
function Qs(R) {
  return R._maxListeners === void 0 ? G.defaultMaxListeners : R._maxListeners;
}
G.prototype.getMaxListeners = function() {
  return Qs(this);
};
G.prototype.emit = function(c) {
  for (var h = [], p = 1; p < arguments.length; p++) h.push(arguments[p]);
  var b = c === "error", C = this._events;
  if (C !== void 0)
    b = b && C.error === void 0;
  else if (!b)
    return !1;
  if (b) {
    var O;
    if (h.length > 0 && (O = h[0]), O instanceof Error)
      throw O;
    var P = new Error("Unhandled error." + (O ? " (" + O.message + ")" : ""));
    throw P.context = O, P;
  }
  var D = C[c];
  if (D === void 0)
    return !1;
  if (typeof D == "function")
    xs(D, this, h);
  else
    for (var Q = D.length, Y = ni(D, Q), p = 0; p < Q; ++p)
      xs(Y[p], this, h);
  return !0;
};
function Ks(R, c, h, p) {
  var b, C, O;
  if (ht(h), C = R._events, C === void 0 ? (C = R._events = /* @__PURE__ */ Object.create(null), R._eventsCount = 0) : (C.newListener !== void 0 && (R.emit(
    "newListener",
    c,
    h.listener ? h.listener : h
  ), C = R._events), O = C[c]), O === void 0)
    O = C[c] = h, ++R._eventsCount;
  else if (typeof O == "function" ? O = C[c] = p ? [h, O] : [O, h] : p ? O.unshift(h) : O.push(h), b = Qs(R), b > 0 && O.length > b && !O.warned) {
    O.warned = !0;
    var P = new Error("Possible EventEmitter memory leak detected. " + O.length + " " + String(c) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    P.name = "MaxListenersExceededWarning", P.emitter = R, P.type = c, P.count = O.length, oa(P);
  }
  return R;
}
G.prototype.addListener = function(c, h) {
  return Ks(this, c, h, !1);
};
G.prototype.on = G.prototype.addListener;
G.prototype.prependListener = function(c, h) {
  return Ks(this, c, h, !0);
};
function aa() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function $s(R, c, h) {
  var p = { fired: !1, wrapFn: void 0, target: R, type: c, listener: h }, b = aa.bind(p);
  return b.listener = h, p.wrapFn = b, b;
}
G.prototype.once = function(c, h) {
  return ht(h), this.on(c, $s(this, c, h)), this;
};
G.prototype.prependOnceListener = function(c, h) {
  return ht(h), this.prependListener(c, $s(this, c, h)), this;
};
G.prototype.removeListener = function(c, h) {
  var p, b, C, O, P;
  if (ht(h), b = this._events, b === void 0)
    return this;
  if (p = b[c], p === void 0)
    return this;
  if (p === h || p.listener === h)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete b[c], b.removeListener && this.emit("removeListener", c, p.listener || h));
  else if (typeof p != "function") {
    for (C = -1, O = p.length - 1; O >= 0; O--)
      if (p[O] === h || p[O].listener === h) {
        P = p[O].listener, C = O;
        break;
      }
    if (C < 0)
      return this;
    C === 0 ? p.shift() : ca(p, C), p.length === 1 && (b[c] = p[0]), b.removeListener !== void 0 && this.emit("removeListener", c, P || h);
  }
  return this;
};
G.prototype.off = G.prototype.removeListener;
G.prototype.removeAllListeners = function(c) {
  var h, p, b;
  if (p = this._events, p === void 0)
    return this;
  if (p.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : p[c] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete p[c]), this;
  if (arguments.length === 0) {
    var C = Object.keys(p), O;
    for (b = 0; b < C.length; ++b)
      O = C[b], O !== "removeListener" && this.removeAllListeners(O);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (h = p[c], typeof h == "function")
    this.removeListener(c, h);
  else if (h !== void 0)
    for (b = h.length - 1; b >= 0; b--)
      this.removeListener(c, h[b]);
  return this;
};
function ei(R, c, h) {
  var p = R._events;
  if (p === void 0)
    return [];
  var b = p[c];
  return b === void 0 ? [] : typeof b == "function" ? h ? [b.listener || b] : [b] : h ? la(b) : ni(b, b.length);
}
G.prototype.listeners = function(c) {
  return ei(this, c, !0);
};
G.prototype.rawListeners = function(c) {
  return ei(this, c, !1);
};
G.listenerCount = function(R, c) {
  return typeof R.listenerCount == "function" ? R.listenerCount(c) : ti.call(R, c);
};
G.prototype.listenerCount = ti;
function ti(R) {
  var c = this._events;
  if (c !== void 0) {
    var h = c[R];
    if (typeof h == "function")
      return 1;
    if (h !== void 0)
      return h.length;
  }
  return 0;
}
G.prototype.eventNames = function() {
  return this._eventsCount > 0 ? ct(this._events) : [];
};
function ni(R, c) {
  for (var h = new Array(c), p = 0; p < c; ++p)
    h[p] = R[p];
  return h;
}
function ca(R, c) {
  for (; c + 1 < R.length; c++)
    R[c] = R[c + 1];
  R.pop();
}
function la(R) {
  for (var c = new Array(R.length), h = 0; h < c.length; ++h)
    c[h] = R[h].listener || R[h];
  return c;
}
function ha(R, c) {
  return new Promise(function(h, p) {
    function b(O) {
      R.removeListener(c, C), p(O);
    }
    function C() {
      typeof R.removeListener == "function" && R.removeListener("error", b), h([].slice.call(arguments));
    }
    si(R, c, C, { once: !0 }), c !== "error" && ua(R, b, { once: !0 });
  });
}
function ua(R, c, h) {
  typeof R.on == "function" && si(R, "error", c, h);
}
function si(R, c, h, p) {
  if (typeof R.on == "function")
    p.once ? R.once(c, h) : R.on(c, h);
  else if (typeof R.addEventListener == "function")
    R.addEventListener(c, function b(C) {
      p.once && R.removeEventListener(c, b), h(C);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof R);
}
var da = sn.exports;
const fa = /* @__PURE__ */ qe(da), ga = (R) => new Promise((c, h) => setTimeout(() => {
  h(new Error("timeout"));
}, R));
class pa extends fa {
  constructor() {
    super(), this._realtime = null, this._channel = null, this._channelName = null, this._ipAddress = null;
  }
  /**
  * @param {string} apiKey
  */
  connectBackend(c) {
    this._realtime = new Qt.Realtime({ key: c }), this._realtime.connection.on((h) => {
      console.log("Connection State:", h.current), h.reason && console.log(">>", h.reason.message);
    }), this._channel = null, this._channelName = null, this._ipAddress = null;
  }
  /**
  * @param {string} keyword
  */
  async connect(c) {
    var h, p;
    if (!this._realtime) {
      this.emit("packet", "not connected");
      return;
    }
    (h = this._channel) == null || h.unsubscribe(), this._channel = this._realtime.channels.get(c), console.log("connected:", this._channel), await ((p = this._channel) == null ? void 0 : p.subscribe((b) => {
      this._realtime.connection.id != b.connectionId && (console.log("received:", b), typeof b.data == "string" ? (this.emit("received", { text: b.data }), this.emit("packet", { text: b.data })) : (this._shouldReceiveMessage(b) && this.emit("received", b.data), this.emit("packet", b.data)));
    }));
  }
  /**
  * @param {Ably.Message} message
  * @returns {boolean}
  */
  _shouldReceiveMessage(c) {
    var h, p, b, C;
    switch (c.name) {
      case "broadcast":
        return !0;
      case "multicast":
        return ((p = (h = c.data) == null ? void 0 : h.header) == null ? void 0 : p.channel) == this._channelName;
      case "unicast":
        return ((C = (b = c.data) == null ? void 0 : b.header) == null ? void 0 : C.to) == this._ipAddress;
      default:
        return !1;
    }
  }
  disconnect() {
    return this._channel ? (this._channel.unsubscribe(), this._channel = null, console.log("disconnected"), !0) : !1;
  }
  get isConnected() {
    return this._channel != null;
  }
  /**
  * @param {string} text
  */
  async send(c) {
    var h = new Qt.Realtime.Message();
    return this._channelName ? (h.name = "multicast", h.data = {
      text: c,
      header: {
        from: this._ipAddress,
        channel: this._channelName
      }
    }) : (h.name = "broadcast", h.data = {
      text: c,
      header: {
        from: this._ipAddress
      }
    }), await this._send(h);
  }
  /**
  * @param {string} text
  * @param {string} ipAddress
  */
  async sendToIpAddress(c, h) {
    var p = new Qt.Realtime.Message();
    return h ? (p.name = "unicast", p.data = {
      text: c,
      header: {
        from: this._ipAddress,
        to: h
      }
    }) : (p.name = "broadcast", p.data = {
      text: c,
      header: {
        from: this._ipAddress
      }
    }), await this._send(p);
  }
  /**
  * @param {Ably.Message} message
  */
  async _send(c) {
    if (!this._channel)
      return !1;
    try {
      return await Promise.race([
        this._channel.publish(c),
        ga(5e3)
      ]), this.emit("sent", c.data), console.log("sent:", c), !0;
    } catch (h) {
      return console.log("send error:", h), !1;
    }
  }
  /**
  * @param {string} ipAddress
  */
  setIpAddress(c) {
    c ? this._ipAddress = c : this._ipAddress = null, console.log("set IP address:", this._ipAddress);
  }
  /**
   * @returns {string}
   */
  get ipAddress() {
    return this._ipAddress;
  }
  /**
  * @param {string} channelName
  */
  setChannelName(c) {
    c ? this._channelName = c : this._channelName = null, console.log("set channel:", this._channelName);
  }
  /**
   * @returns {string}
   */
  get channelName() {
    return this._channelName;
  }
}
const ma = "https://script.google.com/macros/s/AKfycbwFCv5Xw-_-lkCJB2IFc3CyIhyoyRzVkoerCffIMYMZE2exHQuA1rHjcVgdVZHprHPUBQ/exec", ya = (R) => new Promise((c, h) => setTimeout(() => {
  h(new Error("timeout"));
}, R));
let _ = (R) => R.default;
const Ws = () => {
  const R = _.setup();
  R && R.translations[R.locale] && Object.assign(
    R.translations[R.locale],
    sa[R.locale]
  );
}, ot = "bidirectionalComm";
let Zs = "https://studyapps.github.io/bidirectional-comm/bidirectional-comm.mjs";
class lt {
  /**
   * A translation object which is used in this class.
   * @param {FormatObject} formatter - translation object
   */
  static set formatMessage(c) {
    _ = c, _ && Ws();
  }
  /**
   * @return {string} - the name of this extension.
   */
  static get EXTENSION_NAME() {
    return _({
      id: "bidirectionalComm.name",
      default: "双方向通信"
    });
  }
  /**
   * @return {string} - the ID of this extension.
   */
  static get EXTENSION_ID() {
    return ot;
  }
  /**
   * URL to get this extension.
   * @type {string}
   */
  static get extensionURL() {
    return Zs;
  }
  /**
   * Set URL to get this extension.
   * The extensionURL will be changed to the URL of the loading server.
   * @param {string} url - URL
   */
  static set extensionURL(c) {
    Zs = c;
  }
  /**
   * Construct a set of blocks for Xcratch Example.
   * @param {Runtime} runtime - the Scratch 3.0 runtime.
   */
  constructor(c) {
    this.runtime = c, this.server = new pa();
    const h = new URLSearchParams(window.location.search), p = h.get("id") ?? "AH05B23F11", b = "basic", C = h.get("keyword");
    console.log("ID:", p), console.log("Block Type:", b), console.log("Initial Keyword:", C), this.block = b, this.keyword = C || null, this.license = null, p && this.fetchLicense(p), this.isEnabledPacketCapture = !1, this.lastSentMessage = null, this.numOfSentMessages = 0, this.server.on("sent", (O) => {
      this.lastSentMessage = O, this.numOfSentMessages += 1, this.runtime.startHats(ot + "_whenSentMessage");
    }), this.lastReceivedMessage = null, this.server.on("received", (O) => {
      this.checkNumOfSentMessages() && (this.isEnabledPacketCapture || (this.lastReceivedMessage = O, this.runtime.startHats(ot + "_whenReceivedMessage")));
    }), this.server.on("packet", (O) => {
      this.checkNumOfSentMessages() && this.isEnabledPacketCapture && (this.lastReceivedMessage = O, this.runtime.startHats(ot + "_whenReceivedMessage"));
    }), this.lastSystemMessage = {
      id: "bidirectionalComm.system.notConnected",
      default: "接続してください"
    }, c.formatMessage && (_ = c.formatMessage);
  }
  async fetchLicense(c) {
    try {
      this._fetchLicenseCompletion = null;
      const h = ma + "?id=" + c, b = await (await fetch(h)).json();
      console.log("fetch:", b), b.apikey && b.license ? (this.license = b.license, this._fetchLicenseCompletion && this._fetchLicenseCompletion(), this.server.connectBackend(b.apikey)) : (console.log("no license for ID:", c), this.license = "none", this._fetchLicenseCompletion && this._fetchLicenseCompletion());
    } catch (h) {
      console.log("fetch error:", h);
    }
  }
  /**
   * @returns {boolean}
   */
  shouldShowBasicBlocks() {
    return this.block == "basic";
  }
  /**
   * @returns {boolean}
   */
  hasTrialLicense() {
    return this.license == "trial" || this.license == "basic";
  }
  /**
   * @returns {boolean}
   */
  hasBasicLicense() {
    return this.license == "basic";
  }
  async checkTrialLicense() {
    return this.license ? this.hasTrialLicense() : (this.lastSystemMessage = {
      id: "bidirectionalComm.system.checkingLicense",
      default: "ライセンスの確認中"
    }, await Promise.race([
      new Promise((c) => {
        this._fetchLicenseCompletion = c;
      }),
      ya(5e3)
    ]), this.hasTrialLicense());
  }
  setNoLicenseMessage() {
    this.lastSystemMessage = {
      id: "bidirectionalComm.system.noLicense",
      default: "ライセンスがありません"
    };
  }
  /**
   * @returns {boolean}
   */
  checkNumOfSentMessages() {
    const c = this.hasBasicLicense() ? 1e3 : 50, h = this.numOfSentMessages < c;
    return h || (this.lastSystemMessage = {
      id: "bidirectionalComm.system.reachedSendingLimit",
      default: "通信量が上限に達しました"
    }), h;
  }
  async waitAfterSend() {
    const c = 1e3 / (this.hasBasicLicense() ? 30 : 1);
    await new Promise((h) => setTimeout(h, c));
  }
  async connect(c) {
    try {
      if (!await this.checkTrialLicense()) {
        this.setNoLicenseMessage();
        return;
      }
    } catch {
      this.lastSystemMessage = {
        id: "bidirectionalComm.system.failedToConnect",
        default: "接続失敗"
      };
      return;
    }
    const h = Kt(me.toString(c.KEYWORD));
    if (!h) {
      this.lastSystemMessage = {
        id: "bidirectionalComm.system.noKeyword",
        default: "キーワードを入力してください"
      };
      return;
    }
    await this.server.connect(h), this.server.setChannelName(null), this.server.setIpAddress(null), this.isEnabledPacketCapture = !1, this.lastSentMessage = null, this.lastReceivedMessage = null, this.lastSystemMessage = {
      id: "bidirectionalComm.system.connected",
      default: "接続完了"
    };
  }
  getLastSystemMessage() {
    return _(this.lastSystemMessage);
  }
  getNumOfSentMessages() {
    return this.numOfSentMessages;
  }
  disconnect() {
    if (!this.hasTrialLicense()) {
      this.setNoLicenseMessage();
      return;
    }
    this.server.disconnect(), this.lastSystemMessage = {
      id: "bidirectionalComm.system.notConnected",
      default: "接続してください"
    };
  }
  async sendMessage(c) {
    if (!this.hasTrialLicense()) {
      this.setNoLicenseMessage();
      return;
    }
    if (!this.checkNumOfSentMessages() || !this.server.isConnected)
      return;
    const h = me.toString(c.MESSAGE);
    await this.server.send(h) && await this.waitAfterSend();
  }
  shift(c) {
    if (!this.hasBasicLicense())
      return this.setNoLicenseMessage(), _({
        id: "bidirectionalComm.system.noLicense",
        default: "ライセンスがありません"
      });
    const h = me.toString(c.MESSAGE), p = ba(c.SHIFT);
    return h.split("").map((b) => b.codePointAt(0)).map((b) => String.fromCodePoint(b + p)).join("");
  }
  setChannel(c) {
    if (!this.hasTrialLicense()) {
      this.setNoLicenseMessage();
      return;
    }
    const h = Kt(me.toString(c.CHANNEL));
    this.server.setChannelName(h);
  }
  getChannel() {
    return this.server.channelName ?? "";
  }
  setIpAddress(c) {
    if (!this.hasBasicLicense()) {
      this.setNoLicenseMessage();
      return;
    }
    const h = Kt(me.toString(c.IP_ADDRESS));
    this.server.setIpAddress(h);
  }
  getIpAddress() {
    return this.server.ipAddress ?? "";
  }
  async sendMessageToIpAddress(c) {
    if (!this.hasBasicLicense()) {
      this.setNoLicenseMessage();
      return;
    }
    if (!this.checkNumOfSentMessages() || !this.server.isConnected)
      return;
    const h = me.toString(c.MESSAGE), p = me.toString(c.IP_ADDRESS);
    await this.server.sendToIpAddress(h, p) && await this.waitAfterSend();
  }
  enablePacketCapture() {
    if (!this.hasBasicLicense()) {
      this.setNoLicenseMessage();
      return;
    }
    this.server.isConnected && (this.isEnabledPacketCapture = !0, this.lastSystemMessage = {
      id: "bidirectionalComm.system.enabledPacketCapture",
      default: "パケット解析中"
    });
  }
  getLastSentMessageText() {
    var c;
    return ((c = this.lastSentMessage) == null ? void 0 : c.text) ?? "";
  }
  getLastSentMessageHeader(c) {
    var p, b, C, O, P, D;
    if (!this.hasBasicLicense())
      return this.setNoLicenseMessage(), "";
    switch (c.HEADER) {
      case "channel":
        return ((b = (p = this.lastSentMessage) == null ? void 0 : p.header) == null ? void 0 : b.channel) ?? "";
      case "to":
        return ((O = (C = this.lastSentMessage) == null ? void 0 : C.header) == null ? void 0 : O.to) ?? "";
      case "from":
        return ((D = (P = this.lastSentMessage) == null ? void 0 : P.header) == null ? void 0 : D.from) ?? "";
      default:
        return "";
    }
  }
  getLastReceivedMessageText() {
    var c;
    return ((c = this.lastReceivedMessage) == null ? void 0 : c.text) ?? "";
  }
  getLastReceivedMessageHeader(c) {
    var p, b, C, O, P, D;
    if (!this.hasBasicLicense())
      return this.setNoLicenseMessage(), "";
    switch (c.HEADER) {
      case "channel":
        return ((b = (p = this.lastReceivedMessage) == null ? void 0 : p.header) == null ? void 0 : b.channel) ?? "";
      case "to":
        return ((O = (C = this.lastReceivedMessage) == null ? void 0 : C.header) == null ? void 0 : O.to) ?? "";
      case "from":
        return ((D = (P = this.lastReceivedMessage) == null ? void 0 : P.header) == null ? void 0 : D.from) ?? "";
      default:
        return "";
    }
  }
  /**
   * @returns {object} metadata for this extension and its blocks.
   */
  getInfo() {
    Ws();
    var c = {
      id: lt.EXTENSION_ID,
      name: lt.EXTENSION_NAME,
      extensionURL: lt.extensionURL,
      blockIconURI: ia,
      showStatusButton: !1,
      color1: "#A6A6A6",
      blocks: [],
      menus: {
        HEADER: {
          acceptReporters: !1,
          items: [
            {
              text: _({
                id: "bidirectionalComm.menu.header.to",
                default: "送信先"
              }),
              value: "to"
            },
            {
              text: _({
                id: "bidirectionalComm.menu.header.from",
                default: "送信元"
              }),
              value: "from"
            },
            {
              text: _({
                id: "bidirectionalComm.menu.header.channel",
                default: "チャンネル名"
              }),
              value: "channel"
            }
          ]
        }
      }
    };
    return c.blocks.push(
      {
        opcode: "connect",
        text: _({
          id: "bidirectionalComm.block.connect",
          default: "キーワード[KEYWORD]で接続する"
        }),
        blockType: Z.COMMAND,
        arguments: {
          KEYWORD: {
            type: le.STRING,
            defaultValue: this.keyword ?? " "
          }
        }
      },
      {
        opcode: "getLastSystemMessage",
        text: _({
          id: "bidirectionalComm.block.getLastSystemMessage",
          default: "システムメッセージ"
        }),
        blockType: Z.REPORTER
      },
      {
        opcode: "getNumOfSentMessages",
        text: _({
          id: "bidirectionalComm.block.getNumOfSentMessages",
          default: "送信数"
        }),
        blockType: Z.REPORTER
      },
      {
        opcode: "disconnect",
        text: _({
          id: "bidirectionalComm.block.disconnect",
          default: "切断する"
        }),
        blockType: Z.COMMAND
      },
      "---",
      {
        opcode: "sendMessage",
        text: _({
          id: "bidirectionalComm.block.sendMessage",
          default: "[MESSAGE]を送る"
        }),
        blockType: Z.COMMAND,
        arguments: {
          MESSAGE: {
            type: le.STRING,
            defaultValue: _({
              id: "bidirectionalComm.defaultValue.sendMessage.message",
              default: "メッセージ"
            })
          }
        }
      }
    ), this.shouldShowBasicBlocks() && c.blocks.push(
      {
        opcode: "shift",
        text: _({
          id: "bidirectionalComm.block.shift",
          default: "[MESSAGE]を[SHIFT]文字ずらした文字列"
        }),
        blockType: Z.REPORTER,
        arguments: {
          MESSAGE: {
            type: le.STRING,
            defaultValue: "ひみつ"
          },
          SHIFT: {
            type: le.NUMBER,
            defaultValue: 1
          }
        }
      }
    ), c.blocks.push(
      "---",
      {
        opcode: "setChannel",
        text: _({
          id: "bidirectionalComm.block.setChannel",
          default: "チャンネル名を[CHANNEL]にする"
        }),
        blockType: Z.COMMAND,
        arguments: {
          CHANNEL: {
            type: le.STRING,
            defaultValue: _({
              id: "bidirectionalComm.defaultValue.setChannel.channel",
              default: "グループ1"
            })
          }
        }
      },
      {
        opcode: "getChannel",
        text: _({
          id: "bidirectionalComm.block.getChannel",
          default: "チャンネル名"
        }),
        blockType: Z.REPORTER
      }
    ), this.shouldShowBasicBlocks() && c.blocks.push(
      "---",
      {
        opcode: "setIpAddress",
        text: _({
          id: "bidirectionalComm.block.setIpAddress",
          default: "IPアドレスを[IP_ADDRESS]にする"
        }),
        blockType: Z.COMMAND,
        arguments: {
          IP_ADDRESS: {
            type: le.STRING,
            defaultValue: "192.168.1.100"
          }
        }
      },
      {
        opcode: "getIpAddress",
        text: _({
          id: "bidirectionalComm.block.getIpAddress",
          default: "自分のIPアドレス"
        }),
        blockType: Z.REPORTER
      },
      {
        opcode: "sendMessageToIpAddress",
        text: _({
          id: "bidirectionalComm.block.sendMessageToIpAddress",
          default: "[IP_ADDRESS]に[MESSAGE]を送る"
        }),
        blockType: Z.COMMAND,
        arguments: {
          IP_ADDRESS: {
            type: le.STRING,
            defaultValue: _({
              id: "bidirectionalComm.defaultValue.sendMessageToIpAddress.ipAddress",
              default: "IPアドレス"
            })
          },
          MESSAGE: {
            type: le.STRING,
            defaultValue: _({
              id: "bidirectionalComm.defaultValue.sendMessageToIpAddress.message",
              default: "メッセージ"
            })
          }
        }
      }
    ), this.shouldShowBasicBlocks() && c.blocks.push(
      "---",
      {
        opcode: "enablePacketCapture",
        text: _({
          id: "bidirectionalComm.block.enablePacketCapture",
          default: "パケットを解析する"
        }),
        blockType: Z.COMMAND
      }
    ), c.blocks.push(
      "---",
      {
        opcode: "whenReceivedMessage",
        text: _({
          id: "bidirectionalComm.block.whenReceivedMessage",
          default: "メッセージを受け取ったとき"
        }),
        blockType: Z.EVENT,
        isEdgeActivated: !1
      },
      {
        opcode: "getLastReceivedMessageText",
        text: _({
          id: "bidirectionalComm.block.getLastReceivedMessageText",
          default: "受信メッセージ"
        }),
        blockType: Z.REPORTER
      }
    ), this.shouldShowBasicBlocks() && c.blocks.push(
      {
        opcode: "getLastReceivedMessageHeader",
        text: _({
          id: "bidirectionalComm.block.getLastReceivedMessageHeader",
          default: "受信パケットの[HEADER]"
        }),
        blockType: Z.REPORTER,
        arguments: {
          HEADER: {
            type: le.STRING,
            menu: "HEADER",
            defaultValue: "to"
          }
        }
      }
    ), c.blocks.push(
      "---",
      {
        opcode: "whenSentMessage",
        text: _({
          id: "bidirectionalComm.block.whenSentMessage",
          default: "メッセージを送ったとき"
        }),
        blockType: Z.EVENT,
        isEdgeActivated: !1
      },
      {
        opcode: "getLastSentMessageText",
        text: _({
          id: "bidirectionalComm.block.getLastSentMessageText",
          default: "送信メッセージ"
        }),
        blockType: Z.REPORTER
      }
    ), this.shouldShowBasicBlocks() && c.blocks.push(
      {
        opcode: "getLastSentMessageHeader",
        text: _({
          id: "bidirectionalComm.block.getLastSentMessageHeader",
          default: "送信パケットの[HEADER]"
        }),
        blockType: Z.REPORTER,
        arguments: {
          HEADER: {
            type: le.STRING,
            menu: "HEADER",
            defaultValue: "to"
          }
        }
      }
    ), c;
  }
}
const Kt = (R) => R.trim().replace(/[Ａ-Ｚａ-ｚ０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 65248)), ba = (R) => typeof R == "string" ? me.toNumber(R.replace(/[０-９．]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 65248))) : me.toNumber(R);
export {
  lt as blockClass,
  lt as default
};
