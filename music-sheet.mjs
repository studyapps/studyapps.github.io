
const Scratch = globalThis.Scratch;

if (!Scratch?.extensions || !Scratch?.BlockType || !Scratch?.ArgumentType) {
  throw new Error('Scratch extension API is unavailable.');
}

// SVGをData URIに変換
const svgToDataURI = svg =>
  'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);

// 4種類の音符SVG（白色）
const noteIcons = {
  // 全音符
  whole: svgToDataURI(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 24 32"><path fill="#FFFFFF" d="M7.875,25.849c-0.084-1.652,0.388-2.127,1.55-2.323c1.384-0.218,2.796,1.314,2.935,3.582 c0.083,1.65-0.388,2.183-1.578,2.35C9.398,29.674,7.986,28.114,7.875,25.849z M4.403,26.491C4.486,29.317,8.152,30,10.201,30 c1.937,0,5.716-0.738,5.632-3.509c-0.084-2.826-3.833-3.508-5.826-3.508C8.097,22.983,4.319,23.75,4.403,26.491z"/></svg>'
  ),

  // 二分音符
  half: svgToDataURI(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 24 32"><path fill="#FFFFFF" d="M7.068,25.64c0.86-0.693,3.023-2.192,4.215-1.97c0.267,0.028,0.544,0.223,0.572,0.526 c0.083,0.861-1.108,2.192-2.382,3.136c-1.245,0.971-2.74,1.609-3.543,1.554c-0.471-0.083-0.665-0.222-0.665-0.611 C5.211,27.471,6.015,26.5,7.068,25.64z M12.033,23.142c-0.86-0.558-1.553-0.613-2.247-0.586c-2.385,0.083-5.298,2.002-5.381,4.471 c-0.027,1.026,0.11,1.998,1,2.584C5.959,29.973,6.653,30,7.346,30c2.301,0,5.319-2.058,5.375-4.471V2h-0.687V23.142z"/></svg>'
  ),

  // 四分音符
  quarter: svgToDataURI(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 24 32"><path fill="#FFFFFF" d="M12.728,25.445c0,1.25-0.743,2.388-1.826,3.222C9.846,29.5,8.458,30,7.235,30c-0.778,0-1.5-0.251-2-0.667 c-0.528-0.417-0.833-1.027-0.833-1.749c0-1.139,0.777-2.277,1.833-3.11c1.056-0.86,2.389-1.416,3.5-1.416 c0.972,0,1.806,0.139,2.306,0.611V2.258h0.687V25.445z"/></svg>'
  ),

  // 八分音符
  eighth: svgToDataURI(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 24 32"><path fill="#FFFFFF" d="M12.728,2.258c0.195,1.389,0.223,3.139,1.675,4.888c1.115,1.333,2.371,2.527,3.235,3.609 c1.145,1.417,1.96,3.195,1.96,4.999c0,2.89-1.401,5.749-2.351,7.331h-0.446c0.67-1.5,2.011-3.971,1.897-6.609 c-0.056-1.471-0.613-3.054-1.562-4.22c-1.062-1.361-2.846-2.444-4.409-2.555v15.745c0,1.25-0.743,2.388-1.826,3.222 C9.846,29.5,8.458,30,7.235,30c-0.778,0-1.5-0.251-2-0.667c-0.528-0.417-0.833-1.027-0.833-1.749c0-1.139,0.777-2.277,1.833-3.11 c1.055-0.86,2.388-1.416,3.499-1.416c0.973,0,1.807,0.139,2.306,0.611V2.258H12.728z"/></svg>'
  )
};

class MusicSheet {
  constructor() {
    // 音符の初期値（秒）
    this.durations = {
      whole: 1,
      half: 0.5,
      quarter: 0.25,
      eighth: 0.125
    };

    // 四分音符を1とした比率
    this.noteRatios = {
      whole: 4,
      half: 2,
      quarter: 1,
      eighth: 0.5
    };

    // 音階とMIDIノート番号
    this.pitches = {};

    const keys = [
      'C', 'Cs', 'D', 'Ds', 'E', 'F',
      'Fs', 'G', 'Gs', 'A', 'As', 'B'
    ];

    for (const [prefix, base] of [
      ['low', 48],
      ['', 60],
      ['high', 72]
    ]) {
      keys.forEach((key, i) => {
        this.pitches[prefix + key] = base + i;
      });
    }
  }

