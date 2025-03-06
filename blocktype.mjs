class IDVariableExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.storedID = ""; // 初期値
        this.storedTYPE = ""; // 初期値
    }

    getInfo() {
        return {
            id: 'idVariableExt',
            name: 'SB3対応',
            blocks: [
                {
                    opcode: 'setID',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'ID を [ID] に設定',
                    arguments: {
                        ID: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: this.storedID || ""
                        }
                    }
                },
                {
                    opcode: 'getID',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'ID を取得'
                },
                {
                    opcode: 'setTYPE',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'TYPE を [TYPE] に設定',
                    arguments: {
                        TYPE: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'typeMenu'
                        }
                    }
                },
                {
                    opcode: 'getTYPE',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'TYPE を取得'
                }
            ],
            menus: {
                typeMenu: {
                    acceptReporters: false,
                    items: ['Trial', 'Basic']
                }
            }
        };
    }

    setID(args) {
        this.storedID = args.ID;
        this.runtime.ioDevices.project.saveProject(); // SB3に保存
        return this.storedID;
    }

    getID() {
        return this.storedID;
    }

    setTYPE(args) {
        this.storedTYPE = args.TYPE;
        this.runtime.ioDevices.project.saveProject(); // SB3に保存
    }

    getTYPE() {
        return this.storedTYPE;
    }

    saveState() {
        return { storedID: this.storedID, storedTYPE: this.storedTYPE };
    }

    loadState(state) {
        if (state) {
            if (state.storedID !== undefined) {
                this.storedID = state.storedID;
            }
            if (state.storedTYPE !== undefined) {
                this.storedTYPE = state.storedTYPE;
            }
        }
    }
}

Scratch.extensions.register(new IDVariableExtension());