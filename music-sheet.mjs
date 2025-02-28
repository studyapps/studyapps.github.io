class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this._waiting = false;
    }

    getInfo() {
        return {
            id: 'customExtension',
            name: 'カスタム拡張',
            blocks: [
                {
                    opcode: 'initializeAndWait',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '初期化を送って待つ',
                },
                {
                    opcode: 'whenInitialized',
                    blockType: Scratch.BlockType.HAT,
                    text: '初期化を受け取ったとき',
                }
            ]
        };
    }

    initializeAndWait(args, util) {
        this._waiting = true;
        this.runtime.startHats('customExtension_whenInitialized');
        return new Promise(resolve => {
            const checkInterval = setInterval(() => {
                if (!this._waiting) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 50);
        });
    }

    whenInitialized() {
        if (this._waiting) {
            this._waiting = false;
            return true;
        }
        return false;
    }
}

Scratch.extensions.register(new CustomExtension());