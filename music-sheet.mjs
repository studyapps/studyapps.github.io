class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this._waiting = false;
        this._resolveWaiting = null;
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
                },
                {
                    opcode: 'getWaitingStatus',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '初期化待機状態'
                }
            ]
        };
    }

    initializeAndWait(args, util) {
        this._waiting = true;
        this.runtime.startHats('customExtension_whenInitialized');
        
        return new Promise(resolve => {
            this._resolveWaiting = resolve;
        });
    }

    whenInitialized() {
        if (this._waiting) {
            this._waiting = false;
            if (this._resolveWaiting) {
                this._resolveWaiting();
                this._resolveWaiting = null;
            }
            return true;
        }
        return false;
    }

    getWaitingStatus() {
        return this._waiting;
    }
}

Scratch.extensions.register(new CustomExtension());

