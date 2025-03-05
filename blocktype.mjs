class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.block = 'Trial'; 
        this.id = "お客様ID"; 
        this.update();
    }

    update() {
        let variable = undefined;
        const stage = this.runtime ? this.runtime.getTargetForStage() : null;
        if (stage && stage.variables) {
            variable = stage.variables;
            for (let key in variable) {
                if (variable[key].name === "ID") {
                    this.id = variable[key].value;
                    console.log("IDの変数あったよ");
                    break;
                }
            }
        } else {
            console.warn("Stage or variables not found.");
        }
    }

    getInfo() {
        this.update(); // ブロック情報取得時にXを更新
        var c = {
            id: 'BlockType',
            name: 'URL Extension',
            color1: "#A6A6A6",
            blocks: [],
            menus: {
                blockTypeMenu: {
                    acceptReporters: true,
                    items: ['Trial','Basic']
                }
            }
        };
        return c.blocks.push(
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
                    defaultValue: this.id ?? " "
                    
                    }
                }
            },
            {
                opcode: 'getID',
                blockType: Scratch.BlockType.REPORTER,
                text: 'ID',
                defaultValue: this.id ?? " "
            },
            {
                opcode: 'getBlockType',
                blockType: Scratch.BlockType.REPORTER,
                text: 'Block',
                defaultValue: this.block ?? 'Trial'
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

    setParameters(args){
        this.block = args.TYPE;
        this.id = args.ID;
        console.log("IDの更新をしました");
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