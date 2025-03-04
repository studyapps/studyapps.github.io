class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.block = 'trial'; // 初期値を'trial'に設定
        this.X = "初期値"; // デフォルトの値
        this.id = "初期値"; // デフォルトの値
    }

    getInfo() {
        this.block = 'basic';
        var c = {
            id: 'BlockType',
            name: 'URL Extension',
            color1: "#A6A6A6",
            blocks: [],
            menus: {
                blockTypeMenu: {
                    acceptReporters: true,
                    items: ['Basic', 'trial']
                }
            }
        };
        return c.blocks.push(
            {
                opcode: 'setBlockType',
                blockType: Scratch.BlockType.REPORTER,
                text: 'BlockType =  [TYPE]',
                arguments: {
                    TYPE: {
                        type: Scratch.ArgumentType.STRING,
                        menu: 'blockTypeMenu'
                    }
                }
            },
            {
                opcode: 'setID',
                blockType: Scratch.BlockType.REPORTER,
                text: 'ID = [ID]',
                arguments: {
                    ID: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'お客様ID'
                    }
                }
            },
            {
                opcode: 'getTrialBlock',
                blockType: Scratch.BlockType.REPORTER,
                text: 'trialのブロック'
            }
        ), this.shouldShowBasicBlocks() && c.blocks.push(
            {
                opcode: 'getBasicBlock',
                blockType: Scratch.BlockType.REPORTER,
                text: 'Basicのブロック'
            }
        ), c;
    }


    setBlockType(args) {
        this.block = args.TYPE;
        return this.block;
    }
    setID(args) {
        this.id = args.ID;
        return this.id;
    }
    getBasicBlock() {
    }
    getTrialBlock() {
    }
    shouldShowBasicBlocks() {
        return this.block == "basic";
    }
}

Scratch.extensions.register(new CustomExtension());