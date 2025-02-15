class Test {
  constructor() {}
  getInfo() { // 拡張機能の各種情報
    return {
      id: 'test',
      name: 'Test', // 拡張機能の名前
      blocks: [ // 各ブロックの定義
        {
          opcode: 'hello', // このブロックが実行されると、クラス内のhelloというメソッドが呼ばれることを意味しています
          blockType: Scratch.BlockType.COMMAND,　// 「10歩動かす」のような通常の命令ブロック
          text: 'hello' // ブロックに表示されるテキスト
        }
      ]
    }
  }
  hello() {
    console.log('hello'); // console log に hello と出力
  }
}
Scratch.extensions.register(new Test());