class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.block = 'trial'; // 初期値を'trial'に設定
        this.X = "初期値"; // デフォルトの値
        this.id = "初期値"; // デフォルトの値
    }

    getInfo() {
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
                opcode: 'setParameters',
                blockType: Scratch.BlockType.COMMAND,
                text: 'BlockType =  [TYPE] ID = [ID]に設定',
                arguments: {
                    TYPE: {
                        type: Scratch.ArgumentType.STRING,
                        menu: 'blockTypeMenu'
                    },
                    ID: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'お客様ID'
                    }
                }
            },
            {
                opcode: 'getID',
                blockType: Scratch.BlockType.REPORTER,
                text: 'ID',
            },
            {
                opcode: 'getBlockType',
                blockType: Scratch.BlockType.REPORTER,
                text: 'BlockType',
            },
            {
                opcode: 'getTrialBlock',
                blockType: Scratch.BlockType.COMMAND,
                text: 'trialのブロック'
            }
        ), this.shouldShowBasicBlocks() && c.blocks.push(
            {
                opcode: 'getBasicBlock',
                blockType: Scratch.BlockType.COMMAND,
                text: 'Basicのブロック'
            }
        ), c;
    }

    setParameters(args){
        this.block = args.TYPE;
        this.id = args.ID;
    }
    getBlockType() {
        return this.block;
    }
    getID() {
        return this.id;
    }
    getBasicBlock() {
    }
    getTrialBlock() {
    }
    shouldShowBasicBlocks() {
        return this.block == "Basic";
    }
}

Scratch.extensions.register(new CustomExtension());