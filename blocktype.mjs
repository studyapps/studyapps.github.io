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
        this.runtime.projectData["customID"] = this.id;
    }

    setType(args) {
        this.type = args.TYPE;
        this.runtime.projectData["customType"] = this.type;
    }

    getID() {
        return this.id;
    }

    getType() {
        return this.type;
    }

    loadStoredValues() {
        if (this.runtime.projectData) {
            if (this.runtime.projectData["customID"] !== undefined) {
                this.id = this.runtime.projectData["customID"];
            }
            if (this.runtime.projectData["customType"] !== undefined) {
                this.type = this.runtime.projectData["customType"];
            }
        }
    }
}

Scratch.extensions.register(new CustomURLExtension());