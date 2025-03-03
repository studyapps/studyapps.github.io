class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.start = false;
    }

    getInfo() {
        return {
            id: 'customExtension',
            name: 'Custom Extension',
            blocks: [
                {
                    opcode: 'helloHat',
                    blockType: Scratch.BlockType.HAT,
                    text: 'Hello',
                },
                {
                    opcode: 'triggerHello',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Trigger Hello',
                },
                {
                    opcode: 'getStart',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Start',
                }
            ]
        };
    }

    helloHat() {
        if (!this.start) {
            this.start = true;
            setTimeout(() => {
                this.start = false;
            }, 100); // 仮の時間待機（実際のブロック実行の完了待ち）
            return true;
        }
        return false;
    }

    triggerHello() {
        this.start = true;
        this.runtime.startHats('customExtension.helloHat');
        setTimeout(() => {
            this.start = false;
        }, 100);
    }

    getStart() {
        return this.start;
    }
}

Scratch.extensions.register(new CustomExtension());