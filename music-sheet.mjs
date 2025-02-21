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
                    }
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
                    }
                }
            ],
            menus: {
                note: {
                    acceptReporters: true,
                    items: [
                        { text: '𝅝', value: ''},
                        { text: '𝅗𝅥', value: ''},
                        { text: '𝅘𝅥', value: ''},
                        { text: '𝅘𝅥𝅮', value: ''},
                        { text: '𝅘𝅥𝅯', value: ''},
                        { text: '𝅘𝅥𝅰', value: ''},
                        { text: '𝅘𝅥𝅱', value: ''},
                        { text: '𝅘𝅥𝅲', value: ''}
                    ]
                },
                rest: {
                    acceptReporters: true,
                    items: ['𝄻', '𝄼', '𝄽', '𝄾', '𝄿', '𝅀', '𝅁', '𝅂']
                },
                tempo: {
                    acceptReporters: true,
                    items: [
                        { text: '🐢 低速', value: 'https://raw.githubusercontent.com/studyapps/studyapps.github.io/983be70407df48304bbbf60a9489135151c3b8fb/svg/note_1.svg' },
                        { text: '🏃 中速', value: 'https://raw.githubusercontent.com/studyapps/studyapps.github.io/983be70407df48304bbbf60a9489135151c3b8fb/svg/note_1.svg' },
                        { text: '🚀 高速', value: 'https://raw.githubusercontent.com/studyapps/studyapps.github.io/983be70407df48304bbbf60a9489135151c3b8fb/svg/note_1.svg' }
                    ]
                }
            }
        };
    }

    chooseFruit(args) {
        return `選択した果物: ${args.FRUIT}`;
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