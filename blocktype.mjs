class IDVariableExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.storedID = ""; // 初期値
        this.storedTYPE = ""; // 初期値
        this.runtime.on('PROJECT_LOADED', this.loadStoredValues.bind(this)); // SB3ファイル読み込み時に初期値を設定
    }

    getInfo() {
        return {
            id: 'idVariableExt',
            name: 'ID / TYPE 変数',
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
                    blockType: Scratch.BlockType.REPORTER,
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
        return this.storedTYPE;
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

    loadStoredValues() {
        const state = this.runtime.ioDevices.project.getProjectData();
        if (state && state.targets) {
            for (const target of state.targets) {
                if (target.isStage) {
                    if (target.variables && target.variables.storedID) {
                        this.storedID = target.variables.storedID.value;
                    }
                    if (target.variables && target.variables.storedTYPE) {
                        this.storedTYPE = target.variables.storedTYPE.value;
                    }
                }
            }
        }
    }
}

Scratch.extensions.register(new IDVariableExtension());