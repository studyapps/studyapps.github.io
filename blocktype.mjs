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
        this.runtime.ioDevices.cloud.saveVariable("id", this.id);
    }

    setType(args) {
        this.type = args.TYPE;
        this.runtime.ioDevices.cloud.saveVariable("type", this.type);
    }

    getID() {
        return this.id;
    }

    getType() {
        return this.type;
    }

    loadStoredValues() {
        this.id = this.runtime.ioDevices.cloud.getVariable("id") || "";
        this.type = this.runtime.ioDevices.cloud.getVariable("type") || "Trial";
    }
}

Scratch.extensions.register(new CustomURLExtension());