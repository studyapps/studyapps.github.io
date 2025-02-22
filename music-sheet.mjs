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
                    text: 'あCブロック (A × B)'
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
        this.aValue = parseInt(args.VALUE, 10);
        return this.aValue;
    }

    getBValue(args) {
        this.bValue = parseInt(args.VALUE, 10);
        return this.bValue;
    }

    getCValue() {
        return this.aValue * this.bValue;
    }
}

Scratch.extensions.register(new CustomExtension());