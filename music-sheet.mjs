class MusicSheet {
  constructor() {}
  getInfo() { // 拡張機能の各種情報
    return {
      id: 'test',
      name: "楽譜", 

            color1: '#000000', // ブロックのメインカラー（白）
            color2: '#000000', // ブロックの枠線や影の色（薄いグレー）
            blocks: [
                {
                    opcode: 'setSpeed',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'テンポ　[NOTE] = [TEMPO] に設定',
                    arguments: {
                        NOTE: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'note',
                            defaultValue: '𝅘𝅥' // 初期値
                        },
                        TEMPO: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 80 // 初期値
                        }
                    }
                },
                {
                    opcode: 'chooseNote',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NOTE]',
                    arguments: {
                        NOTE: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'note',
                            defaultValue: '𝅘𝅥' // 初期値    
                        }
                    },
                    isMonitor: true // チェックボックスを追加
                },
                {
                    opcode: 'chooseRest',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[REST]',
                    arguments: {
                        REST: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'rest',
                            defaultValue: '𝄽' // 初期値
                        }
                    },
                    isMonitor: true // チェックボックスを追加
                }
            ],
            menus: {
                note: {
                    acceptReporters: true,
                    items: [
                        { text: '𝅝', value: 1},
                        { text: '𝅗𝅥', value: 1/2},
                        { text: '𝅘𝅥', value: 1/4},
                        { text: '𝅘𝅥𝅮', value: 1/8},
                        { text: '𝅘𝅥𝅯', value: 1/16},
                        { text: '𝅘𝅥𝅰', value: 1/32},
                        { text: '𝅘𝅥𝅱', value: 1/64},
                        { text: '𝅘𝅥𝅲', value: 1/128}
                    ]
                },
                rest: {
                    acceptReporters: true,
                    items: [
                        { text: '𝄻', value: 1},
                        { text: '𝄼', value: 1/2},
                        { text: '𝄽', value: 1/4},
                        { text: '𝄾', value: 1/8},
                        { text: '𝄿', value: 1/16},
                        { text: '𝅀', value: 1/32},
                        { text: '𝅁', value: 1/64},
                        { text: '𝅂', value: 1/128}                   
                    ]
                }
            }
        };
    }

    chooseNote(args) {
        return ${args.NOTE};
    }

    chooseAnimal(args) {
        return `選択した動物: ${args.ANIMAL}`;
    }

    setSpeed(args) {
        console.log(`速度を ${args.SPEED} に設定しました`);
    }
}

// 拡張機能を登録
Scratch.extensions.register(new MusicSheet());