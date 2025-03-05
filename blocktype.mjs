class IDVariableExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.storedID = ""; // 初期値
        this.storedTYPE = ""; // 初期値
        this.loadStoredValues(); // SB3ファイル起動時に値を復元
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
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: this.storedTYPE || ""
                        }
                    }
                },
                {
                    opcode: 'getTYPE',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'TYPE を取得'
                }
            ]
        };
    }

    setID(args) {
        this.storedID = args.ID;
        this.saveStoredValues(); // IDを保存
        return this.storedID;
    }

    getID() {
        return this.storedID;
    }

    setTYPE(args) {
        this.storedTYPE = args.TYPE;
        this.saveStoredValues(); // TYPEを保存
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
            this.saveStoredValues(); // 読み込んだ値を保存
        }
    }

    saveStoredValues() {
        localStorage.setItem('idVariable', this.storedID);
        localStorage.setItem('typeVariable', this.storedTYPE);
    }

    loadStoredValues() {
        const storedID = localStorage.getItem('idVariable');
        if (storedID !== null) {
            this.storedID = storedID;
        }
        const storedTYPE = localStorage.getItem('typeVariable');
        if (storedTYPE !== null) {
            this.storedTYPE = storedTYPE;
        }
    }
}

Scratch.extensions.register(new IDVariableExtension());