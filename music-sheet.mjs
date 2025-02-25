class VariableXExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.X = 0;
        
        // 旗ボタンが押されたときにXをリセット
        this.runtime.on('PROJECT_START', () => {
            this.X = 0;
        });
    }

    getInfo() {
        return {
            id: 'variableXExtension',
            name: 'Variable X',
            blocks: [
                {
                    opcode: 'getX',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '変数Xの値',
                },
                {
                    opcode: 'incrementX',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '変数Xを1増やす',
                }
            ]
        };
    }

    getX() {
        return this.X;
    }

    incrementX() {
        this.X += 1;
    }
}

Scratch.extensions.register(new VariableXExtension());