  getInfo() {
    const { BlockType, ArgumentType } = Scratch;

    const names = [
      'ド', '#ド', 'レ', '#レ',
      'ミ', 'ファ', '#ファ', 'ソ',
      '#ソ', 'ラ', '#ラ', 'シ'
    ];

    const keys = [
      'C', 'Cs', 'D', 'Ds', 'E', 'F',
      'Fs', 'G', 'Gs', 'A', 'As', 'B'
    ];

    const notes = [];

    // 低音域・中音域・高音域
    for (const [prefix, suffix] of [
      ['low', '(低)'],
      ['', ''],
      ['high', '(高)']
    ]) {
      names.forEach((name, i) => {
        notes.push({
          text: name + suffix,
          value: prefix + keys[i]
        });
      });
    }

    // SVG画像を表示する変数ブロック
    const iconBlock = (opcode, label) => ({
      opcode,
      blockType: BlockType.REPORTER,
      text: '[ICON]',
      arguments: {
        ICON: {
          type: ArgumentType.IMAGE,
          dataURI: noteIcons[opcode],
          alt: label,
          flipRTL: false
        }
      }
    });

    return {
      id: 'musicAshikaga',
      name: 'Music Sheet',

      // 黒色のブロック
      color1: '#000000',
      color2: '#000000',
      color3: '#000000',

      blocks: [
        // ④ テンポ設定
        {
          opcode: 'setTempo',
          blockType: BlockType.COMMAND,
          text: 'テンポ [NOTE] ＝ [VALUE] [UNIT]',
          arguments: {
            NOTE: {
              type: ArgumentType.STRING,
              menu: 'durations',
              defaultValue: 'eighth'
            },
            VALUE: {
              type: ArgumentType.STRING,
              defaultValue: ' '
            },
            UNIT: {
              type: ArgumentType.STRING,
              menu: 'units',
              defaultValue: 'BPM'
            }
          }
        },

        // ② 全音符・二分音符・四分音符・八分音符
        iconBlock('whole', '全音符'),
        iconBlock('half', '二分音符'),
        iconBlock('quarter', '四分音符'),
        iconBlock('eighth', '八分音符'),

        // ③ 付点音符
        {
          opcode: 'dotted',
          blockType: BlockType.REPORTER,
          text: '[VALUE]．',
          arguments: {
            VALUE: {
              type: ArgumentType.STRING,
              defaultValue: ' '
            }
          }
        },

        // ① 音階
        {
          opcode: 'pitch',
          blockType: BlockType.REPORTER,
          text: '[NOTE]',
          arguments: {
            NOTE: {
              type: ArgumentType.STRING,
              menu: 'notes',
              defaultValue: 'C'
            }
          }
        }
      ],

      menus: {
        // 音階36種類
        notes: {
          acceptReporters: false,
          items: notes
        },

        // 音符の種類
        durations: {
          acceptReporters: false,
          items: [
            { text: '全音符', value: 'whole' },
            { text: '二分音符', value: 'half' },
            { text: '四分音符', value: 'quarter' },
            { text: '八分音符', value: 'eighth' }
          ]
        },

        // テンポの単位
        units: {
          acceptReporters: false,
          items: ['BPM', '秒']
        }
      }
    };
  }

  // 音階のMIDI番号を返す
  pitch(args) {
    return this.pitches[args.NOTE] ?? 60;
  }

  // 各音符の時間を返す
  whole() {
    return this.durations.whole;
  }

  half() {
    return this.durations.half;
  }

  quarter() {
    return this.durations.quarter;
  }

  eighth() {
    return this.durations.eighth;
  }

  // 付点音符：入力値を1.5倍
  dotted(args) {
    const value = String(args.VALUE ?? '').trim();

    if (!value) {
      return '';
    }

    const n = Number(value);

    return Number.isFinite(n) ? n * 1.5 : '';
  }

  // テンポ設定
  setTempo(args) {
    const value = String(args.VALUE ?? '').trim();

    if (!value) {
      return;
    }

    const n = Number(value);

    if (!Number.isFinite(n) || n <= 0) {
      return;
    }

    const ratio = this.noteRatios[args.NOTE];

    if (
      !ratio ||
      (args.UNIT !== 'BPM' && args.UNIT !== '秒')
    ) {
      return;
    }

    // BPMまたは秒から指定音符の時間を算出
    const selectedSeconds =
      args.UNIT === 'BPM' ? 60 / n : n;

    // 四分音符の時間に換算
    const quarterSeconds = selectedSeconds / ratio;

    // 4種類の音符の時間を更新
    for (const [key, noteRatio] of
      Object.entries(this.noteRatios)) {
      this.durations[key] = quarterSeconds * noteRatio;
    }
  }
}

// 拡張機能を登録
Scratch.extensions.register(new MusicSheet());
