class IDVariableExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.storedID = ""; // 初期値
        this.loadStoredID(); // SB3ファイル起動時にIDを復元
    }

    getInfo() {
        return {
            id: 'idVariableExt',
            name: 'ID 変数',
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
                }
            ]
        };
    }

    setID(args) {
        this.storedID = args.ID;
        this.saveStoredID(); // IDを保存
        return this.storedID;
    }

    getID() {
        return this.storedID;
    }

    saveState() {
        return { storedID: this.storedID };
    }

    loadState(state) {
        if (state && state.storedID !== undefined) {
            this.storedID = state.storedID;
            this.saveStoredID(); // 読み込んだIDを保存
        }
    }

    saveStoredID() {
        localStorage.setItem('idVariable', this.storedID);
    }

    loadStoredID() {
        const stored = localStorage.getItem('idVariable');
        if (stored !== null) {
            this.storedID = stored;
        }
    }
}

Scratch.extensions.register(new IDVariableExtension());