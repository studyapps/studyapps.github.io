class MusicSheet {
    constructor(runtime) {
        this.runtime = runtime;
        this.aValue; // 初期値 2
        this.bValue; // 初期値 5
    }

  getInfo() { // 拡張機能の各種情報
    return {
      id: 'test',
      name: "楽譜", 

            color1: '#000000', // ブロックのメインカラー（白）
            color2: '#000000', // ブロックの枠線や影の色（薄いグレー）
            blocks: [
                {
                    opcode: 'getAValue',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Aブロック [VALUE]',
                    arguments: {
                        VALUE: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'aMenu'
                        }
                    }
                },
                {
                    opcode: 'getBValue',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Bブロック [VALUE]',
                    arguments: {
                        VALUE: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'bMenu'
                        }
                    }
                },
                {
                    opcode: 'getCValue',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Cブロック (えA × B)'
                }
            ],
            menus: {
                aMenu: [
                    { text: '1', value: '1' },
                    { text: '2', value: '2' },
                    { text: '3', value: '3' }
                ],
                bMenu: [
                    { text: '4', value: '4' },
                    { text: '5', value: '5' },
                    { text: '6', value: '6' }
                ]
            }
        };
    }

    getAValue(args) {
        this.aValue = parseInt(args.VALUE,10);
        return this.aValue;
    }

    getBValue(args) {
        this.bValue = parseInt(args.VALUE,10);
        return this.bValue;
    }

    getCValue() {
        return this.aValue * this.bValue;
    }
}

// 拡張機能を登録
Scratch.extensions.register(new MusicSheet());