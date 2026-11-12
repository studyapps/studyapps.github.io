
const Scratch = globalThis.Scratch;

if (!Scratch?.extensions || !Scratch?.BlockType || !Scratch?.ArgumentType) {
  throw new Error('Scratch extension API is unavailable.');
}

class MusicExtension {
  constructor() {
    this.durations = {
      whole: 1,
      half: 0.5,
      quarter: 0.25,
      eighth: 0.125
    };

    this.noteRatios = {
      whole: 4,
      half: 2,
      quarter: 1,
      eighth: 0.5
    };

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
        const name = prefix ? prefix + key : key;
        this.pitches[name] = base + i;
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

    for (const [prefix, suffix] of [
      ['low', '(低)'],
      ['', ''],
      ['high', '(高)']
    ]) {
      names.forEach((name, i) => {
        notes.push({
          text: name + suffix,
          value: prefix ? prefix + keys[i] : keys[i]
        });
      });
    }

    return {
      id: 'musicAshikaga',
      name: 'MUSIC',

      color1: '#000000',
      color2: '#000000',
      color3: '#000000',

      blocks: [
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
        }
      ],

      menus: {
        notes: {
          acceptReporters: false,
          items: notes
        },

        durations: {
          acceptReporters: false,
          items: [
            { text: '全音符', value: 'whole' },
            { text: '二分音符', value: 'half' },
            { text: '四分音符', value: 'quarter' },
            { text: '八分音符', value: 'eighth' }
          ]
        },

        units: {
          acceptReporters: false,
          items: ['BPM', '秒']
        }
      }
    };
  }

  pitch(args) {
    return this.pitches[args.NOTE] ?? 60;
  }

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

  dotted(args) {
    const value = String(args.VALUE ?? '').trim();

    if (value === '') {
      return '';
    }

    const n = Number(value);

    return Number.isFinite(n) ? n * 1.5 : '';
  }

  setTempo(args) {
    const value = String(args.VALUE ?? '').trim();

    if (value === '') {
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

    const selectedSeconds =
      args.UNIT === 'BPM' ? 60 / n : n;

    const quarterSeconds = selectedSeconds / ratio;

    for (const [key, noteRatio] of
      Object.entries(this.noteRatios)) {
      this.durations[key] = quarterSeconds * noteRatio;
    }
  }
}

Scratch.extensions.register(new MusicExtension());
