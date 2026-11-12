
const Scratch = globalThis.Scratch;

if (!Scratch?.extensions || !Scratch?.BlockType || !Scratch?.ArgumentType) {
  throw new Error('Scratch extension API is unavailable.');
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
      // 低音域
      lowC: 48,
      lowCs: 49,
      lowD: 50,
      lowDs: 51,
      lowE: 52,
      lowF: 53,
      lowFs: 54,
      lowG: 55,
      lowGs: 56,
      lowA: 57,
      lowAs: 58,
      lowB: 59,

      // 中音域
      C: 60,
      Cs: 61,
      D: 62,
      Ds: 63,
      E: 64,
      F: 65,
      Fs: 66,
      G: 67,
      Gs: 68,
      A: 69,
      As: 70,
      B: 71,

      // 高音域
      highC: 72,
      highCs: 73,
      highD: 74,
      highDs: 75,
      highE: 76,
      highF: 77,
      highFs: 78,
      highG: 79,
      highGs: 80,
      highA: 81,
      highAs: 82,
      highB: 83
    };
  }

  getInfo() {
    const { BlockType, ArgumentType } = Scratch;

    return {
      id: 'musicAshikaga',
      name: 'MUSIC',

      // 黒色のブロック
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
        // ① 音階プルダウン（36種類）
        notes: {
          acceptReporters: false,
          items: [
            // 低音域
            { text: 'ド(低)', value: 'lowC' },
            { text: '#ド(低)', value: 'lowCs' },
            { text: 'レ(低)', value: 'lowD' },
            { text: '#レ(低)', value: 'lowDs' },
            { text: 'ミ(低)', value: 'lowE' },
            { text: 'ファ(低)', value: 'lowF' },
            { text: '#ファ(低)', value: 'lowFs' },
            { text: 'ソ(低)', value: 'lowG' },
            { text: '#ソ(低)', value: 'lowGs' },
            { text: 'ラ(低)', value: 'lowA' },
            { text: '#ラ(低)', value: 'lowAs' },
            { text: 'シ(低)', value: 'lowB' },

            // 中音域
            { text: 'ド', value: 'C' },
            { text: '#ド', value: 'Cs' },
            { text: 'レ', value: 'D' },
            { text: '#レ', value: 'Ds' },
            { text: 'ミ', value: 'E' },
            { text: 'ファ', value: 'F' },
            { text: '#ファ', value: 'Fs' },
            { text: 'ソ', value: 'G' },
            { text: '#ソ', value: 'Gs' },
            { text: 'ラ', value: 'A' },
            { text: '#ラ', value: 'As' },
            { text: 'シ', value: 'B' },

            // 高音域
            { text: 'ド(高)', value: 'highC' },
            { text: '#ド(高)', value: 'highCs' },
            { text: 'レ(高)', value: 'highD' },
            { text: '#レ(高)', value: 'highDs' },
            { text: 'ミ(高)', value: 'highE' },
            { text: 'ファ(高)', value: 'highF' },
            { text: '#ファ(高)', value: 'highFs' },
            { text: 'ソ(高)', value: 'highG' },
            { text: '#ソ(高)', value: 'highGs' },
            { text: 'ラ(高)', value: 'highA' },
            { text: '#ラ(高)', value: 'highAs' },
            { text: 'シ(高)', value: 'highB' }
          ]
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

  // ③ 付点音符（1.5倍）
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

  // ④ テンポ設定
  setTempo(args) {
    const n = Number(args.VALUE);

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

    // 指定された音符の時間
    const selectedSeconds =
      args.UNIT === 'BPM' ? 60 / n : n;

    // 四分音符の時間に換算
    const quarterSeconds = selectedSeconds / ratio;

    // 4種類の音符の時間を更新
    for (
      const [key, noteRatio] of
      Object.entries(this.noteRatios)
    ) {
      this.durations[key] = quarterSeconds * noteRatio;
    }
  }
}

// 拡張機能を登録
Scratch.extensions.register(new MusicExtension());
