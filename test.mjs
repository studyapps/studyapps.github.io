class MyExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.start = false; // 初期値を false にする
    }

    // ハットブロックの処理
    whenExecuted(args, util) {
        console.log("Hello");
        this.start = true; // 実行開始時に true にする

        // 接続されたブロックの処理がすべて完了するまで待つ
        return new Promise(resolve => {
            setTimeout(async () => {
                //await util.yield(); // 他の処理のために一時停止
                this.start = false; // すべての処理が完了したら false にする
                resolve();
            });
        });
    }

    // 変数ブロックの処理
    getStartValue() {
        return this.start;
    }

    getInfo() {
        return {
            id: "myextension",
            name: "My Extension",
            blocks: [
                {
                    opcode: "whenExecuted",
                    blockType: "hat",
                    text: "ハットブロックが実行されたとき"
                },
                {
                    opcode: "getStartValue",
                    blockType: "reporter",
                    text: "start の値を取得"
                }
            ]
        };
    }
}

Scratch.extensions.register(new MyExtension());
