class IDVariableExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.id = ""; // 初期値
        this.loadID(); // SB3ファイル起動時にIDを復元
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
                }
            ]
        };
    }

    setID(args) {
        this.id = args.ID;
        this.saveID(); // IDを保存
        return this.id;
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
            this.saveID(); // 読み込んだIDを保存
        }
    }

    saveID() {
        localStorage.setItem('idVariable', this.id);
    }

    loadID() {
        const stored = localStorage.getItem('idVariable');
        if (stored !== null) {
            this.id = stored;
        }
    }
}

Scratch.extensions.register(new IDVariableExtension());