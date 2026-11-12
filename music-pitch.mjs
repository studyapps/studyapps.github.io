
 // Music Pitch — Scratch 3 custom extension
// 音階・低音変換・高音変換

const Scratch = globalThis.Scratch;

if (
  !Scratch?.extensions ||
  !Scratch?.BlockType ||
  !Scratch?.ArgumentType
) {
  throw new Error('Scratch extension API is unavailable.');
}

class MusicPitch {

  constructor() {

    // 音階に対応するMIDIノート番号
    // ド = 60（中央のド）
    this.pitches = {};

    const keys = [
      'C', 'Cs', 'D', 'Ds',
      'E', 'F', 'Fs', 'G',
      'Gs', 'A', 'As', 'B'
    ];

    keys.forEach((key, i) => {
      this.pitches[key] = 60 + i;
    });
  }

  getInfo() {

    const { BlockType, ArgumentType } = Scratch;

    // 音階の表示名
    const names = [
      'ド', '#ド', 'レ', '#レ',
      'ミ', 'ファ', '#ファ', 'ソ',
      '#ソ', 'ラ', '#ラ', 'シ'
    ];

    // 音階の内部識別子
    const keys = [
      'C', 'Cs', 'D', 'Ds',
      'E', 'F', 'Fs', 'G',
      'Gs', 'A', 'As', 'B'
    ];

    // プルダウンメニューの作成
    const notes = names.map((name, i) => ({
      text: name,
      value: keys[i]
    }));

    return {

      // Music Sheetとは異なる拡張機能ID
      id: 'musicPitchAshikaga',

      // 拡張機能名
      name: 'Music Pitch',

      // Music Sheetと同じ黒色
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

        // ド～シの12音階
        notes: {
          acceptReporters: false,
          items: notes
        }
      }
    };
  }

  // ① 音階のMIDI番号を返す
  pitch(args) {
    return this.pitches[args.NOTE] ?? 60;
  }

  // オクターブ変換の共通処理
  transposeOctave(value, offset) {

    const input = String(value ?? '').trim();

    // 未入力の場合は空文字を返す
    if (!input) {
      return '';
    }

    const midi = Number(input);

    // 数値以外の場合は空文字を返す
    if (!Number.isFinite(midi)) {
      return '';
    }

    return midi + offset;
  }

  // ② 1オクターブ低くする
  lowerOctave(args) {
    return this.transposeOctave(args.VALUE, -12);
  }

  // ③ 1オクターブ高くする
  raiseOctave(args) {
    return this.transposeOctave(args.VALUE, 12);
  }
}

// Scratchに拡張機能を登録
Scratch.extensions.register(new MusicPitch());
