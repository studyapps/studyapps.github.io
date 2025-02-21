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
                    opcode: 'chooseFruit',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[FRUIT]',
                    arguments: {
                        FRUIT: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'note'
                            defaultValue: '𝅘𝅥𝅮' // 初期値
                        }
                    }
                },
                {
                    opcode: 'chooseAnimal',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[ANIMAL]',
                    arguments: {
                        ANIMAL: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'animalMenu'
                        }
                    }
                },
                {
                    opcode: 'setSpeed',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '速度を [SPEED] に設定',
                    arguments: {
                        SPEED: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'speedMenu'
                        }
                    }
                }
            ],
            menus: {
                note: {
                    acceptReporters: true,
                    items: ['𝅝', '𝅗𝅥', '𝅘𝅥', '𝅘𝅥𝅮', '𝅘𝅥𝅯', '𝅘𝅥𝅰', '𝅘𝅥𝅱', '𝅘𝅥𝅲']
                },
                animalMenu: {
                    acceptReporters: true,
                    items: ['🐶 犬', '🐱 猫', '🐰 うさぎ', '🦁 ライオン', '🐘 ゾウ']
                },
                speedMenu: {
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