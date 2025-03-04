class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.X = "初期値"; // デフォルトの値
        this.updateX();
    }



    getInfo() {
        this.updateX(); // ブロック情報取得時にXを更新
        return {
            id: "customExtension",
            name: "カスタム拡張",
            blocks: [
                {
                    opcode: "showX",
                    blockType: Scratch.BlockType.COMMAND,
                    text: this.X,
                    func: "showX"
                }
            ]
        };
    }

    showX() {
        console.log(this.X);
    }
}

Scratch.extensions.register(new CustomExtension());