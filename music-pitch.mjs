
 // Music Pitch — Scratch 3 custom extension
// 音階・低音変換・高音変換（MIDI番号 0～127）
const Scratch = globalThis.Scratch;

if (!Scratch?.extensions || !Scratch?.BlockType || !Scratch?.ArgumentType) {
  throw new Error('Scratch extension API is unavailable.');
}

// 添付の48×48 SVGアイコンをファイル内に埋め込む
const menuIconURI = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"> <path d="M1.5,6.917c0-2.762,2.239-5,5-5h35c2.762,0,5.001,2.238,5.001,5v35c0,2.762-2.239,5-5,5h-35c-2.762,0-5-2.238-5-5V6.917z"/> <g> <path fill="#FFFFFF" d="M18.842,32.823c0,1.072-0.639,2.051-1.569,2.768c-0.907,0.715-2.101,1.146-3.152,1.146 c-0.668,0-1.289-0.215-1.719-0.572c-0.453-0.357-0.716-0.885-0.716-1.504c0-0.98,0.669-1.959,1.576-2.674 c0.907-0.74,2.052-1.217,3.008-1.217c0.835,0,1.552,0.119,1.982,0.525V14.485h0.59V32.823z"/> <path fill="#FFFFFF" d="M32.314,30.433c0,1.074-0.639,2.053-1.57,2.77c-0.906,0.717-2.102,1.146-3.152,1.146 c-0.668,0-1.289-0.215-1.719-0.574c-0.453-0.357-0.715-0.883-0.715-1.504c0-0.979,0.668-1.957,1.574-2.672 c0.908-0.742,2.053-1.219,3.01-1.219c0.836,0,1.551,0.119,1.98,0.525V12.097h0.592V30.433z"/> <polygon fill="#FFFFFF" points="32.205,14.86 18.388,17.251 18.388,14.485 32.205,12.097 "/> </g> </svg>'
);

class MusicPitch {
  constructor() {
    this.pitches = {};
    const keys = ['C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'As', 'B'];
    keys.forEach((key, i) => {
      this.pitches[key] = 60 + i;
    });
  }

  getInfo() {
    const {BlockType, ArgumentType} = Scratch;

    const names = [
      'ド', '#ド', 'レ', '#レ', 'ミ', 'ファ',
      '#ファ', 'ソ', '#ソ', 'ラ', '#ラ', 'シ'
    ];

    const keys = [
      'C', 'Cs', 'D', 'Ds', 'E', 'F',
      'Fs', 'G', 'Gs', 'A', 'As', 'B'
    ];

    const notes = names.map((name, i) => ({
      text: name,
      value: keys[i]
    }));

    return {
      id: 'Music_Pitch',
      name: 'Music Pitch',

      // 添付SVGを拡張機能アイコンに設定
      menuIconURI,
      blockIconURI: menuIconURI,

      // 黒色
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

        // ② 低音変換ブロック
        {
          opcode: 'lowerOctave',
          blockType: BlockType.REPORTER,
          text: '低 [VALUE]',
          arguments: {
            VALUE: {
              type: ArgumentType.STRING,
              defaultValue: ' '
            }
          }
        },

        // ③ 高音変換ブロック
        {
          opcode: 'raiseOctave',
          blockType: BlockType.REPORTER,
          text: '高 [VALUE]',
          arguments: {
            VALUE: {
              type: ArgumentType.STRING,
              defaultValue: ' '
            }
          }
        }
      ],

      menus: {
        notes: {
          acceptReporters: false,
          items: notes
        }
      }
    };
  }

  // MIDI番号を0～127の範囲に制限
  clampMidi(value) {
    return Math.max(0, Math.min(127, value));
  }

  // 音階のMIDI番号を返す
  pitch(args) {
    return this.clampMidi(this.pitches[args.NOTE] ?? 60);
  }

  // オクターブ変換の共通処理
  transposeOctave(value, offset) {
    const input = String(value ?? '').trim();

    if (!input) return '';

    const midi = Number(input);

    if (!Number.isFinite(midi)) return '';

    return this.clampMidi(midi + offset);
  }

  // 1オクターブ低くする
  lowerOctave(args) {
    return this.transposeOctave(args.VALUE, -12);
  }

  // 1オクターブ高くする
  raiseOctave(args) {
    return this.transposeOctave(args.VALUE, 12);
  }
}

// Scratchに拡張機能を登録
Scratch.extensions.register(new MusicPitch());
