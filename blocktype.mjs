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
            name: "SB3対応",
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
        this.runtime.ioDevices.cloud.setVariable("id", this.id);
    }

    setType(args) {
        this.type = args.TYPE;
        this.runtime.ioDevices.cloud.setVariable("type", this.type);
    }

    getID() {
        return this.id;
    }

    getType() {
        return this.type;
    }

    loadStoredValues() {
        const storedID = this.runtime.ioDevices.cloud.getVariable("id");
        const storedType = this.runtime.ioDevices.cloud.getVariable("type");
        if (storedID !== undefined && storedID !== null) {
            this.id = storedID;
        }
        if (storedType !== undefined && storedType !== null) {
            this.type = storedType;
        }
    }
}

Scratch.extensions.register(new CustomURLExtension());