class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.block = 'trial'; // 初期値を'trial'に設定
    }

    getInfo() {
        Ws();
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
                blockType: Scratch.BlockType.COMMAND,
                text: 'BlockTypeを [TYPE] に設定',
                arguments: {
                    TYPE: {
                        type: Scratch.ArgumentType.STRING,
                        menu: 'blockTypeMenu'
                    }
                }
            },
            {
                opcode: 'getBlockType',
                blockType: Scratch.BlockType.REPORTER,
                text: 'BrockType'
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

    getBlockType(args) {
        this.block = args.TYPE;
    }
    getBrockType() {
        return this.block;
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