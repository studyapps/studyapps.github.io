class CustomExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.X = "初期値"; // デフォルトの値
        this.updateX();
    }

    updateX() {
        const variable = this.runtime.getTargetForStage()?.variables;
        if (variable) {
            for (let key in variable) {
                if (variable[key].name === "変数") {
                    this.X = variable[key].value;
                    break;
                }
            }
        }
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