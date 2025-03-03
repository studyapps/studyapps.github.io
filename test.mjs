class MyExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.runningStatus = 0;
        this.hatBlockID = null;

        // 定期的に実行状態をチェック
        setInterval(() => {
            this.updateRunningStatus();
        }, 50); // 50ms ごとに更新
    }

    // ハットブロック（スクリプトの開始）
    whenMyHat(args, util) {
        this.hatBlockID = util.thread.topBlock; // ハットブロックのIDを保存
        console.log("hello"); // 実行時に "hello" を表示
    }

    // スクリプトの実行状態をチェック
    updateRunningStatus() {
        if (!this.hatBlockID) return;

        // すべてのスレッドを取得し、現在のハットブロックが実行中か確認
        const isRunning = this.runtime.threads.some(thread => 
            thread.topBlock === this.hatBlockID && thread.status === 1
        );

        this.runningStatus = isRunning ? 1 : 0;
    }

    // 実行状態を取得する変数ブロック
    getExecutionStatus() {
        return this.runningStatus;
    }

    // Scratchに追加するブロック定義
    getInfo() {
        return {
            id: "myExtension",
            name: "My Extension",
            blocks: [
                {
                    opcode: "whenMyHat",
                    blockType: Scratch.BlockType.HAT,
                    text: "ハットブロックが実行されたとき"
                },
                {
                    opcode: "getExecutionStatus",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "ブロック実行中？"
                }
            ]
        };
    }
}

// 拡張機能を登録
Scratch.extensions.register(new MyExtension());