class CustomURLExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.id = "";
        this.type = "Trial";
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
                            defaultValue: this.id || "12345"  // 保存された値をデフォルト値に適用
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
                            menu: "typeMenu",
                            defaultValue: this.type || "Trial"  // 保存された値をデフォルト値に適用
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
}

Scratch.extensions.register(new CustomURLExtension());