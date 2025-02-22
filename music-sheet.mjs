class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.aValue = 2; // 初期値 2
        this.bValue = 5; // 初期値 5
    }

    getInfo() {
        return {
            id: 'customExtension',
            name: 'カスタム拡張',
            blocks: [
                {
                    opcode: 'setAValue',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Aブロック [VALUE] を設定',
                    arguments: {
                        VALUE: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'aMenu'
                        }
                    }
                },
                {
                    opcode: 'getAValue',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Aブロックの値'
                },
                {
                    opcode: 'setBValue',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Bブロック [VALUE] を設定',
                    arguments: {
                        VALUE: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'bMenu'
                        }
                    }
                },
                {
                    opcode: 'getBValue',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Bブロックの値'
                },
                {
                    opcode: 'getCValue',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Cブロック (A × B)'
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

    setAValue(args) {
        this.aValue = parseInt(args.VALUE, 10);
    }

    getAValue() {
        return this.aValue;
    }

    setBValue(args) {
        this.bValue = parseInt(args.VALUE, 10);
    }

    getBValue() {
        return this.bValue;
    }

    getCValue() {
        return this.aValue * this.bValue;
    }
}

Scratch.extensions.register(new CustomExtension());