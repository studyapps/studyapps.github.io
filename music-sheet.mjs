class MusicSheet {
  constructor() {}
  getInfo() { // 拡張機能の各種情報
    return {
      id: 'test',
      name: "楽譜", 

            color1: '#FFFFFF', // ブロックのメインカラー（白）
            color2: '#E0E0E0', // ブロックの枠線や影の色（薄いグレー）
            color3: '#E0E0E0', // ブロックの文字色（黒）
            blocks: [
                {
                    opcode: 'chooseFruit',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '好きな果物: [FRUIT]',
                    arguments: {
                        FRUIT: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'fruitMenu'
                        }
                    }
                },
                {
                    opcode: 'chooseAnimal',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '好きな動物: [ANIMAL]',
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
                fruitMenu: {
                    acceptReporters: true,
                    items: ['🍎 りんご', '🍌 バナナ', '🍇 ぶどう', '🍊 オレンジ', '🍓 いちご']
                },
                animalMenu: {
                    acceptReporters: true,
                    items: ['🐶 犬', '🐱 猫', '🐰 うさぎ', '🦁 ライオン', '🐘 ゾウ']
                },
                speedMenu: {
                    acceptReporters: true,
                    items: [
                        { text: '🐢 低速', value: 'low' },
                        { text: '🏃 中速', value: 'medium' },
                        { text: '🚀 高速', value: 'high' }
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