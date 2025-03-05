class IDVariableExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.id = ""; // 初期値
        this.block = ""; // 初期値
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
                },
                {
                    opcode: 'setBLOCK',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Block を [TYPE] に設定',
                    arguments: {
                        TYPE: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'blockTypeMenu',
                            defaultValue: this.storedID || ""
                        }
                    }
                },
                {
                    opcode: 'getBLOCK',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Block を取得'
                }
            ],
            menus: {
                blockTypeMenu: {
                    acceptReporters: true,
                    items: ['Trial','Basic']
                }
            }
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

    setBLOCK(args) {
        this.block = args.block;
        this.saveBLOCK(); // Blockを保存
        return this.brock;
    }

    getBLOCK() {
        return this.block;
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
    
    saveBLOCK() {
        localStorage.setItem('idVariable', this.block);
    }

    loadBLOCK() {
        const stored = localStorage.getItem('idVariable');
        if (stored !== null) {
            this.block = stored;
        }
    }
}

Scratch.extensions.register(new IDVariableExtension());