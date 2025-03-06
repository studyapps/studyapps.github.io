class CustomURLExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.id = "";
        this.type = "Trial";
        this.loadStoredValues();
    }

    getInfo() {
        return {
            id: "customUrlExtension",
            name: "URL拡張機能",
            blocks: [
                {
                    opcode: "setID",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "IDを設定 [ID]",
                    arguments: {
                        ID: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "12345"
                        }
                    }
                },
                {
                    opcode: "setType",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "TYPEを設定 [TYPE]",
                    arguments: {
                        TYPE: {
                            type: Scratch.ArgumentType.STRING,
                            menu: "typeMenu"
                        }
                    }
                },
                {
                    opcode: "getID",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "ID"
                },
                {
                    opcode: "getType",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "TYPE"
                }
            ],
            menus: {
                typeMenu: {
                    acceptReporters: false,
                    items: ["Trial", "Basic"]
                }
            }
        };
    }

    setID(args) {
        this.id = args.ID;
    }

    setType(args) {
        this.type = args.TYPE;
    }

    getID() {
        return this.id;
    }

    getType() {
        return this.type;
    }

    loadStoredValues() {
        const targets = this.runtime.targets;
        for (const target of targets) {
            if (!target.blocks) continue;
            
            for (const blockId in target.blocks._blocks) {
                const block = target.blocks._blocks[blockId];
                if (block.opcode === "customUrlExtension_setID") {
                    this.id = block.fields.ID.value;
                }
                if (block.opcode === "customUrlExtension_setType") {
                    this.type = block.fields.TYPE.value;
                }
            }
        }
    }
}

Scratch.extensions.register(new CustomURLExtension());