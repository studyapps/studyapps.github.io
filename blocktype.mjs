class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.block = ''; 
        this.id = ''; 
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
                    items: ['Trial','Basic']
                },
                costumeMenu: {
                    acceptReporters: false,
                    items: this.getCostumeNames.bind(this)
                }
            }
        };
        return c.blocks.push(
            {
                opcode: 'getSelectedCostume',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'selected costume [COSTUME]',
                    arguments: {
                        COSTUME: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '',
                            menu: 'costumeMenu'
                        }
                    }
            },
            {
                opcode: 'setParameters',
                blockType: Scratch.BlockType.COMMAND,
                text: 'Block =  [TYPE] ID = [ID]',
                arguments: {
                    TYPE: {
                        type: Scratch.ArgumentType.STRING,
                        menu: 'blockTypeMenu',
                        defaultValue: this.block ?? 'Trial'
                    },
                    ID: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: this.id ?? "お客様ID"
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
                text: 'Block'
            },
            {
                opcode: 'getTrialBlock',
                blockType: Scratch.BlockType.COMMAND,
                text: 'Trialライセンスで表示されるブロック'
            }
        ), 
        this.shouldShowBasicBlocks() && c.blocks.push(
            {
                opcode: 'getBasicBlock',
                blockType: Scratch.BlockType.COMMAND,
                text: 'Basicライセンスで表示されるブロック'
            }
        ), c;
    }

    getCostumeNames() {
        let target = this.runtime.getEditingTarget();
        if (!target || !target.getCostumes) return [];
        return target.getCostumes().map(costume => ({ text: costume.name, value: costume.name }));
    }

    getSelectedCostume(args) {
        return args.COSTUME || '';
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