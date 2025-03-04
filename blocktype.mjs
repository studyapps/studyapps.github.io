class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.block = 'trial'; // 初期値を'trial'に設定
        this.X = "初期値"; // デフォルトの値
        this.updateX();
    }
    
    updateX() {
        let variable = undefined;
        const stage = this.runtime ? this.runtime.getTargetForStage() : null;
        if (stage && stage.variables) {
            variable = stage.variables;
            for (let key in variable) {
                if (variable[key].name === "変数") {
                    this.X = variable[key].value;
                    break;
                }
            }
        } else {
            console.warn("Stage or variables not found.");
        }
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
                text: 'BlockTypeを [TYPE] に設定3',
                arguments: {
                    TYPE: {
                        type: Scratch.ArgumentType.STRING,
                        menu: 'blockTypeMenu'
                    }
                }
            },
            {
                opcode: 'getID',
                blockType: Scratch.BlockType.REPORTER,
                text: 'ID'
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

    getID(args) {
        return this.X;
    }
    setBlockType(args) {
        this.block = args.TYPE;
    }
    getBlockType() {
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