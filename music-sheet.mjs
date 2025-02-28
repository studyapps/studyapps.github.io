class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.wait = false;
    }

    getInfo() {
        return {
            id: 'customExtension',
            name: 'カスタム拡張',
            blocks: [
                {
                    opcode: 'initialize',
                    blockType: Scratch.BlockType.HAT,
                    text: '初期化',
                },
                {
                    opcode: 'sendInitialize',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '初期化を送る',
                }
            ]
        };
    }

    async initialize(args, util) {
        await util.yield(); // 次のブロックの実行を待つ
        this.wait = true;
        return true; // ハットブロックを実行
    }

    sendInitialize() {
        this.runtime.startHats('customExtension.initialize');
    }
}

Scratch.extensions.register(new CustomExtension());

