class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.block = 'trial'; 
        this.id = "お客様ID"; 
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
                text: 'BlockType =  [TYPE] ID = [ID]',
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
            //{
            //    opcode: 'getID',
            //    blockType: Scratch.BlockType.REPORTER,
            //    text: 'ID',
            //},
            //{
            //    opcode: 'getBlockType',
            //    blockType: Scratch.BlockType.REPORTER,
            //    text: 'BlockType',
            //},
            {
                opcode: 'getTrialBlock',
                blockType: Scratch.BlockType.COMMAND,
                text: 'Trialのブロック'
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