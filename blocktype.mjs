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
            name: "SB3",
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
        this.runtime.storage._storeSession("customID", this.id);
    }

    setType(args) {
        this.type = args.TYPE;
        this.runtime.storage._storeSession("customType", this.type);
    }

    getID() {
        return this.id;
    }

    getType() {
        return this.type;
    }

    loadStoredValues() {
        const storedID = this.runtime.storage._getSession("customID");
        const storedType = this.runtime.storage._getSession("customType");
        if (storedID !== undefined && storedID !== null) {
            this.id = storedID;
        }
        if (storedType !== undefined && storedType !== null) {
            this.type = storedType;
        }
    }
}

Scratch.extensions.register(new CustomURLExtension());