class IDVariableExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.id = ""; // 初期値
    }

    getInfo() {
        return {
            id: 'idVariableExt',
            name: 'SB3ファイル対応',
            blocks: [
                {
                    opcode: 'setID',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'ID を [ID] に設定',
                    arguments: {
                        ID: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: this.id || ""
                        }
                    }
                },
                {
                    opcode: 'getID',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'ID を取得'
                }
            ]
        };
    }

    setID(args) {
        this.id = args.ID;
        return this.storedID;
    }

    getID() {
        return this.id;
    }

    saveState() {
        return { id: this.id };
    }

    loadState(state) {
        if (state && state.id !== undefined) {
            this.id = state.id;
        }
    }
}

Scratch.extensions.register(new IDVariableExtension());