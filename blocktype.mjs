class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.block = 'Basic'; // 初期値を'Basic'に設定
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
                opcode: 'setBlockType',
                blockType: Scratch.BlockType.COMMAND,
                text: 'BlockTypeを [TYPE] に設定',
                arguments: {
                    TYPE: {
                        type: Scratch.ArgumentType.STRING,
                        menu: 'blockTypeMenu'
                    }
                }
            },{
                opcode: 'getBasicBlock',
                blockType: Scratch.BlockType.REPORTER,
                text: 'Basicのブロック'
            },
            {
                opcode: 'getTrialBlock',
                blockType: Scratch.BlockType.REPORTER,
                text: 'trialのブロック'
            }
        ), c;
    }

    setBlockType(args) {
        this.block = args.TYPE;
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