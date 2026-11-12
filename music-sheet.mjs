
/**
 * MUSIC — Scratch 3 compatible unsandboxed custom extension.
 * Load through an editor that supports URL-based JavaScript extensions.
 */
const Scratch = globalThis.Scratch;

if (!Scratch?.extensions || !Scratch?.BlockType || !Scratch?.ArgumentType) {
  throw new Error(
    'Scratch extension API is unavailable. Load MUSIC.mjs in a compatible Scratch editor.'
  );
}

class MusicExtension {
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
    this.pitches = {
      lowC: 48,
      lowD: 50,
      lowE: 52,
      lowF: 53,
      lowG: 55,
      lowA: 57,
      lowB: 59,

      C: 60,
      D: 62,
      E: 64,
      F: 65,
      G: 67,
      A: 69,
      B: 71,

      highC: 72,
      highD: 74,
      highE: 76,
      highF: 77,
      highG: 79,
      highA: 81,
      highB: 83
    };
  }

  getInfo() {
    const { BlockType, ArgumentType } = Scratch;

    return {
      id: 'musicAshikaga',
      name: 'MUSIC',

      // ブロックの色：黒
      color1: '#000000',
      color2: '#000000',
      color3: '#000000',

      blocks: [
        // ① 音階ブロック
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
        },

        // ② 音符の長さ
        {
          opcode: 'whole',
          blockType: BlockType.REPORTER,
          text: '全音符'
        },
        {
          opcode: 'half',
          blockType: BlockType.REPORTER,
          text: '二分音符'
        },
        {
          opcode: 'quarter',
          blockType: BlockType.REPORTER,
          text: '四分音符'
        },
        {
          opcode: 'eighth',
          blockType: BlockType.REPORTER,
          text: '八分音符'
        },

        // ③ 付点音符
        {
          opcode: 'dotted',
          blockType: BlockType.REPORTER,
          text: '[VALUE]．',
          arguments: {
            VALUE: {
              type: ArgumentType.STRING,
              defaultValue: ''
            }
          }
        },

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
              defaultValue: ''
            },
            UNIT: {
              type: ArgumentType.STRING,
              menu: 'units',
              defaultValue: 'BPM'
            }
          }
        }
      ],

      menus: {
        // 音階のプルダウン
        notes: {
          acceptReporters: false,
          items: [
            ['低ド', 'lowC'],
            ['低レ', 'lowD'],
            ['低ミ', 'lowE'],
            ['低ファ', 'lowF'],
            ['低ソ', 'lowG'],
            ['低ラ', 'lowA'],
            ['低シ', 'lowB'],

            ['ド', 'C'],
            ['レ', 'D'],
            ['ミ', 'E'],
            ['ファ', 'F'],
            ['ソ', 'G'],
            ['ラ', 'A'],
            ['シ', 'B'],

            ['高ド', 'highC'],
            ['高レ', 'highD'],
            ['高ミ', 'highE'],
            ['高ファ', 'highF'],
            ['高ソ', 'highG'],
            ['高ラ', 'highA'],
            ['高シ', 'highB']
          ].map(([text, value]) => ({ text, value }))
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

  // ① 音階番号を返す
  pitch(args) {
    return this.pitches[args.NOTE] ?? 60;
  }

  // ② 音符の長さを返す
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

  // ③ 入力値を1.5倍する
  dotted(args) {
    if (
      args.VALUE === '' ||
      args.VALUE === null ||
      args.VALUE === undefined
    ) {
      return '';
    }

    const n = Number(args.VALUE);

    return Number.isFinite(n) ? n * 1.5 : '';
  }

  // ④ テンポを設定する
  setTempo(args) {
    const n = Number(args.VALUE);

    // 空欄、0以下、不正な値は無視する
    if (
      args.VALUE === '' ||
      args.VALUE === null ||
      args.VALUE === undefined ||
      !Number.isFinite(n) ||
      n <= 0
    ) {
      return;
    }

    const ratio = this.noteRatios[args.NOTE];

    if (
      !ratio ||
      (args.UNIT !== 'BPM' && args.UNIT !== '秒')
    ) {
      return;
    }

    // 指定された音符の時間を計算
    const selectedSeconds =
      args.UNIT === 'BPM' ? 60 / n : n;

    // 四分音符の時間に換算
    const quarterSeconds = selectedSeconds / ratio;

    // すべての音符の時間を更新
    for (
      const [key, noteRatio] of
      Object.entries(this.noteRatios)
    ) {
      this.durations[key] = quarterSeconds * noteRatio;
    }
  }
}

// Scratchに拡張機能を登録
Scratch.extensions.register(new MusicExtension());
