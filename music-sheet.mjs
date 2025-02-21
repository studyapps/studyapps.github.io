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
                    opcode: 'selectColor',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '色を選択: [COLOR]',
                    arguments: {
                        COLOR: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'colorMenu'
                        }
                    }
                },
                {
                    opcode: 'setVolumeLevel',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '音量を [LEVEL] に設定',
                    arguments: {
                        LEVEL: {
                            type: Scratch.ArgumentType.NUMBER,
                            menu: 'volumeMenu'
                        }
                    }
                }
            ],
            menus: {
                colorMenu: {
                    acceptReporters: true,
                    items: ['赤', '青', '緑', '黄色', '黒']
                },
                volumeMenu: {
                    acceptReporters: true,
                    items: ['0', '25', '50', '75', '100']
                }
            }
        };
    }

    selectColor(args) {
        return `選択された色: ${args.COLOR}`;
    }

    setVolumeLevel(args) {
        console.log(`音量を ${args.LEVEL} に設定しました`);
    }
}

Scratch.extensions.register(new MusicSheet());