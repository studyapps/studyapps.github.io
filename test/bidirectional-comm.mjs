var me = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Qe(R) {
  return R && R.__esModule && Object.prototype.hasOwnProperty.call(R, "default") ? R.default : R;
}
const ea = {
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
var ta = ea;
const V = /* @__PURE__ */ Qe(ta), na = {
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
var sa = na;
const le = /* @__PURE__ */ Qe(sa);
let ia = class Xe {
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
    const h = c >> 24 & 255, g = c >> 16 & 255, b = c >> 8 & 255, T = c & 255;
    return { r: g, g: b, b: T, a: h > 0 ? h : 255 };
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
    c = c.replace(h, (b, T, S, E) => T + T + S + S + E + E);
    const g = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
    return g ? {
      r: parseInt(g[1], 16),
      g: parseInt(g[2], 16),
      b: parseInt(g[3], 16)
    } : null;
  }
  /**
   * Convert an RGB color object to a hex color.
   * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
   * @return {!string} Hex representation of the color.
   */
  static rgbToHex(c) {
    return Xe.decimalToHex(Xe.rgbToDecimal(c));
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
    return Xe.rgbToDecimal(Xe.hexToRgb(c));
  }
  /**
   * Convert an HSV color to RGB format.
   * @param {HSVObject} hsv - {h: hue [0,360), s: saturation [0,1], v: value [0,1]}
   * @return {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
   */
  static hsvToRgb(c) {
    let h = c.h % 360;
    h < 0 && (h += 360);
    const g = Math.max(0, Math.min(c.s, 1)), b = Math.max(0, Math.min(c.v, 1)), T = Math.floor(h / 60), S = h / 60 - T, E = b * (1 - g), x = b * (1 - g * S), D = b * (1 - g * (1 - S));
    let N, W, te;
    switch (T) {
      default:
      case 0:
        N = b, W = D, te = E;
        break;
      case 1:
        N = x, W = b, te = E;
        break;
      case 2:
        N = E, W = b, te = D;
        break;
      case 3:
        N = E, W = x, te = b;
        break;
      case 4:
        N = D, W = E, te = b;
        break;
      case 5:
        N = b, W = E, te = x;
        break;
    }
    return {
      r: Math.floor(N * 255),
      g: Math.floor(W * 255),
      b: Math.floor(te * 255)
    };
  }
  /**
   * Convert an RGB color to HSV format.
   * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
   * @return {HSVObject} hsv - {h: hue [0,360), s: saturation [0,1], v: value [0,1]}
   */
  static rgbToHsv(c) {
    const h = c.r / 255, g = c.g / 255, b = c.b / 255, T = Math.min(Math.min(h, g), b), S = Math.max(Math.max(h, g), b);
    let E = 0, x = 0;
    if (T !== S) {
      const D = h === T ? g - b : g === T ? b - h : h - g;
      E = ((h === T ? 3 : g === T ? 5 : 1) - D / (S - T)) * 60 % 360, x = (S - T) / S;
    }
    return { h: E, s: x, v: S };
  }
  /**
   * Linear interpolation between rgb0 and rgb1.
   * @param {RGBObject} rgb0 - the color corresponding to fraction1 <= 0.
   * @param {RGBObject} rgb1 - the color corresponding to fraction1 >= 1.
   * @param {number} fraction1 - the interpolation parameter. If this is 0.5, for example, mix the two colors equally.
   * @return {RGBObject} the interpolated color.
   */
  static mixRgb(c, h, g) {
    if (g <= 0) return c;
    if (g >= 1) return h;
    const b = 1 - g;
    return {
      r: b * c.r + g * h.r,
      g: b * c.g + g * h.g,
      b: b * c.b + g * h.b
    };
  }
};
var ra = ia;
const Ds = ra;
class ne {
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
    const h = ne.toRgbColorObject(c);
    return [h.r, h.g, h.b];
  }
  /**
   * Cast any Scratch argument to an RGB color object to be used for the renderer.
   * @param {*} value Value to convert to RGB color object.
   * @return {RGBOject} [r,g,b], values between 0-255.
   */
  static toRgbColorObject(c) {
    let h;
    return typeof c == "string" && c.substring(0, 1) === "#" ? (h = Ds.hexToRgb(c), h || (h = { r: 0, g: 0, b: 0, a: 255 })) : h = Ds.decimalToRgb(ne.toNumber(c)), h;
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
    let g = Number(c), b = Number(h);
    if (g === 0 && ne.isWhiteSpace(c) ? g = NaN : b === 0 && ne.isWhiteSpace(h) && (b = NaN), isNaN(g) || isNaN(b)) {
      const T = String(c).toLowerCase(), S = String(h).toLowerCase();
      return T < S ? -1 : T > S ? 1 : 0;
    }
    return g === 1 / 0 && b === 1 / 0 || g === -1 / 0 && b === -1 / 0 ? 0 : g - b;
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
  static toListIndex(c, h, g) {
    if (typeof c != "number") {
      if (c === "all")
        return g ? ne.LIST_ALL : ne.LIST_INVALID;
      if (c === "last")
        return h > 0 ? h : ne.LIST_INVALID;
      if (c === "random" || c === "any")
        return h > 0 ? 1 + Math.floor(Math.random() * h) : ne.LIST_INVALID;
    }
    return c = Math.floor(ne.toNumber(c)), c < 1 || c > h ? ne.LIST_INVALID : c;
  }
}
var oa = ne;
const ye = /* @__PURE__ */ Qe(oa), aa = {}, ca = {
  "bidirectionalComm.name": "双方向通信",
  "bidirectionalComm.system.notConnected": "接続してください",
  "bidirectionalComm.system.checkingLicense": "ライセンスの確認中",
  "bidirectionalComm.system.noLicense": "ライセンスがありません",
  "bidirectionalComm.system.noKeyword": "キーワードを入力してください",
  "bidirectionalComm.system.connected": "接続完了",
  "bidirectionalComm.system.failedToConnect": "接続失敗",
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
  "bidirectionalComm.menu.header.channel": "チャンネル名",
  "bidirectionalComm.menu.header.timestamp": "タイムスタンプ"
}, la = {
  en: aa,
  ja: ca,
  "ja-Hira": {
    "bidirectionalComm.name": "そうほうこうつうしん",
    "bidirectionalComm.system.notConnected": "せつぞくしてください",
    "bidirectionalComm.system.checkingLicense": "ライセンスのかくにんちゅう",
    "bidirectionalComm.system.noLicense": "ライセンスがありません",
    "bidirectionalComm.system.noKeyword": "キーワードを入力してください",
    "bidirectionalComm.system.connected": "せつぞくかんりょう",
    "bidirectionalComm.system.failedToConnect": "せつぞくしっぱい",
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
    "bidirectionalComm.menu.header.channel": "チャンネルめい",
    "bidirectionalComm.menu.header.timestamp": "タイムスタンプ"
  }
}, ha = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAC4jAAAuIwF4pT92AAAq3WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuYTZhNjM5NiwgMjAyNC8wMy8xMi0wNzo0ODoyMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6aWxsdXN0cmF0b3I9Imh0dHA6Ly9ucy5hZG9iZS5jb20vaWxsdXN0cmF0b3IvMS4wLyIgeG1sbnM6eG1wVFBnPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvdC9wZy8iIHhtbG5zOnN0RGltPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvRGltZW5zaW9ucyMiIHhtbG5zOnhtcEc9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9nLyIgeG1sbnM6cGRmPSJodHRwOi8vbnMuYWRvYmUuY29tL3BkZi8xLjMvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTA4LTIyVDE3OjU2OjI0KzA5OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0wOC0yMlQxNzo1NjoyNCswOTowMCIgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMDgtMjJUMTc6NTQ6NTArMTA6MDAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgSWxsdXN0cmF0b3IgMjguNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzRlYzhjN2UtMzM0NS1mOTRjLTg4YzctMDJiMzNmYzY5OGNjIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOmI4ZjRkODM1LWFmYWMtOTc0NC1iMzI3LWY2M2Y2ZGNhNWJhYSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ1dWlkOjVEMjA4OTI0OTNCRkRCMTE5MTRBODU5MEQzMTUwOEM4IiB4bXBNTTpSZW5kaXRpb25DbGFzcz0icHJvb2Y6cGRmIiBpbGx1c3RyYXRvcjpUeXBlPSJEb2N1bWVudCIgaWxsdXN0cmF0b3I6U3RhcnR1cFByb2ZpbGU9IlByaW50IiBpbGx1c3RyYXRvcjpDcmVhdG9yU3ViVG9vbD0iQUlSb2JpbiIgeG1wVFBnOkhhc1Zpc2libGVPdmVycHJpbnQ9IkZhbHNlIiB4bXBUUGc6SGFzVmlzaWJsZVRyYW5zcGFyZW5jeT0iRmFsc2UiIHhtcFRQZzpOUGFnZXM9IjEiIHBkZjpQcm9kdWNlcj0iQWRvYmUgUERGIGxpYnJhcnkgMTcuMDAiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiPiA8ZGM6dGl0bGU+IDxyZGY6QWx0PiA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPuWPjOaWueWQkeaAp+OCouOCpOOCs+ODszwvcmRmOmxpPiA8L3JkZjpBbHQ+IDwvZGM6dGl0bGU+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ1dWlkOjg1NDIwNmQzLTRhN2YtNDI2MS05ODc1LWUwNTMzNDQ3ZTU5ZCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpiOGY0ZDgzNS1hZmFjLTk3NDQtYjMyNy1mNjNmNmRjYTViYWEiIHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD0idXVpZDo1RDIwODkyNDkzQkZEQjExOTE0QTg1OTBEMzE1MDhDOCIgc3RSZWY6cmVuZGl0aW9uQ2xhc3M9InByb29mOnBkZiIvPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiNTQ5M2IwOC1lMDBiLWIwNDYtYWYyYS1hYTk1MjhhMjhlYTMiIHN0RXZ0OndoZW49IjIwMjQtMDgtMjJUMTc6NDA6NTUrMDk6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIElsbHVzdHJhdG9yIDI4LjYgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiOGY0ZDgzNS1hZmFjLTk3NDQtYjMyNy1mNjNmNmRjYTViYWEiIHN0RXZ0OndoZW49IjIwMjQtMDgtMjJUMTc6NTI6NDUrMDk6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIElsbHVzdHJhdG9yIDI4LjYgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vcGRmIHRvIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NGVjOGM3ZS0zMzQ1LWY5NGMtODhjNy0wMmIzM2ZjNjk4Y2MiIHN0RXZ0OndoZW49IjIwMjQtMDgtMjJUMTc6NTY6MjQrMDk6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNS4xMSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBUUGc6TWF4UGFnZVNpemUgc3REaW06dz0iODAuMDAwMDAwIiBzdERpbTpoPSI4MC4wMDAwMDAiIHN0RGltOnVuaXQ9IlBpeGVscyIvPiA8eG1wVFBnOlBsYXRlTmFtZXM+IDxyZGY6U2VxPiA8cmRmOmxpPkN5YW48L3JkZjpsaT4gPHJkZjpsaT5NYWdlbnRhPC9yZGY6bGk+IDxyZGY6bGk+WWVsbG93PC9yZGY6bGk+IDxyZGY6bGk+QmxhY2s8L3JkZjpsaT4gPC9yZGY6U2VxPiA8L3htcFRQZzpQbGF0ZU5hbWVzPiA8eG1wVFBnOlN3YXRjaEdyb3Vwcz4gPHJkZjpTZXE+IDxyZGY6bGk+IDxyZGY6RGVzY3JpcHRpb24geG1wRzpncm91cE5hbWU9IuWIneacn+ioreWumuOBruOCueOCpuOCqeODg+ODgeOCsOODq+ODvOODlyIgeG1wRzpncm91cFR5cGU9IjAiPiA8eG1wRzpDb2xvcmFudHM+IDxyZGY6U2VxPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0i44Ob44Ov44Kk44OIIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjU1IiB4bXBHOmdyZWVuPSIyNTUiIHhtcEc6Ymx1ZT0iMjU1Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSLjg5bjg6njg4Pjgq8iIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIzNSIgeG1wRzpncmVlbj0iMjQiIHhtcEc6Ymx1ZT0iMjEiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkNNWUsg44Os44OD44OJIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjMwIiB4bXBHOmdyZWVuPSIwIiB4bXBHOmJsdWU9IjE4Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDTVlLIOOCpOOCqOODreODvCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjI1NSIgeG1wRzpncmVlbj0iMjQxIiB4bXBHOmJsdWU9IjAiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkNNWUsg44Kw44Oq44O844OzIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMCIgeG1wRzpncmVlbj0iMTUzIiB4bXBHOmJsdWU9IjY4Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDTVlLIOOCt+OCouODsyIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjAiIHhtcEc6Z3JlZW49IjE2MCIgeG1wRzpibHVlPSIyMzMiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkNNWUsg44OW44Or44O8IiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjkiIHhtcEc6Z3JlZW49IjMyIiB4bXBHOmJsdWU9IjEzNiIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQ01ZSyDjg57jgrzjg7Pjgr8iIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyMjgiIHhtcEc6Z3JlZW49IjAiIHhtcEc6Ymx1ZT0iMTI3Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTE1IE09MTAwIFk9OTAgSz0xMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE5NSIgeG1wRzpncmVlbj0iMTMiIHhtcEc6Ymx1ZT0iMzUiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MCBNPTkwIFk9ODUgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjMyIiB4bXBHOmdyZWVuPSI1NiIgeG1wRzpibHVlPSI0MCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09ODAgWT05NSBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyMzQiIHhtcEc6Z3JlZW49Ijg1IiB4bXBHOmJsdWU9IjIwIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT01MCBZPTEwMCBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyNDMiIHhtcEc6Z3JlZW49IjE1MiIgeG1wRzpibHVlPSIwIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0zNSBZPTg1IEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjI0OCIgeG1wRzpncmVlbj0iMTgyIiB4bXBHOmJsdWU9IjQ1Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTUgTT0wIFk9OTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjUwIiB4bXBHOmdyZWVuPSIyMzgiIHhtcEc6Ymx1ZT0iMCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0yMCBNPTAgWT0xMDAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjE4IiB4bXBHOmdyZWVuPSIyMjQiIHhtcEc6Ymx1ZT0iMCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz01MCBNPTAgWT0xMDAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTQzIiB4bXBHOmdyZWVuPSIxOTUiIHhtcEc6Ymx1ZT0iMzEiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NzUgTT0wIFk9MTAwIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjM0IiB4bXBHOmdyZWVuPSIxNzIiIHhtcEc6Ymx1ZT0iNTYiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9ODUgTT0xMCBZPTEwMCBLPTEwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMCIgeG1wRzpncmVlbj0iMTQ1IiB4bXBHOmJsdWU9IjU4Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTkwIE09MzAgWT05NSBLPTMwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMCIgeG1wRzpncmVlbj0iMTA1IiB4bXBHOmJsdWU9IjUyIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTc1IE09MCBZPTc1IEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE5IiB4bXBHOmdyZWVuPSIxNzQiIHhtcEc6Ymx1ZT0iMTAzIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTgwIE09MTAgWT00NSBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIwIiB4bXBHOmdyZWVuPSIxNjIiIHhtcEc6Ymx1ZT0iMTU0Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTcwIE09MTUgWT0wIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjQ2IiB4bXBHOmdyZWVuPSIxNjciIHhtcEc6Ymx1ZT0iMjI0Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTg1IE09NTAgWT0wIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjMiIHhtcEc6Z3JlZW49IjExMCIgeG1wRzpibHVlPSIxODQiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MTAwIE09OTUgWT01IEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjIzIiB4bXBHOmdyZWVuPSI0MiIgeG1wRzpibHVlPSIxMzYiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MTAwIE09MTAwIFk9MjUgSz0yNSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjIzIiB4bXBHOmdyZWVuPSIyOCIgeG1wRzpibHVlPSI5NyIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz03NSBNPTEwMCBZPTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iOTYiIHhtcEc6Z3JlZW49IjI1IiB4bXBHOmJsdWU9IjEzNCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz01MCBNPTEwMCBZPTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTQ2IiB4bXBHOmdyZWVuPSI3IiB4bXBHOmJsdWU9IjEzMSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0zNSBNPTEwMCBZPTM1IEs9MTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIxNjQiIHhtcEc6Z3JlZW49IjExIiB4bXBHOmJsdWU9IjkzIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTEwIE09MTAwIFk9NTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjE1IiB4bXBHOmdyZWVuPSIwIiB4bXBHOmJsdWU9IjgxIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT05NSBZPTIwIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjIzMCIgeG1wRzpncmVlbj0iMjIiIHhtcEc6Ymx1ZT0iMTE1Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTI1IE09MjUgWT00MCBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyMDEiIHhtcEc6Z3JlZW49IjE4OCIgeG1wRzpibHVlPSIxNTYiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NDAgTT00NSBZPTUwIEs9NSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE2NCIgeG1wRzpncmVlbj0iMTM5IiB4bXBHOmJsdWU9IjEyMCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz01MCBNPTUwIFk9NjAgSz0yNSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjEyMiIgeG1wRzpncmVlbj0iMTA2IiB4bXBHOmJsdWU9Ijg2Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTU1IE09NjAgWT02NSBLPTQwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iOTYiIHhtcEc6Z3JlZW49Ijc2IiB4bXBHOmJsdWU9IjYzIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTI1IE09NDAgWT02NSBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyMDEiIHhtcEc6Z3JlZW49IjE2MCIgeG1wRzpibHVlPSI5OSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0zMCBNPTUwIFk9NzUgSz0xMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE3OCIgeG1wRzpncmVlbj0iMTMwIiB4bXBHOmJsdWU9IjcxIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTM1IE09NjAgWT04MCBLPTI1IiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTQ5IiB4bXBHOmdyZWVuPSI5NyIgeG1wRzpibHVlPSI1MiIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz00MCBNPTY1IFk9OTAgSz0zNSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjEyNyIgeG1wRzpncmVlbj0iNzkiIHhtcEc6Ymx1ZT0iMzMiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NDAgTT03MCBZPTEwMCBLPTUwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTA2IiB4bXBHOmdyZWVuPSI1NyIgeG1wRzpibHVlPSI2Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTUwIE09NzAgWT04MCBLPTcwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iNjQiIHhtcEc6Z3JlZW49IjM0IiB4bXBHOmJsdWU9IjE1Ii8+IDwvcmRmOlNlcT4gPC94bXBHOkNvbG9yYW50cz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOmxpPiA8cmRmOmxpPiA8cmRmOkRlc2NyaXB0aW9uIHhtcEc6Z3JvdXBOYW1lPSLjgrDjg6zjg7wiIHhtcEc6Z3JvdXBUeXBlPSIxIj4gPHhtcEc6Q29sb3JhbnRzPiA8cmRmOlNlcT4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MCBNPTAgWT0wIEs9MTAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMzUiIHhtcEc6Z3JlZW49IjI0IiB4bXBHOmJsdWU9IjIxIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTkwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iNjIiIHhtcEc6Z3JlZW49IjU4IiB4bXBHOmJsdWU9IjU3Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTgwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iODkiIHhtcEc6Z3JlZW49Ijg3IiB4bXBHOmJsdWU9Ijg3Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTcwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTE0IiB4bXBHOmdyZWVuPSIxMTMiIHhtcEc6Ymx1ZT0iMTEzIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTYwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTM3IiB4bXBHOmdyZWVuPSIxMzciIHhtcEc6Ymx1ZT0iMTM3Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTUwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTU5IiB4bXBHOmdyZWVuPSIxNjAiIHhtcEc6Ymx1ZT0iMTYwIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTQwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTgxIiB4bXBHOmdyZWVuPSIxODEiIHhtcEc6Ymx1ZT0iMTgyIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTMwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjAxIiB4bXBHOmdyZWVuPSIyMDIiIHhtcEc6Ymx1ZT0iMjAyIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTIwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjIwIiB4bXBHOmdyZWVuPSIyMjEiIHhtcEc6Ymx1ZT0iMjIxIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTEwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjM5IiB4bXBHOmdyZWVuPSIyMzkiIHhtcEc6Ymx1ZT0iMjM5Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTUiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyNDciIHhtcEc6Z3JlZW49IjI0OCIgeG1wRzpibHVlPSIyNDgiLz4gPC9yZGY6U2VxPiA8L3htcEc6Q29sb3JhbnRzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6bGk+IDxyZGY6bGk+IDxyZGY6RGVzY3JpcHRpb24geG1wRzpncm91cE5hbWU9Iui8neOBjSIgeG1wRzpncm91cFR5cGU9IjEiPiA8eG1wRzpDb2xvcmFudHM+IDxyZGY6U2VxPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MTAwIFk9MTAwIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjIzMCIgeG1wRzpncmVlbj0iMCIgeG1wRzpibHVlPSIxOCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09NzUgWT0xMDAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjM1IiB4bXBHOmdyZWVuPSI5NyIgeG1wRzpibHVlPSIwIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0xMCBZPTk1IEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjI1NSIgeG1wRzpncmVlbj0iMjI2IiB4bXBHOmJsdWU9IjAiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9ODUgTT0xMCBZPTEwMCBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIwIiB4bXBHOmdyZWVuPSIxNTQiIHhtcEc6Ymx1ZT0iNjIiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MTAwIE09OTAgWT0wIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjExIiB4bXBHOmdyZWVuPSI0OSIgeG1wRzpibHVlPSIxNDMiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NjAgTT05MCBZPTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTI2IiB4bXBHOmdyZWVuPSI0OSIgeG1wRzpibHVlPSIxNDIiLz4gPC9yZGY6U2VxPiA8L3htcEc6Q29sb3JhbnRzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6bGk+IDwvcmRmOlNlcT4gPC94bXBUUGc6U3dhdGNoR3JvdXBzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvQJgmIAAAZQSURBVHic7ZxvSBtnHMe/99xdkktWnINJqRSsa92Y62LipCrtitrN0KqlUHG0FBFkKKN1m8iQsZluMDfE/WlZ21cTKSsWC65qi65VcS90xWl0riDSWaG1FEtnRczlz+VuL6ZFXGw1d8nl4n3gXuSS5/l9+eRyd8/zJKEkSYJO6BC1A2gdXaBMdIEy0QXKRBcoF0mSnm5RTCWA19UOscxKZ1o5Al9lWXYYQJHaQVajFYHYtWuXiRDyC8MwTgCU2nmW0YzA4uJiXLt2jTKZTJ+azeZOAC+onQnQkEAAcDgccLlcTGJi4jscx40CeEXtTJoSCAA7d+7E8PAwm5eXl2QwGMYAvKtmHs0JBIAtW7agvb2drq2ttRBCuhiGqVEriyYFAgBFUXA6nbhy5QrFsmw9x3GtALhI59CswGWOHDmCoaEhOiEh4bDZbP4DwPZI1te8QABITU2Fy+Vis7KyUoxG4ziAtyNVOyYEAkB8fDy6u7uZkydPxhFCegkhH0SibswIBACaptHQ0ICLFy/SDMP8YDKZmgAYwlkzpgQuc+zYMQwMDNDx8fHHzWbz7wC2hqtWTAoEgPT0dIyOjrI2m223yWT6C0BGOOrErEAASEhIQF9fH1NWVvYSTdMDAEqVrsEE2VdhsVg+UrqQHLxeb0KobVmWxblz5yi73c5UVFT8xDBMhtfr/RCAoES2YAK37t27N8XhcCjRv2JkZmbKal9eXo7U1FRSWFj4Pk3TNrfbXQTgsexgQSZUnXV1dVKscv/+fclut/s4jnsI4E25zmL6HBiMxMREDAwMsMXFxS8zDDMEoFhOf5tOIAAYjUY0NzeTxsZGAyGkxWAwfIMQXWxKgcucOnUKN2/eJCaT6WOz2dwN4MWN9rGpBQJATk4OxsbGmB07duxfmqR9bSPtN71AAEhKSsKtW7fYgoKC7SzLugAUrLetLnAJi8WCy5cvk9OnT5sIIVcZhvkM61i80gWugKIo1NbWoqOjgxiNxs85jrsKwPKsNrrAIBw8eBAjIyPMtm3bHBzHuQAkr/VaXeAapKSkYGRkhM3NzU1eWrzKC/a6YEM5tLS0YHR0NJz5NAMhhJYk6QWKom5IklQN4LuVz1PSiu/EUBQFAI6lTSc4lyVJGlx+EEygznNY6Uw/B8pEFygTXaBMdIEy0QXKRBcoE12gTHSBMtEFymT1WDgLQIkaQTRC19L2lNUCBwFkUhTVyDAM5XA4QIh+kALA+Pg4pqamnmCVwLV+aJNnMBgWDh06JMzPz6uzgBtlVFVVSQCcq52tdXj1+Hw+a29v75TdbvdPTk4q/5bGCM/6fE7xPG978OBBl91uF65fvx6xUFrieSe4RZ7nD3u93i8KCwvF+vr6aP9NXcRZzxVCEgThS1EUD9fV1XlKSkrExcXFsAfTChu5xHb6/X5bZ2fnvT179vinp6fDlUlTbPQeZYLn+bS7d+/2W61Woa+vLyyhtEQoN3lP3G53vsfj+fbAgQPimTNnFA+lJUK9SxZ9Pt8noii+V11d7SstLRW9Xq+iwbSC3GFGqyAIGa2trY+ys7P9MzMzioTSEkHXhTfInzzPp05MTLRbrdaMjo4ONisrS1aH/f39cLlcCkRTjrXyKCEQAB673e79gUDg+3379lVeuHCBlJeXh9xZW1sbzp8/P8ey7COF8inFw//tkZT/04lSmqb9lZWVos/nC3ncGRcX97VSgZRmPWNhOTQHAoHspqamf3JycoTZ2dkwlIgewjVXNeTxeN5wuVzjaWlp/uHh4TCVUZ9wTvY9dLvdmXNzcz9nZ2cHLl26FMZS6hHu2VKfx+MpEwSh6sSJE4GamhoEAoEwl4wsEZluFkXxR1EUc8+ePTufn58vzM3NRaJsRIjkfP1vXq939+Dg4KTNZvPfvn07gqXDR6QXPO653e63Zmdnr2ZkZATa2toiXF551Fgx4nmeL/b7/bVHjx6VnE6npidpVVtyEwShQRRFR319/WJRUVFgYWFBrSiyUHvN8lefz2ft6emZTk9P99+5c0flOBtHbYEA8DfP82kzMzM3bDab0NXV9fwW0UQYxsKhQjEM4ySEiMnJyZoZC0eTwGWKWJblLRbLV2oHWYtoFwj893efx9UOsRYrnVFRJk5zRMNFRNPoAmWiC5SJLlAmukCZ/AsrL3VlOnnl4AAAAABJRU5ErkJggg==", Ws = "trial", $t = "basic", ua = "no", da = "https://script.google.com/macros/s/AKfycbwFCv5Xw-_-lkCJB2IFc3CyIhyoyRzVkoerCffIMYMZE2exHQuA1rHjcVgdVZHprHPUBQ/exec";
class ga {
  /**
   * 初期化
   * @param {string} id お客様ID (10文字)
   */
  constructor(c) {
    this._id = c, this._apikey = null, this._license = null;
  }
  /**
   * お客様ID
   * @type {string}
   */
  get id() {
    return this._id;
  }
  /**
   * APIキー
   * @type {string?}
   */
  get apikey() {
    return this._apikey;
  }
  /**
   * ライセンス情報とAPIキーを取得して更新
   * @returns {Promise}
   */
  async fetchLicense() {
    try {
      this._fetchLicenseCompletion = null;
      const c = da + "?id=" + this._id, g = await (await fetch(c)).json();
      g.apikey && (g.license == Ws || g.license == $t) ? (this._apikey = g.apikey, this._license = g.license) : this._license = ua, this._fetchLicenseCompletion && this._fetchLicenseCompletion();
    } catch (c) {
      throw c;
    }
  }
  /**
   * ライセンス情報を取得できるまで待機
   * @returns {Promise<boolean>}
   */
  async waitLicenseFetch() {
    return this.isFetchedLicense() ? this.hasLicense() : (await Promise.race([
      new Promise((c) => {
        this._fetchLicenseCompletion = c;
      }),
      Util.timeout(5e3)
    ]), this.hasLicense());
  }
  /**
   * ライセンス情報を取得済みか
   * @returns {boolean}
   */
  isFetchedLicense() {
    return this._license != null;
  }
  /**
   * ライセンスを持っているか
   * @returns {boolean}
   */
  hasLicense() {
    return this.hasTrialLicense();
  }
  /**
   * トライアルライセンスを持っているか
   * @returns {boolean}
   */
  hasTrialLicense() {
    return this._license == Ws || this._license == $t;
  }
  /**
   * ベーシックライセンスを持っているか
   * @returns {boolean}
   */
  hasBasicLicense() {
    return this._license == $t;
  }
}
var Ys = { exports: {} };
/*@license Copyright 2015-2022 Ably Real-time Ltd (ably.com)

Ably JavaScript Library v2.3.1
https://github.com/ably/ably-js

Released under the Apache Licence v2.0*/
(function(R, c) {
  (function(h, g) {
    R.exports = g();
  })(me, () => {
    var h = {}, g = { exports: h }, b = Object.defineProperty, T = Object.defineProperties, S = Object.getOwnPropertyDescriptor, E = Object.getOwnPropertyDescriptors, x = Object.getOwnPropertyNames, D = Object.getOwnPropertySymbols, N = Object.prototype.hasOwnProperty, W = Object.prototype.propertyIsEnumerable, te = (e, t, n) => t in e ? b(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, F = (e, t) => {
      for (var n in t || (t = {}))
        N.call(t, n) && te(e, n, t[n]);
      if (D)
        for (var n of D(t))
          W.call(t, n) && te(e, n, t[n]);
      return e;
    }, he = (e, t) => T(e, E(t)), hi = (e, t) => {
      var n = {};
      for (var s in e)
        N.call(e, s) && t.indexOf(s) < 0 && (n[s] = e[s]);
      if (e != null && D)
        for (var s of D(e))
          t.indexOf(s) < 0 && W.call(e, s) && (n[s] = e[s]);
      return n;
    }, an = (e, t) => {
      for (var n in t)
        b(e, n, { get: t[n], enumerable: !0 });
    }, ui = (e, t, n, s) => {
      if (t && typeof t == "object" || typeof t == "function")
        for (let i of x(t))
          !N.call(e, i) && i !== n && b(e, i, { get: () => t[i], enumerable: !(s = S(t, i)) || s.enumerable });
      return e;
    }, di = (e) => ui(b({}, "__esModule", { value: !0 }), e), cn = {};
    an(cn, {
      ErrorInfo: () => m,
      Realtime: () => Zt,
      Rest: () => Pt,
      default: () => Ko,
      msgpack: () => Qt,
      protocolMessageFromDeserialized: () => Lr
    }), g.exports = di(cn);
    var y = class {
    }, ln = typeof me < "u" ? me : typeof window < "u" ? window : self;
    function Ke(e, t) {
      return `${e}`.padStart(t ? 3 : 2, "0");
    }
    function gi(e) {
      return y.Config.logTimestamps ? function(t) {
        const n = /* @__PURE__ */ new Date();
        e(
          Ke(n.getHours()) + ":" + Ke(n.getMinutes()) + ":" + Ke(n.getSeconds()) + "." + Ke(n.getMilliseconds(), 1) + " " + t
        );
      } : function(t) {
        e(t);
      };
    }
    var fi = () => {
      var e;
      let t, n;
      return typeof ((e = ln == null ? void 0 : ln.console) == null ? void 0 : e.log) == "function" ? (t = function(...s) {
      }, n = console.warn ? function(...s) {
      } : t) : t = n = function() {
      }, [t, n].map(gi);
    }, ue = class Ye {
      constructor() {
        this.deprecated = (t, n) => {
          this.deprecationWarning(`${t} is deprecated and will be removed in a future version. ${n}`);
        }, this.shouldLog = (t) => t <= this.logLevel, this.setLog = (t, n) => {
          t !== void 0 && (this.logLevel = t), n !== void 0 && (this.logHandler = this.logErrorHandler = n);
        }, this.logLevel = Ye.defaultLogLevel, this.logHandler = Ye.defaultLogHandler, this.logErrorHandler = Ye.defaultLogErrorHandler;
      }
      static initLogHandlers() {
        const [t, n] = fi();
        this.defaultLogHandler = t, this.defaultLogErrorHandler = n, this.defaultLogger = new Ye();
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
    ue.defaultLogLevel = 1, ue.LOG_NONE = 0, ue.LOG_ERROR = 1, ue.LOG_MAJOR = 2, ue.LOG_MINOR = 3, ue.LOG_MICRO = 4, ue.logAction = (e, t, n, s) => {
      ue.logActionNoStrip(e, t, n, s);
    };
    var pi = ue, o = pi, gt = {};
    an(gt, {
      Format: () => Rn,
      allSame: () => In,
      allToLowerCase: () => yt,
      allToUpperCase: () => On,
      arrChooseN: () => Sn,
      arrDeleteValue: () => mn,
      arrEquals: () => En,
      arrIntersect: () => fn,
      arrIntersectOb: () => pn,
      arrPopRandomElement: () => ft,
      arrSubtract: () => wi,
      arrWithoutValue: () => Ti,
      cheapRandStr: () => mt,
      containsValue: () => Ri,
      copy: () => Ce,
      createMissingPluginError: () => tt,
      dataSizeBytes: () => Tn,
      decodeBody: () => ie,
      encodeBody: () => oe,
      ensureArray: () => un,
      forInOwnNonNullProperties: () => bn,
      getBackoffCoefficient: () => vn,
      getGlobalObject: () => It,
      getJitterCoefficient: () => Mn,
      getRetryTime: () => bt,
      inherits: () => Ii,
      inspectBody: () => wn,
      inspectError: () => U,
      intersect: () => gn,
      isEmpty: () => yi,
      isErrorInfoOrPartialErrorInfo: () => pt,
      isNil: () => se,
      isObject: () => Se,
      keysArray: () => Be,
      matchDerivedChannel: () => kn,
      mixin: () => k,
      parseQueryString: () => $e,
      prototypicalClone: () => dn,
      randomString: () => Cn,
      shallowClone: () => bi,
      shallowEquals: () => An,
      throwMissingPluginError: () => $,
      toBase64: () => et,
      toQueryString: () => Ne,
      valuesArray: () => yn,
      whenPromiseSettles: () => Q,
      withTimeoutAsync: () => Pn
    });
    function hn(e) {
      let t = "[" + e.constructor.name;
      return e.message && (t += ": " + e.message), e.statusCode && (t += "; statusCode=" + e.statusCode), e.code && (t += "; code=" + e.code), e.cause && (t += "; cause=" + U(e.cause)), e.href && !(e.message && e.message.indexOf("help.ably.io") > -1) && (t += "; see " + e.href + " "), t += "]", t;
    }
    var m = class tn extends Error {
      constructor(t, n, s, i) {
        super(t), typeof Object.setPrototypeOf < "u" && Object.setPrototypeOf(this, tn.prototype), this.code = n, this.statusCode = s, this.cause = i;
      }
      toString() {
        return hn(this);
      }
      static fromValues(t) {
        const { message: n, code: s, statusCode: i } = t;
        if (typeof n != "string" || typeof s != "number" || typeof i != "number")
          throw new Error("ErrorInfo.fromValues(): invalid values: " + y.Config.inspect(t));
        const r = Object.assign(new tn(n, s, i), t);
        return r.code && !r.href && (r.href = "https://help.ably.io/error/" + r.code), r;
      }
    }, J = class nn extends Error {
      constructor(t, n, s, i) {
        super(t), typeof Object.setPrototypeOf < "u" && Object.setPrototypeOf(this, nn.prototype), this.code = n, this.statusCode = s, this.cause = i;
      }
      toString() {
        return hn(this);
      }
      static fromValues(t) {
        const { message: n, code: s, statusCode: i } = t;
        if (typeof n != "string" || !se(s) && typeof s != "number" || !se(i) && typeof i != "number")
          throw new Error("PartialErrorInfo.fromValues(): invalid values: " + y.Config.inspect(t));
        const r = Object.assign(new nn(n, s, i), t);
        return r.code && !r.href && (r.href = "https://help.ably.io/error/" + r.code), r;
      }
    };
    function mi(e) {
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
    function Ce(e) {
      return k({}, e);
    }
    function un(e) {
      return se(e) ? [] : Array.isArray(e) ? e : [e];
    }
    function Se(e) {
      return Object.prototype.toString.call(e) == "[object Object]";
    }
    function yi(e) {
      for (const t in e)
        return !1;
      return !0;
    }
    function se(e) {
      return e == null;
    }
    function bi(e) {
      const t = new Object();
      for (const n in e)
        t[n] = e[n];
      return t;
    }
    function dn(e, t) {
      class n {
      }
      n.prototype = e;
      const s = new n();
      return t && k(s, t), s;
    }
    var Ii = function(e, t) {
      if (y.Config.inherits) {
        y.Config.inherits(e, t);
        return;
      }
      e.super_ = t, e.prototype = dn(t.prototype, { constructor: e });
    };
    function Ri(e, t) {
      for (const n in e)
        if (e[n] == t)
          return !0;
      return !1;
    }
    function gn(e, t) {
      return Array.isArray(t) ? fn(e, t) : pn(e, t);
    }
    function fn(e, t) {
      const n = [];
      for (let s = 0; s < e.length; s++) {
        const i = e[s];
        t.indexOf(i) != -1 && n.push(i);
      }
      return n;
    }
    function pn(e, t) {
      const n = [];
      for (let s = 0; s < e.length; s++) {
        const i = e[s];
        i in t && n.push(i);
      }
      return n;
    }
    function wi(e, t) {
      const n = [];
      for (let s = 0; s < e.length; s++) {
        const i = e[s];
        t.indexOf(i) == -1 && n.push(i);
      }
      return n;
    }
    function mn(e, t) {
      const n = e.indexOf(t), s = n != -1;
      return s && e.splice(n, 1), s;
    }
    function Ti(e, t) {
      const n = e.slice();
      return mn(n, t), n;
    }
    function Be(e, t) {
      const n = [];
      for (const s in e)
        t && !Object.prototype.hasOwnProperty.call(e, s) || n.push(s);
      return n;
    }
    function yn(e, t) {
      const n = [];
      for (const s in e)
        t && !Object.prototype.hasOwnProperty.call(e, s) || n.push(e[s]);
      return n;
    }
    function bn(e, t) {
      for (const n in e)
        Object.prototype.hasOwnProperty.call(e, n) && e[n] && t(n);
    }
    function In(e, t) {
      if (e.length === 0)
        return !0;
      const n = e[0][t];
      return e.every(function(s) {
        return s[t] === n;
      });
    }
    var Rn = /* @__PURE__ */ ((e) => (e.msgpack = "msgpack", e.json = "json", e))(Rn || {});
    function ft(e) {
      return e.splice(mi(e), 1)[0];
    }
    function Ne(e) {
      const t = [];
      if (e)
        for (const n in e)
          t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
      return t.length ? "?" + t.join("&") : "";
    }
    function $e(e) {
      let t;
      const n = /([^?&=]+)=?([^&]*)/g, s = {};
      for (; t = n.exec(e); )
        s[decodeURIComponent(t[1])] = decodeURIComponent(t[2]);
      return s;
    }
    function pt(e) {
      return typeof e == "object" && e !== null && (e instanceof m || e instanceof J);
    }
    function U(e) {
      var t, n;
      return e instanceof Error || ((t = e == null ? void 0 : e.constructor) == null ? void 0 : t.name) === "ErrorInfo" || ((n = e == null ? void 0 : e.constructor) == null ? void 0 : n.name) === "PartialErrorInfo" ? e.toString() : y.Config.inspect(e);
    }
    function wn(e) {
      return y.BufferUtils.isBuffer(e) ? e.toString() : typeof e == "string" ? e : y.Config.inspect(e);
    }
    function Tn(e) {
      if (y.BufferUtils.isBuffer(e))
        return y.BufferUtils.byteLength(e);
      if (typeof e == "string")
        return y.Config.stringByteSize(e);
      throw new Error("Expected input of Utils.dataSizeBytes to be a buffer or string, but was: " + typeof e);
    }
    function mt() {
      return String(Math.random()).substr(2);
    }
    var Cn = async (e) => {
      const t = await y.Config.getRandomArrayBuffer(e);
      return y.BufferUtils.base64Encode(t);
    };
    function Sn(e, t) {
      const n = Math.min(t, e.length), s = e.slice(), i = [];
      for (let r = 0; r < n; r++)
        i.push(ft(s));
      return i;
    }
    function Q(e, t) {
      e.then((n) => {
        t == null || t(null, n);
      }).catch((n) => {
        t == null || t(n);
      });
    }
    function ie(e, t, n) {
      return n == "msgpack" ? (t || $("MsgPack"), t.decode(e)) : JSON.parse(String(e));
    }
    function oe(e, t, n) {
      return n == "msgpack" ? (t || $("MsgPack"), t.encode(e, !0)) : JSON.stringify(e);
    }
    function yt(e) {
      return e.map(function(t) {
        return t && t.toLowerCase();
      });
    }
    function On(e) {
      return e.map(function(t) {
        return t && t.toUpperCase();
      });
    }
    function vn(e) {
      return Math.min((e + 2) / 3, 2);
    }
    function Mn() {
      return 1 - Math.random() * 0.2;
    }
    function bt(e, t) {
      return e * vn(t) * Mn();
    }
    function It() {
      return typeof me < "u" ? me : typeof window < "u" ? window : self;
    }
    function An(e, t) {
      return Object.keys(e).every((n) => e[n] === t[n]) && Object.keys(t).every((n) => t[n] === e[n]);
    }
    function kn(e) {
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
    function et(e) {
      const t = y.BufferUtils, n = t.utf8Encode(e);
      return t.base64Encode(n);
    }
    function En(e, t) {
      return e.length === t.length && e.every(function(n, s) {
        return n === t[s];
      });
    }
    function tt(e) {
      return new m(`${e} plugin not provided`, 40019, 400);
    }
    function $(e) {
      throw tt(e);
    }
    async function Pn(e, t = 5e3, n = "Timeout expired") {
      const s = new m(n, 5e4, 500);
      return Promise.race([e, new Promise((i, r) => setTimeout(() => r(s), t))]);
    }
    var _n = "2.3.1", Ci = "ably-js/" + _n, X = {
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
      version: _n,
      protocolVersion: 3,
      agent: Ci,
      getHost: Ln,
      getPort: Si,
      getHttpScheme: Oi,
      environmentFallbackHosts: Gn,
      getFallbackHosts: Bn,
      getHosts: vi,
      checkHost: Nn,
      objectifyOptions: ki,
      normaliseOptions: Ei,
      defaultGetHeaders: Pi,
      defaultPostHeaders: _i
    };
    function Ln(e, t, n) {
      return n ? t = t == e.restHost && e.realtimeHost || t || e.realtimeHost : t = t || e.restHost, t;
    }
    function Si(e, t) {
      return t || e.tls ? e.tlsPort : e.port;
    }
    function Oi(e) {
      return e.tls ? "https://" : "http://";
    }
    function Gn(e) {
      return [
        e + "-a-fallback.ably-realtime.com",
        e + "-b-fallback.ably-realtime.com",
        e + "-c-fallback.ably-realtime.com",
        e + "-d-fallback.ably-realtime.com",
        e + "-e-fallback.ably-realtime.com"
      ];
    }
    function Bn(e) {
      const t = e.fallbackHosts, n = typeof e.httpMaxRetryCount < "u" ? e.httpMaxRetryCount : X.httpMaxRetryCount;
      return t ? Sn(t, n) : [];
    }
    function vi(e, t) {
      const n = [e.restHost].concat(Bn(e));
      return t ? n.map((s) => Ln(e, s, !0)) : n;
    }
    function Nn(e) {
      if (typeof e != "string")
        throw new m("host must be a string; was a " + typeof e, 4e4, 400);
      if (!e.length)
        throw new m("host must not be zero-length", 4e4, 400);
    }
    function Mi(e, t, n, s) {
      return e.realtimeHost ? e.realtimeHost : e.restHost ? (o.logAction(
        s,
        o.LOG_MINOR,
        "Defaults.normaliseOptions",
        'restHost is set to "' + e.restHost + '" but realtimeHost is not set, so setting realtimeHost to "' + e.restHost + '" too. If this is not what you want, please set realtimeHost explicitly.'
      ), e.restHost) : t ? X.REALTIME_HOST : n + "-" + X.REALTIME_HOST;
    }
    function Ai(e) {
      const t = {};
      for (const n in X.TIMEOUTS)
        t[n] = e[n] || X.TIMEOUTS[n];
      return t;
    }
    function Rt(e) {
      let t = X.agent;
      if (e.agents)
        for (var n in e.agents)
          t += " " + n + "/" + e.agents[n];
      return t;
    }
    function ki(e, t, n, s, i) {
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
      return i && (r = he(F({}, r), { plugins: F(F({}, i), r.plugins) })), r;
    }
    function Ei(e, t, n) {
      const s = n ?? o.defaultLogger;
      typeof e.recover == "function" && e.closeOnUnload === !0 && (o.logAction(
        s,
        o.LOG_ERROR,
        "Defaults.normaliseOptions",
        "closeOnUnload was true and a session recovery function was set - these are mutually exclusive, so unsetting the latter"
      ), e.recover = void 0), "closeOnUnload" in e || (e.closeOnUnload = !e.recover), "queueMessages" in e || (e.queueMessages = !0);
      const i = e.environment && String(e.environment).toLowerCase() || X.ENVIRONMENT, r = !i || i === "production";
      !e.fallbackHosts && !e.restHost && !e.realtimeHost && !e.port && !e.tlsPort && (e.fallbackHosts = r ? X.FALLBACK_HOSTS : Gn(i));
      const a = e.restHost || (r ? X.REST_HOST : i + "-" + X.REST_HOST), l = Mi(e, r, i, s);
      (e.fallbackHosts || []).concat(a, l).forEach(Nn), e.port = e.port || X.PORT, e.tlsPort = e.tlsPort || X.TLS_PORT, "tls" in e || (e.tls = !0);
      const d = Ai(e);
      t ? "useBinaryProtocol" in e ? e.useBinaryProtocol = y.Config.supportsBinary && e.useBinaryProtocol : e.useBinaryProtocol = y.Config.preferBinary : e.useBinaryProtocol = !1;
      const u = {};
      e.clientId && (u["X-Ably-ClientId"] = y.BufferUtils.base64Encode(y.BufferUtils.utf8Encode(e.clientId))), "idempotentRestPublishing" in e || (e.idempotentRestPublishing = !0);
      let f = null, p = e.connectivityCheckUrl;
      if (e.connectivityCheckUrl) {
        let [w, I] = e.connectivityCheckUrl.split("?");
        f = I ? $e(I) : {}, w.indexOf("://") === -1 && (w = "https://" + w), p = w;
      }
      return he(F({}, e), {
        realtimeHost: l,
        restHost: a,
        maxMessageSize: e.maxMessageSize || X.maxMessageSize,
        timeouts: d,
        connectivityCheckParams: f,
        connectivityCheckUrl: p,
        headers: u
      });
    }
    function nt(e, t, n) {
      const s = n || {};
      if (s.cipher) {
        e || $("Crypto");
        const i = e.getCipher(s.cipher, t);
        s.cipher = i.cipherParams, s.channelCipher = i.cipher;
      } else "cipher" in s && (s.cipher = void 0, s.channelCipher = null);
      return s;
    }
    var Un = {
      json: "application/json",
      xml: "application/xml",
      html: "text/html",
      msgpack: "application/x-msgpack",
      text: "text/plain"
    }, st = {
      format: "json",
      protocolVersion: X.protocolVersion
    };
    function Pi(e, {
      format: t = st.format,
      protocolVersion: n = st.protocolVersion
    } = {}) {
      return {
        accept: Un[t],
        "X-Ably-Version": n.toString(),
        "Ably-Agent": Rt(e)
      };
    }
    function _i(e, {
      format: t = st.format,
      protocolVersion: n = st.protocolVersion
    } = {}) {
      let s;
      return {
        accept: s = Un[t],
        "content-type": s,
        "X-Ably-Version": n.toString(),
        "Ably-Agent": Rt(e)
      };
    }
    var v = X;
    function Li(e) {
      return Object.assign(X, e);
    }
    var Gi = class qs {
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
        const s = new qs(t, n);
        return Object.assign((i, r) => s.call(i, r), {
          push: (i) => s.push(i),
          createPromise: () => s.createPromise(),
          resolveAll: (i) => s.resolveAll(i),
          rejectAll: (i) => s.rejectAll(i)
        });
      }
    }, wt = Gi, Hn = /* @__PURE__ */ ((e) => (e.Get = "get", e.Delete = "delete", e.Post = "post", e.Put = "put", e.Patch = "patch", e))(Hn || {}), Z = Hn, xn = /* @__PURE__ */ ((e) => (e[e.Success = 200] = "Success", e[e.NoContent = 204] = "NoContent", e[e.BadRequest = 400] = "BadRequest", e[e.Unauthorized = 401] = "Unauthorized", e[e.Forbidden = 403] = "Forbidden", e[e.RequestTimeout = 408] = "RequestTimeout", e[e.InternalServerError = 500] = "InternalServerError", e))(xn || {});
    function Bi(e) {
      return e >= 200 && e < 400;
    }
    var it = xn, Tt = Math.pow(2, 17);
    function Ni() {
      return ("000000" + Math.floor(Math.random() * 1e16)).slice(-16);
    }
    function Ui(e) {
      return !!e.connection;
    }
    function Dn(e) {
      return pt(e) ? (e.code || (e.statusCode === 403 ? e.code = 40300 : (e.code = 40170, e.statusCode = 401)), e) : new m(U(e), e.code || 40170, e.statusCode || 401);
    }
    var Hi = (e, t) => {
      const n = y.BufferUtils, s = n.utf8Encode(e), i = n.utf8Encode(t), r = n.hmacSha256(s, i);
      return n.base64Encode(r);
    };
    function Wn(e) {
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
    function Zn(e, t) {
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
    function xi(e) {
      return "useTokenAuth" in e && !e.useTokenAuth;
    }
    function zn(e) {
      return e.useTokenAuth || !xi(e) && (e.authCallback || e.authUrl || e.token || e.tokenDetails);
    }
    function Di(e) {
      return !e.key && !e.authCallback && !e.authUrl;
    }
    var Wi = 0;
    function Zi() {
      return Wi++;
    }
    var zi = class {
      constructor(e, t) {
        if (this.authOptions = {}, this.client = e, this.tokenParams = t.defaultTokenParams || {}, this.currentTokenRequestId = null, this.waitingForTokenRequest = null, zn(t))
          Di(t) && o.logAction(
            this.logger,
            o.LOG_ERROR,
            "Auth()",
            "Warning: library initialized with a token literal without any way to renew the token when it expires (no authUrl, authCallback, or key). See https://help.ably.io/error/40171 for help"
          ), this._saveTokenOptions(t.defaultTokenParams, t), Zn(this.authOptions, this.logger);
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
          return Ui(this.client) ? new Promise((s, i) => {
            this.client.connection.connectionManager.onAuthUpdated(
              n,
              (r, a) => r ? i(r) : s(a)
            );
          }) : n;
        } catch (n) {
          throw this.client.connection && n.statusCode === it.Forbidden && this.client.connection.connectionManager.actOnErrorFromAuthorize(n), n;
        }
      }
      /* For internal use, eg by connectionManager - useful when want to call back
       * as soon as we have the new token, rather than waiting for it to take
       * effect on the connection as #authorize does */
      async _forceNewToken(e, t) {
        this.tokenDetails = null, this._saveTokenOptions(e, t), Zn(this.authOptions, this.logger);
        try {
          return this._ensureValidAuthCredentials(!0);
        } finally {
          delete this.tokenParams.timestamp, delete this.authOptions.queryTime;
        }
      }
      async requestToken(e, t) {
        const n = t || this.authOptions, s = e || Ce(this.tokenParams);
        let i, r = this.client;
        if (n.authCallback)
          o.logAction(this.logger, o.LOG_MINOR, "Auth.requestToken()", "using token auth with authCallback"), i = n.authCallback;
        else if (n.authUrl)
          o.logAction(this.logger, o.LOG_MINOR, "Auth.requestToken()", "using token auth with authUrl"), i = (l, d) => {
            const u = k(
              { accept: "application/json, text/plain" },
              n.authHeaders
            ), f = n.authMethod && n.authMethod.toLowerCase() === "post";
            let p;
            const w = n.authUrl.indexOf("?");
            w > -1 && (p = $e(n.authUrl.slice(w)), n.authUrl = n.authUrl.slice(0, w), f || (n.authParams = k(
              p,
              n.authParams
            )));
            const I = k({}, n.authParams || {}, l), C = (O) => {
              var M, G;
              let B = (M = O.body) != null ? M : null, H = null;
              if (O.error)
                o.logAction(
                  this.logger,
                  o.LOG_MICRO,
                  "Auth.requestToken().tokenRequestCallback",
                  "Received Error: " + U(O.error)
                );
              else {
                const q = (G = O.headers["content-type"]) != null ? G : null;
                Array.isArray(q) ? H = q.join(", ") : H = q, o.logAction(
                  this.logger,
                  o.LOG_MICRO,
                  "Auth.requestToken().tokenRequestCallback",
                  "Received; content-type: " + H + "; body: " + wn(B)
                );
              }
              if (O.error) {
                d(O.error, null);
                return;
              }
              if (O.unpacked) {
                d(null, B);
                return;
              }
              if (y.BufferUtils.isBuffer(B) && (B = B.toString()), !H) {
                d(new m("authUrl response is missing a content-type header", 40170, 401), null);
                return;
              }
              const A = H.indexOf("application/json") > -1, ee = H.indexOf("text/plain") > -1 || H.indexOf("application/jwt") > -1;
              if (!A && !ee) {
                d(
                  new m(
                    "authUrl responded with unacceptable content-type " + H + ", should be either text/plain, application/jwt or application/json",
                    40170,
                    401
                  ),
                  null
                );
                return;
              }
              if (A) {
                if (B.length > Tt) {
                  d(new m("authUrl response exceeded max permitted length", 40170, 401), null);
                  return;
                }
                try {
                  B = JSON.parse(B);
                } catch (q) {
                  d(
                    new m(
                      "Unexpected error processing authURL response; err = " + q.message,
                      40170,
                      401
                    ),
                    null
                  );
                  return;
                }
              }
              d(null, B, H);
            };
            if (o.logAction(
              this.logger,
              o.LOG_MICRO,
              "Auth.requestToken().tokenRequestCallback",
              "Requesting token from " + n.authUrl + "; Params: " + JSON.stringify(I) + "; method: " + (f ? "POST" : "GET")
            ), f) {
              const O = u || {};
              O["content-type"] = "application/x-www-form-urlencoded";
              const M = Ne(I).slice(1);
              Q(
                this.client.http.doUri(
                  Z.Post,
                  n.authUrl,
                  O,
                  M,
                  p
                ),
                (G, B) => C(G || B)
              );
            } else
              Q(
                this.client.http.doUri(Z.Get, n.authUrl, u || {}, null, I),
                (O, M) => C(O || M)
              );
          };
        else if (n.key)
          o.logAction(
            this.logger,
            o.LOG_MINOR,
            "Auth.requestToken()",
            "using token auth with client-side signing"
          ), i = (l, d) => {
            Q(
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
        "capability" in s && (s.capability = Wn(
          s.capability
        ));
        const a = (l, d) => {
          const u = l.keyName, f = "/keys/" + u + "/requestToken", p = function(I) {
            return r.baseUri(I) + f;
          }, w = v.defaultPostHeaders(this.client.options);
          n.requestHeaders && k(w, n.requestHeaders), o.logAction(
            this.logger,
            o.LOG_MICRO,
            "Auth.requestToken().requestToken",
            "Sending POST to " + f + "; Token params: " + JSON.stringify(l)
          ), Q(
            this.client.http.do(Z.Post, p, w, JSON.stringify(l), null),
            (I, C) => I ? d(I) : d(C.error, C.body, C.unpacked)
          );
        };
        return new Promise((l, d) => {
          let u = !1, f = this.client.options.timeouts.realtimeRequestTimeout, p = setTimeout(() => {
            u = !0;
            const w = "Token request callback timed out after " + f / 1e3 + " seconds";
            o.logAction(this.logger, o.LOG_ERROR, "Auth.requestToken()", w), d(new m(w, 40170, 401));
          }, f);
          i(s, (w, I, C) => {
            if (u)
              return;
            if (clearTimeout(p), w) {
              o.logAction(
                this.logger,
                o.LOG_ERROR,
                "Auth.requestToken()",
                "token request signing call returned error; err = " + U(w)
              ), d(Dn(w));
              return;
            }
            if (typeof I == "string") {
              I.length === 0 ? d(new m("Token string is empty", 40170, 401)) : I.length > Tt ? d(
                new m(
                  "Token string exceeded max permitted length (was " + I.length + " bytes)",
                  40170,
                  401
                )
              ) : I === "undefined" || I === "null" ? d(new m("Token string was literal null/undefined", 40170, 401)) : I[0] === "{" && !(C && C.indexOf("application/jwt") > -1) ? d(
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
            const O = JSON.stringify(I).length;
            if (O > Tt && !n.suppressMaxLengthCheck) {
              d(
                new m(
                  "Token request/details object exceeded max permitted stringified size (was " + O + " bytes)",
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
            a(I, (M, G, B) => {
              if (M) {
                o.logAction(
                  this.logger,
                  o.LOG_ERROR,
                  "Auth.requestToken()",
                  "token request API call returned error; err = " + U(M)
                ), d(Dn(M));
                return;
              }
              B || (G = JSON.parse(G)), o.logAction(this.logger, o.LOG_MINOR, "Auth.getToken()", "token received"), l(G);
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
        t = t || this.authOptions, e = e || Ce(this.tokenParams);
        const n = t.key;
        if (!n)
          throw new m("No key specified", 40101, 403);
        const s = n.split(":"), i = s[0], r = s[1];
        if (!r)
          throw new m("Invalid key specified", 40101, 403);
        if (e.clientId === "")
          throw new m("clientId can’t be an empty string", 40012, 400);
        "capability" in e && (e.capability = Wn(e.capability));
        const a = k({ keyName: i }, e), l = e.clientId || "", d = e.ttl || "", u = e.capability || "";
        a.timestamp || (a.timestamp = await this.getTimestamp(t && t.queryTime));
        const f = a.nonce || (a.nonce = Ni()), p = a.timestamp, w = a.keyName + `
` + d + `
` + u + `
` + l + `
` + p + `
` + f + `
`;
        return a.mac = a.mac || Hi(w, r), o.logAction(this.logger, o.LOG_MINOR, "Auth.getTokenRequest()", "generated signed request"), a;
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
          return { authorization: "Bearer " + et(e.token) };
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
        this.method = "basic", this.key = e.key, this.basicKey = et(e.key), this.authOptions = e || {}, "clientId" in e && this._userSetClientId(e.clientId);
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
        const n = (this.waitingForTokenRequest || (this.waitingForTokenRequest = wt.create(this.logger))).createPromise();
        if (this.currentTokenRequestId !== null && !e)
          return n;
        const s = this.currentTokenRequestId = Zi();
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
    }, de = zi;
    function Ct(e) {
      const t = [];
      if (e)
        for (const n in e)
          t.push(n + "=" + e[n]);
      return t.join("&");
    }
    function Oe(e, t) {
      return e + (t ? "?" : "") + Ct(t);
    }
    function ji(e, t, n, s, i) {
      e.error ? o.logActionNoStrip(
        i,
        o.LOG_MICRO,
        "Http." + t + "()",
        "Received Error; " + Oe(n, s) + "; Error: " + U(e.error)
      ) : o.logActionNoStrip(
        i,
        o.LOG_MICRO,
        "Http." + t + "()",
        "Received; " + Oe(n, s) + "; Headers: " + Ct(e.headers) + "; StatusCode: " + e.statusCode + "; Body" + (y.BufferUtils.isBuffer(e.body) ? " (Base64): " + y.BufferUtils.base64Encode(e.body) : ": " + e.body)
      );
    }
    function Vi(e, t, n, s, i) {
      i.shouldLog(o.LOG_MICRO) && o.logActionNoStrip(
        i,
        o.LOG_MICRO,
        "Http." + e + "()",
        "Sending; " + Oe(t, s) + "; Body" + (y.BufferUtils.isBuffer(n) ? " (Base64): " + y.BufferUtils.base64Encode(n) : ": " + n)
      );
    }
    var St = class {
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
        return n ? [n].concat(v.getFallbackHosts(e.options)) : v.getHosts(e.options);
      }
      /**
       * This method will not throw any errors; rather, it will communicate any error by populating the {@link RequestResult.error} property of the returned {@link RequestResult}.
       */
      async do(e, t, n, s, i) {
        try {
          const r = this.client;
          if (!r)
            return { error: new m("http.do called without client", 5e4, 500) };
          const a = typeof t == "function" ? t : function(p) {
            return r.baseUri(p) + t;
          }, l = r._currentFallback;
          if (l)
            if (l.validUntil > Date.now()) {
              const p = await this.doUri(e, a(l.host), n, s, i);
              return p.error && this.platformHttp.shouldFallback(p.error) ? (r._currentFallback = null, this.do(e, t, n, s, i)) : p;
            } else
              r._currentFallback = null;
          const d = this._getHosts(r);
          if (d.length === 1)
            return this.doUri(e, a(d[0]), n, s, i);
          let u = null;
          const f = async (p, w) => {
            const I = p.shift();
            u = u ?? /* @__PURE__ */ new Date();
            const C = await this.doUri(e, a(I), n, s, i);
            return C.error && this.platformHttp.shouldFallback(C.error) && p.length ? Date.now() - u.getTime() > r.options.timeouts.httpMaxRetryDuration ? {
              error: new m(
                `Timeout for trying fallback hosts retries. Total elapsed time exceeded the ${r.options.timeouts.httpMaxRetryDuration}ms limit`,
                50003,
                500
              )
            } : f(p, !0) : (w && (r._currentFallback = {
              host: I,
              validUntil: Date.now() + r.options.timeouts.fallbackRetryTimeout
            }), C);
          };
          return f(d);
        } catch (r) {
          return { error: new m(`Unexpected error in Http.do: ${U(r)}`, 500, 5e4) };
        }
      }
      /**
       * This method will not throw any errors; rather, it will communicate any error by populating the {@link RequestResult.error} property of the returned {@link RequestResult}.
       */
      async doUri(e, t, n, s, i) {
        try {
          Vi(e, t, s, i, this.logger);
          const r = await this.platformHttp.doUri(e, t, n, s, i);
          return this.logger.shouldLog(o.LOG_MICRO) && ji(r, e, t, i, this.logger), r;
        } catch (r) {
          return { error: new m(`Unexpected error in Http.doUri: ${U(r)}`, 500, 5e4) };
        }
      }
    }, jn = class {
      constructor(e) {
        this.Platform = y, this.ErrorInfo = m, this.Logger = o, this.Defaults = v, this.Utils = gt;
        var t, n, s, i, r, a, l, d;
        this._additionalHTTPRequestImplementations = (t = e.plugins) != null ? t : null, this.logger = new o(), this.logger.setLog(e.logLevel, e.logHandler), o.logAction(
          this.logger,
          o.LOG_MICRO,
          "BaseClient()",
          "initialized with clientOptions " + y.Config.inspect(e)
        ), this._MsgPack = (s = (n = e.plugins) == null ? void 0 : n.MsgPack) != null ? s : null;
        const u = this.options = v.normaliseOptions(e, this._MsgPack, this.logger);
        if (u.key) {
          const f = u.key.match(/^([^:\s]+):([^:.\s]+)$/);
          if (!f) {
            const p = "invalid key parameter";
            throw o.logAction(this.logger, o.LOG_ERROR, "BaseClient()", p), new m(p, 40400, 404);
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
        o.logAction(this.logger, o.LOG_MINOR, "BaseClient()", "started; version = " + v.version), this._currentFallback = null, this.serverTimeOffset = null, this.http = new St(this), this.auth = new de(this, u), this._rest = (i = e.plugins) != null && i.Rest ? new e.plugins.Rest(this) : null, this._Crypto = (a = (r = e.plugins) == null ? void 0 : r.Crypto) != null ? a : null, this.__FilteredSubscriptions = (d = (l = e.plugins) == null ? void 0 : l.MessageInteractions) != null ? d : null;
      }
      get rest() {
        return this._rest || $("Rest"), this._rest;
      }
      get _FilteredSubscriptions() {
        return this.__FilteredSubscriptions || $("MessageInteractions"), this.__FilteredSubscriptions;
      }
      get channels() {
        return this.rest.channels;
      }
      get push() {
        return this.rest.push;
      }
      get device() {
        var e;
        return (!((e = this.options.plugins) != null && e.Push) || !this.push.LocalDevice) && $("Push"), this._device || (this._device = this.push.LocalDevice.load(this)), this._device;
      }
      baseUri(e) {
        return v.getHttpScheme(this.options) + e + ":" + v.getPort(this.options, !1);
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
    jn.Platform = y;
    var Vn = jn, Fi = class _e {
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
        return s && (t = ie(t, n, s)), Array.isArray(t) ? _e.fromValuesArray(t) : _e.fromValues(t);
      }
      static fromValues(t) {
        return t.error = t.error && m.fromValues(t.error), Object.assign(new _e(), t);
      }
      static fromLocalDevice(t) {
        return Object.assign(new _e(), t);
      }
      static fromValuesArray(t) {
        const n = t.length, s = new Array(n);
        for (let i = 0; i < n; i++)
          s[i] = _e.fromValues(t[i]);
        return s;
      }
    }, ve = Fi;
    async function Fn(e, t, n, s) {
      if (e.http.supportsAuthHeaders) {
        const i = await e.auth.getAuthHeaders();
        return s(k(i, t), n);
      } else {
        const i = await e.auth.getAuthParams();
        return s(t, k(i, n));
      }
    }
    function Ji(e, t, n) {
      if (e.err && !e.body)
        return { err: e.err };
      if (e.statusCode === it.NoContent)
        return he(F({}, e), { body: [], unpacked: !0 });
      let s = e.body;
      if (!e.unpacked)
        try {
          s = ie(s, t, n);
        } catch (l) {
          return pt(l) ? { err: l } : { err: new J(U(l), null) };
        }
      if (!s)
        return { err: new J("unenvelope(): Response body is missing", null) };
      const { statusCode: i, response: r, headers: a } = s;
      if (i === void 0)
        return he(F({}, e), { body: s, unpacked: !0 });
      if (i < 200 || i >= 300) {
        let l = r && r.error || e.err;
        return l || (l = new Error("Error in unenveloping " + s), l.statusCode = i), { err: l, body: r, headers: a, unpacked: !0, statusCode: i };
      }
      return { err: e.err, body: r, headers: a, unpacked: !0, statusCode: i };
    }
    function Xi(e, t, n, s, i) {
      e.err ? o.logAction(
        i,
        o.LOG_MICRO,
        "Resource." + t + "()",
        "Received Error; " + Oe(n, s) + "; Error: " + U(e.err)
      ) : o.logAction(
        i,
        o.LOG_MICRO,
        "Resource." + t + "()",
        "Received; " + Oe(n, s) + "; Headers: " + Ct(e.headers) + "; StatusCode: " + e.statusCode + "; Body: " + (y.BufferUtils.isBuffer(e.body) ? " (Base64): " + y.BufferUtils.base64Encode(e.body) : ": " + y.Config.inspect(e.body))
      );
    }
    var Yi = class Le {
      static async get(t, n, s, i, r, a) {
        return Le.do(Z.Get, t, n, null, s, i, r, a ?? !1);
      }
      static async delete(t, n, s, i, r, a) {
        return Le.do(Z.Delete, t, n, null, s, i, r, a);
      }
      static async post(t, n, s, i, r, a, l) {
        return Le.do(Z.Post, t, n, s, i, r, a, l);
      }
      static async patch(t, n, s, i, r, a, l) {
        return Le.do(Z.Patch, t, n, s, i, r, a, l);
      }
      static async put(t, n, s, i, r, a, l) {
        return Le.do(Z.Put, t, n, s, i, r, a, l);
      }
      static async do(t, n, s, i, r, a, l, d) {
        l && ((a = a || {}).envelope = l);
        const u = n.logger;
        async function f(w, I) {
          var C;
          if (u.shouldLog(o.LOG_MICRO)) {
            let M = i;
            if (((C = w["content-type"]) == null ? void 0 : C.indexOf("msgpack")) > 0)
              try {
                n._MsgPack || $("MsgPack"), M = n._MsgPack.decode(i);
              } catch (G) {
                o.logAction(
                  u,
                  o.LOG_MICRO,
                  "Resource." + t + "()",
                  "Sending MsgPack Decoding Error: " + U(G)
                );
              }
            o.logAction(
              u,
              o.LOG_MICRO,
              "Resource." + t + "()",
              "Sending; " + Oe(s, I) + "; Body: " + M
            );
          }
          const O = await n.http.do(t, s, w, i, I);
          return O.error && de.isTokenErr(O.error) ? (await n.auth.authorize(null, null), Fn(n, w, I, f)) : {
            err: O.error,
            body: O.body,
            headers: O.headers,
            unpacked: O.unpacked,
            statusCode: O.statusCode
          };
        }
        let p = await Fn(n, r, a, f);
        if (l && (p = Ji(p, n._MsgPack, l)), u.shouldLog(o.LOG_MICRO) && Xi(p, t, s, a, u), d) {
          if (p.err)
            throw p.err;
          {
            const w = F({}, p);
            return delete w.err, w;
          }
        }
        return p;
      }
    }, j = Yi;
    function qi(e) {
      const t = e.match(/^\.\/(\w+)\?(.*)$/);
      return t && t[2] && $e(t[2]);
    }
    function Qi(e) {
      typeof e == "string" && (e = e.split(","));
      const t = {};
      for (let n = 0; n < e.length; n++) {
        const s = e[n].match(/^\s*<(.+)>;\s*rel="(\w+)"$/);
        if (s) {
          const i = qi(s[1]);
          i && (t[s[2]] = i);
        }
      }
      return t;
    }
    function Ki(e, t, n) {
      return !(n && (t || typeof e.code == "number"));
    }
    var $i = class {
      constructor(e, t, n, s, i, r) {
        this.client = e, this.path = t, this.headers = n, this.envelope = s ?? null, this.bodyHandler = i, this.useHttpPaginatedResponse = r || !1;
      }
      get logger() {
        return this.client.logger;
      }
      async get(e) {
        const t = await j.get(this.client, this.path, this.headers, e, this.envelope, !1);
        return this.handlePage(t);
      }
      async delete(e) {
        const t = await j.delete(this.client, this.path, this.headers, e, this.envelope, !1);
        return this.handlePage(t);
      }
      async post(e, t) {
        const n = await j.post(this.client, this.path, t, this.headers, e, this.envelope, !1);
        return this.handlePage(n);
      }
      async put(e, t) {
        const n = await j.put(this.client, this.path, t, this.headers, e, this.envelope, !1);
        return this.handlePage(n);
      }
      async patch(e, t) {
        const n = await j.patch(this.client, this.path, t, this.headers, e, this.envelope, !1);
        return this.handlePage(n);
      }
      async handlePage(e) {
        if (e.err && Ki(e.err, e.body, this.useHttpPaginatedResponse))
          throw o.logAction(
            this.logger,
            o.LOG_ERROR,
            "PaginatedResource.handlePage()",
            "Unexpected error getting resource: err = " + U(e.err)
          ), e.err;
        let t, n, s;
        try {
          t = e.statusCode == it.NoContent ? [] : await this.bodyHandler(e.body, e.headers || {}, e.unpacked);
        } catch (i) {
          throw e.err || i;
        }
        return e.headers && (n = e.headers.Link || e.headers.link) && (s = Qi(n)), this.useHttpPaginatedResponse ? new er(
          this,
          t,
          e.headers || {},
          e.statusCode,
          s,
          e.err
        ) : new Jn(this, t, s);
      }
    }, Jn = class {
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
        const t = this.resource, n = await j.get(t.client, t.path, t.headers, e, t.envelope, !1);
        return t.handlePage(n);
      }
    }, er = class extends Jn {
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
    }, be = $i, Xn = class qe {
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
        return s && (t = ie(t, n, s)), Array.isArray(t) ? qe.fromValuesArray(t) : qe.fromValues(t);
      }
      static fromValues(t) {
        return Object.assign(new qe(), t);
      }
      static fromValuesArray(t) {
        const n = t.length, s = new Array(n);
        for (let i = 0; i < n; i++)
          s[i] = qe.fromValues(t[i]);
        return s;
      }
    };
    Xn.toRequestBody = oe;
    var tr = Xn, Ot = tr, nr = class {
      constructor(e) {
        var t;
        this.client = e, this.admin = new sr(e), y.Config.push && ((t = e.options.plugins) != null && t.Push) && (this.stateMachine = new e.options.plugins.Push.ActivationStateMachine(e), this.LocalDevice = e.options.plugins.Push.localDeviceFactory(ve));
      }
      async activate(e, t) {
        await new Promise((n, s) => {
          var i;
          if (!((i = this.client.options.plugins) != null && i.Push)) {
            s(tt("Push"));
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
            n(tt("Push"));
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
    }, sr = class {
      constructor(e) {
        this.client = e, this.deviceRegistrations = new ir(e), this.channelSubscriptions = new rr(e);
      }
      async publish(e, t) {
        const n = this.client, s = n.options.useBinaryProtocol ? "msgpack" : "json", i = v.defaultPostHeaders(n.options, { format: s }), r = {}, a = k({ recipient: e }, t);
        k(i, n.options.headers), n.options.pushFullWait && k(r, { fullWait: "true" });
        const l = oe(a, n._MsgPack, s);
        await j.post(n, "/push/publish", l, i, r, null, !0);
      }
    }, ir = class {
      constructor(e) {
        this.client = e;
      }
      async save(e) {
        const t = this.client, n = ve.fromValues(e), s = t.options.useBinaryProtocol ? "msgpack" : "json", i = v.defaultPostHeaders(t.options, { format: s }), r = {};
        k(i, t.options.headers), t.options.pushFullWait && k(r, { fullWait: "true" });
        const a = oe(n, t._MsgPack, s), l = await j.put(
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
        const t = this.client, n = t.options.useBinaryProtocol ? "msgpack" : "json", s = v.defaultGetHeaders(t.options, { format: n }), i = e.id || e;
        if (typeof i != "string" || !i.length)
          throw new m(
            "First argument to DeviceRegistrations#get must be a deviceId string or DeviceDetails",
            4e4,
            400
          );
        k(s, t.options.headers);
        const r = await j.get(
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
        const t = this.client, n = t.options.useBinaryProtocol ? "msgpack" : "json", s = this.client.http.supportsLinkHeaders ? void 0 : n, i = v.defaultGetHeaders(t.options, { format: n });
        return k(i, t.options.headers), new be(t, "/push/deviceRegistrations", i, s, async function(r, a, l) {
          return ve.fromResponseBody(
            r,
            t._MsgPack,
            l ? void 0 : n
          );
        }).get(e);
      }
      async remove(e) {
        const t = this.client, n = t.options.useBinaryProtocol ? "msgpack" : "json", s = v.defaultGetHeaders(t.options, { format: n }), i = {}, r = e.id || e;
        if (typeof r != "string" || !r.length)
          throw new m(
            "First argument to DeviceRegistrations#remove must be a deviceId string or DeviceDetails",
            4e4,
            400
          );
        k(s, t.options.headers), t.options.pushFullWait && k(i, { fullWait: "true" }), await j.delete(
          t,
          "/push/deviceRegistrations/" + encodeURIComponent(r),
          s,
          i,
          null,
          !0
        );
      }
      async removeWhere(e) {
        const t = this.client, n = t.options.useBinaryProtocol ? "msgpack" : "json", s = v.defaultGetHeaders(t.options, { format: n });
        k(s, t.options.headers), t.options.pushFullWait && k(e, { fullWait: "true" }), await j.delete(t, "/push/deviceRegistrations", s, e, null, !0);
      }
    }, rr = class Qs {
      constructor(t) {
        this.remove = Qs.prototype.removeWhere, this.client = t;
      }
      async save(t) {
        const n = this.client, s = Ot.fromValues(t), i = n.options.useBinaryProtocol ? "msgpack" : "json", r = v.defaultPostHeaders(n.options, { format: i }), a = {};
        k(r, n.options.headers), n.options.pushFullWait && k(a, { fullWait: "true" });
        const l = oe(s, n._MsgPack, i), d = await j.post(
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
        const n = this.client, s = n.options.useBinaryProtocol ? "msgpack" : "json", i = this.client.http.supportsLinkHeaders ? void 0 : s, r = v.defaultGetHeaders(n.options, { format: s });
        return k(r, n.options.headers), new be(n, "/push/channelSubscriptions", r, i, async function(a, l, d) {
          return Ot.fromResponseBody(
            a,
            n._MsgPack,
            d ? void 0 : s
          );
        }).get(t);
      }
      async removeWhere(t) {
        const n = this.client, s = n.options.useBinaryProtocol ? "msgpack" : "json", i = v.defaultGetHeaders(n.options, { format: s });
        k(i, n.options.headers), n.options.pushFullWait && k(t, { fullWait: "true" }), await j.delete(n, "/push/channelSubscriptions", i, t, null, !0);
      }
      async listChannels(t) {
        const n = this.client, s = n.options.useBinaryProtocol ? "msgpack" : "json", i = this.client.http.supportsLinkHeaders ? void 0 : s, r = v.defaultGetHeaders(n.options, { format: s });
        return k(r, n.options.headers), n.options.pushFullWait && k(t, { fullWait: "true" }), new be(n, "/push/channels", r, i, async function(a, l, d) {
          const u = !d && s ? ie(a, n._MsgPack, s) : a;
          for (let f = 0; f < u.length; f++)
            u[f] = String(u[f]);
          return u;
        }).get(t);
      }
    }, or = nr;
    function ar(e) {
      return !e || !e.channelOptions ? {
        channelOptions: e,
        plugins: {},
        baseEncodedPreviousPayload: void 0
      } : e;
    }
    function cr(e, t, n) {
      if (n && n.cipher) {
        e || $("Crypto");
        const s = e.getCipher(n.cipher, t);
        return {
          cipher: s.cipherParams,
          channelCipher: s.cipher
        };
      }
      return n ?? {};
    }
    function lr(e) {
      let t = 0;
      return e.name && (t += e.name.length), e.clientId && (t += e.clientId.length), e.extras && (t += JSON.stringify(e.extras).length), e.data && (t += Tn(e.data)), t;
    }
    async function Yn(e, t, n, s) {
      const i = Ie(n), r = cr(t, e, s ?? null);
      try {
        await Ue(i, r);
      } catch (a) {
        o.logAction(e, o.LOG_ERROR, "Message.fromEncoded()", a.toString());
      }
      return i;
    }
    async function hr(e, t, n, s) {
      return Promise.all(
        n.map(function(i) {
          return Yn(e, t, i, s);
        })
      );
    }
    async function ur(e, t) {
      let n = e.data, s = e.encoding, i = t.channelCipher;
      s = s ? s + "/" : "", y.BufferUtils.isBuffer(n) || (n = y.BufferUtils.utf8Encode(String(n)), s = s + "utf-8/");
      const r = await i.encrypt(n);
      return e.data = r, e.encoding = s + "cipher+" + i.algorithm, e;
    }
    async function vt(e, t) {
      const n = e.data;
      if (!(typeof n == "string" || y.BufferUtils.isBuffer(n) || n === null || n === void 0))
        if (Se(n) || Array.isArray(n))
          e.data = JSON.stringify(n), e.encoding = e.encoding ? e.encoding + "/json" : "json";
        else
          throw new m("Data type is unsupported", 40013, 400);
      return t != null && t.cipher ? ur(e, t) : e;
    }
    async function qn(e, t) {
      return Promise.all(e.map((n) => vt(n, t)));
    }
    var dr = oe;
    async function Ue(e, t) {
      const n = ar(t);
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
                  const p = f[3], w = n.channelOptions.channelCipher;
                  if (p != w.algorithm)
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
                  let p = n.baseEncodedPreviousPayload;
                  typeof p == "string" && (p = y.BufferUtils.utf8Encode(p));
                  const w = y.BufferUtils.toBuffer(p);
                  d = y.BufferUtils.toBuffer(d), d = y.BufferUtils.arrayBufferViewToBuffer(n.plugins.vcdiff.decode(d, w)), s = d;
                } catch (p) {
                  throw new m("Vcdiff delta decode failed with " + p, 40018, 400);
                }
                continue;
              default:
                throw new Error("Unknown encoding");
            }
          }
        } catch (f) {
          const p = f;
          throw new m(
            "Error processing the " + u + " encoding, decoder returned ‘" + p.message + "’",
            p.code || 40013,
            400
          );
        } finally {
          e.encoding = a <= 0 ? null : r.slice(0, a).join("/"), e.data = d;
        }
      }
      n.baseEncodedPreviousPayload = s;
    }
    async function gr(e, t, n, s, i) {
      i && (e = ie(e, s, i));
      for (let r = 0; r < e.length; r++) {
        const a = e[r] = Ie(e[r]);
        try {
          await Ue(a, t);
        } catch (l) {
          o.logAction(n, o.LOG_ERROR, "Message.fromResponseBody()", l.toString());
        }
      }
      return e;
    }
    function Ie(e) {
      return Object.assign(new Qn(), e);
    }
    function Mt(e) {
      const t = e.length, n = new Array(t);
      for (let s = 0; s < t; s++)
        n[s] = Ie(e[s]);
      return n;
    }
    function At(e) {
      let t, n = 0;
      for (let s = 0; s < e.length; s++)
        t = e[s], n += t.size || (t.size = lr(t));
      return n;
    }
    var Qn = class {
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
    }, Kn = Qn, $n = ["absent", "present", "enter", "leave", "update"];
    function fr(e) {
      return $n.indexOf(e);
    }
    async function es(e, t, n) {
      const s = re(t, !0);
      try {
        await kt(s, n ?? {});
      } catch (i) {
        o.logAction(e, o.LOG_ERROR, "PresenceMessage.fromEncoded()", i.toString());
      }
      return s;
    }
    async function pr(e, t, n) {
      return Promise.all(
        t.map(function(s) {
          return es(e, s, n);
        })
      );
    }
    function re(e, t) {
      return t && (e.action = $n[e.action]), Object.assign(new Et(), e);
    }
    var kt = Ue;
    async function ts(e, t, n, s, i) {
      const r = [];
      i && (e = ie(e, s, i));
      for (let a = 0; a < e.length; a++) {
        const l = r[a] = re(e[a], !0);
        try {
          await kt(l, t);
        } catch (d) {
          o.logAction(n, o.LOG_ERROR, "PresenceMessage.fromResponseBody()", d.toString());
        }
      }
      return r;
    }
    function ns(e) {
      const t = e.length, n = new Array(t);
      for (let s = 0; s < t; s++)
        n[s] = re(e[s]);
      return n;
    }
    function ss(e) {
      return e instanceof Et ? e : re({
        data: e
      });
    }
    var Et = class {
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
          action: fr(this.action),
          data: e,
          encoding: t,
          extras: this.extras
        };
      }
      toString() {
        let e = "[PresenceMessage";
        return e += "; action=" + this.action, this.id && (e += "; id=" + this.id), this.timestamp && (e += "; timestamp=" + this.timestamp), this.clientId && (e += "; clientId=" + this.clientId), this.connectionId && (e += "; connectionId=" + this.connectionId), this.encoding && (e += "; encoding=" + this.encoding), this.data && (typeof this.data == "string" ? e += "; data=" + this.data : y.BufferUtils.isBuffer(this.data) ? e += "; data (buffer)=" + y.BufferUtils.base64Encode(this.data) : e += "; data (json)=" + JSON.stringify(this.data)), this.extras && (e += "; extras=" + JSON.stringify(this.extras)), e += "]", e;
      }
    }, mr = Et, yr = class {
      constructor(e) {
        this.channel = e;
      }
      get logger() {
        return this.channel.logger;
      }
      async get(e) {
        o.logAction(this.logger, o.LOG_MICRO, "RestPresence.get()", "channel = " + this.channel.name);
        const t = this.channel.client, n = t.options.useBinaryProtocol ? "msgpack" : "json", s = this.channel.client.http.supportsLinkHeaders ? void 0 : n, i = v.defaultGetHeaders(t.options, { format: n });
        k(i, t.options.headers);
        const r = this.channel.channelOptions;
        return new be(
          t,
          this.channel.client.rest.presenceMixin.basePath(this),
          i,
          s,
          async (a, l, d) => await ts(
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
    }, br = yr, Ir = 9;
    function Rr(e) {
      return e.every(function(t) {
        return !t.id;
      });
    }
    var wr = class {
      constructor(e, t, n) {
        var s, i;
        o.logAction(e.logger, o.LOG_MINOR, "RestChannel()", "started; name = " + t), this.name = t, this.client = e, this.presence = new br(this), this.channelOptions = nt((s = e._Crypto) != null ? s : null, this.logger, n), (i = e.options.plugins) != null && i.Push && (this._push = new e.options.plugins.Push.PushChannel(this));
      }
      get push() {
        return this._push || $("Push"), this._push;
      }
      get logger() {
        return this.client.logger;
      }
      setOptions(e) {
        var t;
        this.channelOptions = nt((t = this.client._Crypto) != null ? t : null, this.logger, e);
      }
      async history(e) {
        return o.logAction(this.logger, o.LOG_MICRO, "RestChannel.history()", "channel = " + this.name), this.client.rest.channelMixin.history(this, e);
      }
      async publish(...e) {
        const t = e[0], n = e[1];
        let s, i;
        if (typeof t == "string" || t === null)
          s = [Ie({ name: t, data: n })], i = e[2];
        else if (Se(t))
          s = [Ie(t)], i = e[1];
        else if (Array.isArray(t))
          s = Mt(t), i = e[1];
        else
          throw new m(
            "The single-argument form of publish() expects a message object or an array of message objects",
            40013,
            400
          );
        i || (i = {});
        const r = this.client, a = r.options, l = a.useBinaryProtocol ? "msgpack" : "json", d = r.options.idempotentRestPublishing, u = v.defaultPostHeaders(r.options, { format: l });
        if (k(u, a.headers), d && Rr(s)) {
          const w = await Cn(Ir);
          s.forEach(function(I, C) {
            I.id = w + ":" + C.toString();
          });
        }
        await qn(s, this.channelOptions);
        const f = At(s), p = a.maxMessageSize;
        if (f > p)
          throw new m(
            "Maximum size of messages that can be published at once exceeded ( was " + f + " bytes; limit is " + p + " bytes)",
            40009,
            400
          );
        await this._publish(dr(s, r._MsgPack, l), u, i);
      }
      async _publish(e, t, n) {
        await j.post(
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
    }, Tr = wr, Cr = class Ks {
      constructor(t) {
        this.entries = t && t.entries || void 0, this.schema = t && t.schema || void 0, this.appId = t && t.appId || void 0, this.inProgress = t && t.inProgress || void 0, this.unit = t && t.unit || void 0, this.intervalId = t && t.intervalId || void 0;
      }
      static fromValues(t) {
        return new Ks(t);
      }
    }, Sr = Cr, is = class {
      static basePath(e) {
        return "/channels/" + encodeURIComponent(e.name);
      }
      static history(e, t) {
        const n = e.client, s = n.options.useBinaryProtocol ? "msgpack" : "json", i = e.client.http.supportsLinkHeaders ? void 0 : s, r = v.defaultGetHeaders(n.options, { format: s });
        k(r, n.options.headers);
        const a = e.channelOptions;
        return new be(n, this.basePath(e) + "/messages", r, i, async function(l, d, u) {
          return await gr(
            l,
            a,
            e.logger,
            n._MsgPack,
            u ? void 0 : s
          );
        }).get(t);
      }
      static async status(e) {
        const t = e.client.options.useBinaryProtocol ? "msgpack" : "json", n = v.defaultPostHeaders(e.client.options, { format: t });
        return (await j.get(
          e.client,
          this.basePath(e),
          n,
          {},
          t,
          !0
        )).body;
      }
    }, Or = class {
      static basePath(e) {
        return is.basePath(e.channel) + "/presence";
      }
      static async history(e, t) {
        const n = e.channel.client, s = n.options.useBinaryProtocol ? "msgpack" : "json", i = e.channel.client.http.supportsLinkHeaders ? void 0 : s, r = v.defaultGetHeaders(n.options, { format: s });
        k(r, n.options.headers);
        const a = e.channel.channelOptions;
        return new be(n, this.basePath(e) + "/history", r, i, async function(l, d, u) {
          return await ts(
            l,
            a,
            e.logger,
            n._MsgPack,
            u ? void 0 : s
          );
        }).get(t);
      }
    }, rs = class {
      constructor(e) {
        this.channelMixin = is, this.presenceMixin = Or, this.Resource = j, this.DeviceDetails = ve, this.client = e, this.channels = new vr(this.client), this.push = new or(this.client);
      }
      async stats(e) {
        const t = v.defaultGetHeaders(this.client.options), n = this.client.options.useBinaryProtocol ? "msgpack" : "json", s = this.client.http.supportsLinkHeaders ? void 0 : n;
        return k(t, this.client.options.headers), new be(this.client, "/stats", t, s, function(i, r, a) {
          const l = a ? i : JSON.parse(i);
          for (let d = 0; d < l.length; d++)
            l[d] = Sr.fromValues(l[d]);
          return l;
        }).get(e);
      }
      async time(e) {
        const t = v.defaultGetHeaders(this.client.options);
        this.client.options.headers && k(t, this.client.options.headers);
        const n = (l) => this.client.baseUri(l) + "/time";
        let { error: s, body: i, unpacked: r } = await this.client.http.do(
          Z.Get,
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
        const [l, d, u] = this.client.options.useBinaryProtocol ? (this.client._MsgPack || $("MsgPack"), [
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
        const p = e.toLowerCase(), w = p == "get" ? v.defaultGetHeaders(this.client.options, { format: u, protocolVersion: n }) : v.defaultPostHeaders(this.client.options, { format: u, protocolVersion: n });
        typeof i != "string" && (i = (a = l(i)) != null ? a : null), k(w, this.client.options.headers), r && k(w, r);
        const I = new be(
          this.client,
          t,
          w,
          f,
          async function(C, O, M) {
            return un(M ? C : d(C));
          },
          /* useHttpPaginatedResponse: */
          !0
        );
        if (!y.Http.methods.includes(p))
          throw new m("Unsupported method " + p, 40500, 405);
        return y.Http.methodsWithBody.includes(p) ? I[p](s, i) : I[p](s);
      }
      async batchPublish(e) {
        let t, n;
        Array.isArray(e) ? (t = e, n = !1) : (t = [e], n = !0);
        const s = this.client.options.useBinaryProtocol ? "msgpack" : "json", i = v.defaultPostHeaders(this.client.options, { format: s });
        this.client.options.headers && k(i, this.client.options.headers);
        const r = oe(t, this.client._MsgPack, s), a = await j.post(this.client, "/messages", r, i, {}, null, !0), l = a.unpacked ? a.body : ie(a.body, this.client._MsgPack, s);
        return n ? l[0] : l;
      }
      async batchPresence(e) {
        const t = this.client.options.useBinaryProtocol ? "msgpack" : "json", n = v.defaultPostHeaders(this.client.options, { format: t });
        this.client.options.headers && k(n, this.client.options.headers);
        const s = e.join(","), i = await j.get(this.client, "/presence", n, { channels: s }, null, !0);
        return i.unpacked ? i.body : ie(i.body, this.client._MsgPack, t);
      }
      async revokeTokens(e, t) {
        if (zn(this.client.options))
          throw new m("Cannot revoke tokens when using token auth", 40162, 401);
        const n = this.client.options.keyName;
        let s = t ?? {};
        const i = F({
          targets: e.map((u) => `${u.type}:${u.value}`)
        }, s), r = this.client.options.useBinaryProtocol ? "msgpack" : "json", a = v.defaultPostHeaders(this.client.options, { format: r });
        this.client.options.headers && k(a, this.client.options.headers);
        const l = oe(i, this.client._MsgPack, r), d = await j.post(
          this.client,
          `/keys/${n}/revokeTokens`,
          l,
          a,
          {},
          null,
          !0
        );
        return d.unpacked ? d.body : ie(d.body, this.client._MsgPack, r);
      }
    }, vr = class {
      constructor(e) {
        this.client = e, this.all = /* @__PURE__ */ Object.create(null);
      }
      get(e, t) {
        e = String(e);
        let n = this.all[e];
        return n ? t && n.setOptions(t) : this.all[e] = n = new Tr(this.client, e, t), n;
      }
      /* Included to support certain niche use-cases; most users should ignore this.
       * Please do not use this unless you know what you're doing */
      release(e) {
        delete this.all[String(e)];
      }
    }, Mr = class extends Vn {
      /*
       * The public typings declare that this only accepts an object, but since we want to emit a good error message in the case where a non-TypeScript user does one of these things:
       *
       * 1. passes a string (which is quite likely if they’re e.g. migrating from the default variant to the modular variant)
       * 2. passes no argument at all
       *
       * tell the compiler that these cases are possible so that it forces us to handle them.
       */
      constructor(e) {
        super(v.objectifyOptions(e, !1, "BaseRest", o.defaultLogger, { Rest: rs }));
      }
    }, os = { Rest: rs }, as = class extends Kn {
      static async fromEncoded(e, t) {
        return Yn(o.defaultLogger, y.Crypto, e, t);
      }
      static async fromEncodedArray(e, t) {
        return hr(o.defaultLogger, y.Crypto, e, t);
      }
      // Used by tests
      static fromValues(e) {
        return Object.assign(new Kn(), e);
      }
      // Used by tests
      static async encode(e, t) {
        return vt(e, t);
      }
      // Used by tests
      static async decode(e, t) {
        return Ue(e, t);
      }
    }, cs = class extends mr {
      static async fromEncoded(e, t) {
        return es(o.defaultLogger, e, t);
      }
      static async fromEncodedArray(e, t) {
        return pr(o.defaultLogger, e, t);
      }
      static fromValues(e, t) {
        return re(e, t);
      }
    }, Me = class lt extends Mr {
      // The public typings declare that this requires an argument to be passed, but since we want to emit a good error message in the case where a non-TypeScript user does not pass an argument, tell the compiler that this is possible so that it forces us to handle it.
      constructor(t) {
        var n, s;
        if (!lt._MsgPack)
          throw new Error("Expected DefaultRest._MsgPack to have been set");
        super(
          v.objectifyOptions(t, !0, "Rest", o.defaultLogger, he(F({}, os), {
            Crypto: (n = lt.Crypto) != null ? n : void 0,
            MsgPack: (s = lt._MsgPack) != null ? s : void 0
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
    Me._Crypto = null, Me.Message = as, Me.PresenceMessage = cs, Me._MsgPack = null, Me._Http = St;
    var Pt = Me;
    function Ar(e, t, n, s) {
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
    function _t(e, t, n) {
      let s, i, r;
      for (let a = 0; a < e.length; a++)
        if (s = e[a], n && (s = s[n]), Array.isArray(s)) {
          for (; (i = s.indexOf(t)) !== -1; )
            s.splice(i, 1);
          n && s.length === 0 && delete e[a][n];
        } else if (Se(s))
          for (r in s)
            Object.prototype.hasOwnProperty.call(s, r) && Array.isArray(s[r]) && _t([s], t, r);
    }
    var kr = class {
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
          if (se(t))
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
        if (e.length == 0 || se(e[0]) && se(e[1])) {
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
        if (s && se(i)) {
          _t([this.any, this.events, this.anyOnce, this.eventsOnce], s);
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
        s ? _t([this.events, this.eventsOnce], s, i) : (delete this.events[i], delete this.eventsOnce[i]);
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
          Ar(this.logger, n, a, t);
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
        else if (se(n)) {
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
    }, Y = kr, P = {
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
    }, ls = [];
    Object.keys(P).forEach(function(e) {
      ls[P[e]] = e;
    });
    var ge = {
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
    }, Er = Object.keys(ge);
    ge.MODE_ALL = ge.PRESENCE | ge.PUBLISH | ge.SUBSCRIBE | ge.PRESENCE_SUBSCRIBE;
    function hs(e) {
      const t = [];
      if (e)
        for (let n = 0; n < e.length; n++)
          t.push(e[n].toString());
      return "[ " + t.join(", ") + " ]";
    }
    var us = ["PRESENCE", "PUBLISH", "SUBSCRIBE", "PRESENCE_SUBSCRIBE"], Pr = oe;
    function _r(e, t, n, s) {
      const i = ie(e, t, s);
      return Lt(i, n);
    }
    function Lt(e, t) {
      const n = e.error;
      n && (e.error = m.fromValues(n));
      const s = e.messages;
      if (s)
        for (let r = 0; r < s.length; r++)
          s[r] = Ie(s[r]);
      const i = t ? e.presence : void 0;
      if (t && i && t)
        for (let r = 0; r < i.length; r++)
          i[r] = t.presenceMessageFromValues(i[r], !0);
      return Object.assign(new Bt(), he(F({}, e), { presence: i }));
    }
    function Lr(e) {
      return Lt(e, { presenceMessageFromValues: re, presenceMessagesFromValuesArray: ns });
    }
    function ae(e) {
      return Object.assign(new Bt(), e);
    }
    function Gt(e, t) {
      let n = "[ProtocolMessage";
      e.action !== void 0 && (n += "; action=" + ls[e.action] || e.action);
      const s = ["id", "channel", "channelSerial", "connectionId", "count", "msgSerial", "timestamp"];
      let i;
      for (let r = 0; r < s.length; r++)
        i = s[r], e[i] !== void 0 && (n += "; " + i + "=" + e[i]);
      if (e.messages && (n += "; messages=" + hs(Mt(e.messages))), e.presence && t && (n += "; presence=" + hs(t.presenceMessagesFromValuesArray(e.presence))), e.error && (n += "; error=" + m.fromValues(e.error).toString()), e.auth && e.auth.accessToken && (n += "; token=" + e.auth.accessToken), e.flags && (n += "; flags=" + Er.filter(e.hasFlag).join(",")), e.params) {
        let r = "";
        bn(e.params, function(a) {
          r.length > 0 && (r += "; "), r += a + "=" + e.params[a];
        }), r.length > 0 && (n += "; params=[" + r + "]");
      }
      return n += "]", n;
    }
    var Bt = class {
      constructor() {
        this.hasFlag = (e) => (this.flags & ge[e]) > 0;
      }
      setFlag(e) {
        return this.flags = this.flags | ge[e];
      }
      getMode() {
        return this.flags && this.flags & ge.MODE_ALL;
      }
      encodeModesToFlags(e) {
        e.forEach((t) => this.setFlag(t));
      }
      decodeModesFromFlags() {
        const e = [];
        return us.forEach((t) => {
          this.hasFlag(t) && e.push(t);
        }), e.length > 0 ? e : void 0;
      }
    }, ds = Bt, Gr = class extends Y {
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
    }, gs = Gr, fs = class {
      constructor(e, t) {
        this.message = e, this.callback = t, this.merged = !1;
        const n = e.action;
        this.sendAttempted = !1, this.ackRequired = n == P.MESSAGE || n == P.PRESENCE;
      }
    }, Br = class extends Y {
      constructor(e) {
        super(e.logger), this.transport = e, this.messageQueue = new gs(this.logger), e.on("ack", (t, n) => {
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
          "serial = " + e + "; count = " + t + "; err = " + U(n)
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
          "sending msg; " + Gt(e.message, this.transport.connectionManager.realtime._RealtimePresence)
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
    }, Nr = Br, Ur = class {
      constructor(e, t, n, s) {
        this.previous = e, this.current = t, n && (this.retryIn = n), s && (this.reason = s);
      }
    }, rt = Ur, Re = {
      DISCONNECTED: 80003,
      SUSPENDED: 80002,
      FAILED: 8e4,
      CLOSING: 80017,
      CLOSED: 80017,
      UNKNOWN_CONNECTION_ERR: 50002,
      UNKNOWN_CHANNEL_ERR: 50001
    }, Hr = {
      disconnected: () => m.fromValues({
        statusCode: 400,
        code: Re.DISCONNECTED,
        message: "Connection to server temporarily unavailable"
      }),
      suspended: () => m.fromValues({
        statusCode: 400,
        code: Re.SUSPENDED,
        message: "Connection to server unavailable"
      }),
      failed: () => m.fromValues({
        statusCode: 400,
        code: Re.FAILED,
        message: "Connection failed or disconnected by server"
      }),
      closing: () => m.fromValues({
        statusCode: 400,
        code: Re.CLOSING,
        message: "Connection closing"
      }),
      closed: () => m.fromValues({
        statusCode: 400,
        code: Re.CLOSED,
        message: "Connection closed"
      }),
      unknownConnectionErr: () => m.fromValues({
        statusCode: 500,
        code: Re.UNKNOWN_CONNECTION_ERR,
        message: "Internal connection error"
      }),
      unknownChannelErr: () => m.fromValues({
        statusCode: 500,
        code: Re.UNKNOWN_CONNECTION_ERR,
        message: "Internal channel error"
      })
    };
    function xr(e) {
      return !e.statusCode || !e.code || e.statusCode >= 500 ? !0 : Object.values(Re).includes(e.code);
    }
    var we = Hr, Dr = ae({ action: P.CLOSE }), Wr = ae({ action: P.DISCONNECT }), Zr = class extends Y {
      constructor(e, t, n, s) {
        super(e.logger), s && (n.format = void 0, n.heartbeats = !0), this.connectionManager = e, this.auth = t, this.params = n, this.timeouts = n.options.timeouts, this.format = n.format, this.isConnected = !1, this.isFinished = !1, this.isDisposed = !1, this.maxIdleInterval = null, this.idleTimer = null, this.lastActivity = null;
      }
      connect() {
      }
      close() {
        this.isConnected && this.requestClose(), this.finish("closed", we.closed());
      }
      disconnect(e) {
        this.isConnected && this.requestDisconnect(), this.finish("disconnected", e || we.disconnected());
      }
      fail(e) {
        this.isConnected && this.requestDisconnect(), this.finish("failed", e || we.failed());
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
          "received on " + this.shortName + ": " + Gt(e, this.connectionManager.realtime._RealtimePresence) + "; connectionId = " + this.connectionManager.connectionId
        ), this.onActivity(), e.action) {
          case P.HEARTBEAT:
            o.logActionNoStrip(
              this.logger,
              o.LOG_MICRO,
              "Transport.onProtocolMessage()",
              this.shortName + " heartbeat; connectionId = " + this.connectionManager.connectionId
            ), this.emit("heartbeat", e.id);
            break;
          case P.CONNECTED:
            this.onConnect(e), this.emit("connected", e.error, e.connectionId, e.connectionDetails, e);
            break;
          case P.CLOSED:
            this.onClose(e);
            break;
          case P.DISCONNECTED:
            this.onDisconnect(e);
            break;
          case P.ACK:
            this.emit("ack", e.msgSerial, e.count);
            break;
          case P.NACK:
            this.emit("nack", e.msgSerial, e.count, e.error);
            break;
          case P.SYNC:
            this.connectionManager.onChannelMessage(e, this);
            break;
          case P.ACTIVATE:
            break;
          case P.AUTH:
            Q(this.auth.authorize(), (t) => {
              t && o.logAction(
                this.logger,
                o.LOG_ERROR,
                "Transport.onProtocolMessage()",
                "Ably requested re-authentication, but unable to obtain a new token: " + U(t)
              );
            });
            break;
          case P.ERROR:
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
        o.logAction(this.logger, o.LOG_MINOR, "Transport.onDisconnect()", "err = " + U(t)), this.finish("disconnected", t);
      }
      onFatalError(e) {
        const t = e && e.error;
        o.logAction(this.logger, o.LOG_MINOR, "Transport.onFatalError()", "err = " + U(t)), this.finish("failed", t);
      }
      onClose(e) {
        const t = e && e.error;
        o.logAction(this.logger, o.LOG_MINOR, "Transport.onClose()", "err = " + U(t)), this.finish("closed", t);
      }
      requestClose() {
        o.logAction(this.logger, o.LOG_MINOR, "Transport.requestClose()", ""), this.send(Dr);
      }
      requestDisconnect() {
        o.logAction(this.logger, o.LOG_MINOR, "Transport.requestDisconnect()", ""), this.send(Wr);
      }
      ping(e) {
        const t = { action: P.HEARTBEAT };
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
    }, Ae = Zr, K;
    ((e) => {
      e.WebSocket = "web_socket", e.Comet = "comet", e.XhrPolling = "xhr_polling";
    })(K || (K = {}));
    var zr = typeof me < "u" ? me : typeof window < "u" ? window : self, Nt = () => {
      var e;
      return typeof y.WebStorage < "u" && ((e = y.WebStorage) == null ? void 0 : e.localSupported);
    }, He = () => {
      var e;
      return typeof y.WebStorage < "u" && ((e = y.WebStorage) == null ? void 0 : e.sessionSupported);
    }, ps = function() {
    }, Ut = "ably-transport-preference";
    function jr(e, t, n) {
      let s;
      if (e.channel !== t.channel || (s = e.action) !== P.PRESENCE && s !== P.MESSAGE || s !== t.action)
        return !1;
      const i = s === P.PRESENCE ? "presence" : "messages", r = e[i].concat(t[i]);
      return At(r) > n || !In(r, "clientId") || !r.every(function(l) {
        return !l.id;
      }) ? !1 : (e[i] = r, !0);
    }
    function Ht(e) {
      try {
        return JSON.parse(e);
      } catch {
        return null;
      }
    }
    var Vr = class {
      constructor(e, t, n, s) {
        this.options = e, this.host = t, this.mode = n, this.connectionKey = s, this.format = e.useBinaryProtocol ? "msgpack" : "json";
      }
      getConnectParams(e) {
        const t = e ? Ce(e) : {}, n = this.options;
        switch (this.mode) {
          case "resume":
            t.resume = this.connectionKey;
            break;
          case "recover": {
            const s = Ht(n.recover);
            s && (t.recover = s.connectionKey);
            break;
          }
        }
        return n.clientId !== void 0 && (t.clientId = n.clientId), n.echoMessages === !1 && (t.echo = "false"), this.format !== void 0 && (t.format = this.format), this.stream !== void 0 && (t.stream = this.stream), this.heartbeats !== void 0 && (t.heartbeats = this.heartbeats), t.v = v.protocolVersion, t.agent = Rt(this.options), n.transportParams !== void 0 && k(t, n.transportParams), t;
      }
      toString() {
        let e = "[mode=" + this.mode;
        return this.host && (e += ",host=" + this.host), this.connectionKey && (e += ",connectionKey=" + this.connectionKey), this.format && (e += ",format=" + this.format), e += "]", e;
      }
    }, Fr = class $s extends Y {
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
        }, this.state = this.states.initialized, this.errorReason = null, this.queuedMessages = new gs(this.logger), this.msgSerial = 0, this.connectionDetails = void 0, this.connectionId = void 0, this.connectionKey = void 0, this.connectionStateTtl = s.connectionStateTtl, this.maxIdleInterval = null, this.transports = gn(n.transports || v.defaultTransports, this.supportedTransports), this.transportPreference = null, this.transports.includes(K.WebSocket) && (this.webSocketTransportAvailable = !0), this.transports.includes(K.XhrPolling) ? this.baseTransport = K.XhrPolling : this.transports.includes(K.Comet) && (this.baseTransport = K.Comet), this.httpHosts = v.getHosts(n), this.wsHosts = v.getHosts(n, !0), this.activeProtocol = null, this.host = null, this.lastAutoReconnectAttempt = null, this.lastActivity = null, this.forceFallbackHost = !1, this.connectCounter = 0, this.wsCheckResult = null, this.webSocketSlowTimer = null, this.webSocketGiveUpTimer = null, this.abandonedWebSocket = !1, o.logAction(this.logger, o.LOG_MINOR, "Realtime.ConnectionManager()", "started"), o.logAction(
          this.logger,
          o.LOG_MICRO,
          "Realtime.ConnectionManager()",
          "requested transports = [" + (n.transports || v.defaultTransports) + "]"
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
        r && (He() && typeof n.recover == "function" && r("beforeunload", this.persistConnection.bind(this)), n.closeOnUnload === !0 && r("beforeunload", () => {
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
        [K.WebSocket, ...y.Transports.order].forEach((i) => {
          const r = s[i];
          r && r.isAvailable() && (n.supportedTransports[i] = r);
        });
      }
      initTransports() {
        $s.initTransports(this.realtime._additionalTransportImplementations, this);
      }
      createTransportParams(t, n) {
        return new Vr(this.options, t, n, this.connectionKey);
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
            const r = Ht(this.options.recover);
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
        o.logAction(this.logger, o.LOG_MICRO, "ConnectionManager.tryATransport()", "trying " + n), this.proposedTransport = Ae.tryConnect(
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
              ), de.isTokenErr(i.error) && !(this.errorReason && de.isTokenErr(this.errorReason)) ? (this.errorReason = i.error, Q(this.realtime.auth._forceNewToken(null, null), (l) => {
                if (l) {
                  this.actOnErrorFromAuthorize(l);
                  return;
                }
                this.tryATransport(t, n, s);
              })) : i.event === "failed" ? (this.notifyState({ state: "failed", error: i.error }), s(!0)) : i.event === "disconnected" && (xr(i.error) ? s(!1) : (this.notifyState({ state: this.states.connecting.failState, error: i.error }), s(!0)));
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
        this.activeProtocol = new Nr(n), this.host = n.params.host;
        const d = i.connectionKey;
        if (d && this.connectionKey != d && this.setConnection(s, i, !!t), this.onConnectionDetailsUpdate(i, n), y.Config.nextTick(() => {
          n.on(
            "connected",
            (u, f, p) => {
              this.onConnectionDetailsUpdate(p, n), this.emit("update", new rt(a, a, null, u));
            }
          );
        }), r.state === this.states.connected.state ? t && (this.errorReason = this.realtime.connection.errorReason = t, this.emit("update", new rt(a, a, null, t))) : (this.notifyState({ state: "connected", error: t }), this.errorReason = this.realtime.connection.errorReason = t || null), this.emit("transport.active", n), l)
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
          const d = n === "failed" && de.isTokenErr(s) ? "disconnected" : n;
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
        if (He()) {
          const t = this.createRecoveryKey();
          t && this.setSessionRecoverData({
            recoveryKey: t,
            disconnectedAt: Date.now(),
            location: zr.location,
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
          const t = J.fromValues(this.errorReason);
          return t.cause = this.errorReason, t;
        }
        return this.getStateError();
      }
      getStateError() {
        var t, n;
        return (n = (t = we)[this.state.state]) == null ? void 0 : n.call(t);
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
          }), this.realtime.http.checkConnectivity && Q(this.realtime.http.checkConnectivity(), (t, n) => {
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
        const i = t.state, r = i === "disconnected" && (this.state === this.states.connected || t.retryImmediately || this.state === this.states.connecting && t.error && de.isTokenErr(t.error) && !(this.errorReason && de.isTokenErr(this.errorReason)));
        if (o.logAction(
          this.logger,
          o.LOG_MINOR,
          "ConnectionManager.notifyState()",
          "new state: " + i + (r ? "; will retry connection immediately" : "")
        ), i == this.state.state || (this.cancelTransitionTimer(), this.cancelRetryTimer(), this.cancelWebSocketSlowTimer(), this.cancelWebSocketGiveUpTimer(), this.checkSuspendTimer(t.state), (i === "suspended" || i === "connected") && (this.disconnectedRetryCount = 0), this.state.terminal))
          return;
        const a = this.states[t.state];
        let l = a.retryDelay;
        a.state === "disconnected" && (this.disconnectedRetryCount++, l = bt(a.retryDelay, this.disconnectedRetryCount));
        const d = new rt(
          this.state.state,
          a.state,
          l,
          t.error || ((s = (n = we)[a.state]) == null ? void 0 : s.call(n))
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
        const r = this.states[i], a = new rt(
          this.state.state,
          r.state,
          null,
          t.error || ((s = (n = we)[r.state]) == null ? void 0 : s.call(n))
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
              const r = Ht(i.options.recover);
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
          this.errorReason && de.isTokenErr(this.errorReason) ? Q(t._forceNewToken(null, null), i) : Q(t._ensureValidAuthCredentials(!1), i);
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
        }).catch(ps), i && i === this.baseTransport || this.baseTransport && !this.webSocketTransportAvailable ? this.connectBase(t, n) : this.connectWs(t, n);
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
        const a = (p) => {
          this.notifyState({ state: this.states.connecting.failState, error: p });
        }, l = s ? this.wsHosts.slice() : this.httpHosts.slice(), d = (p, w) => {
          if (i === this.connectCounter) {
            if (!r()) {
              w && w.dispose();
              return;
            }
            !w && !p && f();
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
            a(new J("Internal error: Http.checkConnectivity not set", null, 500));
            return;
          }
          Q(
            this.realtime.http.checkConnectivity(),
            (p, w) => {
              if (i === this.connectCounter && r()) {
                if (p) {
                  a(p);
                  return;
                }
                if (!w) {
                  a(new m("Unable to connect (network unreachable)", 80003, 404));
                  return;
                }
                n.host = ft(l), this.tryATransport(n, t, d);
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
              action: P.AUTH,
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
        s = s || ps;
        const i = this.state;
        if (i.sendEvents) {
          o.logAction(this.logger, o.LOG_MICRO, "ConnectionManager.send()", "sending event"), this.sendImpl(new fs(t, s));
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
          "queueing msg; " + Gt(t, this.realtime._RealtimePresence)
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
        s && !s.sendAttempted && jr(s.message, t, i) ? (s.merged || (s.callback = wt.create(this.logger, [s.callback]), s.merged = !0), s.callback.push(n)) : this.queuedMessages.push(new fs(t, n));
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
          "failing " + n + " queued messages, err = " + U(t)
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
        const s = Date.now(), i = mt();
        return Pn(
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
        return this.transportPreference || Nt() && ((n = (t = y.WebStorage) == null ? void 0 : t.get) == null ? void 0 : n.call(t, Ut));
      }
      persistTransportPreference(t) {
        var n, s;
        this.transportPreference = t.shortName, Nt() && ((s = (n = y.WebStorage) == null ? void 0 : n.set) == null || s.call(n, Ut, t.shortName));
      }
      unpersistTransportPreference() {
        var t, n;
        this.transportPreference = null, Nt() && ((n = (t = y.WebStorage) == null ? void 0 : t.remove) == null || n.call(t, Ut));
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
        else if (t.statusCode === it.Forbidden) {
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
        const t = new y.Config.WebSocket(v.wsConnectivityUrl);
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
        return He() && ((n = (t = y.WebStorage) == null ? void 0 : t.getSession) == null ? void 0 : n.call(t, this.sessionRecoveryName()));
      }
      setSessionRecoverData(t) {
        var n, s;
        return He() && ((s = (n = y.WebStorage) == null ? void 0 : n.setSession) == null ? void 0 : s.call(n, this.sessionRecoveryName(), t));
      }
      clearSessionRecoverData() {
        var t, n;
        return He() && ((n = (t = y.WebStorage) == null ? void 0 : t.removeSession) == null ? void 0 : n.call(t, this.sessionRecoveryName()));
      }
    }, ms = Fr, Jr = class extends Y {
      constructor(e, t) {
        super(e.logger), this.whenState = (n) => Y.prototype.whenState.call(this, n, this.state), this.ably = e, this.connectionManager = new ms(e, t), this.state = this.connectionManager.state.state, this.key = void 0, this.id = void 0, this.errorReason = null, this.connectionManager.on("connectionstate", (n) => {
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
    }, Xr = Jr, Yr = class {
      constructor(e, t, n, s, i) {
        this.previous = e, this.current = t, t === "attached" && (this.resumed = n, this.hasBacklog = s), i && (this.reason = i);
      }
    }, xt = Yr, ys = function() {
    };
    function qr(e) {
      if (e && "params" in e && !Se(e.params))
        return new m("options.params must be an object", 4e4, 400);
      if (e && "modes" in e) {
        if (!Array.isArray(e.modes))
          return new m("options.modes must be an array", 4e4, 400);
        for (let t = 0; t < e.modes.length; t++) {
          const n = e.modes[t];
          if (!n || typeof n != "string" || !us.includes(String.prototype.toUpperCase.call(n)))
            return new m("Invalid channel mode: " + n, 4e4, 400);
        }
      }
    }
    var Qr = class sn extends Y {
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
        }, this.whenState = (a) => Y.prototype.whenState.call(this, a, this.state), o.logAction(this.logger, o.LOG_MINOR, "RealtimeChannel()", "started; name = " + n), this.name = n, this.channelOptions = nt((i = t._Crypto) != null ? i : null, this.logger, s), this.client = t, this._presence = t._RealtimePresence ? new t._RealtimePresence.RealtimePresence(this) : null, this.connectionManager = t.connection.connectionManager, this.state = "initialized", this.subscriptions = new Y(this.logger), this.syncChannelSerial = void 0, this.properties = {
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
        }, this._allChannelChanges = new Y(this.logger), (r = t.options.plugins) != null && r.Push && (this._push = new t.options.plugins.Push.PushChannel(this));
      }
      get presence() {
        return this._presence || $("RealtimePresence"), this._presence;
      }
      get push() {
        return this._push || $("Push"), this._push;
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
        const s = this.channelOptions, i = qr(t);
        if (i)
          throw i;
        if (this.channelOptions = nt((n = this.client._Crypto) != null ? n : null, this.logger, t), this._decodingContext && (this._decodingContext.channelOptions = this.channelOptions), this._shouldReattachToSetOptions(t, s))
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
          const s = bs(t.params), i = bs(n.params);
          if (Object.keys(s).length !== Object.keys(i).length || !An(i, s))
            return !0;
        }
        return !!(t != null && t.modes && (!n.modes || !En(t.modes, n.modes)));
      }
      async publish(...t) {
        let n = t[0], s = t.length;
        if (!this.connectionManager.activeState())
          throw this.connectionManager.getError();
        if (s == 1)
          if (Se(n))
            n = [Ie(n)];
          else if (Array.isArray(n))
            n = Mt(n);
          else
            throw new m(
              "The single-argument form of publish() expects a message object or an array of message objects",
              40013,
              400
            );
        else
          n = [Ie({ name: t[0], data: t[1] })];
        const i = this.client.options.maxMessageSize;
        await qn(n, this.channelOptions);
        const r = At(n);
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
            const i = new ds();
            i.action = P.MESSAGE, i.channel = this.name, i.messages = t, this.sendMessage(i, n);
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
          action: P.ATTACH,
          channel: this.name,
          params: this.channelOptions.params,
          // RTL4c1: Includes the channel serial to resume from a previous message
          // or attachment.
          channelSerial: this.properties.channelSerial
        });
        this._requestedFlags ? t.encodeModesToFlags(this._requestedFlags) : this.channelOptions.modes && t.encodeModesToFlags(On(this.channelOptions.modes)), this._attachResume && t.setFlag("ATTACH_RESUME"), this._lastPayload.decodeFailureRecoveryInProgress && (t.channelSerial = this._lastPayload.protocolMessageChannelSerial), this.sendMessage(t, ys);
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
        const n = ae({ action: P.DETACH, channel: this.name });
        this.sendMessage(n, t || ys);
      }
      async subscribe(...t) {
        const [n, s] = sn.processListenerArgs(t);
        if (this.state === "failed")
          throw m.fromValues(this.invalidStateError());
        return n && typeof n == "object" && !Array.isArray(n) ? this.client._FilteredSubscriptions.subscribeFilter(this, n, s) : this.subscriptions.on(n, s), this.attach();
      }
      unsubscribe(...t) {
        var n;
        const [s, i] = sn.processListenerArgs(t);
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
            throw new J("Unable to sync to channel; not attached", 4e4);
        }
        const t = this.connectionManager;
        if (!t.activeState())
          throw t.getError();
        const n = ae({ action: P.SYNC, channel: this.name });
        this.syncChannelSerial && (n.channelSerial = this.syncChannelSerial), t.send(n);
      }
      sendMessage(t, n) {
        this.connectionManager.send(t, this.client.options.queueMessages, n);
      }
      sendPresence(t, n) {
        const s = ae({
          action: P.PRESENCE,
          channel: this.name,
          presence: Array.isArray(t) ? this.client._RealtimePresence.presenceMessagesFromValuesArray(t) : [this.client._RealtimePresence.presenceMessageFromValues(t)]
        });
        this.sendMessage(s, n);
      }
      // Access to this method is synchronised by ConnectionManager#processChannelMessage, in order to synchronise access to the state stored in _decodingContext.
      async processMessage(t) {
        (t.action === P.ATTACHED || t.action === P.MESSAGE || t.action === P.PRESENCE) && this.setChannelSerial(t.channelSerial);
        let n, s = !1;
        switch (t.action) {
          case P.ATTACHED: {
            this.properties.attachSerial = t.channelSerial, this._mode = t.getMode(), this.params = t.params || {};
            const i = t.decodeModesFromFlags();
            this.modes = i && yt(i) || void 0;
            const r = t.hasFlag("RESUMED"), a = t.hasFlag("HAS_PRESENCE"), l = t.hasFlag("HAS_BACKLOG");
            if (this.state === "attached") {
              r || this._presence && this._presence.onAttached(a);
              const d = new xt(this.state, this.state, r, l, t.error);
              this._allChannelChanges.emit("update", d), (!r || this.channelOptions.updateOnAttached) && this.emit("update", d);
            } else this.state === "detaching" ? this.checkPendingState() : this.notifyState("attached", t.error, r, a, l);
            break;
          }
          case P.DETACHED: {
            const i = t.error ? m.fromValues(t.error) : new m("Channel detached", 90001, 404);
            this.state === "detaching" ? this.notifyState("detached", i) : this.state === "attaching" ? this.notifyState("suspended", i) : (this.state === "attached" || this.state === "suspended") && this.requestState("attaching", i);
            break;
          }
          case P.SYNC:
            if (s = !0, n = this.syncChannelSerial = t.channelSerial, !t.presence)
              break;
          case P.PRESENCE: {
            const i = t.presence;
            if (!i)
              break;
            const { id: r, connectionId: a, timestamp: l } = t, d = this.channelOptions;
            let u;
            for (let f = 0; f < i.length; f++)
              try {
                u = i[f], await kt(u, d), u.connectionId || (u.connectionId = a), u.timestamp || (u.timestamp = l), u.id || (u.id = r + ":" + f);
              } catch (p) {
                o.logAction(
                  this.logger,
                  o.LOG_ERROR,
                  "RealtimeChannel.processMessage()",
                  p.toString()
                );
              }
            this._presence && this._presence.setPresence(i, s, n);
            break;
          }
          case P.MESSAGE: {
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
              const p = i[f];
              try {
                await Ue(p, this._decodingContext);
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
              p.connectionId || (p.connectionId = d), p.timestamp || (p.timestamp = u), p.id || (p.id = l + ":" + f);
            }
            this._lastPayload.messageId = a.id, this._lastPayload.protocolMessageChannelSerial = t.channelSerial, this.onEvent(i);
            break;
          }
          case P.ERROR: {
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
            ), this.connectionManager.abort(we.unknownChannelErr());
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
        const a = new xt(this.state, t, s, r, n), l = 'Channel state for channel "' + this.name + '"', d = t + (n ? "; reason: " + n : "");
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
        const t = bt(this.client.options.timeouts.channelRetryTimeout, this.retryCount);
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
    function bs(e) {
      return hi(e || {}, ["agent"]);
    }
    var Dt = Qr, Is = class ei extends Vn {
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
        if (super(v.objectifyOptions(t, !1, "BaseRealtime", o.defaultLogger)), o.logAction(this.logger, o.LOG_MINOR, "Realtime()", ""), typeof EdgeRuntime == "string")
          throw new m(
            `Ably.Realtime instance cannot be used in Vercel Edge runtime. If you are running Vercel Edge functions, please replace your "new Ably.Realtime()" with "new Ably.Rest()" and use Ably Rest API instead of the Realtime API. If you are server-rendering your application in the Vercel Edge runtime, please use the condition "if (typeof EdgeRuntime === 'string')" to prevent instantiating Ably.Realtime instance during SSR in the Vercel Edge runtime.`,
            4e4,
            400
          );
        this._additionalTransportImplementations = ei.transportImplementationsFromPlugins(this.options.plugins), this._RealtimePresence = (s = (n = this.options.plugins) == null ? void 0 : n.RealtimePresence) != null ? s : null, this.connection = new Xr(this, this.options), this._channels = new $r(this), this.options.autoConnect !== !1 && this.connect();
      }
      static transportImplementationsFromPlugins(t) {
        const n = {};
        return t != null && t.WebSocketTransport && (n[K.WebSocket] = t.WebSocketTransport), t != null && t.XHRPolling && (n[K.XhrPolling] = t.XHRPolling), n;
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
    Is.EventEmitter = Y;
    var Kr = Is, $r = class extends Y {
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
          n = this.all[e] = new Dt(this.realtime, e, t);
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
          const s = et(t.filter), i = kn(e);
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
    }, eo = Kr;
    function to(e) {
      return e.channel.client.auth.clientId;
    }
    function Wt(e) {
      const t = e.channel.client, n = t.auth.clientId;
      return (!n || n === "*") && t.connection.state === "connected";
    }
    function no(e, t, n) {
      switch (e.state) {
        case "attached":
        case "suspended":
          n();
          break;
        case "initialized":
        case "detached":
        case "detaching":
        case "attaching":
          Q(e.attach(), function(s) {
            s ? t(s) : n();
          });
          break;
        default:
          t(m.fromValues(e.invalidStateError()));
      }
    }
    function Rs(e, t) {
      if (e.isSynthesized() || t.isSynthesized())
        return e.timestamp >= t.timestamp;
      const n = e.parseId(), s = t.parseId();
      return n.msgSerial === s.msgSerial ? n.index > s.index : n.msgSerial > s.msgSerial;
    }
    var so = class extends Y {
      constructor(e) {
        super(e.logger), this.channel = e, this.syncComplete = !1, this.members = new ws(this, (t) => t.clientId + ":" + t.connectionId), this._myMembers = new ws(this, (t) => t.clientId), this.subscriptions = new Y(this.logger), this.pendingPresence = [];
      }
      async enter(e) {
        if (Wt(this))
          throw new m("clientId must be specified to enter a presence channel", 40012, 400);
        return this._enterOrUpdateClient(void 0, void 0, e, "enter");
      }
      async update(e) {
        if (Wt(this))
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
          "channel = " + i.name + ", id = " + e + ", client = " + (t || "(implicit) " + to(this))
        );
        const r = ss(n);
        switch (r.action = s, e && (r.id = e), t && (r.clientId = t), await vt(r, i.channelOptions), i.state) {
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
            const a = new J(
              "Unable to " + s + " presence channel while in " + i.state + " state",
              90001
            );
            throw a.code = 90001, a;
          }
        }
      }
      async leave(e) {
        if (Wt(this))
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
        const s = ss(t);
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
              const a = new J("Unable to leave presence channel (incompatible state)", 90001);
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
          no(
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
          const f = re(e[u]);
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
          const s = [], i = wt.create(this.logger);
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
            "channel; name = " + this.channel.name + ", err = " + U(e)
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
            const r = new xt(this.channel.state, this.channel.state, !0, !1, i);
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
          ), Q(this._enterOrUpdateClient(s.id, s.clientId, s.data, "enter"), t);
        }
      }
      _synthesizeLeaves(e) {
        const t = this.subscriptions;
        e.forEach(function(n) {
          const s = re({
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
        const t = Dt.processListenerArgs(e), n = t[0], s = t[1], i = this.channel;
        if (i.state === "failed")
          throw m.fromValues(i.invalidStateError());
        this.subscriptions.on(n, s), await i.attach();
      }
      unsubscribe(...e) {
        const t = Dt.processListenerArgs(e), n = t[0], s = t[1];
        this.subscriptions.off(n, s);
      }
    }, ws = class extends Y {
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
        (e.action === "enter" || e.action === "update") && (e = re(e), e.action = "present");
        const t = this.map, n = this.memberKey(e);
        this.residualMembers && delete this.residualMembers[n];
        const s = t[n];
        return s && !Rs(e, s) ? !1 : (t[n] = e, !0);
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
        return s && !Rs(e, s) ? !1 : (this.syncInProgress ? (e = re(e), e.action = "absent", t[n] = e) : delete t[n], !0);
      }
      startSync() {
        const e = this.map, t = this.syncInProgress;
        o.logAction(
          this.logger,
          o.LOG_MINOR,
          "PresenceMap.startSync()",
          "channel = " + this.presence.channel.name + "; syncInProgress = " + t
        ), this.syncInProgress || (this.residualMembers = Ce(e), this.setInProgress(!0));
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
          this.presence._synthesizeLeaves(yn(this.residualMembers));
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
    }, io = so, ro = K.WebSocket;
    function oo(e) {
      return !!e.on;
    }
    var ao = class extends Ae {
      constructor(e, t, n) {
        super(e, t, n), this.shortName = ro, n.heartbeats = y.Config.useProtocolHeartbeats, this.wsHost = n.host;
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
        o.logAction(this.logger, o.LOG_MINOR, "WebSocketTransport.connect()", "starting"), Ae.prototype.connect.call(this);
        const e = this, t = this.params, n = t.options, i = (n.tls ? "wss://" : "ws://") + this.wsHost + ":" + v.getPort(n) + "/";
        o.logAction(this.logger, o.LOG_MINOR, "WebSocketTransport.connect()", "uri: " + i), Q(
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
              }, oo(u) && u.on("ping", function() {
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
            Pr(e, this.connectionManager.realtime._MsgPack, this.params.format)
          );
        } catch (n) {
          const s = "Exception from ws connection when trying to send: " + U(n);
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
            _r(
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
    }, Ts = ao, co = class {
      static subscribeFilter(e, t, n) {
        const s = (i) => {
          var r, a, l, d, u, f;
          const p = {
            name: i.name,
            refTimeserial: (a = (r = i.extras) == null ? void 0 : r.ref) == null ? void 0 : a.timeserial,
            refType: (d = (l = i.extras) == null ? void 0 : l.ref) == null ? void 0 : d.type,
            isRef: !!((f = (u = i.extras) == null ? void 0 : u.ref) != null && f.timeserial),
            clientId: i.clientId
          };
          Object.entries(t).find(
            ([w, I]) => I !== void 0 ? p[w] !== I : !1
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
    }, fe = class rn extends eo {
      // The public typings declare that this requires an argument to be passed, but since we want to emit a good error message in the case where a non-TypeScript user does not pass an argument, tell the compiler that this is possible so that it forces us to handle it.
      constructor(t) {
        var n;
        const s = rn._MsgPack;
        if (!s)
          throw new Error("Expected DefaultRealtime._MsgPack to have been set");
        super(
          v.objectifyOptions(t, !0, "Realtime", o.defaultLogger, he(F({}, os), {
            Crypto: (n = rn.Crypto) != null ? n : void 0,
            MsgPack: s,
            RealtimePresence: {
              RealtimePresence: io,
              presenceMessageFromValues: re,
              presenceMessagesFromValuesArray: ns
            },
            WebSocketTransport: Ts,
            MessageInteractions: co
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
    fe.Utils = gt, fe.ConnectionManager = ms, fe.ProtocolMessage = ds, fe._Crypto = null, fe.Message = as, fe.PresenceMessage = cs, fe._MsgPack = null, fe._Http = St;
    var Zt = fe, zt = Uint8Array, xe = Uint32Array, jt = Math.pow, Cs = new xe(8), Ss = [], De = new xe(64);
    function Os(e) {
      return (e - (e | 0)) * jt(2, 32) | 0;
    }
    for (var We = 2, Ze = 0; Ze < 64; ) {
      for (Vt = !0, ot = 2; ot <= We / 2; ot++)
        We % ot === 0 && (Vt = !1);
      Vt && (Ze < 8 && (Cs[Ze] = Os(jt(We, 1 / 2))), Ss[Ze] = Os(jt(We, 1 / 3)), Ze++), We++;
    }
    var Vt, ot, lo = !!new zt(new xe([1]).buffer)[0];
    function Ft(e) {
      return lo ? (
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
    function Jt(e) {
      var t = Cs.slice(), n = e.length, s = n * 8, i = 512 - (s + 64) % 512 - 1 + s + 65, r = new zt(i / 8), a = new xe(r.buffer);
      r.set(e, 0), r[n] = 128, a[a.length - 1] = Ft(s);
      for (var l, d = 0; d < i / 32; d += 16) {
        var u = t.slice();
        for (l = 0; l < 64; l++) {
          var f;
          if (l < 16)
            f = Ft(a[d + l]);
          else {
            var p = De[l - 15], w = De[l - 2];
            f = De[l - 7] + De[l - 16] + (ce(p, 7) ^ ce(p, 18) ^ p >>> 3) + (ce(w, 17) ^ ce(w, 19) ^ w >>> 10);
          }
          De[l] = f |= 0;
          for (var I = (ce(u[4], 6) ^ ce(u[4], 11) ^ ce(u[4], 25)) + (u[4] & u[5] ^ ~u[4] & u[6]) + u[7] + f + Ss[l], C = (ce(u[0], 2) ^ ce(u[0], 13) ^ ce(u[0], 22)) + (u[0] & u[1] ^ u[2] & (u[0] ^ u[1])), O = 7; O > 0; O--)
            u[O] = u[O - 1];
          u[0] = I + C | 0, u[4] = u[4] + I | 0;
        }
        for (l = 0; l < 8; l++)
          t[l] = t[l] + u[l] | 0;
      }
      return new zt(
        new xe(
          t.map(function(M) {
            return Ft(M);
          })
        ).buffer
      );
    }
    function ho(e, t) {
      if (e.length > 64 && (e = Jt(e)), e.length < 64) {
        const l = new Uint8Array(64);
        l.set(e, 0), e = l;
      }
      for (var n = new Uint8Array(64), s = new Uint8Array(64), i = 0; i < 64; i++)
        n[i] = 54 ^ e[i], s[i] = 92 ^ e[i];
      var r = new Uint8Array(t.length + 64);
      r.set(n, 0), r.set(t, 64);
      var a = new Uint8Array(96);
      return a.set(s, 0), a.set(Jt(r), 64), Jt(a);
    }
    var uo = class {
      constructor() {
        this.base64CharSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", this.hexCharSet = "0123456789abcdef";
      }
      // https://gist.githubusercontent.com/jonleighton/958841/raw/f200e30dfe95212c0165ccf1ae000ca51e9de803/gistfile1.js
      uint8ViewToBase64(e) {
        let t = "";
        const n = this.base64CharSet, s = e.byteLength, i = s % 3, r = s - i;
        let a, l, d, u, f;
        for (let p = 0; p < r; p = p + 3)
          f = e[p] << 16 | e[p + 1] << 8 | e[p + 2], a = (f & 16515072) >> 18, l = (f & 258048) >> 12, d = (f & 4032) >> 6, u = f & 63, t += n[a] + n[l] + n[d] + n[u];
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
        const n = ho(this.toBuffer(t), this.toBuffer(e));
        return this.toArrayBuffer(n);
      }
    }, vs = new uo(), go = function(e, t) {
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
        constructor(I, C, O, M) {
          this.algorithm = I, this.keyLength = C, this.mode = O, this.key = M;
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
          var C;
          if (!I.key)
            throw new Error("Crypto.getDefaultParams: a key is required");
          typeof I.key == "string" ? C = t.toArrayBuffer(t.base64Decode(l(I.key))) : I.key instanceof ArrayBuffer ? C = I.key : C = t.toArrayBuffer(I.key);
          var O = I.algorithm || n, M = C.byteLength * 8, G = I.mode || i, B = new u(O, M, G, C);
          if (I.keyLength && I.keyLength !== B.keyLength)
            throw new Error(
              "Crypto.getDefaultParams: a keyLength of " + I.keyLength + " was specified, but the key actually has length " + B.keyLength
            );
          return a(B), B;
        }
        /**
         * Generate a random encryption key from the supplied keylength (or the
         * default keyLength if none supplied) as an ArrayBuffer
         * @param keyLength (optional) the required keyLength in bits
         */
        static async generateRandomKey(I) {
          try {
            return e.getRandomArrayBuffer((I || s) / 8);
          } catch (C) {
            throw new m("Failed to generate random key: " + C.message, 400, 5e4, C);
          }
        }
        /**
         * Internal; get a ChannelCipher instance based on the given cipherParams
         * @param params either a CipherParams instance or some subset of its
         * fields that includes a key
         */
        static getCipher(I, C) {
          var O, M = d(I) ? I : this.getDefaultParams(I);
          return {
            cipherParams: M,
            cipher: new p(M, (O = I.iv) != null ? O : null, C)
          };
        }
      }
      f.CipherParams = u;
      class p {
        constructor(I, C, O) {
          if (this.logger = O, !crypto.subtle)
            throw isSecureContext ? new Error(
              "Crypto operations are not possible since the browser’s SubtleCrypto class is unavailable (reason unknown)."
            ) : new Error(
              "Crypto operations are is not possible since the current environment is a non-secure context and hence the browser’s SubtleCrypto class is not available."
            );
          this.algorithm = I.algorithm + "-" + String(I.keyLength) + "-" + I.mode, this.webCryptoAlgorithm = I.algorithm + "-" + I.mode, this.key = t.toArrayBuffer(I.key), this.iv = C ? t.toArrayBuffer(C) : null;
        }
        concat(I, C) {
          const O = new ArrayBuffer(I.byteLength + C.byteLength), M = new DataView(O), G = new DataView(t.toArrayBuffer(I));
          for (let H = 0; H < G.byteLength; H++)
            M.setInt8(H, G.getInt8(H));
          const B = new DataView(t.toArrayBuffer(C));
          for (let H = 0; H < B.byteLength; H++)
            M.setInt8(G.byteLength + H, B.getInt8(H));
          return O;
        }
        async encrypt(I) {
          o.logAction(this.logger, o.LOG_MICRO, "CBCCipher.encrypt()", "");
          const C = await this.getIv(), O = await crypto.subtle.importKey("raw", this.key, this.webCryptoAlgorithm, !1, ["encrypt"]), M = await crypto.subtle.encrypt({ name: this.webCryptoAlgorithm, iv: C }, O, I);
          return this.concat(C, M);
        }
        async decrypt(I) {
          o.logAction(this.logger, o.LOG_MICRO, "CBCCipher.decrypt()", "");
          const C = t.toArrayBuffer(I), O = C.slice(0, r), M = C.slice(r), G = await crypto.subtle.importKey("raw", this.key, this.webCryptoAlgorithm, !1, ["decrypt"]);
          return crypto.subtle.decrypt({ name: this.webCryptoAlgorithm, iv: O }, G, M);
        }
        async getIv() {
          if (this.iv) {
            var I = this.iv;
            return this.iv = null, I;
          }
          const C = await e.getRandomArrayBuffer(r);
          return t.toArrayBuffer(C);
        }
      }
      return f;
    }, Ms = /* @__PURE__ */ ((e) => (e[e.REQ_SEND = 0] = "REQ_SEND", e[e.REQ_RECV = 1] = "REQ_RECV", e[e.REQ_RECV_POLL = 2] = "REQ_RECV_POLL", e[e.REQ_RECV_STREAM = 3] = "REQ_RECV_STREAM", e))(Ms || {}), pe = Ms;
    function As() {
      return new m(
        "No HTTP request plugin provided. Provide at least one of the FetchRequest or XHRRequest plugins.",
        400,
        4e4
      );
    }
    var ze, ks = (ze = class {
      constructor(e) {
        this.checksInProgress = null, this.checkConnectivity = void 0, this.supportsAuthHeaders = !1, this.supportsLinkHeaders = !1;
        var t;
        this.client = e ?? null;
        const n = (e == null ? void 0 : e.options.connectivityCheckUrl) || v.connectivityCheckUrl, s = (t = e == null ? void 0 : e.options.connectivityCheckParams) != null ? t : null, i = !(e != null && e.options.connectivityCheckUrl), r = F(F({}, ks.bundledRequestImplementations), e == null ? void 0 : e._additionalHTTPRequestImplementations), a = r.XHRRequest, l = r.FetchRequest, d = !!(a || l);
        if (!d)
          throw As();
        y.Config.xhrSupported && a ? (this.supportsAuthHeaders = !0, this.Request = async function(u, f, p, w, I) {
          return new Promise((C) => {
            var O;
            const M = a.createRequest(
              f,
              p,
              w,
              I,
              pe.REQ_SEND,
              (O = e && e.options.timeouts) != null ? O : null,
              this.logger,
              u
            );
            M.once(
              "complete",
              (G, B, H, A, ee) => C({ error: G, body: B, headers: H, unpacked: A, statusCode: ee })
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
            Z.Get,
            n,
            null,
            null,
            s
          );
          let p = !1;
          return i ? p = !f.error && ((u = f.body) == null ? void 0 : u.replace(/\n/, "")) == "yes" : p = !f.error && Bi(f.statusCode), o.logAction(this.logger, o.LOG_MICRO, "(XHRRequest)Http.checkConnectivity()", "Result: " + p), p;
        }) : y.Config.fetchSupported && l ? (this.supportsAuthHeaders = !0, this.Request = async (u, f, p, w, I) => l(u, e ?? null, f, p, w, I), this.checkConnectivity = async function() {
          var u;
          o.logAction(
            this.logger,
            o.LOG_MICRO,
            "(Fetch)Http.checkConnectivity()",
            "Sending; " + n
          );
          const f = await this.doUri(Z.Get, n, null, null, null), p = !f.error && ((u = f.body) == null ? void 0 : u.replace(/\n/, "")) == "yes";
          return o.logAction(this.logger, o.LOG_MICRO, "(Fetch)Http.checkConnectivity()", "Result: " + p), p;
        }) : this.Request = async () => ({ error: d ? new J("no supported HTTP transports available", null, 400) : As() });
      }
      get logger() {
        var e, t;
        return (t = (e = this.client) == null ? void 0 : e.logger) != null ? t : o.defaultLogger;
      }
      async doUri(e, t, n, s, i) {
        return this.Request ? this.Request(e, t, n, i, s) : { error: new J("Request invoked before assigned to", null, 500) };
      }
      shouldFallback(e) {
        const t = e.statusCode;
        return t === 408 && !e.code || t === 400 && !e.code || t >= 500 && t <= 504;
      }
    }, ze.methods = [Z.Get, Z.Delete, Z.Post, Z.Put, Z.Patch], ze.methodsWithoutBody = [Z.Get, Z.Delete], ze.methodsWithBody = [Z.Post, Z.Put, Z.Patch], ze), Es = ks, ke = "ablyjs-storage-test", Ee = typeof me < "u" ? me : typeof window < "u" ? window : self, fo = class {
      constructor() {
        try {
          Ee.sessionStorage.setItem(ke, ke), Ee.sessionStorage.removeItem(ke), this.sessionSupported = !0;
        } catch {
          this.sessionSupported = !1;
        }
        try {
          Ee.localStorage.setItem(ke, ke), Ee.localStorage.removeItem(ke), this.localSupported = !0;
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
        return e ? Ee.sessionStorage : Ee.localStorage;
      }
    }, Ps = new fo(), z = It(), po = typeof EdgeRuntime == "string";
    function mo() {
      const e = z.location;
      return !z.WebSocket || !e || !e.origin || e.origin.indexOf("http") > -1;
    }
    function yo() {
      return typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope;
    }
    var bo = z.navigator && z.navigator.userAgent.toString(), Io = z.location && z.location.href, Ro = {
      agent: "browser",
      logTimestamps: !0,
      userAgent: bo,
      currentUrl: Io,
      binaryType: "arraybuffer",
      WebSocket: z.WebSocket,
      fetchSupported: !!z.fetch,
      xhrSupported: z.XMLHttpRequest && "withCredentials" in new XMLHttpRequest(),
      allowComet: mo(),
      useProtocolHeartbeats: !0,
      supportsBinary: !!z.TextDecoder,
      /* Per Paddy (https://ably-real-time.slack.com/archives/CURL4U2FP/p1705674537763479) web intentionally prefers JSON to MessagePack:
       *
       * > browsers' support for binary types in general was historically poor, and JSON transport performance is significantly better in a browser than msgpack. In modern browsers then binary is supported consistently, but I'd still expect that JSON encode/decode performance is dramatically better than msgpack in a browser.
       */
      preferBinary: !1,
      ArrayBuffer: z.ArrayBuffer,
      atob: z.atob,
      nextTick: typeof z.setImmediate < "u" ? z.setImmediate.bind(z) : function(e) {
        setTimeout(e, 0);
      },
      addEventListener: z.addEventListener,
      inspect: JSON.stringify,
      stringByteSize: function(e) {
        return z.TextDecoder && new z.TextEncoder().encode(e).length || e.length;
      },
      TextEncoder: z.TextEncoder,
      TextDecoder: z.TextDecoder,
      getRandomArrayBuffer: async function(e) {
        const t = new Uint8Array(e);
        return z.crypto.getRandomValues(t), t.buffer;
      },
      isWebworker: yo(),
      push: {
        platform: "browser",
        formFactor: "desktop",
        storage: Ps
      }
    }, _s = Ro;
    function wo(e) {
      const t = [80015, 80017, 80030];
      return e.code ? de.isTokenErr(e) ? !1 : t.includes(e.code) ? !0 : e.code >= 4e4 && e.code < 5e4 : !1;
    }
    function Xt(e) {
      return wo(e) ? [ae({ action: P.ERROR, error: e })] : [ae({ action: P.DISCONNECTED, error: e })];
    }
    var To = class extends Ae {
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
        o.logAction(this.logger, o.LOG_MINOR, "CometTransport.connect()", "starting"), Ae.prototype.connect.call(this);
        const e = this.params, t = e.options, n = v.getHost(t, e.host), s = v.getPort(t), i = t.tls ? "https://" : "http://";
        this.baseUri = i + n + ":" + s + "/comet/";
        const r = this.baseUri + "connect";
        o.logAction(this.logger, o.LOG_MINOR, "CometTransport.connect()", "uri: " + r), Q(this.auth.getAuthParams(), (a, l) => {
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
            this.stream ? pe.REQ_RECV_STREAM : pe.REQ_RECV
          );
          f.on("data", (p) => {
            this.recvRequest && (u || (u = !0, this.emit("preconnect")), this.onData(p));
          }), f.on("complete", (p) => {
            if (this.recvRequest || (p = p || new m("Request cancelled", 80003, 400)), this.recvRequest = null, !u && !p && (u = !0, this.emit("preconnect")), this.onActivity(), p) {
              p.code ? this.onData(Xt(p)) : this.disconnect(p);
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
          const n = this.createRequest(t, null, this.authParams, null, pe.REQ_SEND);
          n.on("complete", (s) => {
            s && (o.logAction(
              this.logger,
              o.LOG_ERROR,
              "CometTransport.request" + (e ? "Close()" : "Disconnect()"),
              "request returned err = " + U(s)
            ), this.finish("disconnected", s));
          }), n.exec();
        }
      }
      dispose() {
        o.logAction(this.logger, o.LOG_MINOR, "CometTransport.dispose()", ""), this.isDisposed || (this.isDisposed = !0, this.recvRequest && (o.logAction(this.logger, o.LOG_MINOR, "CometTransport.dispose()", "aborting recv request"), this.recvRequest.abort(), this.recvRequest = null), this.finish("disconnected", we.disconnected()), y.Config.nextTick(() => {
          this.emit("disposed");
        }));
      }
      onConnect(e) {
        var t;
        if (this.isDisposed)
          return;
        const n = (t = e.connectionDetails) == null ? void 0 : t.connectionKey;
        Ae.prototype.onConnect.call(this, e);
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
          pe.REQ_SEND
        );
        t.on("complete", (n, s) => {
          if (n && o.logAction(
            this.logger,
            o.LOG_ERROR,
            "CometTransport.sendItems()",
            "on complete: err = " + U(n)
          ), this.sendRequest = null, n) {
            n.code ? this.onData(Xt(n)) : this.disconnect(n);
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
          this.stream ? pe.REQ_RECV_STREAM : pe.REQ_RECV_POLL
        );
        e.on("data", (t) => {
          this.onData(t);
        }), e.on("complete", (t) => {
          if (this.recvRequest = null, this.onActivity(), t) {
            t.code ? this.onData(Xt(t)) : this.disconnect(t);
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
                Lt(t[n], this.connectionManager.realtime._RealtimePresence)
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
    }, Co = To;
    function So(e, t) {
      return yt(Be(t)).includes("x-ably-errorcode");
    }
    function Oo(e, t) {
      if (So(e, t))
        return e.error && m.fromValues(e.error);
    }
    var vo = function() {
    }, Mo = 0, Ls = {};
    function Ao(e, t) {
      return e.getResponseHeader && e.getResponseHeader(t);
    }
    function ko(e) {
      return e.getResponseHeader && (e.getResponseHeader("transfer-encoding") || !e.getResponseHeader("content-length"));
    }
    function Eo(e) {
      const t = e.getAllResponseHeaders().trim().split(`\r
`), n = {};
      for (let s = 0; s < t.length; s++) {
        const i = t[s].split(":").map((r) => r.trim());
        n[i[0].toLowerCase()] = i[1];
      }
      return n;
    }
    var Po = class ti extends Y {
      constructor(t, n, s, i, r, a, l, d) {
        super(l), s = s || {}, s.rnd = mt(), this.uri = t + Ne(s), this.headers = n || {}, this.body = i, this.method = d ? d.toUpperCase() : se(i) ? "GET" : "POST", this.requestMode = r, this.timeouts = a, this.timedOut = !1, this.requestComplete = !1, this.id = String(++Mo), Ls[this.id] = this;
      }
      static createRequest(t, n, s, i, r, a, l, d) {
        const u = a || v.TIMEOUTS;
        return new ti(
          t,
          n,
          Ce(s),
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
        const n = this.requestMode == pe.REQ_SEND ? this.timeouts.httpRequestTimeout : this.timeouts.recvTimeout, s = this.timer = setTimeout(() => {
          this.timedOut = !0, r.abort();
        }, n), i = this.method, r = this.xhr = new XMLHttpRequest(), a = t.accept;
        let l = this.body, d = "text";
        a ? a.indexOf("application/x-msgpack") === 0 && (d = "arraybuffer") : t.accept = "application/json", l && (t["content-type"] || (t["content-type"] = "application/json")).indexOf("application/json") > -1 && typeof l != "string" && (l = JSON.stringify(l)), r.open(i, this.uri, !0), r.responseType = d, "authorization" in t && (r.withCredentials = !0);
        for (const A in t)
          r.setRequestHeader(A, t[A]);
        const u = (A, ee, q, Je) => {
          var Pe;
          let Kt = ee + " (event type: " + A.type + ")";
          (Pe = this == null ? void 0 : this.xhr) != null && Pe.statusText && (Kt += ", current statusText is " + this.xhr.statusText), o.logAction(this.logger, o.LOG_ERROR, "Request.on" + A.type + "()", Kt), this.complete(new J(Kt, q, Je));
        };
        r.onerror = function(A) {
          u(A, "XHR error occurred", null, 400);
        }, r.onabort = (A) => {
          this.timedOut ? u(A, "Request aborted due to request timeout expiring", null, 408) : u(A, "Request cancelled", null, 400);
        }, r.ontimeout = function(A) {
          u(A, "Request timed out", null, 408);
        };
        let f, p, w, I = 0, C = !1;
        const O = () => {
          if (clearTimeout(s), w = p < 400, p == 204) {
            this.complete(null, null, null, null, p);
            return;
          }
          f = this.requestMode == pe.REQ_RECV_STREAM && w && ko(r);
        }, M = () => {
          let A;
          try {
            const q = Ao(r, "content-type");
            if (q ? q.indexOf("application/json") >= 0 : r.responseType == "text") {
              const Pe = r.responseType === "arraybuffer" ? y.BufferUtils.utf8Decode(r.response) : String(r.responseText);
              Pe.length ? A = JSON.parse(Pe) : A = Pe, C = !0;
            } else
              A = r.response;
            A.response !== void 0 ? (p = A.statusCode, w = p < 400, t = A.headers, A = A.response) : t = Eo(r);
          } catch (q) {
            this.complete(new J("Malformed response body from server: " + q.message, null, 400));
            return;
          }
          if (w || Array.isArray(A)) {
            this.complete(null, A, t, C, p);
            return;
          }
          let ee = Oo(A, t);
          ee || (ee = new J(
            "Error response received from server: " + p + " body was: " + y.Config.inspect(A),
            null,
            p
          )), this.complete(ee, A, t, C, p);
        };
        function G() {
          const A = r.responseText, ee = A.length - 1;
          let q, Je;
          for (; I < ee && (q = A.indexOf(`
`, I)) > -1; )
            Je = A.slice(I, q), I = q + 1, B(Je);
        }
        const B = (A) => {
          try {
            A = JSON.parse(A);
          } catch (ee) {
            this.complete(new J("Malformed response body from server: " + ee.message, null, 400));
            return;
          }
          this.emit("data", A);
        }, H = () => {
          G(), this.streamComplete = !0, y.Config.nextTick(() => {
            this.complete();
          });
        };
        r.onreadystatechange = function() {
          const A = r.readyState;
          A < 3 || r.status !== 0 && (p === void 0 && (p = r.status, O()), A == 3 && f ? G() : A == 4 && (f ? H() : M()));
        }, r.send(l);
      }
      dispose() {
        const t = this.xhr;
        if (t) {
          t.onreadystatechange = t.onerror = t.onabort = t.ontimeout = vo, this.xhr = null;
          const n = this.timer;
          n && (clearTimeout(n), this.timer = null), this.requestComplete || t.abort();
        }
        delete Ls[this.id];
      }
    }, Gs = Po, Bs = K.XhrPolling, _o = class extends Co {
      constructor(e, t, n) {
        super(e, t, n), this.shortName = Bs, n.stream = !1, this.shortName = Bs;
      }
      static isAvailable() {
        return !!(y.Config.xhrSupported && y.Config.allowComet);
      }
      toString() {
        return "XHRPollingTransport; uri=" + this.baseUri + "; isConnected=" + this.isConnected;
      }
      createRequest(e, t, n, s, i) {
        return Gs.createRequest(e, t, n, s, i, this.timeouts, this.logger);
      }
    }, Lo = _o, Go = ["xhr_polling"], Bo = {
      order: Go,
      bundledImplementations: {
        web_socket: Ts,
        xhr_polling: Lo
      }
    }, No = Bo, Uo = {
      connectivityCheckUrl: "https://internet-up.ably-realtime.com/is-the-internet-up.txt",
      wsConnectivityUrl: "wss://ws-up.ably-realtime.com",
      /* Order matters here: the base transport is the leftmost one in the
       * intersection of baseTransportOrder and the transports clientOption that's
       * supported. */
      defaultTransports: [K.XhrPolling, K.WebSocket]
    }, Ho = Uo;
    function xo(e) {
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
    function je(e, t, n) {
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
    function Ns(e, t, n) {
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
    function Yt(e) {
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
    function Do(e, t) {
      const n = Fe(e, t);
      if (n === 0)
        return;
      const s = new ArrayBuffer(n), i = new DataView(s);
      return Ve(e, i, 0, t), s;
    }
    var qt = 65536 * 65536, Us = 1 / qt;
    function Wo(e, t) {
      return t = t || 0, e.getInt32(t) * qt + e.getUint32(t + 4);
    }
    function Zo(e, t) {
      return t = t || 0, e.getUint32(t) * qt + e.getUint32(t + 4);
    }
    function zo(e, t, n) {
      n < 9223372036854776e3 ? (e.setInt32(t, Math.floor(n * Us)), e.setInt32(t + 4, n & -1)) : (e.setUint32(t, 2147483647), e.setUint32(t + 4, 2147483647));
    }
    function jo(e, t, n) {
      n < 18446744073709552e3 ? (e.setUint32(t, Math.floor(n * Us)), e.setInt32(t + 4, n & -1)) : (e.setUint32(t, 4294967295), e.setUint32(t + 4, 4294967295));
    }
    var Vo = class {
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
          const s = Ns(this.view, this.offset, n);
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
              return s = Zo(this.view, this.offset + 1), this.offset += 9, s;
            case 208:
              return s = this.view.getInt8(this.offset + 1), this.offset += 2, s;
            case 209:
              return s = this.view.getInt16(this.offset + 1), this.offset += 3, s;
            case 210:
              return s = this.view.getInt32(this.offset + 1), this.offset += 5, s;
            case 211:
              return s = Wo(this.view, this.offset + 1), this.offset += 9, s;
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
    function Fo(e) {
      const t = new DataView(e), n = new Vo(t), s = n.parse();
      if (n.offset !== e.byteLength)
        throw new Error(e.byteLength - n.offset + " trailing bytes");
      return s;
    }
    function Hs(e, t) {
      return Object.keys(e).filter(function(n) {
        const s = e[n], i = typeof s;
        return (!t || s != null) && (i !== "function" || !!s.toJSON);
      });
    }
    function Ve(e, t, n, s) {
      const i = typeof e;
      if (typeof e == "string") {
        const r = Yt(e);
        if (r < 32)
          return t.setUint8(n, r | 160), je(t, n + 1, e), 1 + r;
        if (r < 256)
          return t.setUint8(n, 217), t.setUint8(n + 1, r), je(t, n + 2, e), 2 + r;
        if (r < 65536)
          return t.setUint8(n, 218), t.setUint16(n + 1, r), je(t, n + 3, e), 3 + r;
        if (r < 4294967296)
          return t.setUint8(n, 219), t.setUint32(n + 1, r), je(t, n + 5, e), 5 + r;
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
            return t.setUint8(n, 207), jo(t, n + 1, e), 9;
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
          return t.setUint8(n, 211), zo(t, n + 1, e), 9;
        throw new Error("Number too small -0x" + (-e).toString(16).substr(1));
      }
      if (i === "undefined")
        return s ? 0 : (t.setUint8(n, 212), t.setUint8(n + 1, 0), t.setUint8(n + 2, 0), 3);
      if (e === null)
        return s ? 0 : (t.setUint8(n, 192), 1);
      if (i === "boolean")
        return t.setUint8(n, e ? 195 : 194), 1;
      if (typeof e.toJSON == "function")
        return Ve(e.toJSON(), t, n, s);
      if (i === "object") {
        let r, a = 0, l;
        const d = Array.isArray(e);
        if (d ? r = e.length : (l = Hs(e, s), r = l.length), r < 16 ? (t.setUint8(n, r | (d ? 144 : 128)), a = 1) : r < 65536 ? (t.setUint8(n, d ? 220 : 222), t.setUint16(n + 1, r), a = 3) : r < 4294967296 && (t.setUint8(n, d ? 221 : 223), t.setUint32(n + 1, r), a = 5), d)
          for (let u = 0; u < r; u++)
            a += Ve(e[u], t, n + a, s);
        else if (l)
          for (let u = 0; u < r; u++) {
            const f = l[u];
            a += Ve(f, t, n + a), a += Ve(e[f], t, n + a, s);
          }
        return a;
      }
      if (i === "function")
        return 0;
      throw new Error("Unknown type " + i);
    }
    function Fe(e, t) {
      const n = typeof e;
      if (n === "string") {
        const s = Yt(e);
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
        return Fe(e.toJSON(), t);
      if (n === "object") {
        let s, i = 0;
        if (Array.isArray(e)) {
          s = e.length;
          for (let r = 0; r < s; r++)
            i += Fe(e[r], t);
        } else {
          const r = Hs(e, t);
          s = r.length;
          for (let a = 0; a < s; a++) {
            const l = r[a];
            i += Fe(l) + Fe(e[l], t);
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
    var Qt = {
      encode: Do,
      decode: Fo,
      inspect: xo,
      utf8Write: je,
      utf8Read: Ns,
      utf8ByteCount: Yt
    };
    function Jo(e, t) {
      return !!t.get("x-ably-errorcode");
    }
    function Xo(e, t) {
      if (Jo(e, t))
        return e.error && m.fromValues(e.error);
    }
    function Yo(e) {
      const t = {};
      return e.forEach((n, s) => {
        t[s] = n;
      }), t;
    }
    async function qo(e, t, n, s, i, r) {
      const a = new Headers(s || {}), l = e ? e.toUpperCase() : se(r) ? "GET" : "POST", d = new AbortController();
      let u;
      const f = new Promise((I) => {
        u = setTimeout(
          () => {
            d.abort(), I({ error: new J("Request timed out", null, 408) });
          },
          t ? t.options.timeouts.httpRequestTimeout : v.TIMEOUTS.httpRequestTimeout
        );
      }), p = {
        method: l,
        headers: a,
        body: r,
        signal: d.signal
      };
      y.Config.isWebworker || (p.credentials = a.has("authorization") ? "include" : "same-origin");
      const w = (async () => {
        try {
          const I = await It().fetch(n + "?" + new URLSearchParams(i || {}), p);
          if (clearTimeout(u), I.status == 204)
            return { error: null, statusCode: I.status };
          const C = I.headers.get("Content-Type");
          let O;
          C && C.indexOf("application/x-msgpack") > -1 ? O = await I.arrayBuffer() : C && C.indexOf("application/json") > -1 ? O = await I.json() : O = await I.text();
          const M = !!C && C.indexOf("application/x-msgpack") === -1, G = Yo(I.headers);
          return I.ok ? { error: null, body: O, headers: G, unpacked: M, statusCode: I.status } : { error: Xo(O, I.headers) || new J(
            "Error response received from server: " + I.status + " body was: " + y.Config.inspect(O),
            null,
            I.status
          ), body: O, headers: G, unpacked: M, statusCode: I.status };
        } catch (I) {
          return clearTimeout(u), { error: I };
        }
      })();
      return Promise.race([f, w]);
    }
    var Qo = {
      XHRRequest: Gs,
      FetchRequest: qo
    }, xs = go(_s, vs);
    y.Crypto = xs, y.BufferUtils = vs, y.Http = Es, y.Config = _s, y.Transports = No, y.WebStorage = Ps;
    for (const e of [Pt, Zt])
      e.Crypto = xs, e._MsgPack = Qt;
    Es.bundledRequestImplementations = Qo, o.initLogHandlers(), y.Defaults = Li(Ho), y.Config.agent && (y.Defaults.agent += " " + y.Config.agent);
    var Ko = {
      ErrorInfo: m,
      Rest: Pt,
      Realtime: Zt,
      msgpack: Qt
    };
    if (typeof g.exports == "object" && typeof h == "object") {
      var $o = (e, t, n, s) => {
        if (t && typeof t == "object" || typeof t == "function")
          for (let i of Object.getOwnPropertyNames(t))
            !Object.prototype.hasOwnProperty.call(e, i) && i !== n && Object.defineProperty(e, i, {
              get: () => t[i],
              enumerable: !(s = Object.getOwnPropertyDescriptor(t, i)) || s.enumerable
            });
        return e;
      };
      g.exports = $o(g.exports, h);
    }
    return g.exports;
  });
})(Ys);
var fa = Ys.exports;
const en = /* @__PURE__ */ Qe(fa);
var on = { exports: {} }, Ge = typeof Reflect == "object" ? Reflect : null, Zs = Ge && typeof Ge.apply == "function" ? Ge.apply : function(c, h, g) {
  return Function.prototype.apply.call(c, h, g);
}, ht;
Ge && typeof Ge.ownKeys == "function" ? ht = Ge.ownKeys : Object.getOwnPropertySymbols ? ht = function(c) {
  return Object.getOwnPropertyNames(c).concat(Object.getOwnPropertySymbols(c));
} : ht = function(c) {
  return Object.getOwnPropertyNames(c);
};
var ni = Number.isNaN || function(c) {
  return c !== c;
};
function L() {
  L.init.call(this);
}
on.exports = L;
on.exports.once = ba;
L.EventEmitter = L;
L.prototype._events = void 0;
L.prototype._eventsCount = 0;
L.prototype._maxListeners = void 0;
var zs = 10;
function dt(R) {
  if (typeof R != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof R);
}
Object.defineProperty(L, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return zs;
  },
  set: function(R) {
    if (typeof R != "number" || R < 0 || ni(R))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + R + ".");
    zs = R;
  }
});
L.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
L.prototype.setMaxListeners = function(c) {
  if (typeof c != "number" || c < 0 || ni(c))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + c + ".");
  return this._maxListeners = c, this;
};
function si(R) {
  return R._maxListeners === void 0 ? L.defaultMaxListeners : R._maxListeners;
}
L.prototype.getMaxListeners = function() {
  return si(this);
};
L.prototype.emit = function(c) {
  for (var h = [], g = 1; g < arguments.length; g++) h.push(arguments[g]);
  var b = c === "error", T = this._events;
  if (T !== void 0)
    b = b && T.error === void 0;
  else if (!b)
    return !1;
  if (b) {
    var S;
    if (h.length > 0 && (S = h[0]), S instanceof Error)
      throw S;
    var E = new Error("Unhandled error." + (S ? " (" + S.message + ")" : ""));
    throw E.context = S, E;
  }
  var x = T[c];
  if (x === void 0)
    return !1;
  if (typeof x == "function")
    Zs(x, this, h);
  else
    for (var D = x.length, N = ci(x, D), g = 0; g < D; ++g)
      Zs(N[g], this, h);
  return !0;
};
function ii(R, c, h, g) {
  var b, T, S;
  if (dt(h), T = R._events, T === void 0 ? (T = R._events = /* @__PURE__ */ Object.create(null), R._eventsCount = 0) : (T.newListener !== void 0 && (R.emit(
    "newListener",
    c,
    h.listener ? h.listener : h
  ), T = R._events), S = T[c]), S === void 0)
    S = T[c] = h, ++R._eventsCount;
  else if (typeof S == "function" ? S = T[c] = g ? [h, S] : [S, h] : g ? S.unshift(h) : S.push(h), b = si(R), b > 0 && S.length > b && !S.warned) {
    S.warned = !0;
    var E = new Error("Possible EventEmitter memory leak detected. " + S.length + " " + String(c) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    E.name = "MaxListenersExceededWarning", E.emitter = R, E.type = c, E.count = S.length;
  }
  return R;
}
L.prototype.addListener = function(c, h) {
  return ii(this, c, h, !1);
};
L.prototype.on = L.prototype.addListener;
L.prototype.prependListener = function(c, h) {
  return ii(this, c, h, !0);
};
function pa() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function ri(R, c, h) {
  var g = { fired: !1, wrapFn: void 0, target: R, type: c, listener: h }, b = pa.bind(g);
  return b.listener = h, g.wrapFn = b, b;
}
L.prototype.once = function(c, h) {
  return dt(h), this.on(c, ri(this, c, h)), this;
};
L.prototype.prependOnceListener = function(c, h) {
  return dt(h), this.prependListener(c, ri(this, c, h)), this;
};
L.prototype.removeListener = function(c, h) {
  var g, b, T, S, E;
  if (dt(h), b = this._events, b === void 0)
    return this;
  if (g = b[c], g === void 0)
    return this;
  if (g === h || g.listener === h)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete b[c], b.removeListener && this.emit("removeListener", c, g.listener || h));
  else if (typeof g != "function") {
    for (T = -1, S = g.length - 1; S >= 0; S--)
      if (g[S] === h || g[S].listener === h) {
        E = g[S].listener, T = S;
        break;
      }
    if (T < 0)
      return this;
    T === 0 ? g.shift() : ma(g, T), g.length === 1 && (b[c] = g[0]), b.removeListener !== void 0 && this.emit("removeListener", c, E || h);
  }
  return this;
};
L.prototype.off = L.prototype.removeListener;
L.prototype.removeAllListeners = function(c) {
  var h, g, b;
  if (g = this._events, g === void 0)
    return this;
  if (g.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : g[c] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete g[c]), this;
  if (arguments.length === 0) {
    var T = Object.keys(g), S;
    for (b = 0; b < T.length; ++b)
      S = T[b], S !== "removeListener" && this.removeAllListeners(S);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (h = g[c], typeof h == "function")
    this.removeListener(c, h);
  else if (h !== void 0)
    for (b = h.length - 1; b >= 0; b--)
      this.removeListener(c, h[b]);
  return this;
};
function oi(R, c, h) {
  var g = R._events;
  if (g === void 0)
    return [];
  var b = g[c];
  return b === void 0 ? [] : typeof b == "function" ? h ? [b.listener || b] : [b] : h ? ya(b) : ci(b, b.length);
}
L.prototype.listeners = function(c) {
  return oi(this, c, !0);
};
L.prototype.rawListeners = function(c) {
  return oi(this, c, !1);
};
L.listenerCount = function(R, c) {
  return typeof R.listenerCount == "function" ? R.listenerCount(c) : ai.call(R, c);
};
L.prototype.listenerCount = ai;
function ai(R) {
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
L.prototype.eventNames = function() {
  return this._eventsCount > 0 ? ht(this._events) : [];
};
function ci(R, c) {
  for (var h = new Array(c), g = 0; g < c; ++g)
    h[g] = R[g];
  return h;
}
function ma(R, c) {
  for (; c + 1 < R.length; c++)
    R[c] = R[c + 1];
  R.pop();
}
function ya(R) {
  for (var c = new Array(R.length), h = 0; h < c.length; ++h)
    c[h] = R[h].listener || R[h];
  return c;
}
function ba(R, c) {
  return new Promise(function(h, g) {
    function b(S) {
      R.removeListener(c, T), g(S);
    }
    function T() {
      typeof R.removeListener == "function" && R.removeListener("error", b), h([].slice.call(arguments));
    }
    li(R, c, T, { once: !0 }), c !== "error" && Ia(R, b, { once: !0 });
  });
}
function Ia(R, c, h) {
  typeof R.on == "function" && li(R, "error", c, h);
}
function li(R, c, h, g) {
  if (typeof R.on == "function")
    g.once ? R.once(c, h) : R.on(c, h);
  else if (typeof R.addEventListener == "function")
    R.addEventListener(c, function b(T) {
      g.once && R.removeEventListener(c, b), h(T);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof R);
}
var Ra = on.exports;
const wa = /* @__PURE__ */ Qe(Ra);
let Te = class {
  /**
   * 指定時間後にrejectするPromiseを返す
   * @param {number} ms ミリ秒
   * @returns {Promise}
   */
  static timeout(c) {
    return new Promise((h, g) => setTimeout(() => {
      g(new Error("timeout"));
    }, c));
  }
  /**
   * 指定時間後にresolveするPromiseを返す
   * @param {number} ms ミリ秒
   * @returns {Promise}
   */
  static wait(c) {
    return new Promise((h) => setTimeout(h, c));
  }
  /**
   * 日時をタイムゾーンオフセット付きのISO 8601拡張形式にする
   * @param {Date} date 日時
   * @returns {string}
   */
  static getISOExtendedWithLocalTimezone(c) {
    const h = c instanceof Date ? c : /* @__PURE__ */ new Date(), g = h.getFullYear(), b = String(h.getMonth() + 1).padStart(2, "0"), T = String(h.getDate()).padStart(2, "0"), S = String(h.getHours()).padStart(2, "0"), E = String(h.getMinutes()).padStart(2, "0"), x = String(h.getSeconds()).padStart(2, "0"), D = String(h.getMilliseconds()).padStart(3, "0"), N = `${g}-${b}-${T}T${S}:${E}:${x}.${D}`, W = -h.getTimezoneOffset();
    if (W === 0)
      return `${N}Z`;
    const te = W > 0 ? "+" : "-", F = String(Math.floor(Math.abs(W) / 60)).padStart(2, "0"), he = String(Math.abs(W) % 60).padStart(2, "0");
    return `${N}${te}${F}:${he}`;
  }
  /**
   * 文字列を正規化する
   * @param {string} str 
   * @returns {string}
   */
  static normalize(c) {
    return c.trim().replace(/[Ａ-Ｚａ-ｚ０-９]/g, (h) => String.fromCharCode(h.charCodeAt(0) - 65248));
  }
  /**
   * 全角数字の文字列を数値にして返す
   * @param {*} value 
   * @returns {number}
   */
  static castToHalfWidthDigitNumber(c) {
    return typeof c == "string" ? ye.toNumber(c.replace(/[０-９．]/g, (h) => String.fromCharCode(h.charCodeAt(0) - 65248))) : ye.toNumber(c);
  }
};
class Ta extends wa {
  constructor() {
    super(), this._realtime = null, this._channel = null, this._channelName = null, this._ipAddress = null;
  }
  /**
  * @param {string} apiKey
  */
  connectBackend(c) {
    this._realtime = new en.Realtime({ key: c }), this._realtime.connection.on((h) => {
      h.reason;
    }), this._channel = null, this._channelName = null, this._ipAddress = null;
  }
  /**
  * @param {string} keyword
  */
  async connect(c) {
    var h, g;
    if (!this._realtime) {
      this.emit("packet", "not connected");
      return;
    }
    (h = this._channel) == null || h.unsubscribe(), this._channel = this._realtime.channels.get(c), await ((g = this._channel) == null ? void 0 : g.subscribe((b) => {
      this._realtime.connection.id != b.connectionId && (typeof b.data == "string" ? (this.emit("received", { text: b.data }), this.emit("packet", { text: b.data })) : (this._shouldReceiveMessage(b) && this.emit("received", b.data), this.emit("packet", b.data)));
    }));
  }
  /**
  * @param {Ably.Message} message
  * @returns {boolean}
  */
  _shouldReceiveMessage(c) {
    var h, g, b, T;
    switch (c.name) {
      case "broadcast":
        return !0;
      case "multicast":
        return ((g = (h = c.data) == null ? void 0 : h.header) == null ? void 0 : g.channel) == this._channelName;
      case "unicast":
        return ((T = (b = c.data) == null ? void 0 : b.header) == null ? void 0 : T.to) == this._ipAddress;
      default:
        return !1;
    }
  }
  disconnect() {
    return this._channel ? (this._channel.unsubscribe(), this._channel = null, !0) : !1;
  }
  get isConnected() {
    return this._channel != null;
  }
  /**
  * @param {string} text
  */
  async send(c) {
    var h = new en.Realtime.Message();
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
    var g = new en.Realtime.Message();
    return h ? (g.name = "unicast", g.data = {
      text: c,
      header: {
        from: this._ipAddress,
        to: h
      }
    }) : (g.name = "broadcast", g.data = {
      text: c,
      header: {
        from: this._ipAddress
      }
    }), await this._send(g);
  }
  /**
  * @param {Ably.Message} message
  */
  async _send(c) {
    if (!this._channel)
      return !1;
    c.data.header.timestamp = Te.getISOExtendedWithLocalTimezone(/* @__PURE__ */ new Date());
    try {
      return await Promise.race([
        this._channel.publish(c),
        Te.timeout(5e3)
      ]), this.emit("sent", c.data), !0;
    } catch {
      return !1;
    }
  }
  /**
  * @param {string} ipAddress
  */
  setIpAddress(c) {
    c ? this._ipAddress = c : this._ipAddress = null;
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
    c ? this._channelName = c : this._channelName = null;
  }
  /**
   * @returns {string}
   */
  get channelName() {
    return this._channelName;
  }
}
const Ca = "trial", Sa = "basic", js = "bc_id", Vs = "bc_block", Fs = "bc_keyword", at = "bc_updated_at", Oa = 1e3 * 60 * 60 * 24 * 30;
class va {
  constructor() {
    const c = Date.now(), h = new URLSearchParams(window.location.search), g = h.get("id");
    if (g && g.length == 10)
      this._id = g, localStorage.setItem(js, g), localStorage.setItem(at, String(c));
    else {
      const S = localStorage.getItem(js), E = Number(localStorage.getItem(at));
      if (S && E && c - E < Oa)
        this._id = S;
      else
        throw localStorage.clear(), new Error("`id` is required.");
    }
    const b = h.get("block");
    b && (localStorage.setItem(Vs, b), localStorage.setItem(at, String(c))), this._block = localStorage.getItem(Vs);
    const T = h.get("keyword");
    T && (localStorage.setItem(Fs, T), localStorage.setItem(at, String(c))), this._keyword = localStorage.getItem(Fs);
  }
  /**
   * お客様ID
   * @type {string}
   */
  get id() {
    return this._id;
  }
  /**
   * ブロックタイプ
   * @type {string}
   */
  get block() {
    return this._block ?? Ca;
  }
  /**
   * キーワード
   * @type {string?}
   */
  get keyword() {
    return this._keyword;
  }
  /**
   * ブロックタイプがベーシックか
   * @returns {boolean}
   */
  isBlockTypeBasic() {
    return this._block == Sa;
  }
}
const Ma = 10, Aa = 1, ka = 5e3, Ea = 50;
let _ = (R) => R.default;
const Js = () => {
  const R = _.setup();
  R && R.translations[R.locale] && Object.assign(
    R.translations[R.locale],
    la[R.locale]
  );
}, ct = "bidirectionalComm";
let Xs = "https://studyapps.github.io/bidirectional-comm/bidirectional-comm.mjs";
class ut {
  /**
   * A translation object which is used in this class.
   * @param {FormatObject} formatter - translation object
   */
  static set formatMessage(c) {
    _ = c, _ && Js();
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
    return ct;
  }
  /**
   * URL to get this extension.
   * @type {string}
   */
  static get extensionURL() {
    return Xs;
  }
  /**
   * Set URL to get this extension.
   * The extensionURL will be changed to the URL of the loading server.
   * @param {string} url - URL
   */
  static set extensionURL(c) {
    Xs = c;
  }
  /**
   * Construct a set of blocks for Xcratch Example.
   * @param {Runtime} runtime - the Scratch 3.0 runtime.
   */
  constructor(c) {
    this.runtime = c, c.formatMessage && (_ = c.formatMessage), this.server = new Ta();
    try {
      const h = new va();
      this.isBlockBasic = h.isBlockTypeBasic(), this.keyword = h.keyword ? h.keyword : null, this.customer = new ga(h.id), this.fetchLicense();
    } catch {
      this.isBlockBasic = !1, this.keyword = null, this.customer = null, window.alert(_({
        id: "bidirectionalComm.system.licenseAlert",
        default: `ライセンス情報が確認できません。
双方向性拡張機能の専用URLからアプリを立ち上げてください。`
      }));
    }
    this.isEnabledPacketCapture = !1, this.lastSentMessage = null, this.numOfSentMessages = 0, this.server.on("sent", (h) => {
      this.lastSentMessage = h, this.numOfSentMessages += 1, this.runtime.startHats(ct + "_whenSentMessage");
    }), this.lastReceivedMessage = null, this.server.on("received", (h) => {
      if (this.isReachedSendingLimit()) {
        this.setReachedSendingLimitMessage();
        return;
      }
      this.isEnabledPacketCapture || (this.lastReceivedMessage = h, this.runtime.startHats(ct + "_whenReceivedMessage"));
    }), this.server.on("packet", (h) => {
      if (this.isReachedSendingLimit()) {
        this.setReachedSendingLimitMessage();
        return;
      }
      this.isEnabledPacketCapture && (this.lastReceivedMessage = h, this.runtime.startHats(ct + "_whenReceivedMessage"));
    }), this.lastSystemMessage = {
      id: "bidirectionalComm.system.notConnected",
      default: "接続してください"
    };
  }
  async fetchLicense() {
    var c, h, g;
    await ((c = this.customer) == null ? void 0 : c.fetchLicense()), (h = this.customer) != null && h.apikey && this.server.connectBackend((g = this.customer) == null ? void 0 : g.apikey);
  }
  /**
   * ベーシックブロックを表示するか
   * @returns {boolean}
   */
  shouldShowBasicBlocks() {
    return this.isBlockBasic;
  }
  /**
   * ライセンス情報を取得できるまで待機
   * @returns {Promise<boolean>}
   */
  async waitLicenseFetch() {
    var h, g, b;
    return (h = this.customer) != null && h.isFetchedLicense() ? (g = this.customer) == null ? void 0 : g.hasLicense() : (this.lastSystemMessage = {
      id: "bidirectionalComm.system.checkingLicense",
      default: "ライセンスの確認中"
    }, await ((b = this.customer) == null ? void 0 : b.waitLicenseFetch()));
  }
  /**
   * システムメッセージに「ライセンスがありません」を設定
   */
  setNoLicenseMessage() {
    this.lastSystemMessage = {
      id: "bidirectionalComm.system.noLicense",
      default: "ライセンスがありません"
    };
  }
  /**
   * システムメッセージに「通信量が上限に達しました」を設定
   */
  setReachedSendingLimitMessage() {
    this.lastSystemMessage = {
      id: "bidirectionalComm.system.reachedSendingLimit",
      default: "通信量が上限に達しました"
    };
  }
  /**
   * メッセージ送信上限に達しているか
   * @returns {boolean}
   */
  isReachedSendingLimit() {
    var h;
    const c = (h = this.customer) != null && h.hasBasicLicense() ? ka : Ea;
    return this.numOfSentMessages >= c;
  }
  /**
   * メッセージ送信後の待機
   */
  async waitAfterSend() {
    var g;
    const h = 1e3 / ((g = this.customer) != null && g.hasBasicLicense() ? Ma : Aa);
    await Te.wait(h);
  }
  //
  // 各ブロックのopcodeの実装
  //
  async connect(c) {
    try {
      if (!await this.waitLicenseFetch()) {
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
    var h = Te.normalize(ye.toString(c.KEYWORD));
    if (!h && this.keyword && (h = this.keyword), !h) {
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
    var c;
    if (!((c = this.customer) != null && c.hasLicense())) {
      this.setNoLicenseMessage();
      return;
    }
    this.server.disconnect(), this.lastSystemMessage = {
      id: "bidirectionalComm.system.notConnected",
      default: "接続してください"
    };
  }
  async sendMessage(c) {
    var b;
    if (!((b = this.customer) != null && b.hasLicense())) {
      this.setNoLicenseMessage();
      return;
    }
    if (this.isReachedSendingLimit()) {
      this.setReachedSendingLimitMessage();
      return;
    }
    if (!this.server.isConnected)
      return;
    const h = ye.toString(c.MESSAGE);
    if (!h)
      return;
    await this.server.send(h) && await this.waitAfterSend();
  }
  shift(c) {
    var b;
    if (!((b = this.customer) != null && b.hasBasicLicense()))
      return this.setNoLicenseMessage(), _({
        id: "bidirectionalComm.system.noLicense",
        default: "ライセンスがありません"
      });
    const h = ye.toString(c.MESSAGE), g = Te.castToHalfWidthDigitNumber(c.SHIFT);
    return h.split("").map((T) => T.codePointAt(0)).map((T) => String.fromCodePoint(T + g)).join("");
  }
  setChannel(c) {
    var g;
    if (!((g = this.customer) != null && g.hasLicense())) {
      this.setNoLicenseMessage();
      return;
    }
    const h = Te.normalize(ye.toString(c.CHANNEL));
    this.server.setChannelName(h);
  }
  getChannel() {
    return this.server.channelName ?? "";
  }
  setIpAddress(c) {
    var g;
    if (!((g = this.customer) != null && g.hasBasicLicense())) {
      this.setNoLicenseMessage();
      return;
    }
    const h = Te.normalize(ye.toString(c.IP_ADDRESS));
    this.server.setIpAddress(h);
  }
  getIpAddress() {
    return this.server.ipAddress ?? "";
  }
  async sendMessageToIpAddress(c) {
    var T;
    if (!((T = this.customer) != null && T.hasBasicLicense())) {
      this.setNoLicenseMessage();
      return;
    }
    if (this.isReachedSendingLimit()) {
      this.setReachedSendingLimitMessage();
      return;
    }
    if (!this.server.isConnected)
      return;
    const h = ye.toString(c.MESSAGE);
    if (!h)
      return;
    const g = ye.toString(c.IP_ADDRESS);
    await this.server.sendToIpAddress(h, g) && await this.waitAfterSend();
  }
  enablePacketCapture() {
    var c;
    if (!((c = this.customer) != null && c.hasBasicLicense())) {
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
    var g, b, T, S, E, x, D, N, W;
    if (!((g = this.customer) != null && g.hasBasicLicense()))
      return this.setNoLicenseMessage(), "";
    switch (c.HEADER) {
      case "channel":
        return ((T = (b = this.lastSentMessage) == null ? void 0 : b.header) == null ? void 0 : T.channel) ?? "";
      case "to":
        return ((E = (S = this.lastSentMessage) == null ? void 0 : S.header) == null ? void 0 : E.to) ?? "";
      case "from":
        return ((D = (x = this.lastSentMessage) == null ? void 0 : x.header) == null ? void 0 : D.from) ?? "";
      case "timestamp":
        return ((W = (N = this.lastSentMessage) == null ? void 0 : N.header) == null ? void 0 : W.timestamp) ?? "";
      default:
        return "";
    }
  }
  getLastReceivedMessageText() {
    var c;
    return ((c = this.lastReceivedMessage) == null ? void 0 : c.text) ?? "";
  }
  getLastReceivedMessageHeader(c) {
    var g, b, T, S, E, x, D, N, W;
    if (!((g = this.customer) != null && g.hasBasicLicense()))
      return this.setNoLicenseMessage(), "";
    switch (c.HEADER) {
      case "channel":
        return ((T = (b = this.lastReceivedMessage) == null ? void 0 : b.header) == null ? void 0 : T.channel) ?? "";
      case "to":
        return ((E = (S = this.lastReceivedMessage) == null ? void 0 : S.header) == null ? void 0 : E.to) ?? "";
      case "from":
        return ((D = (x = this.lastReceivedMessage) == null ? void 0 : x.header) == null ? void 0 : D.from) ?? "";
      case "timestamp":
        return ((W = (N = this.lastReceivedMessage) == null ? void 0 : N.header) == null ? void 0 : W.timestamp) ?? "";
      default:
        return "";
    }
  }
  /**
   * @returns {object} metadata for this extension and its blocks.
   */
  getInfo() {
    Js();
    var c = {
      id: ut.EXTENSION_ID,
      name: ut.EXTENSION_NAME,
      extensionURL: ut.extensionURL,
      blockIconURI: ha,
      showStatusButton: !1,
      color1: "#A6A6A6",
      blocks: [],
      menus: {
        HEADER: {
          acceptReporters: !1,
          items: [
            {
              text: _({
                id: "bidirectionalComm.menu.header.from",
                default: "送信元"
              }),
              value: "from"
            },
            {
              text: _({
                id: "bidirectionalComm.menu.header.to",
                default: "送信先"
              }),
              value: "to"
            },
            {
              text: _({
                id: "bidirectionalComm.menu.header.channel",
                default: "チャンネル名"
              }),
              value: "channel"
            },
            {
              text: _({
                id: "bidirectionalComm.menu.header.timestamp",
                default: "タイムスタンプ"
              }),
              value: "timestamp"
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
        blockType: V.COMMAND,
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
        blockType: V.REPORTER
      },
      {
        opcode: "getNumOfSentMessages",
        text: _({
          id: "bidirectionalComm.block.getNumOfSentMessages",
          default: "送信数"
        }),
        blockType: V.REPORTER
      },
      {
        opcode: "disconnect",
        text: _({
          id: "bidirectionalComm.block.disconnect",
          default: "切断する"
        }),
        blockType: V.COMMAND
      },
      "---",
      {
        opcode: "sendMessage",
        text: _({
          id: "bidirectionalComm.block.sendMessage",
          default: "[MESSAGE]を送る"
        }),
        blockType: V.COMMAND,
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
        blockType: V.REPORTER,
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
        blockType: V.COMMAND,
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
        blockType: V.REPORTER
      }
    ), this.shouldShowBasicBlocks() && c.blocks.push(
      "---",
      {
        opcode: "setIpAddress",
        text: _({
          id: "bidirectionalComm.block.setIpAddress",
          default: "IPアドレスを[IP_ADDRESS]にする"
        }),
        blockType: V.COMMAND,
        arguments: {
          IP_ADDRESS: {
            type: le.STRING,
            defaultValue: "192.168.0.0"
          }
        }
      },
      {
        opcode: "getIpAddress",
        text: _({
          id: "bidirectionalComm.block.getIpAddress",
          default: "自分のIPアドレス"
        }),
        blockType: V.REPORTER
      },
      {
        opcode: "sendMessageToIpAddress",
        text: _({
          id: "bidirectionalComm.block.sendMessageToIpAddress",
          default: "[IP_ADDRESS]に[MESSAGE]を送る"
        }),
        blockType: V.COMMAND,
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
        blockType: V.COMMAND
      }
    ), c.blocks.push(
      "---",
      {
        opcode: "whenReceivedMessage",
        text: _({
          id: "bidirectionalComm.block.whenReceivedMessage",
          default: "メッセージを受け取ったとき"
        }),
        blockType: V.EVENT,
        isEdgeActivated: !1
      },
      {
        opcode: "getLastReceivedMessageText",
        text: _({
          id: "bidirectionalComm.block.getLastReceivedMessageText",
          default: "受信メッセージ"
        }),
        blockType: V.REPORTER
      }
    ), this.shouldShowBasicBlocks() && c.blocks.push(
      {
        opcode: "getLastReceivedMessageHeader",
        text: _({
          id: "bidirectionalComm.block.getLastReceivedMessageHeader",
          default: "受信パケットの[HEADER]"
        }),
        blockType: V.REPORTER,
        arguments: {
          HEADER: {
            type: le.STRING,
            menu: "HEADER",
            defaultValue: "from"
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
        blockType: V.EVENT,
        isEdgeActivated: !1
      },
      {
        opcode: "getLastSentMessageText",
        text: _({
          id: "bidirectionalComm.block.getLastSentMessageText",
          default: "送信メッセージ"
        }),
        blockType: V.REPORTER
      }
    ), this.shouldShowBasicBlocks() && c.blocks.push(
      {
        opcode: "getLastSentMessageHeader",
        text: _({
          id: "bidirectionalComm.block.getLastSentMessageHeader",
          default: "送信パケットの[HEADER]"
        }),
        blockType: V.REPORTER,
        arguments: {
          HEADER: {
            type: le.STRING,
            menu: "HEADER",
            defaultValue: "from"
          }
        }
      }
    ), c;
  }
}
export {
  ut as blockClass,
  ut as default
};
